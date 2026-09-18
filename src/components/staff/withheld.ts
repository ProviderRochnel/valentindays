import { useI18n } from "@/i18n/useI18n";

/**
 * Informations que le Ministère ne transmet jamais aux structures partenaires.
 * La liste est rappelée aux deux parties, pour que la règle soit visible.
 */
export function useWithheldItems(): string[] {
  const { t } = useI18n();
  return [
    t({ fr: "Identité complète", en: "Full identity" }),
    t({ fr: "Adresse", en: "Address" }),
    t({ fr: "Pièces jointes", en: "Attachments" }),
    t({ fr: "Récit détaillé", en: "Detailed account" }),
  ];
}
