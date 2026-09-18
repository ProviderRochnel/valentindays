import type { Appointment, Referral } from "@/domain/types";

/**
 * Orientations envoyées par les agents du MINPROFF vers les structures
 * partenaires. Chaque orientation ne porte que les informations strictement
 * nécessaires à la prise en charge.
 */
const REFERRALS: readonly Referral[] = [
  {
    reference: "OR-2026-1190",
    partnerKind: "shelter",
    sentBy: {
      fr: "P. Fotso · Délégation régionale de l’Est",
      en: "P. Fotso · East Regional Delegation",
    },
    caseReference: "PC-2026-004811",
    need: { fr: "Accompagnement d’un enfant et de sa mère", en: "Support for a child and her mother" },
    priority: "crit",
    partner: { fr: "Centre d’accueil · Bertoua", en: "Shelter · Bertoua" },
    sentAt: { fr: "17 sept., 11 h 45", en: "17 Sept, 11:45 am" },
    status: "wait",
    sharedInfo: [
      {
        label: { fr: "Personnes", en: "People" },
        value: { fr: "Mère, 25–34 ans, et fille, 6–10 ans", en: "Mother, 25–34, and daughter, 6–10" },
      },
      {
        label: { fr: "Besoin", en: "Need" },
        value: { fr: "Mise en sécurité ce soir et écoute", en: "Safe place tonight and listening support" },
      },
      { label: { fr: "Langue", en: "Language" }, value: { fr: "Français, gbaya", en: "French, Gbaya" } },
      {
        label: { fr: "Consigne", en: "Instruction" },
        value: {
          fr: "Accueil par une intervenante femme",
          en: "To be received by a female staff member",
        },
      },
    ],
    reports: [
      {
        at: { fr: "17 sept., 11 h 45", en: "17 Sept, 11:45 am" },
        author: { fr: "MINPROFF", en: "MINPROFF" },
        message: {
          fr: "Orientation urgente envoyée, réponse attendue sous 1 heure",
          en: "Urgent referral sent, reply expected within 1 hour",
        },
      },
    ],
  },
  {
    reference: "OR-2026-1187",
    partnerKind: "shelter",
    sentBy: {
      fr: "P. Fotso · Délégation régionale de l’Est",
      en: "P. Fotso · East Regional Delegation",
    },
    caseReference: "PC-2026-004790",
    need: { fr: "Mise en sécurité temporaire", en: "Temporary shelter" },
    priority: "high",
    partner: { fr: "Centre d’accueil · Bertoua", en: "Shelter · Bertoua" },
    sentAt: { fr: "17 sept., 09 h 12", en: "17 Sept, 9:12 am" },
    status: "wait",
    sharedInfo: [
      {
        label: { fr: "Personne", en: "Person" },
        value: { fr: "Adulte, 25–34 ans, avec 2 enfants", en: "Adult, 25–34, with 2 children" },
      },
      {
        label: { fr: "Besoin", en: "Need" },
        value: { fr: "Hébergement sécurisé, 7 nuits", en: "Safe accommodation, 7 nights" },
      },
      { label: { fr: "Langue", en: "Language" }, value: { fr: "Français", en: "French" } },
      {
        label: { fr: "Contact", en: "Contact" },
        value: { fr: "Uniquement par l’agent référent", en: "Only through the referring officer" },
      },
    ],
    reports: [
      {
        at: { fr: "17 sept., 09 h 12", en: "17 Sept, 9:12 am" },
        author: { fr: "MINPROFF", en: "MINPROFF" },
        message: {
          fr: "Orientation envoyée, réponse attendue sous 4 heures",
          en: "Referral sent, reply expected within 4 hours",
        },
      },
    ],
  },
  {
    reference: "OR-2026-1181",
    partnerKind: "shelter",
    sentBy: {
      fr: "H. Abdou · Délégation régionale de l’Est",
      en: "H. Abdou · East Regional Delegation",
    },
    caseReference: "PC-2026-004744",
    need: { fr: "Soutien psychologique", en: "Psychological support" },
    priority: "mod",
    partner: { fr: "Centre d’accueil · Bertoua", en: "Shelter · Bertoua" },
    sentAt: { fr: "15 sept., 16 h 40", en: "15 Sept, 4:40 pm" },
    status: "ok",
    sharedInfo: [
      {
        label: { fr: "Personne", en: "Person" },
        value: { fr: "Adolescente, 15–17 ans", en: "Teenage girl, 15–17" },
      },
      {
        label: { fr: "Besoin", en: "Need" },
        value: { fr: "Six séances de soutien", en: "Six support sessions" },
      },
      {
        label: { fr: "Langue", en: "Language" },
        value: { fr: "Français, fulfulde", en: "French, Fulfulde" },
      },
    ],
    reports: [
      {
        at: { fr: "15 sept., 16 h 40", en: "15 Sept, 4:40 pm" },
        author: { fr: "MINPROFF", en: "MINPROFF" },
        message: { fr: "Orientation envoyée", en: "Referral sent" },
      },
      {
        at: { fr: "15 sept., 18 h 05", en: "15 Sept, 6:05 pm" },
        author: { fr: "Partenaire", en: "Partner" },
        message: {
          fr: "Prise en charge confirmée, première séance le 16 sept.",
          en: "Support confirmed, first session on 16 Sept",
        },
      },
      {
        at: { fr: "16 sept., 11 h 30", en: "16 Sept, 11:30 am" },
        author: { fr: "Partenaire", en: "Partner" },
        message: {
          fr: "Séance 1 réalisée, prochaine le 19 sept.",
          en: "Session 1 done, next on 19 Sept",
        },
      },
    ],
  },
  {
    reference: "OR-2026-1174",
    partnerKind: "hospital",
    sentBy: {
      fr: "P. Fotso · Délégation régionale de l’Est",
      en: "P. Fotso · East Regional Delegation",
    },
    caseReference: "PC-2026-004701",
    need: { fr: "Consultation médicale", en: "Medical consultation" },
    priority: "crit",
    partner: { fr: "Hôpital régional · Bertoua", en: "Regional hospital · Bertoua" },
    sentAt: { fr: "14 sept., 08 h 20", en: "14 Sept, 8:20 am" },
    status: "more",
    sharedInfo: [
      { label: { fr: "Personne", en: "Person" }, value: { fr: "Enfant, 6–10 ans", en: "Child, 6–10" } },
      {
        label: { fr: "Besoin", en: "Need" },
        value: { fr: "Examen médical sous 24 heures", en: "Medical examination within 24 hours" },
      },
      {
        label: { fr: "Accompagnant", en: "Accompanied by" },
        value: { fr: "Travailleur social désigné", en: "Designated social worker" },
      },
    ],
    reports: [
      {
        at: { fr: "14 sept., 08 h 20", en: "14 Sept, 8:20 am" },
        author: { fr: "MINPROFF", en: "MINPROFF" },
        message: { fr: "Orientation envoyée", en: "Referral sent" },
      },
      {
        at: { fr: "14 sept., 09 h 00", en: "14 Sept, 9:00 am" },
        author: { fr: "Partenaire", en: "Partner" },
        message: {
          fr: "Question : un tuteur légal sera-t-il présent ?",
          en: "Question: will a legal guardian be present?",
        },
      },
    ],
  },
  {
    reference: "OR-2026-1169",
    partnerKind: "legal",
    sentBy: {
      fr: "C. Essomba · Délégation régionale de l’Est",
      en: "C. Essomba · East Regional Delegation",
    },
    caseReference: "PC-2026-004655",
    need: { fr: "Aide juridique", en: "Legal aid" },
    priority: "low",
    partner: { fr: "Clinique juridique · Bertoua", en: "Legal clinic · Bertoua" },
    sentAt: { fr: "10 sept., 10 h 00", en: "10 Sept, 10:00 am" },
    status: "done",
    sharedInfo: [
      { label: { fr: "Personne", en: "Person" }, value: { fr: "Adulte, 35–44 ans", en: "Adult, 35–44" } },
      {
        label: { fr: "Besoin", en: "Need" },
        value: { fr: "Information sur les démarches", en: "Information on procedures" },
      },
    ],
    reports: [
      {
        at: { fr: "10 sept., 10 h 00", en: "10 Sept, 10:00 am" },
        author: { fr: "MINPROFF", en: "MINPROFF" },
        message: { fr: "Orientation envoyée", en: "Referral sent" },
      },
      {
        at: { fr: "12 sept., 15 h 10", en: "12 Sept, 3:10 pm" },
        author: { fr: "Partenaire", en: "Partner" },
        message: {
          fr: "Entretien réalisé, démarches expliquées",
          en: "Meeting held, procedures explained",
        },
      },
    ],
  },
  {
    reference: "OR-2026-1152",
    partnerKind: "shelter",
    sentBy: {
      fr: "H. Abdou · Délégation régionale de l’Est",
      en: "H. Abdou · East Regional Delegation",
    },
    caseReference: "PC-2026-004598",
    need: { fr: "Mise en sécurité temporaire", en: "Temporary shelter" },
    priority: "high",
    partner: { fr: "Centre d’accueil · Bertoua", en: "Shelter · Bertoua" },
    sentAt: { fr: "2 sept., 18 h 20", en: "2 Sept, 6:20 pm" },
    status: "done",
    sharedInfo: [
      { label: { fr: "Personne", en: "Person" }, value: { fr: "Adulte, 18–24 ans", en: "Adult, 18–24" } },
      {
        label: { fr: "Besoin", en: "Need" },
        value: { fr: "Hébergement sécurisé, 5 nuits", en: "Safe accommodation, 5 nights" },
      },
    ],
    reports: [
      {
        at: { fr: "2 sept., 18 h 20", en: "2 Sept, 6:20 pm" },
        author: { fr: "MINPROFF", en: "MINPROFF" },
        message: { fr: "Orientation envoyée", en: "Referral sent" },
      },
      {
        at: { fr: "2 sept., 19 h 00", en: "2 Sept, 7:00 pm" },
        author: { fr: "Partenaire", en: "Partner" },
        message: { fr: "Prise en charge confirmée", en: "Support confirmed" },
      },
      {
        at: { fr: "8 sept., 10 h 00", en: "8 Sept, 10:00 am" },
        author: { fr: "Partenaire", en: "Partner" },
        message: {
          fr: "Hébergement terminé, relais pris par les services sociaux",
          en: "Stay completed, handed over to social services",
        },
      },
    ],
  },
];

export function loadInitialReferrals(): Referral[] {
  return REFERRALS.map((referral) => ({
    ...referral,
    sharedInfo: [...referral.sharedInfo],
    reports: [...referral.reports],
  }));
}

/** Rendez-vous planifiés par la structure partenaire connectée. */
const APPOINTMENTS: readonly Appointment[] = [
  {
    id: "rdv-1",
    when: { fr: "Jeu. 18 sept. · 09 h 00", en: "Thu 18 Sept · 9:00 am" },
    person: { fr: "Adolescente · dossier 004744", en: "Teenager · case 004744" },
    purpose: { fr: "Séance de soutien n° 2", en: "Support session no. 2" },
    staff: "Mme Fouda",
    status: "ok",
  },
  {
    id: "rdv-2",
    when: { fr: "Jeu. 18 sept. · 14 h 30", en: "Thu 18 Sept · 2:30 pm" },
    person: { fr: "Adulte · dossier 004790", en: "Adult · case 004790" },
    purpose: { fr: "Entretien d’arrivée", en: "Arrival interview" },
    staff: "M. Ngo Ndjock",
    status: "wait",
  },
  {
    id: "rdv-3",
    when: { fr: "Ven. 19 sept. · 10 h 00", en: "Fri 19 Sept · 10:00 am" },
    person: { fr: "Adolescente · dossier 004744", en: "Teenager · case 004744" },
    purpose: { fr: "Séance de soutien n° 3", en: "Support session no. 3" },
    staff: "Mme Fouda",
    status: "ok",
  },
  {
    id: "rdv-4",
    when: { fr: "Ven. 19 sept. · 15 h 00", en: "Fri 19 Sept · 3:00 pm" },
    person: { fr: "Adulte · dossier 004598", en: "Adult · case 004598" },
    purpose: {
      fr: "Point de suivi avec les services sociaux",
      en: "Follow-up with social services",
    },
    staff: "M. Ngo Ndjock",
    status: "wait",
  },
  {
    id: "rdv-5",
    when: { fr: "Lun. 22 sept. · 10 h 00", en: "Mon 22 Sept · 10:00 am" },
    person: { fr: "Adulte · dossier 004790", en: "Adult · case 004790" },
    purpose: { fr: "Accompagnement vers l’aide juridique", en: "Accompanying to legal aid" },
    staff: "Mme Fouda",
    status: "ok",
  },
];

export function loadInitialAppointments(): Appointment[] {
  return APPOINTMENTS.map((appointment) => ({ ...appointment }));
}

/** Structure partenaire connectée à l'espace partenaires de démonstration. */
export const CONNECTED_PARTNER_KIND = "shelter" as const;
export const CONNECTED_PARTNER_NAME = { fr: "Centre d’accueil", en: "Shelter" };
