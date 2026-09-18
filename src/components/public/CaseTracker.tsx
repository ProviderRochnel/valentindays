import { useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { Field } from "@/components/common/Field";
import { Panel, PanelBody, PanelHeader, PanelTitle } from "@/components/common/Panel";
import { Timeline, type TimelineItem } from "@/components/common/Timeline";
import { formatClock, normalizeTrackingCode } from "@/domain/reporting";
import { useI18n } from "@/i18n/useI18n";
import { useService } from "@/state/useService";

/**
 * Suivi d'un dossier par code. Aucune donnée personnelle n'est affichée :
 * la page ne montre que l'avancement du traitement.
 */
export function CaseTracker() {
  const { t } = useI18n();
  const { caseState } = useService();
  const [input, setInput] = useState("");
  const [trackedCode, setTrackedCode] = useState<string | null>(null);
  const [invalid, setInvalid] = useState(false);

  const track = () => {
    const normalized = normalizeTrackingCode(input);
    if (!normalized) {
      setInvalid(true);
      setTrackedCode(null);
      return;
    }
    setInput(normalized);
    setInvalid(false);
    setTrackedCode(normalized);
  };

  const isFreshReport = trackedCode !== null && trackedCode === caseState.lastTrackingCode;

  const items: TimelineItem[] = isFreshReport
    ? [
        {
          state: "done",
          label: t({ fr: "Signalement reçu", en: "Report received" }),
          detail: `${t({ fr: "Aujourd’hui · ", en: "Today · " })}${formatClock()}`,
        },
        {
          state: "current",
          label: t({ fr: "Examen par un agent", en: "Being reviewed by an officer" }),
          detail: t({ fr: "en cours", en: "in progress" }),
        },
        {
          state: "todo",
          label: t({
            fr: "Orientation vers une structure d’aide",
            en: "Referral to a support service",
          }),
          detail: t({ fr: "prochaine étape", en: "next step" }),
        },
        { state: "todo", label: t({ fr: "Suivi", en: "Follow-up" }) },
      ]
    : [
        {
          state: "done",
          label: t({ fr: "Signalement reçu", en: "Report received" }),
          detail: t({ fr: "12 sept. · 18 h 40", en: "12 Sept · 6:40 pm" }),
        },
        {
          state: "done",
          label: t({
            fr: "Situation examinée par un agent",
            en: "Situation reviewed by an officer",
          }),
          detail: t({ fr: "12 sept. · 19 h 05", en: "12 Sept · 7:05 pm" }),
        },
        {
          state: "done",
          label: t({
            fr: "Orientation vers une structure d’aide",
            en: "Referred to a support service",
          }),
          detail: t({ fr: "13 sept.", en: "13 Sept" }),
        },
        {
          state: "current",
          label: t({ fr: "Suivi en cours", en: "Follow-up in progress" }),
          detail: t({ fr: "prochain point le 19 sept.", en: "next check on 19 Sept" }),
        },
      ];

  return (
    <Panel id="suivre" aria-labelledby="track-title" className="scroll-mt-24">
      <PanelHeader>
        <PanelTitle id="track-title">
          {t({ fr: "Suivre mon dossier", en: "Track my case" })}
        </PanelTitle>
      </PanelHeader>

      <PanelBody className="flex flex-col gap-3">
        <p className="text-[13px] text-muted-ink">
          {t({
            fr: "Saisissez le code reçu lors du signalement.",
            en: "Enter the code you received when you made your report.",
          })}
        </p>

        <Field
          label={t({ fr: "Code de suivi", en: "Tracking code" })}
          htmlFor="track-code"
          error={
            invalid
              ? t({
                  fr: "Vérifiez votre code : il comporte 6 caractères, par exemple K4P-92Q.",
                  en: "Check your code: it has 6 characters, for example K4P-92Q.",
                })
              : undefined
          }
        >
          <div className="flex flex-nowrap gap-2.5">
            <input
              id="track-code"
              className="gov-input font-mono-gov uppercase"
              placeholder={t({ fr: "Ex. K4P-92Q", en: "E.g. K4P-92Q" })}
              autoComplete="off"
              maxLength={7}
              value={input}
              onChange={(event) => {
                setInput(event.target.value);
                setInvalid(false);
              }}
              onKeyDown={(event) => {
                if (event.key === "Enter") track();
              }}
            />
            <ActionButton variant="blue" onClick={track}>
              {t({ fr: "Voir", en: "View" })}
            </ActionButton>
          </div>
        </Field>

        {trackedCode ? (
          <>
            <Timeline items={items} />
            <p className="text-[13px] text-muted-ink">
              {t({
                fr: "Aucune information personnelle n’est affichée ici.",
                en: "No personal information is displayed here.",
              })}
            </p>
          </>
        ) : null}
      </PanelBody>
    </Panel>
  );
}
