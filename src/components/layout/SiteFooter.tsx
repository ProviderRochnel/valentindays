import { HashLink } from "@/components/common/HashLink";
import { ROUTES } from "@/app/routes";
import { EMERGENCY_NUMBERS, GREEN_LINE } from "@/domain/referentials";
import { useI18n } from "@/i18n/useI18n";

interface SiteFooterProps {
  onOpenPrivacy: () => void;
}

export function SiteFooter({ onOpenPrivacy }: SiteFooterProps) {
  const { t } = useI18n();
  const [police, gendarmerie, fire, samu] = EMERGENCY_NUMBERS;

  return (
    <footer className="mt-5 bg-navy text-on-navy">
      <div className="gov-wrap grid gap-[22px] py-7 text-[13.5px] md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,1fr)]">
        <div>
          <h4 className="mb-2 text-[13px] uppercase tracking-[0.08em] text-white">PROTECT-CAMEROUN</h4>
          <p>
            {t({
              fr: "Un service du Ministère de la Promotion de la Femme et de la Famille (MINPROFF) pour signaler les violences, protéger et accompagner les femmes, les enfants et les familles.",
              en: "A service of the Ministry of Women’s Empowerment and the Family (MINPROFF) to report violence, protect and support women, children and families.",
            })}
          </p>
        </div>

        <div>
          <h4 className="mb-2 text-[13px] uppercase tracking-[0.08em] text-white">
            {t({ fr: "Urgences", en: "Emergencies" })}
          </h4>
          <ul className="flex flex-col gap-1.5">
            <li>
              <a href={`tel:${GREEN_LINE}`} className="hover:text-white hover:underline">
                {t({ fr: "Ligne verte", en: "Green line" })} {GREEN_LINE}
              </a>
            </li>
            <li>
              <a href={`tel:${police.number}`} className="hover:text-white hover:underline">
                {t(police.label)} {police.number}
              </a>{" "}
              ·{" "}
              <a href={`tel:${gendarmerie.number}`} className="hover:text-white hover:underline">
                {t(gendarmerie.label)} {gendarmerie.number}
              </a>
            </li>
            <li>
              <a href={`tel:${fire.number}`} className="hover:text-white hover:underline">
                {t(fire.label)} {fire.number}
              </a>{" "}
              ·{" "}
              <a href={`tel:${samu.number}`} className="hover:text-white hover:underline">
                SAMU {samu.number}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-2 text-[13px] uppercase tracking-[0.08em] text-white">
            {t({ fr: "Informations", en: "Information" })}
          </h4>
          <ul className="flex flex-col gap-1.5">
            <li>
              <button
                type="button"
                onClick={onOpenPrivacy}
                className="text-[13.5px] hover:text-white hover:underline"
              >
                {t({ fr: "Confidentialité", en: "Privacy" })}
              </button>
            </li>
            <li>
              <HashLink to={ROUTES.home} hash="questions" className="hover:text-white hover:underline">
                {t({ fr: "Questions fréquentes", en: "Frequently asked questions" })}
              </HashLink>
            </li>
            <li>
              <HashLink to={ROUTES.dispositif} className="hover:text-white hover:underline">
                {t({ fr: "Le dispositif", en: "How it works" })}
              </HashLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-[22px] py-3 text-center text-[12.5px]">
        © 2026{" "}
        {t({ fr: "République du Cameroun · MINPROFF", en: "Republic of Cameroon · MINPROFF" })}
      </div>
    </footer>
  );
}
