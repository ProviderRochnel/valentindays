import type { TooltipState } from "@/hooks/useChartTooltip";

const OFFSET = 14;
const EDGE_MARGIN = 8;
const ESTIMATED_WIDTH = 240;
const ESTIMATED_HEIGHT = 84;

/** Rend l'infobulle d'un graphique, en la repliant si elle sort de l'écran. */
export function ChartTooltip({ tooltip }: { tooltip: TooltipState | null }) {
  if (!tooltip) return null;

  const left =
    tooltip.x + OFFSET + ESTIMATED_WIDTH > window.innerWidth - EDGE_MARGIN
      ? Math.max(EDGE_MARGIN, tooltip.x - ESTIMATED_WIDTH - OFFSET)
      : tooltip.x + OFFSET;
  const top =
    tooltip.y + OFFSET + ESTIMATED_HEIGHT > window.innerHeight - EDGE_MARGIN
      ? Math.max(EDGE_MARGIN, tooltip.y - ESTIMATED_HEIGHT - OFFSET)
      : tooltip.y + OFFSET;

  return (
    <div
      role="presentation"
      style={{ left, top }}
      className="pointer-events-none fixed z-[90] max-w-[240px] rounded-lg border border-line-2 bg-white px-2.5 py-[7px] text-[12.5px] shadow-panel"
    >
      {tooltip.content}
    </div>
  );
}
