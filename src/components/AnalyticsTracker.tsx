import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

const TRACKING_ID = "G-VJM0JV4WCX"; // ⚠️ AQUÍ PEGARÁS TU ID LUEGO

export const AnalyticsTracker = () => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);

  // 1. Inicializar GA una sola vez al cargar la web
  useEffect(() => {
    if (!window.location.href.includes("localhost")) {
      ReactGA.initialize(TRACKING_ID);
      setInitialized(true);
      console.log("GA Inicializado");
    } else {
      console.log("GA: Modo Local (No rastreando para no ensuciar datos)");
    }
  }, []);

  // 2. Rastrear cada cambio de ruta
  useEffect(() => {
    if (initialized) {
      ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }
  }, [initialized, location]);

  return null; // Este componente no renderiza nada visual
};