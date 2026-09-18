import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function DetailHeader({
  reference,
  title,
  children,
}: {
  reference: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="border-b border-line px-5 pb-3.5 pt-[18px]">
      <span className="font-mono-gov text-[12.5px] text-ink-2">{reference}</span>
      <h3 className="my-1 text-[19px] font-bold">{title}</h3>
      {children ? <div className="flex flex-wrap items-center gap-1.5">{children}</div> : null}
    </div>
  );
}

export function DetailSection({
  title,
  children,
  className,
  last,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
  last?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-2.5 px-5 py-[15px]",
        !last && "border-b border-line",
        className,
      )}
    >
      {title ? (
        <h4 className="text-xs uppercase tracking-[0.08em] text-teal">{title}</h4>
      ) : null}
      {children}
    </div>
  );
}

export function DetailActions({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap gap-2 rounded-b-xl bg-zebra px-5 py-[15px]">{children}</div>
  );
}

export interface KeyValueEntry {
  key: string;
  value: ReactNode;
}

export function KeyValueList({ entries }: { entries: readonly KeyValueEntry[] }) {
  return (
    <dl className="m-0 grid grid-cols-[max-content_minmax(0,1fr)] gap-x-3.5 gap-y-1.5 text-[13.5px]">
      {entries.map((entry) => (
        <div key={entry.key} className="contents">
          <dt className="text-muted-ink">{entry.key}</dt>
          <dd className="m-0">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Liste des informations volontairement conservées par le Ministère. */
export function WithheldList({ title, items }: { title: string; items: readonly string[] }) {
  return (
    <div>
      <h4 className="mb-2 text-xs uppercase tracking-[0.08em] text-muted-ink">{title}</h4>
      <ul className="flex list-none flex-col gap-1.5 rounded-[9px] border border-dashed border-line-2 px-3.5 py-3 text-[13px] text-muted-ink">
        {items.map((item) => (
          <li key={item} className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" aria-hidden className="size-3.5 shrink-0 stroke-current" fill="none" strokeWidth={1.8}>
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V8a4 4 0 0 1 8 0v3" />
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
