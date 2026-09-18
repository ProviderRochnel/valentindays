import { Icon } from "./Icon";
import type { IconName } from "./iconRegistry";
import { cn } from "@/lib/utils";

interface ChoiceCardProps {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  title: string;
  description: string;
  icon?: IconName;
}

/** Choix exclusif présenté sous forme de carte, plus lisible qu'un radio nu. */
export function ChoiceCard({
  name,
  value,
  checked,
  onChange,
  title,
  description,
  icon,
}: ChoiceCardProps) {
  return (
    <label
      className={cn(
        "relative flex cursor-pointer flex-col gap-1 rounded-[10px] border border-line bg-white p-3",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-blue",
        checked && "border-teal bg-teal-soft shadow-[inset_0_0_0_1px_hsl(var(--teal))]",
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="pointer-events-none absolute opacity-0"
      />
      <b className="flex items-center gap-[7px] text-sm">
        {icon ? <Icon name={icon} className="size-4 text-teal" /> : null}
        {title}
      </b>
      <span className="text-[12.5px] text-muted-ink">{description}</span>
    </label>
  );
}
