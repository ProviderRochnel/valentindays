import { useContext } from "react";
import { I18nContext, type I18nContextValue } from "./context";

/** Accès à la langue active et aux utilitaires de formatage. */
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n doit être utilisé à l’intérieur de <LanguageProvider>.");
  }
  return context;
}
