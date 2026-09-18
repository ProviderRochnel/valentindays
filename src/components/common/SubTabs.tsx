import { Icon } from "./Icon";
import type { IconName } from "./iconRegistry";
import { cn } from "@/lib/utils";

export interface SubTab<T extends string> {
  value: T;
  label: string;
  icon: IconName;
  /** Compteur affiché en pastille (masqué lorsqu'il vaut zéro). */
  count?: number;
}

interface SubTabsProps<T extends string> {
  tabs: readonly SubTab<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export function SubTabs<T extends string>({ tabs, value, onChange, label }: SubTabsProps<T>) {
  return (
    <div
      role="tablist"
      aria-label={label}
      className="mb-[18px] flex gap-1 overflow-x-auto border-b border-line [scrollbar-width:none]"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          role="tab"
          aria-selected={tab.value === value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "-mb-px flex items-center gap-[7px] whitespace-nowrap border-b-[3px] border-transparent px-3.5 py-2.5 text-[14.5px] font-bold text-muted-ink",
            tab.value === value && "border-b-teal text-navy",
          )}
        >
          <Icon name={tab.icon} />
          {tab.label}
          {tab.count ? (
            <span className="rounded-full bg-danger-soft px-[7px] py-px text-[11.5px] text-danger">
              {tab.count}
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
