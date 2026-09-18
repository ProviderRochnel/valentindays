import { VIOLENCE_TYPES } from "@/domain/referentials";
import type { DistributionSlice, MonthlyPoint, RegionStatistics } from "@/domain/types";

/** Signalements reçus mois par mois, sur les douze derniers mois. */
export const MONTHLY_REPORTS: readonly MonthlyPoint[] = [
  { label: { fr: "oct. 2025", en: "Oct 2025" }, short: { fr: "oct.", en: "Oct" }, reports: 980 },
  { label: { fr: "nov. 2025", en: "Nov 2025" }, short: { fr: "nov.", en: "Nov" }, reports: 1040 },
  { label: { fr: "déc. 2025", en: "Dec 2025" }, short: { fr: "déc.", en: "Dec" }, reports: 1010 },
  { label: { fr: "janv. 2026", en: "Jan 2026" }, short: { fr: "janv.", en: "Jan" }, reports: 1120 },
  { label: { fr: "févr. 2026", en: "Feb 2026" }, short: { fr: "févr.", en: "Feb" }, reports: 1085 },
  { label: { fr: "mars 2026", en: "Mar 2026" }, short: { fr: "mars", en: "Mar" }, reports: 1190 },
  { label: { fr: "avr. 2026", en: "Apr 2026" }, short: { fr: "avr.", en: "Apr" }, reports: 1230 },
  { label: { fr: "mai 2026", en: "May 2026" }, short: { fr: "mai", en: "May" }, reports: 1175 },
  { label: { fr: "juin 2026", en: "Jun 2026" }, short: { fr: "juin", en: "Jun" }, reports: 1260 },
  { label: { fr: "juil. 2026", en: "Jul 2026" }, short: { fr: "juil.", en: "Jul" }, reports: 1310 },
  { label: { fr: "août 2026", en: "Aug 2026" }, short: { fr: "août", en: "Aug" }, reports: 1290 },
  { label: { fr: "sept. 2026", en: "Sep 2026" }, short: { fr: "sept.", en: "Sep" }, reports: 1392 },
];

/**
 * Indicateurs par région. `mapPosition` place la région sur la carte
 * simplifiée (grille 4 colonnes × 5 lignes) qui respecte approximativement la
 * géographie nationale sans jamais localiser une personne.
 */
export const REGION_STATISTICS: readonly RegionStatistics[] = [
  { region: "centre", share: 0.212, firstReviewHours: 2.1, followedUpRate: 81, waitingOverThreeDays: 4, childRate: 27, mapPosition: { row: 4, column: 3 } },
  { region: "littoral", share: 0.193, firstReviewHours: 2.6, followedUpRate: 78, waitingOverThreeDays: 5, childRate: 24, mapPosition: { row: 5, column: 2 } },
  { region: "extreme-nord", share: 0.118, firstReviewHours: 5.8, followedUpRate: 62, waitingOverThreeDays: 9, childRate: 41, mapPosition: { row: 1, column: 3 } },
  { region: "ouest", share: 0.101, firstReviewHours: 3.0, followedUpRate: 76, waitingOverThreeDays: 2, childRate: 26, mapPosition: { row: 4, column: 2 } },
  { region: "nord", share: 0.077, firstReviewHours: 4.9, followedUpRate: 64, waitingOverThreeDays: 6, childRate: 37, mapPosition: { row: 2, column: 3 } },
  { region: "est", share: 0.066, firstReviewHours: 5.2, followedUpRate: 60, waitingOverThreeDays: 5, childRate: 33, mapPosition: { row: 4, column: 4 } },
  { region: "nord-ouest", share: 0.064, firstReviewHours: 4.4, followedUpRate: 66, waitingOverThreeDays: 4, childRate: 29, mapPosition: { row: 3, column: 1 } },
  { region: "sud-ouest", share: 0.06, firstReviewHours: 4.1, followedUpRate: 68, waitingOverThreeDays: 3, childRate: 25, mapPosition: { row: 4, column: 1 } },
  { region: "adamaoua", share: 0.058, firstReviewHours: 5.5, followedUpRate: 58, waitingOverThreeDays: 4, childRate: 35, mapPosition: { row: 3, column: 3 } },
  { region: "sud", share: 0.051, firstReviewHours: 3.4, followedUpRate: 73, waitingOverThreeDays: 1, childRate: 22, mapPosition: { row: 5, column: 3 } },
];

/** Répartition des signalements par type de situation. */
export const TYPE_DISTRIBUTION: readonly DistributionSlice[] = [
  { label: VIOLENCE_TYPES.phys, share: 0.31 },
  { label: VIOLENCE_TYPES.psy, share: 0.22 },
  { label: VIOLENCE_TYPES.eco, share: 0.14 },
  { label: VIOLENCE_TYPES.sex, share: 0.11 },
  { label: VIOLENCE_TYPES.neg, share: 0.09 },
  { label: VIOLENCE_TYPES.marr, share: 0.07 },
  { label: { fr: "Autres situations", en: "Other situations" }, share: 0.06 },
];

/** Répartition des signalements par porte d'entrée. */
export const CHANNEL_DISTRIBUTION: readonly DistributionSlice[] = [
  { label: { fr: "Site internet", en: "Website" }, share: 0.34 },
  { label: { fr: "Application mobile", en: "Mobile app" }, share: 0.27 },
  { label: { fr: "Ligne verte 116", en: "116 green line" }, share: 0.18 },
  { label: { fr: "Code court", en: "Short code" }, share: 0.13 },
  { label: { fr: "SMS", en: "Text message" }, share: 0.08 },
];

/** Bornes de l'échelle séquentielle utilisée par la carte. */
export const SHARE_SCALE = [
  { max: 0.06, step: 1, label: { fr: "moins de 6 %", en: "under 6%" } },
  { max: 0.08, step: 2, label: { fr: "6 – 8 %", en: "6 – 8%" } },
  { max: 0.11, step: 3, label: { fr: "8 – 11 %", en: "8 – 11%" } },
  { max: 0.16, step: 4, label: { fr: "11 – 16 %", en: "11 – 16%" } },
  { max: Infinity, step: 5, label: { fr: "16 % et plus", en: "16% and over" } },
] as const;

export function shareScaleStep(share: number): number {
  return SHARE_SCALE.find((bucket) => share < bucket.max)?.step ?? 5;
}

/** Moyenne nationale d'un indicateur, pondérée par le poids de chaque région. */
export function weightedAverage(
  selector: (statistics: RegionStatistics) => number,
): number {
  return REGION_STATISTICS.reduce(
    (total, statistics) => total + selector(statistics) * statistics.share,
    0,
  );
}

/** Dossiers critiques ouverts au niveau national, à ce jour. */
export const OPEN_CRITICAL_CASES = 37;
