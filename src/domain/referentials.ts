import type {
  Bilingual,
  IntakeChannelCode,
  Priority,
  PriorityCode,
  Region,
  RegionCode,
  ViolenceTypeCode,
} from "./types";

/** Les dix régions de la République du Cameroun, avec leur chef-lieu. */
export const REGIONS: readonly Region[] = [
  { code: "adamaoua", label: { fr: "Adamaoua", en: "Adamawa" }, capital: "Ngaoundéré" },
  { code: "centre", label: { fr: "Centre", en: "Centre" }, capital: "Yaoundé" },
  { code: "est", label: { fr: "Est", en: "East" }, capital: "Bertoua" },
  { code: "extreme-nord", label: { fr: "Extrême-Nord", en: "Far North" }, capital: "Maroua" },
  { code: "littoral", label: { fr: "Littoral", en: "Littoral" }, capital: "Douala" },
  { code: "nord", label: { fr: "Nord", en: "North" }, capital: "Garoua" },
  { code: "nord-ouest", label: { fr: "Nord-Ouest", en: "North-West" }, capital: "Bamenda" },
  { code: "ouest", label: { fr: "Ouest", en: "West" }, capital: "Bafoussam" },
  { code: "sud", label: { fr: "Sud", en: "South" }, capital: "Ebolowa" },
  { code: "sud-ouest", label: { fr: "Sud-Ouest", en: "South-West" }, capital: "Buea" },
] as const;

export const DEFAULT_REGION: RegionCode = "centre";

export function findRegion(code: RegionCode): Region {
  const region = REGIONS.find((item) => item.code === code);
  if (!region) {
    throw new Error(`Région inconnue : ${code}`);
  }
  return region;
}

/** Situations proposées à l'usager et aux agents. */
export const VIOLENCE_TYPES: Readonly<Record<ViolenceTypeCode, Bilingual>> = {
  phys: { fr: "Violence physique", en: "Physical violence" },
  psy: { fr: "Violence psychologique", en: "Psychological violence" },
  sex: { fr: "Violence sexuelle", en: "Sexual violence" },
  eco: { fr: "Violence économique", en: "Economic violence" },
  conj: { fr: "Violence conjugale", en: "Domestic violence" },
  child: { fr: "Violence envers un enfant", en: "Violence against a child" },
  neg: { fr: "Négligence d’un enfant", en: "Child neglect" },
  marr: { fr: "Mariage précoce ou forcé", en: "Early or forced marriage" },
  info: { fr: "Demande d’information", en: "Information request" },
  other: { fr: "Autre situation", en: "Other situation" },
};

/** Sous-ensemble proposé dans le formulaire public, volontairement court. */
export const PUBLIC_VIOLENCE_TYPES: readonly ViolenceTypeCode[] = [
  "phys",
  "psy",
  "sex",
  "eco",
  "child",
  "marr",
  "other",
];

export const INTAKE_CHANNELS: Readonly<Record<IntakeChannelCode, Bilingual>> = {
  web_anon: { fr: "Site internet · anonyme", en: "Website · anonymous" },
  web_id: { fr: "Site internet · identifié", en: "Website · identified" },
  web_third: { fr: "Site internet · pour un tiers", en: "Website · on behalf of someone" },
  line: { fr: "Ligne verte 116", en: "116 green line" },
  code: { fr: "Code court", en: "Short code" },
  sms: { fr: "SMS", en: "Text message" },
  app: { fr: "Application mobile", en: "Mobile app" },
  desk: { fr: "Accueil sur place", en: "In person" },
};

export const PRIORITIES: Readonly<Record<PriorityCode, Priority>> = {
  crit: { code: "crit", label: { fr: "Critique", en: "Critical" }, gauge: 92 },
  high: { code: "high", label: { fr: "Élevée", en: "High" }, gauge: 68 },
  mod: { code: "mod", label: { fr: "Modérée", en: "Moderate" }, gauge: 44 },
  low: { code: "low", label: { fr: "Faible", en: "Low" }, gauge: 18 },
};

export const PRIORITY_ORDER: readonly PriorityCode[] = ["crit", "high", "mod", "low"];

/** Les six étapes du parcours d'un dossier, dans l'ordre. */
export const CASE_STAGES: readonly Bilingual[] = [
  { fr: "Signalement", en: "Report" },
  { fr: "Évaluation", en: "Assessment" },
  { fr: "Orientation", en: "Referral" },
  { fr: "Prise en charge", en: "Support" },
  { fr: "Suivi", en: "Follow-up" },
  { fr: "Clôture", en: "Closure" },
];

/** Statut affiché pour chaque étape. */
export const CASE_STATUSES: readonly Bilingual[] = [
  { fr: "Nouveau", en: "New" },
  { fr: "En évaluation", en: "Being assessed" },
  { fr: "Orienté", en: "Referred" },
  { fr: "Pris en charge", en: "In support" },
  { fr: "En suivi", en: "Follow-up" },
  { fr: "Clôture proposée", en: "Closure proposed" },
];

/** Action attendue de l'agent à chaque étape. */
export const CASE_ACTIONS: readonly Bilingual[] = [
  { fr: "Valider et évaluer", en: "Confirm and assess" },
  { fr: "Orienter vers un partenaire", en: "Refer to a partner" },
  { fr: "Confirmer la prise en charge", en: "Confirm support" },
  { fr: "Planifier le suivi", en: "Plan follow-up" },
  { fr: "Proposer la clôture", en: "Propose closure" },
  { fr: "Clôturer le dossier", en: "Close the case" },
];

/** Numéros d'urgence nationaux. */
export const EMERGENCY_NUMBERS = [
  { number: "117", label: { fr: "Police", en: "Police" } },
  { number: "113", label: { fr: "Gendarmerie", en: "Gendarmerie" } },
  { number: "118", label: { fr: "Pompiers", en: "Fire brigade" } },
  { number: "119", label: { fr: "SAMU", en: "Ambulance (SAMU)" } },
] as const;

export const GREEN_LINE = "116";
