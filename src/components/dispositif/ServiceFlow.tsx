import { Icon } from "@/components/common/Icon";
import type { IconName } from "@/components/common/iconRegistry";
import { SectionTitle } from "@/components/common/SectionTitle";
import { useI18n } from "@/i18n/useI18n";
import type { Bilingual } from "@/domain/types";
import { cn } from "@/lib/utils";

interface Chip {
  icon?: IconName;
  label: Bilingual;
}

const ENTRY_POINTS: readonly Chip[] = [
  { icon: "screen", label: { fr: "Site internet", en: "Website" } },
  { icon: "mobile", label: { fr: "Application mobile", en: "Mobile app" } },
  { icon: "headset", label: { fr: "Ligne verte 116", en: "116 green line" } },
  { icon: "phone", label: { fr: "Code court, sans Internet", en: "Short code, without internet" } },
  { icon: "mail", label: { fr: "SMS", en: "Text message" } },
];

const MINISTRY_ACTIONS: readonly Chip[] = [
  { label: { fr: "Écouter", en: "Listen" } },
  { label: { fr: "Évaluer le danger", en: "Assess the danger" } },
  { label: { fr: "Orienter", en: "Refer" } },
  { label: { fr: "Suivre", en: "Follow up" } },
  { label: { fr: "Relancer", en: "Send reminders" } },
];

const PARTNERS: readonly Chip[] = [
  { icon: "home", label: { fr: "Centres d’accueil", en: "Shelters" } },
  { icon: "health", label: { fr: "Formations sanitaires", en: "Health facilities" } },
  { icon: "users", label: { fr: "Services sociaux", en: "Social services" } },
  { icon: "scale", label: { fr: "Justice et aide juridique", en: "Justice and legal aid" } },
  { icon: "heart", label: { fr: "Associations", en: "Associations" } },
];

const SAFEGUARDS: readonly Chip[] = [
  {
    icon: "user",
    label: { fr: "Accès réservé aux personnes habilitées", en: "Access for authorised people only" },
  },
  { icon: "check", label: { fr: "Votre accord est demandé", en: "Your consent is asked" } },
  {
    icon: "history",
    label: { fr: "Chaque consultation est enregistrée", en: "Every consultation is recorded" },
  },
  {
    icon: "lock",
    label: { fr: "Documents conservés sous protection", en: "Documents kept under lock" },
  },
  { icon: "folder", label: { fr: "Sauvegardes régulières", en: "Regular backups" } },
];

export function ServiceFlow() {
  const { t } = useI18n();

  return (
    <div className="mt-11">
      <SectionTitle
        title={t({
          fr: "Comment votre demande est prise en charge",
          en: "How your request is handled",
        })}
        description={t({
          fr: "Tous les accès mènent aux mêmes équipes et aux mêmes règles de protection.",
          en: "All access points lead to the same teams and the same rules of protection.",
        })}
      />

      <div className="grid items-stretch gap-3.5 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="flex flex-col">
          <Band
            tone="light"
            icon="screen"
            title={t({ fr: "Vous prenez contact", en: "You get in touch" })}
            chips={ENTRY_POINTS}
          />
          <Arrow />
          <Band
            tone="blue"
            icon="shield"
            title={t({
              fr: "Un point d’accueil unique et sécurisé",
              en: "A single, secure reception point",
            })}
            description={t({
              fr: "Chaque demande est reçue au même endroit, protégée et enregistrée, quelle que soit son origine.",
              en: "Every request is received in the same place, protected and recorded, whatever its origin.",
            })}
          />
          <Arrow />
          <Band
            tone="teal"
            icon="folder"
            title={t({ fr: "Les équipes du MINPROFF agissent", en: "MINPROFF teams take action" })}
            chips={MINISTRY_ACTIONS}
          />
          <Arrow />
          <Band
            tone="navy"
            icon="network"
            title={t({ fr: "Les partenaires accompagnent", en: "Partners provide support" })}
            chips={PARTNERS}
          />
        </div>

        <div className="flex flex-col rounded-xl bg-navy p-4 text-white">
          <BandTitle icon="lock" title={t({ fr: "À chaque étape", en: "At every stage" })} />
          <div className="flex flex-col gap-[7px]">
            {SAFEGUARDS.map((chip) => (
              <ChipItem key={chip.label.fr} chip={chip} />
            ))}
          </div>
          <p className="mt-2.5 text-[13.5px] opacity-85">
            {t({
              fr: "Ces règles s’appliquent de la même façon, quel que soit l’accès utilisé.",
              en: "These rules apply in the same way, whatever the access point used.",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

const BAND_TONES = {
  light: "border border-blue-line bg-blue-soft text-[#1E3F6E]",
  blue: "bg-blue text-white",
  teal: "bg-teal text-white",
  navy: "bg-navy text-white",
} as const;

function Band({
  tone,
  icon,
  title,
  chips,
  description,
}: {
  tone: keyof typeof BAND_TONES;
  icon: IconName;
  title: string;
  chips?: readonly Chip[];
  description?: string;
}) {
  return (
    <div className={cn("rounded-xl px-4 py-4", BAND_TONES[tone])}>
      <BandTitle icon={icon} title={title} />
      {description ? <p className="text-[13.5px] opacity-85">{description}</p> : null}
      {chips ? (
        <div className="flex flex-wrap gap-[7px]">
          {chips.map((chip) => (
            <ChipItem key={chip.label.fr} chip={chip} light={tone === "light"} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function BandTitle({ icon, title }: { icon: IconName; title: string }) {
  return (
    <h4 className="mb-2.5 flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-inherit">
      <Icon name={icon} className="size-4" />
      {title}
    </h4>
  );
}

function ChipItem({ chip, light }: { chip: Chip; light?: boolean }) {
  const { t } = useI18n();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[7px] rounded-lg border px-2.5 py-[7px] text-[13.5px] font-semibold",
        light
          ? "border-line bg-white text-ink"
          : "border-white/20 bg-white/[0.13] text-inherit",
      )}
    >
      {chip.icon ? <Icon name={chip.icon} className="size-[15px]" /> : null}
      {t(chip.label)}
    </span>
  );
}

function Arrow() {
  return (
    <div className="flex h-7 items-center justify-center text-muted-ink">
      <Icon name="down" className="size-5" />
    </div>
  );
}
