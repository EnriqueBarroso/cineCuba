import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import ScrollToTop from "./components/ScrollToTop";
import { AnalyticsTracker } from "./components/AnalyticsTracker";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AnalyticsTracker />
      <ScrollToTop />
      <AnimatedRoutes />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
