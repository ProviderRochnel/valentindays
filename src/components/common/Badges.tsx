import type { ReactNode } from "react";
import { PRIORITIES } from "@/domain/referentials";
import type { PriorityCode } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import type { IconName } from "./iconRegistry";

const PRIORITY_STYLES: Record<PriorityCode, string> = {
  crit: "bg-danger-soft text-danger [&>i]:rotate-45",
  high: "bg-orange-soft text-orange",
  mod: "bg-blue-soft text-blue",
  low: "bg-gris text-ink-2 [&>i]:rounded-full",
};

/** Pastille de priorité : la forme du repère distingue les niveaux sans couleur. */
export function PriorityBadge({ priority }: { priority: PriorityCode }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-[3px] text-xs font-bold",
        PRIORITY_STYLES[priority],
      )}
    >
      <i aria-hidden className="size-[7px] rounded-[2px] bg-current" />
      {t(PRIORITIES[priority].label)}
    </span>
  );
}

export type StatusTone = "default" | "new" | "ok" | "wait";

const STATUS_STYLES: Record<StatusTone, string> = {
  default: "border-line-2 bg-white text-ink-2",
  new: "border-blue bg-white text-blue",
  ok: "border-transparent bg-teal-soft text-teal",
  wait: "border-transparent bg-orange-soft text-orange",
};

export function StatusPill({ tone = "default", children }: { tone?: StatusTone; children: ReactNode }) {
  return (
    <span
      className={cn(
        "inline-block whitespace-nowrap rounded-md border px-2 py-0.5 text-[12.5px] font-semibold",
        STATUS_STYLES[tone],
      )}
    >
      {children}
    </span>
  );
}

/** Étiquette secondaire (région, enfant concerné, structure destinataire…). */
export function Tag({ icon, children }: { icon?: IconName; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md bg-gris px-2 py-0.5 text-xs font-semibold text-ink-2">
      {icon ? <Icon name={icon} className="size-[13px]" /> : null}
      {children}
    </span>
  );
}
