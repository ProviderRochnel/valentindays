import { ROUTES } from "@/app/routes";
import { ActionButton } from "@/components/common/ActionButton";
import { HashLink } from "@/components/common/HashLink";
import { Icon } from "@/components/common/Icon";
import { GREEN_LINE } from "@/domain/referentials";
import { useI18n } from "@/i18n/useI18n";

export default function NotFoundPage() {
  const { t } = useI18n();

  return (
    <div className="rounded-2xl bg-navy px-6 py-10 text-white shadow-panel sm:px-9">
      <div className="gov-eyebrow text-teal-light">
        {t({ fr: "Page introuvable", en: "Page not found" })}
      </div>
      <h1 className="my-2.5 text-[clamp(28px,4vw,40px)] text-white">
        {t({
          fr: "Cette page n’existe pas ou a été déplacée",
          en: "This page does not exist or has been moved",
        })}
      </h1>
      <p className="max-w-[680px] text-[#C6D4E7]">
        {t({
          fr: `Revenez à l’accueil pour faire un signalement ou suivre un dossier. En cas d’urgence, appelez la ligne verte ${GREEN_LINE}.`,
          en: `Go back to the home page to make a report or track a case. In an emergency, call the ${GREEN_LINE} green line.`,
        })}
      </p>
      <div className="mt-5 flex flex-wrap gap-2.5">
        <ActionButton variant="primary" asChild>
          <HashLink to={ROUTES.home}>
            <Icon name="home" />
            {t({ fr: "Retour à l’accueil", en: "Back to home" })}
          </HashLink>
        </ActionButton>
        <ActionButton variant="outline" asChild>
          <a href={`tel:${GREEN_LINE}`}>
            <Icon name="phone" />
            {t({ fr: `Appeler le ${GREEN_LINE}`, en: `Call ${GREEN_LINE}` })}
          </a>
        </ActionButton>
      </div>
    </div>
  );
}
