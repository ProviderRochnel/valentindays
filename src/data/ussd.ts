import { SERVICE_CONFIG } from "@/domain/config";
import type { Bilingual } from "@/domain/types";

/**
 * Arbre du menu USSD accessible depuis n'importe quel téléphone, sans Internet.
 * L'intitulé d'accueil reste volontairement neutre pour ne pas attirer
 * l'attention sur l'usage réel du service.
 */
export type UssdScreenId =
  | "idle"
  | "home"
  | "help"
  | "danger"
  | "forWhom"
  | "received"
  | "alert"
  | "alertSent"
  | "code"
  | "callback"
  | "callbackSet"
  | "appointment"
  | "appointmentKept"
  | "appointmentMoved"
  | "end";

export interface UssdScreen {
  text: Bilingual;
  /** Touche saisie → écran suivant. */
  next?: Readonly<Record<string, UssdScreenId>>;
}

export const USSD_SCREENS: Readonly<Record<UssdScreenId, UssdScreen>> = {
  idle: {
    text: {
      fr: `Composez ${SERVICE_CONFIG.shortCode}\npuis appuyez sur OK.`,
      en: `Dial ${SERVICE_CONFIG.shortCode}\nthen press OK.`,
    },
  },
  home: {
    text: {
      fr: "Service d’information famille\n1. Demander de l’aide\n2. Alerte rapide\n3. Mon code de suivi\n4. Être rappelé(e)\n5. Mon rendez-vous\n0. Quitter",
      en: "Family information service\n1. Ask for help\n2. Quick alert\n3. My tracking code\n4. Request a call-back\n5. My appointment\n0. Exit",
    },
    next: { 1: "help", 2: "alert", 3: "code", 4: "callback", 5: "appointment", 0: "end" },
  },
  help: {
    text: {
      fr: "Êtes-vous en danger\nmaintenant ?\n1. Oui\n2. Non\n0. Retour",
      en: "Are you in danger\nright now?\n1. Yes\n2. No\n0. Back",
    },
    next: { 1: "danger", 2: "forWhom", 0: "home" },
  },
  danger: {
    text: {
      fr: "Un conseiller vous rappelle\nen priorité.\nSi vous le pouvez,\ncomposez le 117.\n\n0. Accueil",
      en: "A counsellor will call\nyou back first.\nIf you can,\ndial 117.\n\n0. Home",
    },
    next: { 0: "home" },
  },
  forWhom: {
    text: {
      fr: "La demande concerne :\n1. Moi\n2. Une autre personne\n3. Un enfant\n0. Retour",
      en: "This request is for:\n1. Me\n2. Someone else\n3. A child\n0. Back",
    },
    next: { 1: "received", 2: "received", 3: "received", 0: "help" },
  },
  received: {
    text: {
      fr: "Demande enregistrée.\nRéf. 4823\nUn rappel discret\nsera fait.\n\n0. Accueil",
      en: "Request recorded.\nRef. 4823\nA discreet call-back\nwill follow.\n\n0. Home",
    },
    next: { 0: "home" },
  },
  alert: {
    text: {
      fr: "Votre région :\n1. Centre\n2. Littoral\n3. Extrême-Nord\n4. Autre\n0. Retour",
      en: "Your region:\n1. Centre\n2. Littoral\n3. Far North\n4. Other\n0. Back",
    },
    next: { 1: "alertSent", 2: "alertSent", 3: "alertSent", 4: "alertSent", 0: "home" },
  },
  alertSent: {
    text: {
      fr: "Alerte transmise.\nRéf. 4824\n\n0. Accueil",
      en: "Alert sent.\nRef. 4824\n\n0. Home",
    },
    next: { 0: "home" },
  },
  code: {
    text: {
      fr: "Un SMS avec votre code\nde suivi vous est envoyé.\n\n0. Accueil",
      en: "A text message with your\ntracking code is on its way.\n\n0. Home",
    },
    next: { 0: "home" },
  },
  callback: {
    text: {
      fr: "Quand pouvons-nous\nappeler ?\n1. Maintenant\n2. Ce soir\n3. Demain matin\n0. Retour",
      en: "When can we call?\n1. Now\n2. This evening\n3. Tomorrow morning\n0. Back",
    },
    next: { 1: "callbackSet", 2: "callbackSet", 3: "callbackSet", 0: "home" },
  },
  callbackSet: {
    text: {
      fr: "Rappel planifié.\nL’appel viendra d’un\nnuméro masqué.\n\n0. Accueil",
      en: "Call-back planned.\nThe call will come from\na hidden number.\n\n0. Home",
    },
    next: { 0: "home" },
  },
  appointment: {
    text: {
      fr: "RDV le 22/09 à 10 h.\n1. Confirmer\n2. Reporter\n0. Retour",
      en: "Appointment 22/09, 10 am.\n1. Confirm\n2. Postpone\n0. Back",
    },
    next: { 1: "appointmentKept", 2: "appointmentMoved", 0: "home" },
  },
  appointmentKept: {
    text: { fr: "Merci, c’est noté.\n\n0. Accueil", en: "Thank you, noted.\n\n0. Home" },
    next: { 0: "home" },
  },
  appointmentMoved: {
    text: {
      fr: "Un agent vous proposera\nune autre date.\n\n0. Accueil",
      en: "An officer will offer\nanother date.\n\n0. Home",
    },
    next: { 0: "home" },
  },
  end: {
    text: { fr: "Merci. Au revoir.", en: "Thank you. Goodbye." },
  },
};

/** Un code court valide s'écrit `*` + 2 à 5 chiffres + `#`. */
export const SHORT_CODE_PATTERN = /^\*[0-9]{2,5}#$/;
