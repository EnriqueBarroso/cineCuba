import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import ScrollToTop from "./ScrollToTop";
import { AnalyticsTracker } from "./AnalyticsTracker";
import { AuthProvider } from "@/hooks/useAuth";
import { Navbar } from "./Navbar";
import { isFirstPageLoad } from "./PageTransition";

const queryClient = new QueryClient();

export const AppLayout = () => {
  const location = useLocation();
  const [skipFirstEntrance] = useState(isFirstPageLoad);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <AnalyticsTracker />
          <ScrollToTop />
          {/* Fuera de AnimatePresence: el navbar es fixed y no debe quedar
              anidado en el motion.div de PageTransition, cuyo transform de
              animación crea un containing block y rompe position:fixed. */}
          <Navbar />
          {/* En la primera carga la página nace en su estado final (el HTML prerenderizado se ve sin JS y coincide
              con el primer render del cliente): initial={false} se propaga a todos los motion de la página.
              Las navegaciones posteriores montan hijos nuevos y animan como siempre. */}
          <AnimatePresence mode="wait" initial={skipFirstEntrance ? false : undefined}>
            <div key={location.pathname} style={{ display: "contents" }}>
              <Outlet />
            </div>
          </AnimatePresence>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
