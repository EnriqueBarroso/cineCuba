import { useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";

const subscribe = () => () => {};

export interface BackLinkOrigin {
  path: string;
  label: string;
}

interface BackLink {
  path: string;
  label: string;
}

/**
 * Destino y texto de la flecha "volver". Si la navegación del lado cliente
 * trae `state.from` (ruta interna + etiqueta), vuelve a ese origen; si no
 * (entrada directa, recarga desde otro sitio, prerender), usa el fallback.
 * Durante la hidratación también usa el fallback para coincidir con el HTML
 * prerenderizado; después pasa al origen sin parpadeo en navegación normal.
 */
export const useBackLink = (fallback: BackLink): BackLink => {
  const { state } = useLocation();
  const hydrated = useSyncExternalStore(subscribe, () => true, () => false);
  const from = (state as { from?: Partial<BackLinkOrigin> } | null)?.from;

  if (
    hydrated &&
    from &&
    typeof from.path === "string" &&
    from.path.startsWith("/") &&
    !from.path.startsWith("//") &&
    typeof from.label === "string" &&
    from.label.trim()
  ) {
    return { path: from.path, label: `Volver a ${from.label}` };
  }
  return fallback;
};
