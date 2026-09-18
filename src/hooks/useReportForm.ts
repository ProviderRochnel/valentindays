import { useCallback, useState } from "react";
import { DEFAULT_REGION } from "@/domain/referentials";
import {
  channelForReporterMode,
  generateTrackingCode,
  suggestPriority,
  type ReporterMode,
  type TriState,
} from "@/domain/reporting";
import type { NewCaseInput, RegionCode, ViolenceTypeCode } from "@/domain/types";

export type WizardStep = 1 | 2 | 3 | 4 | 5;
export const LAST_INPUT_STEP: WizardStep = 4;

export type ContactPreference = "none" | "sms" | "call";
export type TimeFrame = "now" | "days" | "month" | "long";
export type ContactSlot = "morning" | "afternoon" | "evening" | "any";

export interface AttachmentDraft {
  id: string;
  name: string;
  /** Taille en octets. */
  size: number;
  isImage: boolean;
}

export interface ReportDraft {
  mode: ReporterMode;
  childInvolved: TriState;
  violenceType: ViolenceTypeCode;
  timeFrame: TimeFrame;
  region: RegionCode;
  town: string;
  description: string;
  dangerNow: TriState;
  attachments: AttachmentDraft[];
  contact: ContactPreference;
  phone: string;
  slot: ContactSlot;
  consent: boolean;
}

export interface ReportErrors {
  description?: boolean;
  consent?: boolean;
}

const EMPTY_DRAFT: ReportDraft = {
  mode: "anon",
  childInvolved: "unknown",
  violenceType: "phys",
  timeFrame: "now",
  region: DEFAULT_REGION,
  town: "",
  description: "",
  dangerNow: "no",
  attachments: [],
  contact: "none",
  phone: "",
  slot: "morning",
  consent: false,
};

/** Longueur minimale attendue pour qu'un agent puisse commencer l'évaluation. */
const MIN_DESCRIPTION_LENGTH = 5;

/**
 * Pilote le formulaire public de signalement : brouillon, validation par
 * étape, et conversion du brouillon en dossier pour les agents.
 */
export function useReportForm(onSubmit: (input: NewCaseInput, trackingCode: string) => void) {
  const [step, setStep] = useState<WizardStep>(1);
  const [draft, setDraft] = useState<ReportDraft>(EMPTY_DRAFT);
  const [errors, setErrors] = useState<ReportErrors>({});
  const [trackingCode, setTrackingCode] = useState<string | null>(null);

  const update = useCallback(<K extends keyof ReportDraft>(key: K, value: ReportDraft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
    if (key === "description") setErrors((current) => ({ ...current, description: false }));
    if (key === "consent") setErrors((current) => ({ ...current, consent: false }));
  }, []);

  const addAttachments = useCallback((files: FileList) => {
    const added = Array.from(files).map((file, index) => ({
      id: `${file.name}-${file.size}-${Date.now()}-${index}`,
      name: file.name,
      size: file.size,
      isImage: file.type.startsWith("image/"),
    }));
    setDraft((current) => ({ ...current, attachments: [...current.attachments, ...added] }));
  }, []);

  const removeAttachment = useCallback((id: string) => {
    setDraft((current) => ({
      ...current,
      attachments: current.attachments.filter((file) => file.id !== id),
    }));
  }, []);

  const reset = useCallback(() => {
    setDraft(EMPTY_DRAFT);
    setErrors({});
    setTrackingCode(null);
    setStep(1);
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => (current > 1 ? ((current - 1) as WizardStep) : current));
  }, []);

  const goForward = useCallback(() => {
    if (step === 2 && draft.description.trim().length < MIN_DESCRIPTION_LENGTH) {
      setErrors((current) => ({ ...current, description: true }));
      return false;
    }

    if (step === LAST_INPUT_STEP) {
      if (!draft.consent) {
        setErrors((current) => ({ ...current, consent: true }));
        return false;
      }

      const code = generateTrackingCode();
      setTrackingCode(code);
      onSubmit(
        {
          priority: suggestPriority({
            dangerNow: draft.dangerNow,
            childInvolved: draft.childInvolved,
          }),
          channel: channelForReporterMode(draft.mode),
          // Un enfant explicitement concerné prime sur le type déclaré.
          violenceType: draft.childInvolved === "yes" ? "child" : draft.violenceType,
          region: draft.region,
          childInvolved: draft.childInvolved === "yes",
          attachments: draft.attachments.length,
        },
        code,
      );
      setStep(5);
      return true;
    }

    if (step === 5) {
      reset();
      return true;
    }

    setStep((current) => (current + 1) as WizardStep);
    return true;
  }, [draft, onSubmit, reset, step]);

  return {
    step,
    draft,
    errors,
    trackingCode,
    update,
    addAttachments,
    removeAttachment,
    goBack,
    goForward,
  };
}
