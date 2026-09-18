import type { Bilingual, Region } from "@/domain/types";

/** Catégories de structures présentées dans l'annuaire d'aide régional. */
export interface HelpEntry {
  icon: string;
  title: Bilingual;
  description: Bilingual;
  /** La délégation régionale est mise en avant. */
  featured?: boolean;
}

export function buildHelpDirectory(region: Region): HelpEntry[] {
  return [
    {
      icon: "home",
      title: {
        fr: `Délégation régionale du MINPROFF · ${region.capital}`,
        en: `MINPROFF Regional Delegation · ${region.capital}`,
      },
      description: {
        fr: "Accueil, écoute et orientation des femmes, des enfants et des familles.",
        en: "Reception, listening and guidance for women, children and families.",
      },
      featured: true,
    },
    {
      icon: "users",
      title: {
        fr: "Centres de promotion de la femme et de la famille",
        en: "Women and family empowerment centres",
      },
      description: {
        fr: "Accompagnement et soutien près de chez vous, dans chaque département.",
        en: "Support close to home, in every division.",
      },
    },
    {
      icon: "child",
      title: { fr: "Services sociaux", en: "Social services" },
      description: {
        fr: "Protection de l’enfant et accompagnement des familles.",
        en: "Child protection and family support.",
      },
    },
    {
      icon: "health",
      title: { fr: "Formations sanitaires", en: "Health facilities" },
      description: {
        fr: "Soins médicaux et certificat médical si nécessaire.",
        en: "Medical care and a medical certificate if needed.",
      },
    },
    {
      icon: "scale",
      title: { fr: "Aide juridique", en: "Legal aid" },
      description: {
        fr: "Information sur vos droits et les démarches possibles.",
        en: "Information about your rights and possible steps.",
      },
    },
    {
      icon: "shield",
      title: { fr: "Mise en sécurité", en: "Emergency shelter" },
      description: {
        fr: "Hébergement temporaire, sur orientation d’un agent.",
        en: "Temporary accommodation, on referral by an officer.",
      },
    },
  ];
}

/** Jalons de mise en service du dispositif. */
export interface RolloutPhase {
  title: Bilingual;
  description: Bilingual;
  color: string;
  /** Jalon d'ouverture au public. */
  publicLaunch?: boolean;
}

export const ROLLOUT_PHASES: readonly RolloutPhase[] = [
  {
    title: { fr: "Préparer", en: "Prepare" },
    description: {
      fr: "Règles de protection, procédures du Ministère, rôles de chacun.",
      en: "Protection rules, Ministry procedures, everyone’s role.",
    },
    color: "#B9CFEA",
  },
  {
    title: { fr: "Construire les fondations", en: "Build the foundations" },
    description: {
      fr: "Mise en place sécurisée du service et des comptes des agents.",
      en: "Secure set-up of the service and officer accounts.",
    },
    color: "#7FA7D8",
  },
  {
    title: { fr: "Première mise en service", en: "First launch" },
    description: {
      fr: "Signalement, suivi des dossiers et espace MINPROFF opérationnels.",
      en: "Reporting, case follow-up and MINPROFF area in operation.",
    },
    color: "#2B5FA4",
    publicLaunch: true,
  },
  {
    title: { fr: "Ouvrir tous les accès", en: "Open all access points" },
    description: {
      fr: "Ligne verte, code court, SMS et espace des partenaires.",
      en: "Green line, short code, text messages and partner area.",
    },
    color: "#1A9E95",
  },
  {
    title: { fr: "Piloter au niveau national", en: "Steer nationally" },
    description: {
      fr: "Tableaux de bord, cartes par région et rapports réguliers.",
      en: "Dashboards, regional maps and regular reports.",
    },
    color: "#0F6F69",
  },
  {
    title: { fr: "Élargir le réseau", en: "Widen the network" },
    description: {
      fr: "Nouveaux partenaires, formation en ligne, langues locales.",
      en: "New partners, online training, local languages.",
    },
    color: "#0E2240",
  },
];
