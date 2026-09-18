import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/iconRegistry";
import { Panel, PanelBody, PanelHeader, PanelTitle } from "@/components/common/Panel";
import { useI18n } from "@/i18n/useI18n";
import type { Bilingual } from "@/domain/types";

const TIPS: readonly { icon: IconName; text: Bilingual }[] = [
  {
    icon: "exit",
    text: {
      fr: "Le bouton « Quitter rapidement » (ou la touche Échap) remplace immédiatement cette page.",
      en: "The “Quick exit” button (or the Esc key) immediately replaces this page.",
    },
  },
  {
    icon: "screen",
    text: {
      fr: "Utilisez un téléphone ou un ordinateur que personne d’autre ne consulte.",
      en: "Use a phone or computer that nobody else checks.",
    },
  },
  {
    icon: "mail",
    text: {
      fr: "Nos SMS ne mentionnent jamais la violence ni le Ministère.",
      en: "Our text messages never mention violence or the Ministry.",
    },
  },
  {
    icon: "history",
    text: {
      fr: "Après votre visite, effacez l’historique de votre navigateur.",
      en: "After your visit, clear your browser history.",
    },
  },
];

export function SafetyTips() {
  const { t } = useI18n();

  return (
    <Panel>
      <PanelHeader>
        <PanelTitle>{t({ fr: "Votre sécurité d’abord", en: "Your safety first" })}</PanelTitle>
      </PanelHeader>
      <PanelBody>
        <ul className="flex list-none flex-col gap-2.5 p-0 text-sm">
          {TIPS.map((tip) => (
            <li key={tip.icon} className="flex items-start gap-2.5">
              <Icon name={tip.icon} className="mt-0.5 size-[17px] text-teal" />
              <span>{t(tip.text)}</span>
            </li>
          ))}
        </ul>
      </PanelBody>
    </Panel>
  );
}
