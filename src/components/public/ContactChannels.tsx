import { SectionTitle } from "@/components/common/SectionTitle";
import { ServiceCard } from "@/components/common/ServiceCard";
import { SERVICE_CONFIG } from "@/domain/config";
import { GREEN_LINE } from "@/domain/referentials";
import { useI18n } from "@/i18n/useI18n";
import { UssdSimulator } from "./UssdSimulator";

const bigNumber = "my-0.5 block text-[28px] font-extrabold tracking-[0.02em] text-navy";

/** Toutes les portes d'entrée, y compris celles qui ne demandent pas Internet. */
export function ContactChannels() {
  const { t } = useI18n();

  return (
    <div id="joindre" className="mt-11 scroll-mt-24">
      <SectionTitle
        title={t({
          fr: "Pas d’Internet ? D’autres façons de nous joindre",
          en: "No internet? Other ways to reach us",
        })}
        description={t({
          fr: "Quel que soit le moyen utilisé, votre demande arrive aux mêmes équipes et suit le même parcours.",
          en: "Every request, whatever the way it arrives, is handled by the same teams, with the same care.",
        })}
      />

      <div className="grid items-start gap-[18px] lg:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <ServiceCard
            icon="headset"
            tone="red"
            title={t({ fr: "Ligne verte", en: "Green line" })}
            highlight={
              <a href={`tel:${GREEN_LINE}`} className={bigNumber}>
                {GREEN_LINE}
              </a>
            }
            description={t({
              fr: "Parlez à un écoutant. Pour les femmes et les enfants victimes de violences.",
              en: "Talk to a counsellor. For women and children facing violence.",
            })}
          />
          <ServiceCard
            icon="phone"
            tone="teal"
            title={t({ fr: "Code court", en: "Short code" })}
            highlight={<span className={bigNumber}>{SERVICE_CONFIG.shortCode}</span>}
            description={t({
              fr: "Depuis n’importe quel téléphone, même sans Internet. Essayez ci-contre.",
              en: "From any phone, even without internet. Try it opposite.",
            })}
          />
          <ServiceCard
            icon="mail"
            title="SMS"
            highlight={
              <span className={bigNumber}>
                {t({ fr: "AIDE", en: "HELP" })} → {SERVICE_CONFIG.smsNumber}
              </span>
            }
            description={t({
              fr: "Envoyez ce mot pour être rappelé(e) discrètement.",
              en: "Send this word to be called back discreetly.",
            })}
          />
          <ServiceCard
            icon="mobile"
            tone="navy"
            title={t({ fr: "Application mobile", en: "Mobile app" })}
            highlight={<span className={`${bigNumber} !text-xl`}>PROTECT-CAMEROUN</span>}
            description={t({
              fr: "Sur Android et iPhone, avec les mêmes services que ce site.",
              en: "On Android and iPhone, with the same features as this site.",
            })}
          />
        </div>

        <UssdSimulator />
      </div>
    </div>
  );
}
