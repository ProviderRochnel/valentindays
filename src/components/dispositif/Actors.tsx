import { SectionTitle } from "@/components/common/SectionTitle";
import { ServiceCard } from "@/components/common/ServiceCard";
import { useI18n } from "@/i18n/useI18n";

export function Actors() {
  const { t } = useI18n();

  return (
    <div className="mt-11">
      <SectionTitle title={t({ fr: "Qui intervient ?", en: "Who does what?" })} />
      <div className="grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <ServiceCard
          icon="user"
          tone="teal"
          title={t({
            fr: "Personnes concernées et témoins",
            en: "People affected and witnesses",
          })}
          description={t({
            fr: "Signalent une situation, anonymement ou non, et suivent son avancement.",
            en: "They report a situation, anonymously or not, and follow its progress.",
          })}
        />
        <ServiceCard
          icon="folder"
          title={t({ fr: "Agents du MINPROFF", en: "MINPROFF officers" })}
          description={t({
            fr: "Reçoivent, évaluent, orientent et suivent chaque dossier jusqu’à sa clôture.",
            en: "They receive, assess, refer and follow each case to its closure.",
          })}
        />
        <ServiceCard
          icon="headset"
          tone="red"
          title={t({ fr: "Écoutants", en: "Counsellors" })}
          description={t({
            fr: "Répondent à la ligne verte, écoutent, ouvrent un dossier et planifient un rappel.",
            en: "They answer the green line, listen, open a case and plan a call-back.",
          })}
        />
        <ServiceCard
          icon="network"
          tone="navy"
          title={t({ fr: "Structures partenaires", en: "Partner organisations" })}
          description={t({
            fr: "Prennent en charge la personne et rendent compte des actions menées.",
            en: "They take charge of the person and report on the actions carried out.",
          })}
        />
      </div>
    </div>
  );
}
