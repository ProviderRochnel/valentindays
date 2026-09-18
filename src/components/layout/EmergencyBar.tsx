import { EMERGENCY_NUMBERS, GREEN_LINE } from "@/domain/referentials";
import { useI18n } from "@/i18n/useI18n";
import { Icon } from "@/components/common/Icon";

/**
 * Bandeau permanent : les numéros de secours doivent rester accessibles
 * avant même que la personne n'ait lu la page.
 */
export function EmergencyBar() {
  const { t } = useI18n();

  return (
    <div
      role="region"
      aria-label={t({ fr: "Urgences", en: "Emergencies" })}
      className="border-b border-[#F3D5D1] bg-danger-soft text-[13px] text-danger-ink"
    >
      <div className="gov-wrap flex flex-wrap items-center gap-x-3.5 gap-y-1.5 py-[7px]">
        <b className="text-danger">{t({ fr: "Danger immédiat ?", en: "Immediate danger?" })}</b>
        {EMERGENCY_NUMBERS.map((entry) => (
          <a
            key={entry.number}
            href={`tel:${entry.number}`}
            className="whitespace-nowrap font-bold hover:underline"
          >
            {t(entry.label)} {entry.number}
          </a>
        ))}
        <span className="flex-1" />
        <a
          href={`tel:${GREEN_LINE}`}
          className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-teal-line bg-white px-2.5 py-0.5 font-bold text-teal-ink hover:underline"
        >
          <Icon name="phone" className="size-3.5" />
          {t({ fr: "Ligne verte", en: "Green line" })}&nbsp;{GREEN_LINE}
        </a>
      </div>
    </div>
  );
}
