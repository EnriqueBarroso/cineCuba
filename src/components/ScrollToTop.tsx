import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Al cambiar de ruta, sube al inicio instantáneamente (o suave si prefieres 'smooth')
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant", // Usamos 'instant' para que parezca una carga de página nueva real
    });
  }, [pathname]);

  return null;
}