import { cn } from "@/lib/utils";
import { ICONS, type IconName } from "./iconRegistry";

interface IconProps {
  name: IconName;
  className?: string;
}

export function Icon({ name, className }: IconProps) {
  const Glyph = ICONS[name];
  return <Glyph aria-hidden className={cn("size-[18px] shrink-0", className)} strokeWidth={1.8} />;
}
