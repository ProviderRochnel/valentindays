import { ROUTES } from "@/app/routes";
import { ActionButton } from "@/components/common/ActionButton";
import { HashLink } from "@/components/common/HashLink";
import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/iconRegistry";
import { useI18n } from "@/i18n/useI18n";
import type { Bilingual } from "@/domain/types";

const ASSURANCES: readonly { icon: IconName; label: Bilingual }[] = [
  { icon: "eye-off", label: { fr: "Anonymat possible", en: "Anonymity possible" } },
  { icon: "lock", label: { fr: "Informations protégées", en: "Your information is protected" } },
  { icon: "headset", label: { fr: "Traité par des agents formés", en: "Handled by trained staff" } },
];

export function HomeHero() {
  const { t } = useI18n();

  return (
    <div className="grid items-center gap-7 overflow-hidden rounded-2xl bg-navy p-6 text-white shadow-panel sm:p-10 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.8fr)]">
      <div>
        <div className="gov-eyebrow text-teal-light">
          {t({ fr: "Un canal sûr pour demander de l’aide", en: "A safe way to ask for help" })}
        </div>
        <h1 className="my-3.5 text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.015em] text-white">
          {t({ fr: "Parlez-en.", en: "Speak up." })}
          <br />
          {t({ fr: "Nous pouvons vous aider.", en: "We can help you." })}
        </h1>
        <p className="max-w-[600px] text-base text-[#C6D4E7]">
          {t({
            fr: "Signalez une situation de violence, pour vous ou pour une autre personne. Vous pouvez rester anonyme. Chaque signalement est examiné par un agent formé du Ministère.",
            en: "Report a situation of violence, for yourself or for someone else. You can remain anonymous. Every report is reviewed by a trained officer of the Ministry.",
          })}
        </p>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <ActionButton variant="primary" asChild>
            <HashLink to={ROUTES.home} hash="signaler">
              <Icon name="doc" />
              {t({ fr: "Faire un signalement", en: "Make a report" })}
            </HashLink>
          </ActionButton>
          <ActionButton variant="outline" asChild>
            <HashLink to={ROUTES.home} hash="suivre">
              <Icon name="search" />
              {t({ fr: "Suivre un dossier", en: "Track a case" })}
            </HashLink>
          </ActionButton>
        </div>

        <ul className="mt-5 flex flex-wrap gap-x-[18px] gap-y-2 text-[13.5px] text-[#D5E0EE]">
          {ASSURANCES.map((item) => (
            <li key={item.icon} className="flex items-center gap-1.5">
              <Icon name={item.icon} className="size-4 text-teal-light" />
              {t(item.label)}
            </li>
          ))}
        </ul>
      </div>

      <div
        aria-hidden
        className="hidden min-h-[220px] place-items-center rounded-2xl border border-white/15 bg-[linear-gradient(150deg,#16345D,#0B1B33)] p-4 lg:grid"
      >
        <svg viewBox="0 0 320 220" className="h-auto w-full max-w-[320px]">
          <g fill="none" strokeLinecap="round">
            <path d="M40 190a120 120 0 0 1 240 0" stroke="#74D5CC" strokeWidth="2" opacity=".22" />
            <path d="M70 190a90 90 0 0 1 180 0" stroke="#74D5CC" strokeWidth="2" opacity=".42" />
            <path d="M100 190a60 60 0 0 1 120 0" stroke="#74D5CC" strokeWidth="2.5" opacity=".7" />
            <path
              d="M52 118 96 78 160 56 224 78 268 118"
              stroke="#7FA7D8"
              strokeWidth="1.3"
              opacity=".6"
              strokeDasharray="2 6"
            />
            <path
              d="M160 98l36 14v25c0 22-15 40-36 50-21-10-36-28-36-50v-25z"
              stroke="#FFFFFF"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <path d="M145 142l10 10 20-22" stroke="#74D5CC" strokeWidth="3.5" strokeLinejoin="round" />
          </g>
          <g fill="#7FA7D8">
            <circle cx="52" cy="118" r="6" />
            <circle cx="96" cy="78" r="6" />
            <circle cx="160" cy="56" r="7" fill="#74D5CC" />
            <circle cx="224" cy="78" r="6" />
            <circle cx="268" cy="118" r="6" />
          </g>
        </svg>
      </div>
    </div>
  );
}
