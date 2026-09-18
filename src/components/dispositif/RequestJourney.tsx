import { SectionTitle } from "@/components/common/SectionTitle";
import { useI18n } from "@/i18n/useI18n";
import type { Bilingual } from "@/domain/types";

const STEPS: readonly { title: Bilingual; description: Bilingual; who: Bilingual }[] = [
  {
    title: { fr: "Signalement", en: "Report" },
    description: {
      fr: "La demande est reçue, quel que soit le moyen utilisé.",
      en: "The request is received, whatever the channel.",
    },
    who: { fr: "Vous", en: "You" },
  },
  {
    title: { fr: "Évaluation", en: "Assessment" },
    description: {
      fr: "Un agent vérifie les informations et évalue le niveau de danger.",
      en: "An officer checks the information and assesses the level of danger.",
    },
    who: { fr: "Agent MINPROFF", en: "MINPROFF officer" },
  },
  {
    title: { fr: "Orientation", en: "Referral" },
    description: {
      fr: "La situation est confiée à la structure la plus adaptée.",
      en: "The situation is entrusted to the most suitable service.",
    },
    who: { fr: "Agent MINPROFF", en: "MINPROFF officer" },
  },
  {
    title: { fr: "Prise en charge", en: "Support" },
    description: {
      fr: "Accueil, soins, accompagnement social ou juridique.",
      en: "Shelter, health care, social or legal support.",
    },
    who: { fr: "Partenaire", en: "Partner" },
  },
  {
    title: { fr: "Suivi", en: "Follow-up" },
    description: {
      fr: "Rendez-vous, comptes rendus et relances jusqu’à l’amélioration.",
      en: "Appointments, reports and reminders until the situation improves.",
    },
    who: { fr: "Agent et partenaire", en: "Officer and partner" },
  },
  {
    title: { fr: "Clôture", en: "Closure" },
    description: {
      fr: "Le dossier est clôturé avec la trace de chaque action menée.",
      en: "The case is closed with a written record of every action taken.",
    },
    who: { fr: "Agent MINPROFF", en: "MINPROFF officer" },
  },
];

export function RequestJourney() {
  const { t } = useI18n();

  return (
    <div className="mt-11">
      <SectionTitle
        title={t({ fr: "Le parcours d’une demande", en: "The path of a request" })}
        description={t({
          fr: "Chaque dossier ouvert a un responsable, une prochaine action et une date de suivi.",
          en: "Each open case has a named officer, a next action and a follow-up date.",
        })}
      />

      <div className="grid gap-3 [counter-reset:journey] sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {STEPS.map((step) => (
          <div
            key={step.title.fr}
            className="relative rounded-xl border border-line bg-white p-4 shadow-soft [counter-increment:journey] before:mb-3 before:grid before:size-7 before:place-items-center before:rounded-full before:bg-navy before:text-[13px] before:font-bold before:text-white before:content-[counter(journey)]"
          >
            <h4 className="mb-1.5 text-[15.5px]">{t(step.title)}</h4>
            <p className="text-[13.5px] text-ink-2">{t(step.description)}</p>
            <span className="mt-2.5 block text-xs font-bold uppercase tracking-[0.06em] text-teal">
              {t(step.who)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
