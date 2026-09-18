/**
 * Types du domaine PROTECT-CAMEROUN.
 *
 * Cette couche ne dépend ni de React ni de Tailwind : elle décrit uniquement
 * le vocabulaire métier du dispositif de signalement du MINPROFF.
 */

export type Locale = "fr" | "en";

/** Toute chaîne affichée à l'usager existe en français et en anglais. */
export interface Bilingual {
  fr: string;
  en: string;
}

/* ------------------------------------------------------------------ */
/* Référentiels                                                        */
/* ------------------------------------------------------------------ */

export type RegionCode =
  | "adamaoua"
  | "centre"
  | "est"
  | "extreme-nord"
  | "littoral"
  | "nord"
  | "nord-ouest"
  | "ouest"
  | "sud"
  | "sud-ouest";

export interface Region {
  code: RegionCode;
  label: Bilingual;
  /** Chef-lieu, utilisé pour nommer la délégation régionale. */
  capital: string;
}

export type ViolenceTypeCode =
  | "phys"
  | "psy"
  | "sex"
  | "eco"
  | "conj"
  | "child"
  | "neg"
  | "marr"
  | "info"
  | "other";

/** Porte d'entrée par laquelle la demande est arrivée au Ministère. */
export type IntakeChannelCode =
  | "web_anon"
  | "web_id"
  | "web_third"
  | "line"
  | "code"
  | "sms"
  | "app"
  | "desk";

export type PriorityCode = "crit" | "high" | "mod" | "low";

export interface Priority {
  code: PriorityCode;
  label: Bilingual;
  /** Position sur la jauge de danger affichée aux agents (0-100). */
  gauge: number;
}

/** Étapes du parcours d'un dossier, du signalement à la clôture. */
export type CaseStage = 0 | 1 | 2 | 3 | 4 | 5;

/* ------------------------------------------------------------------ */
/* Dossiers                                                            */
/* ------------------------------------------------------------------ */

export interface CaseEvent {
  /** Heure au format HH:mm. */
  time: string;
  label: Bilingual;
}

export interface CaseNextAction {
  label: Bilingual;
  due: Bilingual;
}

export interface CaseFile {
  reference: string;
  priority: PriorityCode;
  channel: IntakeChannelCode;
  violenceType: ViolenceTypeCode;
  region: RegionCode;
  childInvolved: boolean;
  /** Ancienneté de la réception, en minutes. */
  receivedMinutesAgo: number;
  receivedAt: string;
  stage: CaseStage;
  owner: string | null;
  /** Éléments justifiant la priorité suggérée. */
  riskFactors: Bilingual[];
  nextAction: CaseNextAction;
  attachments: number;
  history: CaseEvent[];
}

/** Données minimales nécessaires pour ouvrir un dossier. */
export interface NewCaseInput {
  priority: PriorityCode;
  channel: IntakeChannelCode;
  violenceType: ViolenceTypeCode;
  region: RegionCode;
  childInvolved: boolean;
  owner?: string | null;
  attachments?: number;
  riskFactors?: Bilingual[];
}

/* ------------------------------------------------------------------ */
/* Orientations vers les structures partenaires                        */
/* ------------------------------------------------------------------ */

export type PartnerKind = "shelter" | "hospital" | "legal";

export type ReferralStatus = "wait" | "ok" | "more" | "done";

export interface ReferralReport {
  at: Bilingual;
  author: Bilingual;
  message: Bilingual;
}

export interface SharedField {
  label: Bilingual;
  value: Bilingual;
}

export interface Referral {
  reference: string;
  partnerKind: PartnerKind;
  sentBy: Bilingual;
  caseReference: string;
  need: Bilingual;
  priority: PriorityCode;
  partner: Bilingual;
  sentAt: Bilingual;
  status: ReferralStatus;
  /** Strictement limité à ce dont la structure a besoin pour aider. */
  sharedInfo: SharedField[];
  reports: ReferralReport[];
}

/* ------------------------------------------------------------------ */
/* Rendez-vous des partenaires                                         */
/* ------------------------------------------------------------------ */

export type AppointmentStatus = "ok" | "wait" | "moved";

export interface Appointment {
  id: string;
  when: Bilingual;
  person: Bilingual;
  purpose: Bilingual;
  staff: string;
  status: AppointmentStatus;
}

/* ------------------------------------------------------------------ */
/* Statistiques publiques                                              */
/* ------------------------------------------------------------------ */

export interface MonthlyPoint {
  label: Bilingual;
  short: Bilingual;
  reports: number;
}

export interface RegionStatistics {
  region: RegionCode;
  /** Part des signalements nationaux (0-1). */
  share: number;
  firstReviewHours: number;
  followedUpRate: number;
  waitingOverThreeDays: number;
  childRate: number;
  /** Position dans la carte simplifiée (grille 4 colonnes x 5 lignes). */
  mapPosition: { row: number; column: number };
}

export interface DistributionSlice {
  label: Bilingual;
  share: number;
}
