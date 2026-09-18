import { ChoiceCard } from "@/components/common/ChoiceCard";
import { Field } from "@/components/common/Field";
import { useI18n } from "@/i18n/useI18n";
import type { ContactPreference, ContactSlot, ReportDraft } from "@/hooks/useReportForm";

const SLOTS: readonly { value: ContactSlot; label: { fr: string; en: string } }[] = [
  { value: "morning", label: { fr: "Le matin", en: "Morning" } },
  { value: "afternoon", label: { fr: "L’après-midi", en: "Afternoon" } },
  { value: "evening", label: { fr: "Le soir", en: "Evening" } },
  { value: "any", label: { fr: "À tout moment", en: "Any time" } },
];

interface ContactStepProps {
  draft: ReportDraft;
  consentError: boolean;
  onChange: <K extends keyof ReportDraft>(key: K, value: ReportDraft[K]) => void;
}

export function ContactStep({ draft, consentError, onChange }: ContactStepProps) {
  const { t } = useI18n();
  const wantsCallBack = draft.contact !== "none";

  return (
    <div className="flex flex-col gap-4">
      <Field
        label={t({
          fr: "Comment pouvons-nous vous recontacter ?",
          en: "How can we get back to you?",
        })}
      >
        <div className="grid gap-2 md:grid-cols-3">
          <ChoiceCard
            name="contact-preference"
            value="none"
            checked={draft.contact === "none"}
            onChange={(value) => onChange("contact", value as ContactPreference)}
            title={t({ fr: "Pas de contact", en: "No contact" })}
            description={t({
              fr: "Je suivrai mon dossier avec un code.",
              en: "I will follow my case with a code.",
            })}
          />
          <ChoiceCard
            name="contact-preference"
            value="sms"
            checked={draft.contact === "sms"}
            onChange={(value) => onChange("contact", value as ContactPreference)}
            title={t({ fr: "SMS discret", en: "Discreet text message" })}
            description={t({
              fr: "Aucun message ne mentionne votre situation.",
              en: "No message mentions your situation.",
            })}
          />
          <ChoiceCard
            name="contact-preference"
            value="call"
            checked={draft.contact === "call"}
            onChange={(value) => onChange("contact", value as ContactPreference)}
            title={t({ fr: "Appel d’un écoutant", en: "Call from a counsellor" })}
            description={t({ fr: "Depuis un numéro masqué.", en: "From a hidden number." })}
          />
        </div>
      </Field>

      {wantsCallBack ? (
        <div className="grid gap-3.5 sm:grid-cols-2">
          <Field label={t({ fr: "Numéro de téléphone", en: "Phone number" })} htmlFor="contact-phone">
            <input
              id="contact-phone"
              className="gov-input"
              inputMode="tel"
              autoComplete="off"
              placeholder="6XX XX XX XX"
              value={draft.phone}
              onChange={(event) => onChange("phone", event.target.value)}
            />
          </Field>
          <Field
            label={t({
              fr: "Quand peut-on vous joindre sans risque ?",
              en: "When is it safe to contact you?",
            })}
            htmlFor="contact-slot"
          >
            <select
              id="contact-slot"
              className="gov-input"
              value={draft.slot}
              onChange={(event) => onChange("slot", event.target.value as ContactSlot)}
            >
              {SLOTS.map((slot) => (
                <option key={slot.value} value={slot.value}>
                  {t(slot.label)}
                </option>
              ))}
            </select>
          </Field>
        </div>
      ) : null}

      <label className="flex items-start gap-2.5 text-[13.5px] text-ink-2">
        <input
          type="checkbox"
          className="mt-[3px] size-4 shrink-0 accent-teal"
          checked={draft.consent}
          onChange={(event) => onChange("consent", event.target.checked)}
        />
        <span>
          {t({
            fr: "J’accepte que ces informations soient traitées par les agents habilités du MINPROFF et, si nécessaire, partagées avec une structure d’accompagnement, uniquement pour ce dont elle a besoin pour aider.",
            en: "I agree that this information will be handled by authorised MINPROFF officers and, if necessary, shared with a support organisation only for what it needs to help.",
          })}
        </span>
      </label>

      {consentError ? (
        <span role="alert" className="gov-error">
          {t({
            fr: "Cochez cette case pour envoyer votre signalement.",
            en: "Please tick this box to send your report.",
          })}
        </span>
      ) : null}
    </div>
  );
}
