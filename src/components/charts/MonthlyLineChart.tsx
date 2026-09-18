import { useLayoutEffect, useRef, useState } from "react";
import { useI18n } from "@/i18n/useI18n";
import { ChartTooltip } from "./ChartTooltip";
import { useChartTooltip } from "@/hooks/useChartTooltip";

export interface LinePoint {
  /** Libellé court porté par l'axe. */
  short: string;
  /** Libellé complet affiché dans l'infobulle. */
  full: string;
  value: number;
}

const HEIGHT = 250;
const MARGIN = { left: 48, right: 58, top: 14, bottom: 30 };
const TARGET_TICKS = 4;

/** Arrondit le pas de l'axe à une valeur lisible (1, 2, 2,5 ou 5 × 10ⁿ). */
function niceStep(max: number, tickCount: number): number {
  const raw = max / tickCount;
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const normalized = raw / magnitude;
  const factor = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 2.5 ? 2.5 : normalized <= 5 ? 5 : 10;
  return factor * magnitude;
}

interface MonthlyLineChartProps {
  points: readonly LinePoint[];
  title: string;
  unit: string;
  comparisonLabel: string;
}

/**
 * Courbe mensuelle à série unique : pas de légende (le titre nomme la série),
 * valeur portée en bout de courbe, croisillon au survol.
 */
export function MonthlyLineChart({ points, title, unit, comparisonLabel }: MonthlyLineChartProps) {
  const { formatNumber, formatDecimal } = useI18n();
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [width, setWidth] = useState(720);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const { tooltip, show, hide } = useChartTooltip();

  useLayoutEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      setWidth(Math.max(280, entry.contentRect.width));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const values = points.map((point) => point.value);
  const innerWidth = width - MARGIN.left - MARGIN.right;
  const innerHeight = HEIGHT - MARGIN.top - MARGIN.bottom;
  const step = niceStep(Math.max(...values), TARGET_TICKS);
  const yMax = Math.ceil(Math.max(...values) / step) * step;
  const lastIndex = values.length - 1;

  const x = (index: number) =>
    MARGIN.left + (values.length === 1 ? innerWidth / 2 : (index * innerWidth) / lastIndex);
  const y = (value: number) => MARGIN.top + innerHeight - (value / yMax) * innerHeight;

  const ticks: number[] = [];
  for (let value = 0; value <= yMax + 1e-9; value += step) ticks.push(value);

  const linePoints = values.map((value, index) => `${x(index)},${y(value)}`).join(" ");
  // Sur les écrans étroits, une étiquette sur deux suffit pour rester lisible.
  const labelEvery = width < 520 && values.length > 6 ? 2 : 1;

  const handleMove = (event: React.MouseEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    if (!svg) return;

    const bounds = svg.getBoundingClientRect();
    const position = (event.clientX - bounds.left) * (width / bounds.width);
    const index = Math.max(
      0,
      Math.min(lastIndex, Math.round((position - MARGIN.left) / (innerWidth / Math.max(1, lastIndex)))),
    );
    setHoverIndex(index);

    const previous = index > 0 ? values[index - 1] : null;
    const change = previous ? ((values[index] - previous) / previous) * 100 : null;
    show(
      <>
        <b className="block text-[13px]">{points[index].full}</b>
        {formatNumber(values[index])} {unit}
        {change !== null ? (
          <span className="block text-muted-ink">
            {change >= 0 ? "+" : ""}
            {formatDecimal(change)} % {comparisonLabel}
          </span>
        ) : null}
      </>,
      event,
    );
  };

  return (
    <div ref={containerRef} className="relative w-full">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${HEIGHT}`}
        height={HEIGHT}
        role="img"
        aria-label={title}
        className="block w-full overflow-visible"
      >
        {ticks.map((value) => (
          <g key={value}>
            <line
              x1={MARGIN.left}
              x2={width - MARGIN.right + 8}
              y1={y(value)}
              y2={y(value)}
              stroke={value === 0 ? "hsl(var(--line-2))" : "hsl(var(--grid))"}
              strokeWidth={1}
            />
            <text
              x={MARGIN.left - 8}
              y={y(value) + 4}
              textAnchor="end"
              className="fill-muted-ink text-[11.5px]"
            >
              {formatNumber(value)}
            </text>
          </g>
        ))}

        {points.map((point, index) =>
          index % labelEvery === 0 || index === lastIndex ? (
            <text
              key={point.full}
              x={x(index)}
              y={HEIGHT - 8}
              textAnchor="middle"
              className="fill-muted-ink text-[11.5px]"
            >
              {point.short}
            </text>
          ) : null,
        )}

        <polygon
          points={`${x(0)},${y(0)} ${linePoints} ${x(lastIndex)},${y(0)}`}
          fill="hsl(var(--blue))"
          opacity={0.1}
        />
        <polyline
          points={linePoints}
          fill="none"
          stroke="hsl(var(--blue))"
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        <circle
          cx={x(lastIndex)}
          cy={y(values[lastIndex])}
          r={5}
          fill="hsl(var(--blue))"
          stroke="white"
          strokeWidth={2}
        />
        <text
          x={x(lastIndex) + 10}
          y={y(values[lastIndex]) + 4}
          className="fill-ink text-[12.5px] font-bold"
        >
          {formatNumber(values[lastIndex])}
        </text>

        {hoverIndex !== null ? (
          <g>
            <line
              x1={x(hoverIndex)}
              x2={x(hoverIndex)}
              y1={MARGIN.top}
              y2={MARGIN.top + innerHeight}
              stroke="hsl(var(--line-2))"
              strokeWidth={1}
            />
            <circle
              cx={x(hoverIndex)}
              cy={y(values[hoverIndex])}
              r={5}
              fill="hsl(var(--blue))"
              stroke="white"
              strokeWidth={2}
            />
          </g>
        ) : null}

        <rect
          x={MARGIN.left}
          y={MARGIN.top}
          width={innerWidth}
          height={innerHeight}
          fill="transparent"
          onMouseMove={handleMove}
          onMouseLeave={() => {
            setHoverIndex(null);
            hide();
          }}
        />
      </svg>
      <ChartTooltip tooltip={tooltip} />
    </div>
  );
}
