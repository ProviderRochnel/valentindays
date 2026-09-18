import { render, type RenderOptions } from "@testing-library/react";
import type { ReactElement } from "react";
import { Providers } from "./Providers";

/** Monte un composant avec la langue, l'état partagé et le routeur du service. */
export function renderWithProviders(ui: ReactElement, options?: Omit<RenderOptions, "wrapper">) {
  return render(ui, { wrapper: Providers, ...options });
}
