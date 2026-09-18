import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "@/components/common/ActionButton";
import { PriorityBadge, StatusPill, Tag } from "@/components/common/Badges";
import {
  DetailActions,
  DetailHeader,
  DetailSection,
  KeyValueList,
  WithheldList,
} from "@/components/common/Detail";
import { Field } from "@/components/common/Field";
import { Notice } from "@/components/common/Notice";
import { Panel } from "@/components/common/Panel";
import { ReferralList } from "@/components/common/ReferralList";
import { REFERRAL_STATUS } from "@/components/common/referralStatus";
import { Timeline } from "@/components/common/Timeline";
import { formatStamp } from "@/domain/reporting";
import type { Referral } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { useService } from "@/state/useService";
import { useWithheldItems } from "./withheld";

const MINISTRY = { fr: "MINPROFF", en: "MINPROFF" };

/** Suivi, côté Ministère, des orientations envoyées aux structures partenaires. */
export function ReferralWorkspace() {
  const { t } = useI18n();
  const { referralState, dispatchReferral } = useService();
  const [note, setNote] = useState("");
  const withheld = useWithheldItems();

  const selected = referralState.referrals.find(
    (referral) => referral.reference === referralState.staffSelection,
  );

  const addReport = (referral: Referral, message: { fr: string; en: string }, status?: Referral["status"]) => {
    dispatchReferral({
      type: "report",
      input: { reference: referral.reference, author: MINISTRY, message, status, at: formatStamp() },
    });
  };

  const saveNote = (referral: Referral) => {
    const text = note.trim();
    if (!text) {
      toast.error(
        t({ fr: "Rédigez la note avant de l’enregistrer.", en: "Write the note before saving it." }),
      );
      return;
    }
    addReport(referral, { fr: text, en: text });
    setNote("");
    toast.success(t({ fr: "Note ajoutée au dossier", en: "Note added to the case" }));
  };

  const sendReminder = (referral: Referral) => {
    addReport(referral, {
      fr: "Relance envoyée à la structure",
      en: "Reminder sent to the organisation",
    });
    toast.success(t({ fr: "Relance envoyée", en: "Reminder sent" }));
  };

  const answerQuestion = (referral: Referral) => {
    const text = note.trim();
    const message = text
      ? { fr: `Réponse : ${text}`, en: `Answer: ${text}` }
      : {
          fr: "Réponse : l’agent référent vous rappelle",
          en: "Answer: the referring officer will call you back",
        };
    // La structure repasse en attente de sa confirmation de prise en charge.
    addReport(referral, message, "wait");
    setNote("");
    toast.success(
      t({ fr: "Réponse envoyée à la structure", en: "Answer sent to the organisation" }),
    );
  };

  const markCompleted = (referral: Referral) => {
    addReport(referral, { fr: "Accompagnement terminé", en: "Support completed" }, "done");
    toast.success(
      t({
        fr: "Orientation marquée comme terminée",
        en: "Referral marked as completed",
      }),
    );
  };

  return (
    <div>
      <Notice
        icon="lock"
        tone="navy"
        className="mb-3.5"
        title={t({ fr: "Partage limité", en: "Limited sharing" })}
      >
        {t({
          fr: "Les structures partenaires ne reçoivent que ce dont elles ont besoin pour aider. L’identité complète, les documents et l’adresse restent au Ministère.",
          en: "Partner organisations only receive what they need to help. Full identity, documents and address remain with the Ministry.",
        })}
      </Notice>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
        <Panel>
          <ReferralList
            referrals={referralState.referrals}
            selected={referralState.staffSelection}
            onSelect={(reference) => {
              dispatchReferral({ type: "selectStaff", reference });
              setNote("");
            }}
            secondary={(referral) => `${t(referral.partner)} · ${t(referral.sentAt)}`}
          />
        </Panel>

        {selected ? (
          <Panel>
            <DetailHeader
              reference={`${selected.reference} · ${t({ fr: "dossier", en: "case" })} ${selected.caseReference}`}
              title={t(selected.need)}
            >
              <PriorityBadge priority={selected.priority} />
              <StatusPill tone={REFERRAL_STATUS[selected.status].tone}>
                {t(REFERRAL_STATUS[selected.status].label)}
              </StatusPill>
              <Tag icon="network">{t(selected.partner)}</Tag>
            </DetailHeader>

            <DetailSection>
              <div className="grid gap-3.5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
                <div>
                  <h4 className="mb-2 text-xs uppercase tracking-[0.08em] text-teal">
                    {t({ fr: "Informations transmises", en: "Information shared" })}
                  </h4>
                  <KeyValueList
                    entries={selected.sharedInfo.map((field) => ({
                      key: t(field.label),
                      value: t(field.value),
                    }))}
                  />
                </div>
                <WithheldList
                  title={t({ fr: "Non transmises", en: "Not shared" })}
                  items={withheld}
                />
              </div>
            </DetailSection>

            <DetailSection title={t({ fr: "Suivi", en: "Follow-up" })}>
              <Timeline
                items={selected.reports.map((report) => ({
                  state: "done" as const,
                  label: t(report.message),
                  detail: `${t(report.at)} · ${t(report.author)}`,
                }))}
              />
              <Field label={t({ fr: "Ajouter une note", en: "Add a note" })} htmlFor="referral-note">
                <textarea
                  id="referral-note"
                  className="gov-input min-h-[110px] resize-y"
                  placeholder={t({
                    fr: "Action menée, prochaine étape…",
                    en: "Action taken, next step…",
                  })}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </Field>
            </DetailSection>

            <DetailActions>
              <ActionButton variant="blue" onClick={() => saveNote(selected)}>
                {t({ fr: "Enregistrer la note", en: "Save the note" })}
              </ActionButton>
              {selected.status === "wait" || selected.status === "more" ? (
                <ActionButton onClick={() => sendReminder(selected)}>
                  {t({ fr: "Relancer la structure", en: "Send a reminder" })}
                </ActionButton>
              ) : null}
              {selected.status === "more" ? (
                <ActionButton onClick={() => answerQuestion(selected)}>
                  {t({ fr: "Répondre à la question", en: "Answer the question" })}
                </ActionButton>
              ) : null}
              {selected.status !== "done" ? (
                <ActionButton variant="ghost" onClick={() => markCompleted(selected)}>
                  {t({ fr: "Marquer terminé", en: "Mark as completed" })}
                </ActionButton>
              ) : null}
            </DetailActions>
          </Panel>
        ) : null}
      </div>
    </div>
  );
}
