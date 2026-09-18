import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FieldProps {
  label: ReactNode;
  htmlFor?: string;
  hint?: string;
  error?: string;
  optional?: string;
  children: ReactNode;
  className?: string;
}

/** Champ de formulaire : intitulé, aide et message d'erreur associés. */
export function Field({
  label,
  htmlFor,
  hint,
  error,
  optional,
  children,
  className,
}: FieldProps) {
  const Label = htmlFor ? "label" : "span";

  return (
    <div className={cn("flex min-w-0 flex-col", className)}>
      <Label className="gov-label" {...(htmlFor ? { htmlFor } : {})}>
        {label}
        {optional ? <span className="ml-1 text-[13px] font-normal text-muted-ink">{optional}</span> : null}
      </Label>
      {children}
      {hint ? <span className="gov-hint">{hint}</span> : null}
      {error ? (
        <span role="alert" className="gov-error">
          {error}
        </span>
      ) : null}
    </div>
  );
}
