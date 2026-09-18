import type { TriState } from "@/domain/reporting";
import type { SegmentedOption } from "@/components/common/SegmentedControl";
import { useI18n } from "@/i18n/useI18n";

/** Options « Oui / Non / Je ne sais pas », traduites une seule fois. */
export function useTriStateOptions(): readonly SegmentedOption<TriState>[] {
  const { t } = useI18n();
  return [
    { value: "yes", label: t({ fr: "Oui", en: "Yes" }) },
    { value: "no", label: t({ fr: "Non", en: "No" }) },
    { value: "unknown", label: t({ fr: "Je ne sais pas", en: "I don’t know" }) },
  ];
}
