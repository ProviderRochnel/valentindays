import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import type { IconName } from "./iconRegistry";
import { cn } from "@/lib/utils";

const ICON_TONES = {
  blue: "bg-blue-soft text-blue",
  teal: "bg-teal-soft text-teal",
  red: "bg-danger-soft text-danger",
  navy: "bg-navy text-teal-light",
} as const;

export type IconTone = keyof typeof ICON_TONES;

interface ServiceCardProps {
  icon: IconName;
  tone?: IconTone;
  title: string;
  description: string;
  /** Intitulé du lien d'action, affiché en pied de carte. */
  action?: string;
  to?: string;
  href?: string;
  /** Contenu libre inséré entre le titre et la description (numéro, code…). */
  highlight?: React.ReactNode;
}

export function ServiceCard({
  icon,
  tone = "blue",
  title,
  description,
  action,
  to,
  href,
  highlight,
}: ServiceCardProps) {
  const content = (
    <>
      <div className={cn("mb-3.5 grid size-10 place-items-center rounded-[10px]", ICON_TONES[tone])}>
        <Icon name={icon} className="size-[21px]" />
      </div>
      <h3 className="mb-1.5 text-[17px] font-bold">{title}</h3>
      {highlight}
      <p className="text-sm text-muted-ink">{description}</p>
      {action ? (
        <span className="mt-3 inline-flex items-center gap-1.5 text-[13.5px] font-bold text-blue">
          {action}
          <Icon name="arrow" className="size-4" />
        </span>
      ) : null}
    </>
  );

  const className =
    "gov-card block transition-[transform,border-color] hover:-translate-y-0.5 hover:border-blue-line";

  if (to) {
    return (
      <Link to={to} className={className}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={className}>
        {content}
      </a>
    );
  }
  return <div className="gov-card">{content}</div>;
}
