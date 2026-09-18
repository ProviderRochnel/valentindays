import { Icon } from "@/components/common/Icon";
import { PRIORITIES, PRIORITY_ORDER } from "@/domain/referentials";
import type { PriorityCode } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

export interface CaseFilterState {
  priority: PriorityCode | "";
  childOnly: boolean;
  search: string;
}

interface CaseFiltersProps {
  filters: CaseFilterState;
  onChange: (filters: CaseFilterState) => void;
}

export function CaseFilters({ filters, onChange }: CaseFiltersProps) {
  const { t } = useI18n();

  const chips: { value: PriorityCode | ""; label: string }[] = [
    { value: "", label: t({ fr: "Toutes", en: "All" }) },
    ...PRIORITY_ORDER.map((code) => ({ value: code, label: t(PRIORITIES[code].label) })),
  ];

  return (
    <div className="mb-3 flex flex-wrap items-center gap-2">
      {chips.map((chip) => (
        <button
          key={chip.value || "all"}
          type="button"
          aria-pressed={filters.priority === chip.value}
          onClick={() => onChange({ ...filters, priority: chip.value })}
          className={cn(
            "rounded-full border border-line-2 bg-white px-3 py-[5px] text-[13px] font-semibold text-ink-2",
            filters.priority === chip.value && "border-navy bg-navy text-white",
          )}
        >
          {chip.label}
        </button>
      ))}

      <label className="ml-1 flex items-center gap-2 text-[13.5px] text-ink-2">
        <input
          type="checkbox"
          className="size-4 accent-teal"
          checked={filters.childOnly}
          onChange={(event) => onChange({ ...filters, childOnly: event.target.checked })}
        />
        {t({ fr: "Enfant concerné", en: "Child involved" })}
      </label>

      <span className="flex-1" />

      <label className="flex min-w-0 max-w-[260px] flex-[1_1_180px] items-center gap-2 rounded-full border border-line-2 bg-white px-3 py-[5px]">
        <Icon name="search" className="size-[15px] text-muted-ink" />
        <input
          className="w-full min-w-0 border-0 bg-transparent text-[13.5px] outline-none"
          placeholder={t({ fr: "Référence…", en: "Reference…" })}
          aria-label={t({ fr: "Rechercher un dossier", en: "Search for a case" })}
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
        />
      </label>
    </div>
  );
}
