import { Field } from "@/components/common/Field";
import { Notice } from "@/components/common/Notice";
import { RegionSelect } from "@/components/common/RegionSelect";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { PUBLIC_VIOLENCE_TYPES, VIOLENCE_TYPES } from "@/domain/referentials";
import type { TriState } from "@/domain/reporting";
import type { RegionCode, ViolenceTypeCode } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import type { ReportDraft, TimeFrame } from "@/hooks/useReportForm";
import { useTriStateOptions } from "./triState";

const TIME_FRAMES: readonly { value: TimeFrame; label: { fr: string; en: string } }[] = [
  { value: "now", label: { fr: "En ce moment", en: "Right now" } },
  { value: "days", label: { fr: "Ces derniers jours", en: "In the last few days" } },
  { value: "month", label: { fr: "Ce mois-ci", en: "This month" } },
  { value: "long", label: { fr: "Depuis longtemps", en: "For a long time" } },
];

interface SituationStepProps {
  draft: ReportDraft;
  descriptionError: boolean;
  onChange: <K extends keyof ReportDraft>(key: K, value: ReportDraft[K]) => void;
}

export function SituationStep({ draft, descriptionError, onChange }: SituationStepProps) {
  const { t } = useI18n();
  const triStateOptions = useTriStateOptions();

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-3.5 sm:grid-cols-2">
        <Field label={t({ fr: "Type de situation", en: "Type of situation" })} htmlFor="report-type">
          <select
            id="report-type"
            className="gov-input"
            value={draft.violenceType}
            onChange={(event) => onChange("violenceType", event.target.value as ViolenceTypeCode)}
          >
            {PUBLIC_VIOLENCE_TYPES.map((code) => (
              <option key={code} value={code}>
                {t(VIOLENCE_TYPES[code])}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t({ fr: "Quand ?", en: "When?" })} htmlFor="report-when">
          <select
            id="report-when"
            className="gov-input"
            value={draft.timeFrame}
            onChange={(event) => onChange("timeFrame", event.target.value as TimeFrame)}
          >
            {TIME_FRAMES.map((frame) => (
              <option key={frame.value} value={frame.value}>
                {t(frame.label)}
              </option>
            ))}
          </select>
        </Field>

        <Field label={t({ fr: "Région", en: "Region" })} htmlFor="report-region">
          <RegionSelect
            id="report-region"
            value={draft.region}
            onChange={(value) => onChange("region", (value || draft.region) as RegionCode)}
          />
        </Field>

        <Field
          label={t({ fr: "Ville ou quartier", en: "Town or neighbourhood" })}
          optional={t({ fr: "(facultatif)", en: "(optional)" })}
          htmlFor="report-town"
        >
          <input
            id="report-town"
            className="gov-input"
            autoComplete="off"
            value={draft.town}
            onChange={(event) => onChange("town", event.target.value)}
          />
        </Field>
      </div>

      <Field
        label={t({
          fr: "Décrivez la situation avec vos mots",
          en: "Describe the situation in your own words",
        })}
        htmlFor="report-description"
        hint={t({
          fr: "N’indiquez que ce que vous savez. Un agent pourra vous poser des questions.",
          en: "Only write what you know. An officer may ask you further questions.",
        })}
        error={
          descriptionError
            ? t({
                fr: "Décrivez la situation en quelques mots pour continuer.",
                en: "Please describe the situation in a few words to continue.",
              })
            : undefined
        }
      >
        <textarea
          id="report-description"
          className="gov-input min-h-[110px] resize-y"
          placeholder={t({
            fr: "Décrivez ce que vous savez…",
            en: "Describe what you know…",
          })}
          value={draft.description}
          onChange={(event) => onChange("description", event.target.value)}
        />
      </Field>

      <Field
        label={t({
          fr: "Quelqu’un est-il en danger en ce moment ?",
          en: "Is someone in danger right now?",
        })}
      >
        <SegmentedControl
          options={triStateOptions}
          value={draft.dangerNow}
          onChange={(value) => onChange("dangerNow", value as TriState)}
          label={t({
            fr: "Quelqu’un est-il en danger en ce moment ?",
            en: "Is someone in danger right now?",
          })}
          className="self-start"
        />
      </Field>

      {draft.dangerNow === "yes" ? (
        <Notice
          icon="alert"
          tone="danger"
          title={t({
            fr: "Appelez d’abord les secours si vous le pouvez",
            en: "Call for help first if you can",
          })}
        >
          {t({
            fr: "Police 117 · Gendarmerie 113. Votre signalement sera traité en priorité.",
            en: "Police 117 · Gendarmerie 113. Your report will be treated as a priority.",
          })}
        </Notice>
      ) : null}
    </div>
  );
}
