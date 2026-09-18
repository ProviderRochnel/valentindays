import { NavLink } from "react-router-dom";
import { DEFAULT_BRAND_SUBTITLE, NAVIGATION, ROUTES, navigationEntryFor } from "@/app/routes";
import { Icon } from "@/components/common/Icon";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";
import { BrandMark } from "./BrandMark";

interface SiteHeaderProps {
  pathname: string;
  showQuickExit: boolean;
  onQuickExit: () => void;
}

export function SiteHeader({ pathname, showQuickExit, onQuickExit }: SiteHeaderProps) {
  const { t, locale, setLocale } = useI18n();
  const subtitle = navigationEntryFor(pathname)?.brandSubtitle ?? DEFAULT_BRAND_SUBTITLE;

  return (
    <header className="sticky top-0 z-20 bg-navy text-white shadow-[0_1px_0_rgba(255,255,255,.06)]">
      <div className="gov-wrap flex flex-wrap items-center gap-x-[22px] gap-y-2.5 py-3">
        <NavLink to={ROUTES.home} className="flex items-center gap-2.5 font-extrabold tracking-[0.04em]">
          <BrandMark className="size-[34px] shrink-0" />
          <span className="leading-[1.15]">
            PROTECT-CAMEROUN
            <small className="hidden text-[11.5px] font-normal tracking-normal text-on-navy sm:block">
              {t(subtitle)}
            </small>
          </span>
        </NavLink>

        <nav
          aria-label={t({ fr: "Navigation principale", en: "Main navigation" })}
          className="order-3 -mx-1.5 flex w-full gap-1 overflow-x-auto [scrollbar-width:none] lg:order-none lg:mx-0 lg:ml-auto lg:w-auto"
        >
          {NAVIGATION.map((entry) => (
            <NavLink
              key={entry.to}
              to={entry.to}
              end={entry.to === ROUTES.home}
              className={({ isActive }) =>
                cn(
                  "whitespace-nowrap rounded-lg px-3 py-2 text-[14.5px] font-semibold text-on-navy hover:bg-white/[0.06] hover:text-white",
                  isActive && "bg-navy-3 text-white shadow-[inset_0_-2px_hsl(var(--teal-light))]",
                )
              }
            >
              {t(entry.label)}
            </NavLink>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2.5 lg:ml-0">
          <div
            role="group"
            aria-label="Langue / Language"
            className="inline-flex overflow-hidden rounded-lg border border-[#496487]"
          >
            {(["fr", "en"] as const).map((code) => (
              <button
                key={code}
                type="button"
                aria-pressed={locale === code}
                onClick={() => setLocale(code)}
                className={cn(
                  "px-2.5 py-1.5 text-[13px] font-bold text-on-navy",
                  locale === code && "bg-white text-navy",
                )}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>

          {showQuickExit ? (
            <button
              type="button"
              onClick={onQuickExit}
              title={t({ fr: "Échap", en: "Esc" })}
              className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-lg border border-[#6A87AD] px-3 py-1.5 text-[13.5px] font-bold text-white hover:bg-white/[0.08]"
            >
              <Icon name="exit" />
              <span className="hidden sm:inline">
                {t({ fr: "Quitter rapidement", en: "Quick exit" })}
              </span>
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
