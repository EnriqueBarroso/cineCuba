import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { PAGE_TRANSITION_MS } from "@/components/PageTransition";

/** Tras el salto, durante este tiempo se recoloca el ancla si el contenido se reajusta (fuentes, imágenes, hidratación). */
const SETTLE_MS = 3000;

/**
 * Lleva la vista al elemento cuyo id coincide con el hash de la URL (p. ej. /decadas#anos-80).
 *
 * ScrollToTop sube al inicio en cada carga, así que hace falta volver al ancla después:
 * - Al montar la página (carga directa, enlace interno o "atrás"): se espera a PageTransition más un margen. En la
 *   carga directa también hace falta: el salto nativo de Chrome al fragmento (animado por el scroll-behavior: smooth
 *   global) y la hidratación descolocan el ancla si se salta antes.
 * - Cambio de hash con la página ya montada: salto inmediato.
 *
 * El salto es siempre instantáneo y respeta el scroll-margin-top (scroll-mt-*) del elemento. Como el contenido sigue
 * reajustándose un par de segundos tras cargar (comprobado con Chrome en frío: un único salto cae mal en ~1 de cada 3
 * cargas), después del salto se vigila el ancla durante SETTLE_MS y se recoloca si se ha movido. La vigilancia se
 * detiene en cuanto el usuario interactúa (rueda, toque, tecla, clic), y mientras dura se desactiva el
 * overflow-anchor del navegador, que también mueve el scroll por su cuenta.
 *
 * Si el id no existe, no hace nada. Los temporizadores y listeners se limpian al desmontar o al cambiar el hash.
 */
export function useScrollToHash() {
  const { hash } = useLocation();
  const isFirstRun = useRef(true);

  useEffect(() => {
    const delay = isFirstRun.current ? PAGE_TRANSITION_MS + 100 : 0;
    isFirstRun.current = false;
    if (!hash) return;

    let id = hash.slice(1);
    try {
      id = decodeURIComponent(id);
    } catch {
      // hash mal codificado: se usa tal cual
    }
    if (!id) return;

    const root = document.documentElement;
    const interactionEvents = ["wheel", "touchstart", "keydown", "pointerdown"] as const;
    let settleTimer: number | undefined;
    let watchTimer: number | undefined;
    let watching = false;

    const stopWatching = () => {
      if (!watching) return;
      watching = false;
      window.clearInterval(watchTimer);
      window.clearTimeout(settleTimer);
      root.style.overflowAnchor = "";
      interactionEvents.forEach((e) => window.removeEventListener(e, stopWatching));
    };

    const jump = () => {
      const el = document.getElementById(id);
      el?.scrollIntoView({ block: "start", behavior: "instant" });
      return el;
    };

    const startTimer = window.setTimeout(() => {
      const el = jump();
      if (!el) return;

      let expectedTop = el.getBoundingClientRect().top;
      watching = true;
      root.style.overflowAnchor = "none";
      interactionEvents.forEach((e) => window.addEventListener(e, stopWatching, { passive: true }));
      watchTimer = window.setInterval(() => {
        const current = document.getElementById(id);
        if (!current) return;
        if (Math.abs(current.getBoundingClientRect().top - expectedTop) > 2) {
          jump();
          expectedTop = current.getBoundingClientRect().top;
        }
      }, 100);
      settleTimer = window.setTimeout(stopWatching, SETTLE_MS);
    }, delay);

    return () => {
      window.clearTimeout(startTimer);
      stopWatching();
    };
  }, [hash]);
}
