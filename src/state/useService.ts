import { useContext } from "react";
import { ServiceContext, type ServiceContextValue } from "./context";

/** Accès à l'état partagé des dossiers et des orientations. */
export function useService(): ServiceContextValue {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error("useService doit être utilisé à l’intérieur de <ServiceProvider>.");
  }
  return context;
}
