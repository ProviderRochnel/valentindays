import { ROUTES } from "@/app/routes";
import { ServiceCard } from "@/components/common/ServiceCard";
import { SectionTitle } from "@/components/common/SectionTitle";
import { GREEN_LINE } from "@/domain/referentials";
import { useI18n } from "@/i18n/useI18n";

/** Quatre portes d'entrée, décrites sans jargon administratif. */
export function ServiceCards() {
  const { t } = useI18n();

  return (
    <div className="mt-11">
      <SectionTitle
        title={t({ fr: "Un accès simple et discret", en: "Simple and discreet access" })}
        description={t({
          fr: "Choisissez le service dont vous avez besoin.",
          en: "Choose the service you need.",
        })}
      />
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <ServiceCard
          icon="doc"
          tone="teal"
          to={`${ROUTES.home}#signaler`}
          title={t({ fr: "Signaler", en: "Report" })}
          description={t({
            fr: "Anonymement, de façon confidentielle ou pour une autre personne.",
            en: "Anonymously, confidentially or on behalf of someone else.",
          })}
          action={t({ fr: "Commencer", en: "Start" })}
        />
        <ServiceCard
          icon="search"
          to={`${ROUTES.home}#suivre`}
          title={t({ fr: "Suivre", en: "Track" })}
          description={t({
            fr: "Consultez l’avancement d’un dossier avec votre code de suivi.",
            en: "Check the progress of a case with your tracking code.",
          })}
          action={t({ fr: "Saisir mon code", en: "Enter my code" })}
        />
        <ServiceCard
          icon="map"
          to={`${ROUTES.home}#aide`}
          title={t({ fr: "Trouver de l’aide", en: "Find help" })}
          description={t({
            fr: "Accueil, services sociaux, santé et aide juridique près de chez vous.",
            en: "Shelters, social services, health care and legal aid near you.",
          })}
          action={t({ fr: "Choisir ma région", en: "Choose my region" })}
        />
        <ServiceCard
          icon="phone"
          tone="red"
          href={`tel:${GREEN_LINE}`}
          title={t({ fr: `Appeler le ${GREEN_LINE}`, en: `Call the ${GREEN_LINE} green line` })}
          description={t({
            fr: "Parlez à un écoutant par téléphone. Ligne verte pour les femmes et les enfants.",
            en: "Talk to a counsellor on the phone, for women and children.",
          })}
          action={t({ fr: "Appeler maintenant", en: "Call now" })}
        />
      </div>
    </div>
  );
}
