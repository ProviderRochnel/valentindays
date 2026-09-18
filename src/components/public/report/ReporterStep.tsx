import { ChoiceCard } from "@/components/common/ChoiceCard";
import { Field } from "@/components/common/Field";
import { Notice } from "@/components/common/Notice";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import type { ReporterMode, TriState } from "@/domain/reporting";
import { useI18n } from "@/i18n/useI18n";
import { useTriStateOptions } from "./triState";

interface ReporterStepProps {
  mode: ReporterMode;
  childInvolved: TriState;
  onModeChange: (mode: ReporterMode) => void;
  onChildInvolvedChange: (value: TriState) => void;
}

export function ReporterStep({
  mode,
  childInvolved,
  onModeChange,
  onChildInvolvedChange,
}: ReporterStepProps) {
  const { t } = useI18n();
  const triStateOptions = useTriStateOptions();

  return (
    <div className="flex flex-col gap-4">
      <Field label={t({ fr: "Qui fait ce signalement ?", en: "Who is making this report?" })}>
        <div className="grid gap-2 md:grid-cols-3">
          <ChoiceCard
            name="reporter-mode"
            value="anon"
            checked={mode === "anon"}
            onChange={(value) => onModeChange(value as ReporterMode)}
            icon="eye-off"
            title={t({ fr: "Anonyme", en: "Anonymous" })}
            description={t({
              fr: "Aucune information sur votre identité n’est demandée.",
              en: "No information about your identity is requested.",
            })}
          />
          <ChoiceCard
            name="reporter-mode"
            value="conf"
            checked={mode === "conf"}
            onChange={(value) => onModeChange(value as ReporterMode)}
            icon="lock"
            title={t({ fr: "Confidentiel", en: "Confidential" })}
            description={t({
              fr: "Seuls les agents habilités voient vos coordonnées.",
              en: "Only authorised officers can see your contact details.",
            })}
          />
          <ChoiceCard
            name="reporter-mode"
            value="third"
            checked={mode === "third"}
            onChange={(value) => onModeChange(value as ReporterMode)}
            icon="users"
            title={t({ fr: "Pour une autre personne", en: "For someone else" })}
            description={t({
              fr: "Vous êtes témoin, proche ou professionnel.",
              en: "You are a witness, relative or professional.",
            })}
          />
        </div>
      </Field>

      <Field label={t({ fr: "Un enfant est-il concerné ?", en: "Is a child involved?" })}>
        <SegmentedControl
          options={triStateOptions}
          value={childInvolved}
          onChange={onChildInvolvedChange}
          label={t({ fr: "Un enfant est-il concerné ?", en: "Is a child involved?" })}
          className="self-start"
        />
      </Field>

      <Notice icon="shield">
        {t({
          fr: "Votre sécurité est prioritaire. N’indiquez que les informations que vous pouvez transmettre sans danger.",
          en: "Your safety comes first. Only share what you can pass on without putting yourself at risk.",
        })}
      </Notice>
    </div>
  );
}
