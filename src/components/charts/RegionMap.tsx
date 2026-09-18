import { REGION_STATISTICS, SHARE_SCALE, shareScaleStep } from "@/data/statistics";
import { findRegion } from "@/domain/referentials";
import type { RegionCode } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";
import { ChartTooltip } from "./ChartTooltip";
import { useChartTooltip } from "@/hooks/useChartTooltip";

const STEP_CLASSES: Record<number, string> = {
  1: "bg-seq-1 text-ink",
  2: "bg-seq-2 text-ink",
  3: "bg-seq-3 text-ink",
  4: "bg-seq-4 text-white",
  5: "bg-seq-5 text-white",
};

interface RegionMapProps {
  /** Total national sur la période, pour convertir les parts en effectifs. */
  nationalTotal: number;
  selected: RegionCode | "";
  onSelect: (region: RegionCode) => void;
}

/**
 * Carte simplifiée : une tuile par région, disposée approximativement selon la
 * géographie du pays. Elle n'affiche que des totaux régionaux — jamais une
 * adresse ni une localisation individuelle.
 */
export function RegionMap({ nationalTotal, selected, onSelect }: RegionMapProps) {
  const { t, formatNumber, formatDecimal } = useI18n();
  const { tooltip, show, hide } = useChartTooltip();

  return (
    <div>
      <div
        className="grid max-w-[440px] grid-cols-4 grid-rows-5 gap-1 [grid-auto-rows:minmax(54px,auto)]"
        onMouseLeave={hide}
      >
        {REGION_STATISTICS.map((statistics) => {
          const region = findRegion(statistics.region);
          const name = t(region.label);
          return (
            <button
              key={statistics.region}
              type="button"
              style={{
                gridRow: statistics.mapPosition.row,
                gridColumn: statistics.mapPosition.column,
              }}
              onClick={() => onSelect(statistics.region)}
              onMouseMove={(event) =>
                show(
                  <>
                    <b className="block text-[13px]">{name}</b>
                    {formatNumber(nationalTotal * statistics.share)}{" "}
                    {t({ fr: "signalements", en: "reports" })} ·{" "}
                    {formatDecimal(statistics.share * 100)} %
                    <span className="block">
                      {t({ fr: "Première réponse", en: "First review" })} :{" "}
                      {formatDecimal(statistics.firstReviewHours)} h
                    </span>
                  </>,
                  event,
                )
              }
              className={cn(
                "flex min-w-0 flex-col justify-between rounded-md px-2 py-1.5 text-left text-[11.5px] leading-[1.25]",
                STEP_CLASSES[shareScaleStep(statistics.share)],
                statistics.region === selected && "outline outline-2 outline-offset-1 outline-ink",
              )}
              aria-pressed={statistics.region === selected}
            >
              <b className="text-xs [overflow-wrap:anywhere]">{name}</b>
              <span className="tabular">{formatDecimal(statistics.share * 100)} %</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap gap-0.5 text-[11.5px] text-muted-ink">
        {SHARE_SCALE.map((bucket) => (
          <span key={bucket.step} className="flex min-w-[62px] flex-1 flex-col gap-1 pr-2">
            <i className={cn("block h-2.5", STEP_CLASSES[bucket.step])} />
            {t(bucket.label)}
          </span>
        ))}
      </div>

      <ChartTooltip tooltip={tooltip} />
    </div>
  );
}
