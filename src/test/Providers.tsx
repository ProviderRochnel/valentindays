import type { ReactNode } from "react";
import { MemoryRouter } from "react-router-dom";
import { LanguageProvider } from "@/i18n/LanguageProvider";
import { ServiceProvider } from "@/state/ServiceProvider";

/** Fournisseurs communs aux tests de composants. */
export function Providers({ children }: { children: ReactNode }) {
  return (
    <LanguageProvider>
      <ServiceProvider>
        <MemoryRouter>{children}</MemoryRouter>
      </ServiceProvider>
    </LanguageProvider>
  );
}
