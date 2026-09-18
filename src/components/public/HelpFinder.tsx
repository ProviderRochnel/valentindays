import { useState } from "react";
import { Field } from "@/components/common/Field";
import { Icon } from "@/components/common/Icon";
import { isIconName } from "@/components/common/iconRegistry";
import { Notice } from "@/components/common/Notice";
import { RegionSelect } from "@/components/common/RegionSelect";
import { SectionTitle } from "@/components/common/SectionTitle";
import { buildHelpDirectory } from "@/data/network";
import { DEFAULT_REGION, GREEN_LINE, findRegion } from "@/domain/referentials";
import type { RegionCode } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

/** Annuaire des structures d'aide, présenté région par région. */
export function HelpFinder() {
  const { t } = useI18n();
  const [region, setRegion] = useState<RegionCode>(DEFAULT_REGION);
  const entries = buildHelpDirectory(findRegion(region));

  return (
    <div id="aide" className="mt-11 scroll-mt-24">
      <SectionTitle
        title={t({ fr: "Trouver de l’aide près de chez vous", en: "Find help near you" })}
        description={t({
          fr: "Choisissez votre région pour voir l’aide disponible.",
          en: "Select your region to see the support available.",
        })}
        aside={
          <Field
            label={t({ fr: "Ma région", en: "My region" })}
            htmlFor="help-region"
            className="min-w-[220px]"
          >
            <RegionSelect
              id="help-region"
              value={region}
              onChange={(value) => setRegion((value || region) as RegionCode)}
            />
          </Field>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {entries.map((entry) => (
          <div
            key={entry.icon}
            className={cn(
              "grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-[10px] border border-line bg-white px-4 py-3.5",
              entry.featured && "border-blue-line bg-blue-soft",
            )}
          >
            {isIconName(entry.icon) ? (
              <Icon
                name={entry.icon}
                className={cn("row-span-2 mt-0.5 size-[22px] text-teal", entry.featured && "text-blue")}
              />
            ) : null}
            <b className="text-[14.5px] text-navy">{t(entry.title)}</b>
            <p className="text-[13.5px] text-ink-2">{t(entry.description)}</p>
          </div>
        ))}
      </div>

      <Notice icon="phone" tone="blue" className="mt-3.5">
        {t({
          fr: `Pour obtenir l’adresse exacte de la structure la plus proche, appelez la ligne verte ${GREEN_LINE} : un écoutant vous orientera.`,
          en: `To get the exact address of the nearest service, call the ${GREEN_LINE} green line: a counsellor will guide you.`,
        })}
      </Notice>
    </div>
  );
}
