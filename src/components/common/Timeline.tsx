import { cn } from "@/lib/utils";

export type TimelineState = "done" | "current" | "todo";

export interface TimelineItem {
  state: TimelineState;
  label: string;
  detail?: string;
}

/** Chronologie verticale d'un dossier ou d'une orientation. */
export function Timeline({ items }: { items: readonly TimelineItem[] }) {
  return (
    <ol className="mt-1 flex list-none flex-col p-0">
      {items.map((item, index) => (
        <li
          key={item.label}
          className={cn(
            "relative grid grid-cols-[18px_minmax(0,1fr)] gap-2.5 pb-[13px] text-sm",
            "before:mt-[5px] before:size-[11px] before:rounded-full before:shadow-[0_0_0_3px_white] before:content-['']",
            item.state === "todo"
              ? "text-muted-ink before:border-[1.5px] before:border-line-2 before:bg-white"
              : item.state === "current"
                ? "before:bg-blue"
                : "before:bg-teal-mark",
            index < items.length - 1 &&
              "after:absolute after:bottom-[-1px] after:left-[5px] after:top-4 after:w-px after:bg-line-2 after:content-['']",
          )}
        >
          <div className="col-start-2">
            <b>{item.label}</b>
            {item.detail ? (
              <small className="block text-[12.5px] text-muted-ink">{item.detail}</small>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
