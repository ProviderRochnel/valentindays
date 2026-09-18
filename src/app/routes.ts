import type { Bilingual } from "@/domain/types";

/** Adresses publiques du service, en français (langue de référence des URL). */
export const ROUTES = {
  home: "/",
  dispositif: "/dispositif",
  partners: "/espace-partenaires",
  staff: "/espace-minproff",
} as const;

export interface NavigationEntry {
  to: string;
  label: Bilingual;
  /** Sous-titre affiché sous la marque lorsque l'espace est ouvert. */
  brandSubtitle?: Bilingual;
  /** Les pages publiques proposent la sortie rapide. */
  publicFacing: boolean;
}

export const NAVIGATION: readonly NavigationEntry[] = [
  { to: ROUTES.home, label: { fr: "Accueil", en: "Home" }, publicFacing: true },
  {
    to: ROUTES.dispositif,
    label: { fr: "Le dispositif", en: "How it works" },
    publicFacing: true,
  },
  {
    to: ROUTES.partners,
    label: { fr: "Espace partenaires", en: "Partners area" },
    brandSubtitle: {
      fr: "Espace professionnels et partenaires",
      en: "Professionals and partners area",
    },
    publicFacing: false,
  },
  {
    to: ROUTES.staff,
    label: { fr: "Espace MINPROFF", en: "MINPROFF area" },
    brandSubtitle: { fr: "Espace agents du MINPROFF", en: "MINPROFF staff area" },
    publicFacing: false,
  },
];

export const DEFAULT_BRAND_SUBTITLE: Bilingual = {
  fr: "République du Cameroun · MINPROFF",
  en: "Republic of Cameroon · MINPROFF",
};

export function navigationEntryFor(pathname: string): NavigationEntry | undefined {
  return NAVIGATION.find((entry) => entry.to === pathname);
}
