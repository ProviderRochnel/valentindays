import { useI18n } from "@/i18n/useI18n";
import { ChartTooltip } from "./ChartTooltip";
import { useChartTooltip } from "@/hooks/useChartTooltip";

export interface BarItem {
  label: string;
  value: number;
}

interface BarListProps {
  items: readonly BarItem[];
  total: number;
  /** Unité rappelée dans l'infobulle. */
  unit: string;
}

/**
 * Liste de barres horizontales classées. Une seule teinte : la longueur porte
 * la grandeur, la couleur n'encode rien.
 */
export function BarList({ items, total, unit }: BarListProps) {
  const { formatNumber } = useI18n();
  const { tooltip, show, hide } = useChartTooltip();
  const max = Math.max(...items.map((item) => item.value));

  return (
    <>
      <div className="flex flex-col gap-2.5" onMouseLeave={hide}>
        {items.map((item) => (
          <div
            key={item.label}
            className="grid grid-cols-[minmax(110px,170px)_minmax(0,1fr)] items-center gap-3 text-[13.5px]"
            onMouseMove={(event) =>
              show(
                <>
                  <b className="block text-[13px]">{item.label}</b>
                  {formatNumber(item.value)} {unit} · {Math.round((item.value / total) * 100)} %
                </>,
                event,
              )
            }
          >
            <span className="truncate text-ink-2" title={item.label}>
              {item.label}
            </span>
            <span className="flex min-w-0 items-center gap-2">
              <span
                className="h-3.5 min-w-0.5 rounded-r bg-blue"
                style={{ width: `calc((100% - 56px) * ${(item.value / max).toFixed(4)})` }}
              />
              <span className="tabular whitespace-nowrap text-[12.5px] font-bold">
                {formatNumber(item.value)}
              </span>
            </span>
          </div>
        ))}
      </div>
      <ChartTooltip tooltip={tooltip} />
    </>
  );
}
