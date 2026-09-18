import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useI18n } from "@/i18n/useI18n";
import type { Bilingual } from "@/domain/types";

const QUESTIONS: readonly { question: Bilingual; answer: Bilingual }[] = [
  {
    question: { fr: "Puis-je rester anonyme ?", en: "Can I remain anonymous?" },
    answer: {
      fr: "Oui. Choisissez « Anonyme » à la première étape : aucune information sur votre identité n’est demandée. Vous suivez votre dossier grâce au code reçu à la fin.",
      en: "Yes. Choose “Anonymous” at the first step: no information about your identity is requested. You follow your case with the code you receive at the end.",
    },
  },
  {
    question: {
      fr: "Que se passe-t-il après mon signalement ?",
      en: "What happens after my report?",
    },
    answer: {
      fr: "Un agent formé l’examine, évalue le niveau de danger et, si nécessaire, oriente la situation vers la bonne structure : accueil, santé, services sociaux ou aide juridique. Chaque dossier a un responsable et une date de suivi.",
      en: "A trained officer reviews it, assesses the level of danger and, if needed, refers the situation to the right service: shelter, health care, social services or legal aid. Each case has a named officer and a follow-up date.",
    },
  },
  {
    question: { fr: "Qui peut voir mes informations ?", en: "Who can see my information?" },
    answer: {
      fr: "Uniquement les agents habilités du MINPROFF. Les structures partenaires ne reçoivent que ce dont elles ont besoin pour vous aider. Chaque consultation est enregistrée.",
      en: "Only authorised MINPROFF officers. Partner organisations only receive what they need to help you. Every consultation is recorded.",
    },
  },
  {
    question: {
      fr: "Je veux signaler pour un enfant. Que faire ?",
      en: "I want to report for a child. What should I do?",
    },
    answer: {
      fr: "Choisissez « Pour une autre personne » et répondez « Oui » à la question « Un enfant est-il concerné ? ». Les situations impliquant un enfant sont traitées en priorité. Vous pouvez aussi appeler la ligne verte 116.",
      en: "Choose “For someone else” and answer “Yes” to “Is a child involved?”. Situations involving a child are handled as a priority. You can also call the 116 green line.",
    },
  },
  {
    question: {
      fr: "Je n’ai pas de smartphone. Puis-je quand même demander de l’aide ?",
      en: "I don’t have a smartphone. Can I still ask for help?",
    },
    answer: {
      fr: "Oui : appelez la ligne verte 116, composez le code court depuis n’importe quel téléphone ou envoyez un SMS. Votre demande suit le même parcours qu’un signalement fait sur ce site.",
      en: "Yes: call the 116 green line, dial the short code from any phone, or send a text message. Your request follows the same path as a report made on this site.",
    },
  },
  {
    question: { fr: "Ce service est-il disponible en anglais ?", en: "Is this service in English?" },
    answer: {
      fr: "Oui. Utilisez les boutons FR / EN en haut de la page. Les écoutants de la ligne verte parlent français et anglais.",
      en: "Yes. Use the FR / EN buttons at the top of the page. Counsellors on the green line speak French and English.",
    },
  },
];

export function FaqSection() {
  const { t } = useI18n();

  return (
    <div id="questions" className="mt-11 scroll-mt-24">
      <SectionTitle title={t({ fr: "Questions fréquentes", en: "Frequently asked questions" })} />

      <Accordion type="single" collapsible className="flex flex-col gap-2">
        {QUESTIONS.map((entry, index) => (
          <AccordionItem
            key={entry.question.fr}
            value={`q-${index}`}
            className="rounded-[10px] border border-line bg-white"
          >
            <AccordionTrigger className="px-[18px] py-3.5 text-left font-bold text-navy hover:no-underline">
              {t(entry.question)}
            </AccordionTrigger>
            <AccordionContent className="max-w-[78ch] px-[18px] pb-4 text-[14.5px] text-ink-2">
              {t(entry.answer)}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
