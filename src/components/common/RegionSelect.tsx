import { REGIONS } from "@/domain/referentials";
import type { RegionCode } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

interface RegionSelectProps {
  id: string;
  value: RegionCode | "";
  onChange: (value: RegionCode | "") => void;
  /** Ajoute une option « Toutes les régions » en tête de liste. */
  includeAll?: boolean;
  className?: string;
}

/**
 * Sélecteur de région. Le `select` natif est retenu volontairement : il reste
 * utilisable sur des téléphones d'entrée de gamme et avec un lecteur d'écran.
 */
export function RegionSelect({ id, value, onChange, includeAll, className }: RegionSelectProps) {
  const { t } = useI18n();

  return (
    <select
      id={id}
      className={cn("gov-input", className)}
      value={value}
      onChange={(event) => onChange(event.target.value as RegionCode | "")}
    >
      {includeAll ? (
        <option value="">{t({ fr: "Toutes les régions", en: "All regions" })}</option>
      ) : null}
      {REGIONS.map((region) => (
        <option key={region.code} value={region.code}>
          {t(region.label)}
        </option>
      ))}
    </select>
  );
}
