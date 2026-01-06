import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AdminProvider } from "@/contexts/AdminContext";
import Index from "./pages/Index";
import QuienesSomos from "./pages/QuienesSomos";
import Eventos from "./pages/Eventos";
import Resultados from "./pages/Resultados";
import Galeria from "./pages/Galeria";
import Ruta5 from "./pages/Ruta5";
import Ruta10 from "./pages/Ruta10";
import Ruta from "./pages/Ruta";
import Turismo from "./pages/Turismo";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <AdminProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/quienes-somos" element={<QuienesSomos />} />
              <Route path="/eventos" element={<Eventos />} />
              <Route path="/resultados" element={<Resultados />} />
              <Route path="/galeria" element={<Galeria />} />
              <Route path="/ruta5" element={<Ruta5 />} />
              <Route path="/ruta10" element={<Ruta10 />} />
              <Route path="/ruta" element={<Ruta />} />
              <Route path="/turismo" element={<Turismo />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AdminProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
