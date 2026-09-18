import type { ReactNode } from "react";

interface PageHeadProps {
  eyebrow: string;
  title: string;
  description: string;
  action?: ReactNode;
}

/** En-tête plein bandeau des pages institutionnelles. */
export function PageHead({ eyebrow, title, description, action }: PageHeadProps) {
  return (
    <div className="grid items-end gap-5 rounded-2xl bg-navy px-6 py-8 text-white shadow-panel sm:px-9 md:grid-cols-[minmax(0,1fr)_auto]">
      <div>
        <div className="gov-eyebrow text-teal-light">{eyebrow}</div>
        <h1 className="my-2.5 text-[clamp(28px,4vw,40px)] tracking-[-0.01em] text-white">{title}</h1>
        <p className="max-w-[680px] text-[#C6D4E7]">{description}</p>
      </div>
      {action}
    </div>
  );
}
