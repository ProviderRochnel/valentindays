import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface PanelProps {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-labelledby"?: string;
}

/** Bloc de contenu encadré, équivalent d'une « fiche » administrative. */
export function Panel({ children, className, ...rest }: PanelProps) {
  return (
    <section className={cn("gov-panel", className)} {...rest}>
      {children}
    </section>
  );
}

export function PanelHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-center gap-2.5 px-[22px] pt-[18px]", className)}>
      {children}
    </div>
  );
}

export function PanelTitle({ children, id }: { children: ReactNode; id?: string }) {
  return (
    <h3 className="text-[19px] font-bold" id={id}>
      {children}
    </h3>
  );
}

export function PanelBody({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("px-[22px] pb-[22px] pt-[18px]", className)}>{children}</div>;
}
