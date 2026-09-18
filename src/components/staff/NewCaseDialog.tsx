import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "@/components/common/ActionButton";
import { Field } from "@/components/common/Field";
import { RegionSelect } from "@/components/common/RegionSelect";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DEFAULT_REGION,
  INTAKE_CHANNELS,
  PRIORITIES,
  PRIORITY_ORDER,
  VIOLENCE_TYPES,
} from "@/domain/referentials";
import type {
  IntakeChannelCode,
  PriorityCode,
  RegionCode,
  ViolenceTypeCode,
} from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { useService } from "@/state/useService";

/** Canaux par lesquels un agent peut enregistrer une demande reçue hors ligne. */
const MANUAL_CHANNELS: readonly IntakeChannelCode[] = ["line", "desk", "code", "sms"];

interface NewCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Agent connecté, inscrit comme responsable du dossier. */
  officer: string;
}

/**
 * Ouverture d'un dossier par un agent, à partir d'un appel sur la ligne verte
 * ou d'un accueil sur place. L'accord de la personne est obligatoire.
 */
export function NewCaseDialog({ open, onOpenChange, officer }: NewCaseDialogProps) {
  const { t } = useI18n();
  const { dispatchCase } = useService();

  const [channel, setChannel] = useState<IntakeChannelCode>("line");
  const [region, setRegion] = useState<RegionCode>(DEFAULT_REGION);
  const [violenceType, setViolenceType] = useState<ViolenceTypeCode>("conj");
  const [priority, setPriority] = useState<PriorityCode>("high");
  const [childInvolved, setChildInvolved] = useState(false);
  const [summary, setSummary] = useState("");
  const [consent, setConsent] = useState(true);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!consent) {
      toast.error(
        t({
          fr: "L’accord de la personne est nécessaire pour ouvrir un dossier.",
          en: "The person’s agreement is required to open a case.",
        }),
      );
      return;
    }

    dispatchCase({
      type: "open",
      input: { priority, channel, violenceType, region, childInvolved, owner: officer },
    });
    onOpenChange(false);
    setSummary("");
    toast.success(t({ fr: "Dossier créé", en: "Case created" }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[560px]">
        <form onSubmit={submit} noValidate>
          <DialogHeader>
            <DialogTitle>{t({ fr: "Nouveau dossier", en: "New case" })}</DialogTitle>
            <DialogDescription className="sr-only">
              {t({
                fr: "Enregistrer une demande reçue par téléphone ou à l’accueil.",
                en: "Record a request received by phone or in person.",
              })}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-3.5 py-4">
            <div className="grid gap-3.5 sm:grid-cols-2">
              <Field label={t({ fr: "Reçu par", en: "Received by" })} htmlFor="new-channel">
                <select
                  id="new-channel"
                  className="gov-input"
                  value={channel}
                  onChange={(event) => setChannel(event.target.value as IntakeChannelCode)}
                >
                  {MANUAL_CHANNELS.map((code) => (
                    <option key={code} value={code}>
                      {t(INTAKE_CHANNELS[code])}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t({ fr: "Région", en: "Region" })} htmlFor="new-region">
                <RegionSelect
                  id="new-region"
                  value={region}
                  onChange={(value) => setRegion((value || region) as RegionCode)}
                />
              </Field>

              <Field label={t({ fr: "Situation", en: "Situation" })} htmlFor="new-type">
                <select
                  id="new-type"
                  className="gov-input"
                  value={violenceType}
                  onChange={(event) => setViolenceType(event.target.value as ViolenceTypeCode)}
                >
                  {(Object.keys(VIOLENCE_TYPES) as ViolenceTypeCode[]).map((code) => (
                    <option key={code} value={code}>
                      {t(VIOLENCE_TYPES[code])}
                    </option>
                  ))}
                </select>
              </Field>

              <Field label={t({ fr: "Priorité suggérée", en: "Suggested priority" })} htmlFor="new-priority">
                <select
                  id="new-priority"
                  className="gov-input"
                  value={priority}
                  onChange={(event) => setPriority(event.target.value as PriorityCode)}
                >
                  {PRIORITY_ORDER.map((code) => (
                    <option key={code} value={code}>
                      {t(PRIORITIES[code].label)}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <label className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
              <input
                type="checkbox"
                className="mt-[3px] size-4 accent-teal"
                checked={childInvolved}
                onChange={(event) => setChildInvolved(event.target.checked)}
              />
              {t({ fr: "Un enfant est concerné", en: "A child is involved" })}
            </label>

            <Field label={t({ fr: "Résumé", en: "Summary" })} htmlFor="new-summary">
              <textarea
                id="new-summary"
                className="gov-input min-h-[110px] resize-y"
                placeholder={t({
                  fr: "Ce que la personne a exprimé, besoins, consignes de contact…",
                  en: "What the person said, needs, contact instructions…",
                })}
                value={summary}
                onChange={(event) => setSummary(event.target.value)}
              />
            </Field>

            <label className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
              <input
                type="checkbox"
                className="mt-[3px] size-4 accent-teal"
                checked={consent}
                onChange={(event) => setConsent(event.target.checked)}
              />
              {t({
                fr: "La personne a donné son accord pour l’ouverture du dossier",
                en: "The person agreed to the opening of a case",
              })}
            </label>
          </div>

          <DialogFooter>
            <ActionButton onClick={() => onOpenChange(false)}>
              {t({ fr: "Annuler", en: "Cancel" })}
            </ActionButton>
            <ActionButton variant="primary" type="submit">
              {t({ fr: "Créer le dossier", en: "Create the case" })}
            </ActionButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
