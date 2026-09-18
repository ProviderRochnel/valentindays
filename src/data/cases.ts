import { INTAKE_CHANNELS } from "@/domain/referentials";
import type { CaseFile } from "@/domain/types";

/**
 * Jeu de dossiers de démonstration de l'espace agents.
 * Il remplacera l'appel à l'API de gestion des dossiers du MINPROFF.
 */
type CaseSeed = Omit<CaseFile, "history">;

const CASE_SEEDS: readonly CaseSeed[] = [
  {
    reference: "PC-2026-004821",
    priority: "crit",
    channel: "web_anon",
    violenceType: "phys",
    region: "centre",
    childInvolved: true,
    receivedMinutesAgo: 12,
    receivedAt: "14:02",
    stage: 0,
    owner: null,
    riskFactors: [
      { fr: "Danger signalé comme possible ce soir", en: "Danger reported as possible tonight" },
      { fr: "Enfants présents au domicile", en: "Children present in the home" },
      { fr: "Faits répétés selon le déclarant", en: "Repeated incidents according to the reporter" },
    ],
    nextAction: {
      label: {
        fr: "Valider et alerter le service social de permanence",
        en: "Confirm and alert the on-call social service",
      },
      due: { fr: "Aujourd’hui, 15 h 00", en: "Today, 3:00 pm" },
    },
    attachments: 1,
  },
  {
    reference: "PC-2026-004818",
    priority: "high",
    channel: "line",
    violenceType: "conj",
    region: "littoral",
    childInvolved: false,
    receivedMinutesAgo: 38,
    receivedAt: "13:36",
    stage: 1,
    owner: "J. Ngo Bassa",
    riskFactors: [
      { fr: "Menaces répétées", en: "Repeated threats" },
      { fr: "Dépendance financière exprimée", en: "Financial dependence expressed" },
    ],
    nextAction: {
      label: { fr: "Proposer une mise en sécurité temporaire", en: "Offer temporary shelter" },
      due: { fr: "Aujourd’hui, 17 h 00", en: "Today, 5:00 pm" },
    },
    attachments: 0,
  },
  {
    reference: "PC-2026-004815",
    priority: "high",
    channel: "code",
    violenceType: "marr",
    region: "extreme-nord",
    childInvolved: true,
    receivedMinutesAgo: 65,
    receivedAt: "13:09",
    stage: 0,
    owner: null,
    riskFactors: [
      { fr: "Mineure concernée", en: "A minor is involved" },
      { fr: "Date annoncée dans moins de 15 jours", en: "Date announced within 15 days" },
    ],
    nextAction: {
      label: {
        fr: "Faire rappeler la personne par un écoutant",
        en: "Have a counsellor call the person back",
      },
      due: { fr: "Aujourd’hui, 16 h 00", en: "Today, 4:00 pm" },
    },
    attachments: 0,
  },
  {
    reference: "PC-2026-004809",
    priority: "mod",
    channel: "app",
    violenceType: "psy",
    region: "ouest",
    childInvolved: false,
    receivedMinutesAgo: 120,
    receivedAt: "12:14",
    stage: 2,
    owner: "P. Fotso",
    riskFactors: [{ fr: "Pas de danger immédiat signalé", en: "No immediate danger reported" }],
    nextAction: {
      label: { fr: "Attendre la confirmation du partenaire", en: "Wait for the partner’s confirmation" },
      due: { fr: "18 sept., 10 h 00", en: "18 Sept, 10:00 am" },
    },
    attachments: 0,
  },
  {
    reference: "PC-2026-004802",
    priority: "mod",
    channel: "sms",
    violenceType: "eco",
    region: "nord",
    childInvolved: false,
    receivedMinutesAgo: 180,
    receivedAt: "11:20",
    stage: 1,
    owner: "H. Abdou",
    riskFactors: [{ fr: "Privation de ressources exprimée", en: "Deprivation of resources expressed" }],
    nextAction: {
      label: { fr: "Orienter vers l’aide juridique", en: "Refer to legal aid" },
      due: { fr: "18 sept., 09 h 00", en: "18 Sept, 9:00 am" },
    },
    attachments: 0,
  },
  {
    reference: "PC-2026-004797",
    priority: "low",
    channel: "web_id",
    violenceType: "info",
    region: "sud",
    childInvolved: false,
    receivedMinutesAgo: 300,
    receivedAt: "09:31",
    stage: 5,
    owner: "C. Essomba",
    riskFactors: [{ fr: "Aucun signe de danger", en: "No sign of danger" }],
    nextAction: {
      label: { fr: "Valider la clôture", en: "Confirm the closure" },
      due: { fr: "Aujourd’hui, 18 h 00", en: "Today, 6:00 pm" },
    },
    attachments: 0,
  },
  {
    reference: "PC-2026-004790",
    priority: "high",
    channel: "web_third",
    violenceType: "neg",
    region: "est",
    childInvolved: true,
    receivedMinutesAgo: 360,
    receivedAt: "08:12",
    stage: 2,
    owner: "P. Fotso",
    riskFactors: [
      { fr: "Enfant de moins de 5 ans", en: "Child under 5" },
      { fr: "Signalé par un voisin", en: "Reported by a neighbour" },
    ],
    nextAction: {
      label: { fr: "Obtenir la réponse du centre d’accueil", en: "Get the shelter’s answer" },
      due: { fr: "Aujourd’hui, 14 h 30", en: "Today, 2:30 pm" },
    },
    attachments: 1,
  },
  {
    reference: "PC-2026-004781",
    priority: "crit",
    channel: "line",
    violenceType: "sex",
    region: "nord-ouest",
    childInvolved: true,
    receivedMinutesAgo: 420,
    receivedAt: "07:05",
    stage: 3,
    owner: "R. Tanyi",
    riskFactors: [
      { fr: "Mineure concernée", en: "A minor is involved" },
      { fr: "Besoin de soins", en: "Care needed" },
      { fr: "Auteur présumé dans l’entourage", en: "Alleged perpetrator in close circle" },
    ],
    nextAction: {
      label: { fr: "Recevoir le compte rendu de l’hôpital", en: "Receive the hospital’s report" },
      due: { fr: "Aujourd’hui, 16 h 00", en: "Today, 4:00 pm" },
    },
    attachments: 2,
  },
];

/**
 * Reconstitue l'historique d'ouverture d'un dossier : réception, priorité
 * suggérée, puis attribution éventuelle à un agent.
 */
function buildInitialHistory(seed: CaseSeed): CaseFile["history"] {
  const channel = INTAKE_CHANNELS[seed.channel];
  const history: CaseFile["history"] = [
    {
      time: seed.receivedAt,
      label: {
        fr: `Demande reçue · ${channel.fr}`,
        en: `Request received · ${channel.en}`,
      },
    },
    {
      time: seed.receivedAt,
      label: {
        fr: "Priorité suggérée · à confirmer par un agent",
        en: "Suggested priority · to be confirmed by an officer",
      },
    },
  ];

  if (seed.owner) {
    history.push({
      time: seed.receivedAt,
      label: { fr: `Confié à ${seed.owner}`, en: `Assigned to ${seed.owner}` },
    });
  }

  return history;
}

export function loadInitialCases(): CaseFile[] {
  return CASE_SEEDS.map((seed) => ({ ...seed, history: buildInitialHistory(seed) }));
}

/** Numéro de la prochaine référence à attribuer. */
export const NEXT_CASE_SEQUENCE = 4822;
export const CURRENT_CASE_YEAR = 2026;
