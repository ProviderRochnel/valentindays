import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/iconRegistry";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useI18n } from "@/i18n/useI18n";
import type { Bilingual } from "@/domain/types";

const COMMITMENTS: readonly { icon: IconName; title: Bilingual; text: Bilingual }[] = [
  {
    icon: "lock",
    title: { fr: "Confidentialité", en: "Confidentiality" },
    text: {
      fr: "Vos informations sont protégées et ne sont jamais rendues publiques.",
      en: "Your information is protected and never made public.",
    },
  },
  {
    icon: "user",
    title: { fr: "Accès limité au nécessaire", en: "Need-to-know access" },
    text: {
      fr: "Chacun ne voit que ce dont il a besoin pour sa mission.",
      en: "Each person only sees what they need for their role.",
    },
  },
  {
    icon: "history",
    title: { fr: "Traçabilité", en: "Traceability" },
    text: {
      fr: "Chaque consultation et chaque action sont enregistrées.",
      en: "Every consultation and every action is recorded.",
    },
  },
  {
    icon: "child",
    title: { fr: "Protection de l’enfant", en: "Child protection" },
    text: {
      fr: "Les situations impliquant un enfant sont traitées en priorité.",
      en: "Situations involving a child are handled as a priority.",
    },
  },
  {
    icon: "mail",
    title: { fr: "Messages discrets", en: "Discreet messages" },
    text: {
      fr: "Aucun SMS ne révèle la nature de votre demande.",
      en: "No text message reveals the nature of your request.",
    },
  },
  {
    icon: "map",
    title: { fr: "Statistiques anonymes", en: "Anonymous statistics" },
    text: {
      fr: "Les chiffres publiés sont regroupés par région. Aucune adresse n’est jamais affichée.",
      en: "Published figures are grouped by region. No personal address is ever shown.",
    },
  },
];

export function Commitments() {
  const { t } = useI18n();

  return (
    <div className="mt-11">
      <SectionTitle title={t({ fr: "Nos engagements", en: "Our commitments" })} />
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {COMMITMENTS.map((item) => (
          <div
            key={item.icon}
            className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-3 gap-y-1 rounded-xl border border-line bg-white p-4"
          >
            <Icon name={item.icon} className="row-span-2 mt-px size-[22px] text-blue" />
            <b className="text-navy">{t(item.title)}</b>
            <p className="text-[13.5px] text-ink-2">{t(item.text)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
