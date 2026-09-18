/**
 * Réglages à confirmer avec les opérateurs et la direction de la communication
 * avant la mise en service. Ils sont regroupés ici pour éviter toute valeur
 * codée en dur dans les composants.
 */
export const SERVICE_CONFIG = {
  /** Code court USSD attribué par les opérateurs. */
  shortCode: "*XXX#",
  /** Numéro court recevant le mot-clé AIDE / HELP. */
  smsNumber: "XXXX",
  /** Page neutre ouverte par la sortie rapide. */
  quickExitUrl: "https://www.google.com/search?q=m%C3%A9t%C3%A9o+yaound%C3%A9",
  /** Taille maximale acceptée par pièce jointe. */
  maxAttachmentMegabytes: 20,
} as const;
