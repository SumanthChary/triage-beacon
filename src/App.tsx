import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import LandingPage from "./pages/LandingPage";
import SymptomInputPage from "./pages/SymptomInputPage";
import AIProcessingPage from "./pages/AIProcessingPage";
import ResultsPage from "./pages/ResultsPage";
import PriorityPage from "./pages/PriorityPage";
import DashboardPage from "./pages/DashboardPage";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/triage/new" element={<SymptomInputPage />} />
          <Route path="/triage/processing" element={<AIProcessingPage />} />
          <Route path="/triage/results" element={<ResultsPage />} />
          <Route path="/triage/priority" element={<PriorityPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
