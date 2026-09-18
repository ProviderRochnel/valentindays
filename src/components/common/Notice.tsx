import { cva, type VariantProps } from "class-variance-authority";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "./Icon";
import type { IconName } from "./iconRegistry";

const notice = cva("flex items-start gap-2.5 rounded-md border-l-4 px-3.5 py-3 text-sm", {
  variants: {
    tone: {
      teal: "border-l-teal-mark bg-teal-soft text-teal-ink",
      danger: "border-l-danger bg-danger-soft text-danger-ink",
      warn: "border-l-orange-mark bg-orange-soft text-[#6E3F10]",
      blue: "border-l-blue bg-blue-soft text-[#1E3F6E]",
      navy: "border-l-teal-light bg-navy text-[#D6DFEC] [&_b]:text-white",
    },
  },
  defaultVariants: { tone: "teal" },
});

interface NoticeProps extends VariantProps<typeof notice> {
  icon: IconName;
  title?: string;
  children: ReactNode;
  className?: string;
}

/** Encadré d'information, d'avertissement ou de rappel de confidentialité. */
export function Notice({ icon, title, tone, children, className }: NoticeProps) {
  return (
    <div className={cn(notice({ tone }), className)}>
      <Icon name={icon} className="mt-0.5" />
      <span>
        {title ? <b className="block">{title}</b> : null}
        <span className="block">{children}</span>
      </span>
    </div>
  );
}
