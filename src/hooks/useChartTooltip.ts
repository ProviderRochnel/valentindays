import { useCallback, useState, type ReactNode } from "react";

export interface TooltipState {
  content: ReactNode;
  x: number;
  y: number;
}

/** Infobulle suivant le pointeur, partagée par tous les graphiques. */
export function useChartTooltip() {
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const show = useCallback((content: ReactNode, event: { clientX: number; clientY: number }) => {
    setTooltip({ content, x: event.clientX, y: event.clientY });
  }, []);

  const hide = useCallback(() => setTooltip(null), []);

  return { tooltip, show, hide };
}
