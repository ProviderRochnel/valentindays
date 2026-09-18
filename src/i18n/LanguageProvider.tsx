import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Bilingual, Locale } from "@/domain/types";
import {
  I18nContext,
  LOCALE_STORAGE_KEY,
  intlLocale,
  resolveLocale,
  type I18nContextValue,
} from "./context";

function readStoredLocale(): Locale {
  try {
    return resolveLocale(window.localStorage.getItem(LOCALE_STORAGE_KEY));
  } catch {
    // Navigation privée ou stockage bloqué : le français reste la langue par défaut.
    return "fr";
  }
}

/**
 * Le service est bilingue français / anglais, les deux langues officielles de
 * la République du Cameroun. Le choix est conservé d'une visite à l'autre.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(readStoredLocale);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // Le service reste utilisable même si le stockage local est indisponible.
    }
  }, []);

  const value = useMemo<I18nContextValue>(() => {
    const tag = intlLocale(locale);
    return {
      locale,
      setLocale,
      t: (text: Bilingual) => text[locale],
      formatNumber: (input: number) => Math.round(input).toLocaleString(tag),
      formatDecimal: (input: number, fractionDigits = 1) =>
        input.toLocaleString(tag, {
          minimumFractionDigits: fractionDigits,
          maximumFractionDigits: fractionDigits,
        }),
    };
  }, [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
