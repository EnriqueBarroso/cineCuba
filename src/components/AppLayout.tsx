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

const queryClient = new QueryClient();

export const AppLayout = () => {
  const location = useLocation();

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
          <AnimatePresence mode="wait">
            <div key={location.pathname} style={{ display: "contents" }}>
              <Outlet />
            </div>
          </AnimatePresence>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
