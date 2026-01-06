import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
// Borramos AuthProvider porque ya no usamos login
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { AnalyticsTracker } from "./components/AnalyticsTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      {/* <AuthProvider>  <-- Lo quitamos */}
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnalyticsTracker /> {/* ✅ Perfecto: Está dentro del Router */}
          <ScrollToTop />
          <AnimatedRoutes />
        </BrowserRouter>
      {/* </AuthProvider> */}
    </TooltipProvider>
  </QueryClientProvider>
);

export default App; 