import { forwardRef } from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Bouton du système de design institutionnel. Il est volontairement distinct
 * des primitives shadcn/ui, qui restent disponibles pour les composants
 * techniques (dialogues, menus…).
 */
const actionButton = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[9px] border font-bold leading-tight transition-[filter,background-color] disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        neutral: "border-line-2 bg-white text-ink hover:bg-gris",
        primary: "border-teal bg-teal text-white hover:brightness-110",
        blue: "border-blue bg-blue text-white hover:brightness-110",
        danger: "border-danger bg-danger text-white hover:brightness-110",
        outline: "border-[#6A87AD] bg-transparent text-white hover:bg-white/10",
        ghost: "border-transparent bg-transparent text-ink hover:bg-gris",
      },
      size: {
        default: "px-4 py-2.5 text-[14.5px]",
        sm: "px-[11px] py-1.5 text-[13px]",
      },
    },
    defaultVariants: { variant: "neutral", size: "default" },
  },
);

export interface ActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof actionButton> {
  /** Rend le bouton sous la forme de l'élément enfant (lien, `NavLink`…). */
  asChild?: boolean;
}

export const ActionButton = forwardRef<HTMLButtonElement, ActionButtonProps>(
  ({ className, variant, size, asChild = false, type, ...props }, ref) => {
    const Component = asChild ? Slot : "button";
    return (
      <Component
        ref={ref}
        className={cn(actionButton({ variant, size }), className)}
        {...(asChild ? {} : { type: type ?? "button" })}
        {...props}
      />
    );
  },
);
ActionButton.displayName = "ActionButton";
