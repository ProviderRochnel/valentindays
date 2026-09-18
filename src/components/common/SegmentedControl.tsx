import { cn } from "@/lib/utils";

export interface SegmentedOption<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  options: readonly SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
  className?: string;
}

/** Groupe de boutons exclusifs, utilisé pour les réponses courtes et les filtres. */
export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
  label,
  className,
}: SegmentedControlProps<T>) {
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex flex-wrap overflow-hidden rounded-[9px] border border-line-2 bg-white",
        className,
      )}
    >
      {options.map((option) => (
        <button
          key={option.value}
          type="button"
          aria-pressed={option.value === value}
          onClick={() => onChange(option.value)}
          className={cn(
            "px-[13px] py-[7px] text-[13.5px] font-semibold text-ink-2 first:border-l-0 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-line-2",
            option.value === value && "bg-navy text-white",
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
