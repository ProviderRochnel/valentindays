import { useCallback } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { Panel, PanelBody, PanelHeader, PanelTitle } from "@/components/common/Panel";
import type { NewCaseInput } from "@/domain/types";
import { LAST_INPUT_STEP, useReportForm } from "@/hooks/useReportForm";
import { useI18n } from "@/i18n/useI18n";
import { useService } from "@/state/useService";
import { cn } from "@/lib/utils";
import { AttachmentsStep } from "./report/AttachmentsStep";
import { ConfirmationStep } from "./report/ConfirmationStep";
import { ContactStep } from "./report/ContactStep";
import { ReporterStep } from "./report/ReporterStep";
import { SituationStep } from "./report/SituationStep";

const STEP_NAMES = [
  { fr: "Vous", en: "You" },
  { fr: "La situation", en: "The situation" },
  { fr: "Pièces jointes", en: "Attachments" },
  { fr: "Vous recontacter", en: "Getting back to you" },
  { fr: "Confirmation", en: "Confirmation" },
];

/**
 * Formulaire public de signalement. Il est découpé en quatre étapes courtes
 * pour rester praticable sur un téléphone, dans l'urgence.
 */
export function ReportWizard() {
  const { t } = useI18n();
  const { dispatchCase } = useService();

  const openCase = useCallback(
    (input: NewCaseInput, trackingCode: string) =>
      dispatchCase({ type: "open", input, trackingCode }),
    [dispatchCase],
  );

  const {
    step,
    draft,
    errors,
    trackingCode,
    update,
    addAttachments,
    removeAttachment,
    goBack,
    goForward,
  } = useReportForm(openCase);

  const nextLabel =
    step === LAST_INPUT_STEP
      ? t({ fr: "Envoyer le signalement", en: "Send the report" })
      : step === 5
        ? t({ fr: "Faire un autre signalement", en: "Make another report" })
        : t({ fr: "Continuer", en: "Continue" });

  return (
    <Panel id="signaler" aria-labelledby="report-title" className="scroll-mt-24">
      <PanelHeader>
        <PanelTitle id="report-title">
          {t({ fr: "Faire un signalement", en: "Make a report" })}
        </PanelTitle>
      </PanelHeader>

      <PanelBody>
        <div aria-hidden className="mb-1.5 flex gap-1.5">
          {[1, 2, 3, 4].map((index) => (
            <i
              key={index}
              className={cn(
                "block h-2 flex-1 rounded-[20px] bg-[#E4EAF2]",
                step > 4 || index < step ? "bg-teal" : index === step ? "bg-blue" : "",
              )}
            />
          ))}
        </div>

        <div className="mb-[18px] flex justify-between gap-2.5 text-[13px] text-muted-ink">
          <span>
            {step <= LAST_INPUT_STEP
              ? t({ fr: `Étape ${step} sur 4`, en: `Step ${step} of 4` })
              : t({ fr: "Terminé", en: "Done" })}
          </span>
          <b className="text-navy">{t(STEP_NAMES[step - 1])}</b>
        </div>

        <form noValidate onSubmit={(event) => event.preventDefault()}>
          {step === 1 ? (
            <ReporterStep
              mode={draft.mode}
              childInvolved={draft.childInvolved}
              onModeChange={(mode) => update("mode", mode)}
              onChildInvolvedChange={(value) => update("childInvolved", value)}
            />
          ) : null}

          {step === 2 ? (
            <SituationStep
              draft={draft}
              descriptionError={Boolean(errors.description)}
              onChange={update}
            />
          ) : null}

          {step === 3 ? (
            <AttachmentsStep
              attachments={draft.attachments}
              onAdd={addAttachments}
              onRemove={removeAttachment}
            />
          ) : null}

          {step === 4 ? (
            <ContactStep draft={draft} consentError={Boolean(errors.consent)} onChange={update} />
          ) : null}

          {step === 5 && trackingCode ? <ConfirmationStep trackingCode={trackingCode} /> : null}

          <div className="mt-5 flex flex-wrap justify-between gap-2.5 border-t border-line pt-4">
            {step > 1 && step < 5 ? (
              <ActionButton onClick={goBack}>{t({ fr: "Retour", en: "Back" })}</ActionButton>
            ) : (
              <span />
            )}
            <ActionButton variant={step === 5 ? "neutral" : "primary"} onClick={goForward}>
              {nextLabel}
            </ActionButton>
          </div>
        </form>
      </PanelBody>
    </Panel>
  );
}
