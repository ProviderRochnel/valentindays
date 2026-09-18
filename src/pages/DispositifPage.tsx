import { ROUTES } from "@/app/routes";
import { ActionButton } from "@/components/common/ActionButton";
import { HashLink } from "@/components/common/HashLink";
import { Icon } from "@/components/common/Icon";
import { PageHead } from "@/components/common/PageHead";
import { Actors } from "@/components/dispositif/Actors";
import { Commitments } from "@/components/dispositif/Commitments";
import { RequestJourney } from "@/components/dispositif/RequestJourney";
import { RolloutTimeline } from "@/components/dispositif/RolloutTimeline";
import { ServiceFlow } from "@/components/dispositif/ServiceFlow";
import { useI18n } from "@/i18n/useI18n";

/** Page d'explication du dispositif : parcours, acteurs, engagements, jalons. */
export default function DispositifPage() {
  const { t } = useI18n();

  return (
    <>
      <PageHead
        eyebrow={t({ fr: "Le dispositif", en: "How it works" })}
        title={t({
          fr: "Un seul dispositif, plusieurs portes d’entrée",
          en: "One service, several ways in",
        })}
        description={t({
          fr: "Que vous passiez par le site, l’application, un simple téléphone, un SMS ou la ligne verte, votre demande arrive au même endroit et suit le même parcours, jusqu’à sa résolution.",
          en: "Whether you use the website, the app, a simple phone, a text message or the green line, your request reaches the same place and follows the same path, until it is resolved.",
        })}
        action={
          <ActionButton variant="primary" asChild>
            <HashLink to={ROUTES.home} hash="signaler">
              {t({ fr: "Faire un signalement", en: "Make a report" })}
              <Icon name="arrow" />
            </HashLink>
          </ActionButton>
        }
      />

      <ServiceFlow />
      <RequestJourney />
      <Actors />
      <Commitments />
      <RolloutTimeline />
    </>
  );
}
