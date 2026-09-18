import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import type { IconName } from "./iconRegistry";

interface KpiCardProps {
  label: string;
  value: string;
  caption?: string;
  icon?: IconName;
  /** `warn` signale une file d'attente, `crit` une situation à risque. */
  tone?: "default" | "warn" | "crit";
}

export function KpiCard({ label, value, caption, icon, tone = "default" }: KpiCardProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-col gap-0.5 rounded-xl border border-line bg-white p-4 shadow-panel",
        tone === "warn" && "border-[#F1D2AC] bg-orange-soft",
      )}
    >
      <span
        className={cn(
          "flex items-center gap-2 text-[13.5px] text-ink-2",
          tone === "warn" && "text-orange",
        )}
      >
        {icon ? (
          <Icon
            name={icon}
            className={cn(
              "size-4 text-blue",
              tone === "warn" && "text-orange",
              tone === "crit" && "text-danger",
            )}
          />
        ) : null}
        {label}
      </span>
      <strong className="text-[30px] leading-[1.15] text-navy">{value}</strong>
      {caption ? <span className="text-[12.5px] text-muted-ink">{caption}</span> : null}
    </div>
  );
}
