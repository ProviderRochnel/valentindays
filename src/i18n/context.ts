import { createContext } from "react";
import type { Bilingual, Locale } from "@/domain/types";

export interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  /** Sélectionne la variante correspondant à la langue active. */
  t: (value: Bilingual) => string;
  /** Formate un entier selon les conventions de la langue active. */
  formatNumber: (value: number) => string;
  /** Formate un nombre décimal (1 décimale par défaut). */
  formatDecimal: (value: number, fractionDigits?: number) => string;
}

export const I18nContext = createContext<I18nContextValue | null>(null);

export const LOCALE_STORAGE_KEY = "protect-cameroun.locale";

export function resolveLocale(value: string | null | undefined): Locale {
  return value === "en" ? "en" : "fr";
}

export function intlLocale(locale: Locale): string {
  return locale === "en" ? "en-GB" : "fr-FR";
}
