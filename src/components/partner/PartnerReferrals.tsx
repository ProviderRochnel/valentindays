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
import { useWithheldItems } from "@/components/staff/withheld";
import { CONNECTED_PARTNER_KIND, CONNECTED_PARTNER_NAME } from "@/data/referrals";
import { formatStamp } from "@/domain/reporting";
import type { Referral } from "@/domain/types";
import { useI18n } from "@/i18n/useI18n";
import { selectPartnerReferrals } from "@/state/referralRegistry";
import { useService } from "@/state/useService";

/**
 * Orientations reçues par la structure partenaire connectée. Elle ne voit que
 * ce dont elle a besoin pour accueillir la personne, et rend compte au Ministère.
 */
export function PartnerReferrals() {
  const { t } = useI18n();
  const { referralState, dispatchReferral } = useService();
  const [note, setNote] = useState("");
  const withheld = useWithheldItems();

  const referrals = selectPartnerReferrals(referralState, CONNECTED_PARTNER_KIND);
  const selectedReference = referralState.partnerSelection ?? referrals[0]?.reference ?? null;
  const selected = referrals.find((referral) => referral.reference === selectedReference);

  const addReport = (
    referral: Referral,
    message: { fr: string; en: string },
    status?: Referral["status"],
  ) => {
    dispatchReferral({
      type: "report",
      input: {
        reference: referral.reference,
        author: CONNECTED_PARTNER_NAME,
        message,
        status,
        at: formatStamp(),
      },
    });
  };

  const confirmSupport = (referral: Referral) => {
    addReport(referral, { fr: "Prise en charge confirmée", en: "Support confirmed" }, "ok");
    toast.success(
      t({
        fr: "Prise en charge confirmée · le Ministère est informé",
        en: "Support confirmed · the Ministry has been informed",
      }),
    );
  };

  const declineSupport = (referral: Referral) => {
    addReport(referral, {
      fr: "Pas de place disponible pour le moment, merci de réorienter",
      en: "No place available right now, please refer elsewhere",
    });
    toast.success(t({ fr: "Réponse envoyée au Ministère", en: "Reply sent to the Ministry" }));
  };

  const sendReport = (referral: Referral) => {
    const text = note.trim();
    if (!text) {
      toast.error(
        t({
          fr: "Rédigez le compte rendu avant de l’envoyer.",
          en: "Write the report before sending it.",
        }),
      );
      return;
    }
    addReport(referral, { fr: text, en: text });
    setNote("");
    toast.success(t({ fr: "Compte rendu envoyé au Ministère", en: "Report sent to the Ministry" }));
  };

  const askQuestion = (referral: Referral) => {
    const text = note.trim();
    if (!text) {
      toast.error(
        t({
          fr: "Écrivez votre question dans le champ ci-dessus.",
          en: "Write your question in the field above.",
        }),
      );
      return;
    }
    addReport(referral, { fr: `Question : ${text}`, en: `Question: ${text}` }, "more");
    setNote("");
    toast.success(
      t({ fr: "Question transmise à l’agent référent", en: "Question sent to the referring officer" }),
    );
  };

  const markCompleted = (referral: Referral) => {
    addReport(referral, { fr: "Accompagnement terminé", en: "Support completed" }, "done");
    toast.success(
      t({ fr: "Accompagnement marqué comme terminé", en: "Support marked as completed" }),
    );
  };

  return (
    <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,0.85fr)_minmax(0,1.4fr)]">
      <Panel>
        <ReferralList
          referrals={referrals}
          selected={selectedReference}
          onSelect={(reference) => {
            dispatchReferral({ type: "selectPartner", reference });
            setNote("");
          }}
          secondary={(referral) => `${t({ fr: "Reçue le", en: "Received" })} ${t(referral.sentAt)}`}
        />
      </Panel>

      {selected ? (
        <Panel>
          <DetailHeader reference={selected.reference} title={t(selected.need)}>
            <PriorityBadge priority={selected.priority} />
            <StatusPill tone={REFERRAL_STATUS[selected.status].tone}>
              {t(REFERRAL_STATUS[selected.status].label)}
            </StatusPill>
            <Tag icon="user">
              {t({ fr: "Envoyée par", en: "Sent by" })} {t(selected.sentBy)}
            </Tag>
          </DetailHeader>

          {selected.status === "wait" ? (
            <DetailSection>
              <Notice
                icon="clock"
                tone="warn"
                title={t({ fr: "Votre réponse est attendue", en: "Your reply is expected" })}
              >
                {selected.priority === "crit"
                  ? t({
                      fr: "Situation urgente : répondez dans l’heure.",
                      en: "Urgent situation: please reply within the hour.",
                    })
                  : t({
                      fr: "Merci de répondre sous 4 heures.",
                      en: "Please reply within 4 hours.",
                    })}
              </Notice>
            </DetailSection>
          ) : null}

          <DetailSection>
            <div className="grid gap-3.5 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
              <div>
                <h4 className="mb-2 text-xs uppercase tracking-[0.08em] text-teal">
                  {t({ fr: "Ce que vous devez savoir", en: "What you need to know" })}
                </h4>
                <KeyValueList
                  entries={selected.sharedInfo.map((field) => ({
                    key: t(field.label),
                    value: t(field.value),
                  }))}
                />
              </div>
              <WithheldList
                title={t({ fr: "Conservé par le Ministère", en: "Kept by the Ministry" })}
                items={withheld}
              />
            </div>
          </DetailSection>

          <DetailSection title={t({ fr: "Suivi et comptes rendus", en: "Follow-up and reports" })}>
            <Timeline
              items={selected.reports.map((report) => ({
                state: "done" as const,
                label: t(report.message),
                detail: `${t(report.at)} · ${t(report.author)}`,
              }))}
            />
            {selected.status !== "done" ? (
              <Field
                label={t({ fr: "Rédiger un compte rendu", en: "Write a report" })}
                htmlFor="partner-note"
              >
                <textarea
                  id="partner-note"
                  className="gov-input min-h-[110px] resize-y"
                  placeholder={t({
                    fr: "Ce qui a été fait, prochaine étape, besoin éventuel…",
                    en: "What was done, next step, any need…",
                  })}
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                />
              </Field>
            ) : null}
          </DetailSection>

          <DetailActions>
            {selected.status === "wait" ? (
              <>
                <ActionButton variant="primary" onClick={() => confirmSupport(selected)}>
                  {t({ fr: "Confirmer la prise en charge", en: "Confirm support" })}
                </ActionButton>
                <ActionButton onClick={() => declineSupport(selected)}>
                  {t({ fr: "Impossible pour le moment", en: "Not possible right now" })}
                </ActionButton>
              </>
            ) : null}

            {selected.status !== "done" ? (
              <>
                <ActionButton
                  variant={selected.status === "wait" ? "neutral" : "blue"}
                  onClick={() => sendReport(selected)}
                >
                  {t({ fr: "Envoyer le compte rendu", en: "Send the report" })}
                </ActionButton>
                <ActionButton onClick={() => askQuestion(selected)}>
                  {t({ fr: "Poser une question", en: "Ask a question" })}
                </ActionButton>
              </>
            ) : null}

            {selected.status === "ok" ? (
              <ActionButton variant="ghost" onClick={() => markCompleted(selected)}>
                {t({ fr: "Accompagnement terminé", en: "Support completed" })}
              </ActionButton>
            ) : null}

            {selected.status === "done" ? (
              <span className="text-[13px] text-muted-ink">
                {t({ fr: "Cet accompagnement est terminé.", en: "This support is completed." })}
              </span>
            ) : null}
          </DetailActions>
        </Panel>
      ) : null}
    </div>
  );
}
