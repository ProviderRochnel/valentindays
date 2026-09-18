import type { ReactNode } from "react";

interface SectionTitleProps {
  title: string;
  description?: string;
  /** Contrôle affiché à droite du titre (filtre, sélecteur…). */
  aside?: ReactNode;
}

export function SectionTitle({ title, description, aside }: SectionTitleProps) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h2 className="text-[25px] font-extrabold">{title}</h2>
        {description ? (
          <p className="mt-1 max-w-[66ch] text-[14.5px] text-muted-ink">{description}</p>
        ) : null}
      </div>
      {aside}
    </div>
  );
}
