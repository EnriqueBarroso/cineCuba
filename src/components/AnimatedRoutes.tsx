import { useLocation, useRoutes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { routes } from "../routes";

export const AnimatedRoutes = () => {
  const location = useLocation();
  const element = useRoutes(routes, location);

  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        {element}
      </div>
    </AnimatePresence>
  );
};
