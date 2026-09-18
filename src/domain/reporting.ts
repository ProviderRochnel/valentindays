import { PRIORITIES } from "./referentials";
import type {
  CaseFile,
  CaseStage,
  IntakeChannelCode,
  NewCaseInput,
  PriorityCode,
} from "./types";

/**
 * Alphabet sans caractères ambigus (ni 0/O, ni 1/I/L, ni 2/Z, ni 5/S, ni 8/B) :
 * le code est souvent recopié à la main ou dicté par téléphone.
 */
const CODE_ALPHABET = "ACDEFGHJKMNPQRTUVWXY34679";
const CODE_HALF_LENGTH = 3;

export const TRACKING_CODE_LENGTH = CODE_HALF_LENGTH * 2;

/** Génère un code de suivi de la forme `K4P-92Q`. */
export function generateTrackingCode(random: () => number = Math.random): string {
  let code = "";
  for (let index = 0; index < TRACKING_CODE_LENGTH; index += 1) {
    code += CODE_ALPHABET[Math.floor(random() * CODE_ALPHABET.length)];
    if (index === CODE_HALF_LENGTH - 1) {
      code += "-";
    }
  }
  return code;
}

/**
 * Met en forme la saisie de l'usager : majuscules, espaces retirés et tiret
 * replacé au milieu. Retourne `null` si le code ne peut pas être reconnu.
 */
export function normalizeTrackingCode(raw: string): string | null {
  const cleaned = raw.trim().toUpperCase().replace(/[\s-]/g, "");
  if (!new RegExp(`^[A-Z0-9]{${TRACKING_CODE_LENGTH}}$`).test(cleaned)) {
    return null;
  }
  return `${cleaned.slice(0, CODE_HALF_LENGTH)}-${cleaned.slice(CODE_HALF_LENGTH)}`;
}

export function isValidTrackingCode(raw: string): boolean {
  return normalizeTrackingCode(raw) !== null;
}

/** Réponse de l'usager aux questions « danger » et « enfant ». */
export type TriState = "yes" | "no" | "unknown";

/**
 * Priorité *suggérée* à l'agent. Elle n'est jamais appliquée automatiquement :
 * un agent la confirme toujours avant tout traitement.
 */
export function suggestPriority(input: {
  dangerNow: TriState;
  childInvolved: TriState;
}): PriorityCode {
  if (input.dangerNow === "yes") return "crit";
  if (input.childInvolved === "yes") return "high";
  if (input.dangerNow === "unknown") return "high";
  return "mod";
}

export function priorityGauge(priority: PriorityCode): number {
  return PRIORITIES[priority].gauge;
}

/** Mode de signalement choisi à la première étape du formulaire public. */
export type ReporterMode = "anon" | "conf" | "third";

export function channelForReporterMode(mode: ReporterMode): IntakeChannelCode {
  switch (mode) {
    case "anon":
      return "web_anon";
    case "third":
      return "web_third";
    default:
      return "web_id";
  }
}

const CASE_REFERENCE_PREFIX = "PC";

/** Référence interne d'un dossier, de la forme `PC-2026-004821`. */
export function buildCaseReference(year: number, sequence: number): string {
  return `${CASE_REFERENCE_PREFIX}-${year}-${String(sequence).padStart(6, "0")}`;
}

export function formatClock(date: Date = new Date()): string {
  return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

/** Construit un dossier neuf, prêt à être placé en tête de la file d'attente. */
export function createCaseFile(
  input: NewCaseInput,
  options: { reference: string; now?: Date },
): CaseFile {
  const time = formatClock(options.now ?? new Date());
  const riskFactors =
    input.riskFactors ??
    (input.childInvolved
      ? [{ fr: "Enfant concerné", en: "Child involved" }]
      : [{ fr: "À évaluer", en: "To be assessed" }]);

  return {
    reference: options.reference,
    priority: input.priority,
    channel: input.channel,
    violenceType: input.violenceType,
    region: input.region,
    childInvolved: input.childInvolved,
    receivedMinutesAgo: 0,
    receivedAt: time,
    stage: 0,
    owner: input.owner ?? null,
    riskFactors,
    nextAction: {
      label: { fr: "Examiner la demande", en: "Review the request" },
      due: { fr: "Aujourd’hui", en: "Today" },
    },
    attachments: input.attachments ?? 0,
    history: [],
  };
}

/** Étape suivante d'un dossier, bornée à la dernière étape du parcours. */
export function nextStage(stage: CaseStage): CaseStage {
  return Math.min(stage + 1, 5) as CaseStage;
}

/**
 * Horodatage bilingue d'un compte rendu, au format court des deux langues
 * officielles (ex. « 17 sept., 11:45 » / « 17 Sept, 11:45 »).
 */
export function formatStamp(date: Date = new Date()): { fr: string; en: string } {
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  };
  return {
    fr: new Intl.DateTimeFormat("fr-FR", options).format(date),
    en: new Intl.DateTimeFormat("en-GB", options).format(date),
  };
}
