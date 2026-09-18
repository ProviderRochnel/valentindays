import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ROUTES } from "@/app/routes";
import { AppLayout } from "@/components/layout/AppLayout";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ServiceProvider } from "@/state/ServiceProvider";
import DispositifPage from "@/pages/DispositifPage";
import HomePage from "@/pages/HomePage";
import NotFoundPage from "@/pages/NotFoundPage";
import PartnersPage from "@/pages/PartnersPage";
import StaffPage from "@/pages/StaffPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <ServiceProvider>
        <TooltipProvider>
          <Sonner position="bottom-center" />
          <BrowserRouter>
            <Routes>
              <Route element={<AppLayout />}>
                <Route path={ROUTES.home} element={<HomePage />} />
                <Route path={ROUTES.dispositif} element={<DispositifPage />} />
                <Route path={ROUTES.partners} element={<PartnersPage />} />
                <Route path={ROUTES.staff} element={<StaffPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ServiceProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
