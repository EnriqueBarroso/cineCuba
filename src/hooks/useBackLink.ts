import { useCallback, useSyncExternalStore, type MouseEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const subscribe = () => () => {};

export interface BackLinkOrigin {
  path: string;
  label: string;
}

interface BackLink {
  path: string;
  label: string;
}

interface ResolvedBackLink extends BackLink {
  /**
   * Presente solo cuando se llegó desde una página del sitio (state.from) y hay historial:
   * retrocede en el historial en lugar de añadir una entrada nueva, para que el siguiente
   * "volver" de la página de origen no caiga de nuevo en esta ficha.
   */
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}

/** `location.key === "default"` es la primera entrada del historial: no hay nada atrás en el sitio. */
const hasInSiteHistory = (key: string) => key !== "default";

/**
 * Destino y texto de la flecha "volver". Si la navegación del lado cliente
 * trae `state.from` (ruta interna + etiqueta), vuelve a ese origen; si no
 * (entrada directa, recarga desde otro sitio, prerender), usa el fallback.
 * Durante la hidratación también usa el fallback para coincidir con el HTML
 * prerenderizado; después pasa al origen sin parpadeo en navegación normal.
 *
 * El enlace conserva su `href` (abrir en pestaña nueva funciona); el clic normal
 * retrocede en el historial.
 */
export const useBackLink = (fallback: BackLink): ResolvedBackLink => {
  const { state, key } = useLocation();
  const navigate = useNavigate();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const from = (state as { from?: Partial<BackLinkOrigin> } | null)?.from;

  const valid =
    hydrated &&
    from &&
    typeof from.path === "string" &&
    from.path.startsWith("/") &&
    !from.path.startsWith("//") &&
    typeof from.label === "string" &&
    from.label.trim();

  const goBack = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return; // clic con modificadores: comportamiento normal del enlace
      }
      event.preventDefault();
      navigate(-1);
    },
    [navigate]
  );

  if (valid) {
    return {
      path: from.path as string,
      label: `Volver a ${from.label}`,
      onClick: hasInSiteHistory(key) ? goBack : undefined,
    };
  }
  return fallback;
};

/**
 * Acción del botón "volver" de las fichas: retrocede en el historial; si no hay historial
 * en el sitio (acceso directo, enlace externo), va a la lista de fallback en vez de salir del sitio.
 */
export const useGoBack = (fallback: string | (() => string)) => {
  const { key } = useLocation();
  const navigate = useNavigate();
  return useCallback(() => {
    if (hasInSiteHistory(key)) navigate(-1);
    else navigate(typeof fallback === "function" ? fallback() : fallback);
  }, [key, navigate, fallback]);
};
