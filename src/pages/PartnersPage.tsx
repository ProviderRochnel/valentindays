import { useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { Icon } from "@/components/common/Icon";
import { KpiCard } from "@/components/common/KpiCard";
import { Notice } from "@/components/common/Notice";
import { SubTabs, type SubTab } from "@/components/common/SubTabs";
import { PartnerAppointments } from "@/components/partner/PartnerAppointments";
import { PartnerReferrals } from "@/components/partner/PartnerReferrals";
import { CONNECTED_PARTNER_KIND } from "@/data/referrals";
import { GREEN_LINE } from "@/domain/referentials";
import { useI18n } from "@/i18n/useI18n";
import { countAwaitingReply, selectPartnerReferrals } from "@/state/referralRegistry";
import { useService } from "@/state/useService";

type PartnerTab = "referrals" | "appointments";

/** Espace des structures partenaires : orientations reçues et rendez-vous. */
export default function PartnersPage() {
  const { t, formatNumber } = useI18n();
  const { referralState } = useService();
  const [tab, setTab] = useState<PartnerTab>("referrals");

  const referrals = selectPartnerReferrals(referralState, CONNECTED_PARTNER_KIND);
  const awaitingReply = countAwaitingReply(referrals);
  const plannedAppointments = referralState.appointments.filter(
    (appointment) => appointment.status !== "moved",
  ).length;
  const toConfirm = referralState.appointments.filter(
    (appointment) => appointment.status === "wait",
  ).length;

  const tabs: SubTab<PartnerTab>[] = [
    {
      value: "referrals",
      icon: "network",
      label: t({ fr: "Orientations reçues", en: "Referrals received" }),
      count: awaitingReply,
    },
    { value: "appointments", icon: "clock", label: t({ fr: "Rendez-vous", en: "Appointments" }) },
  ];

  return (
    <>
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="gov-eyebrow">
            {t({ fr: "Professionnels et partenaires", en: "Professionals and partners" })}
          </div>
          <h1 className="text-[30px] font-extrabold">
            {t({ fr: "Espace partenaires", en: "Partners area" })}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[13.5px] text-ink-2">
            <span>
              {t({
                fr: "Connectée : M. Ngo Ndjock, coordinatrice · Centre d’accueil partenaire, Bertoua",
                en: "Signed in: M. Ngo Ndjock, coordinator · Partner shelter, Bertoua",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-[12.5px] font-bold text-teal">
              <Icon name="history" className="size-3.5" />
              {t({
                fr: "Chaque consultation est enregistrée",
                en: "Every consultation is recorded",
              })}
            </span>
          </div>
        </div>

        <ActionButton asChild>
          <a href={`tel:${GREEN_LINE}`}>
            <Icon name="phone" />
            {t({ fr: "Joindre le Ministère", en: "Contact the Ministry" })}
          </a>
        </ActionButton>
      </div>

      <Notice
        icon="lock"
        tone="navy"
        className="mb-4"
        title={t({
          fr: "Vous ne voyez que ce dont vous avez besoin pour aider",
          en: "You only see what you need to help",
        })}
      >
        {t({
          fr: "L’identité complète, l’adresse, les documents et le récit détaillé restent au Ministère. Contactez la personne uniquement selon les consignes indiquées.",
          en: "Full identity, address, documents and the detailed account remain with the Ministry. Contact the person only as indicated.",
        })}
      </Notice>

      <div className="mb-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon="bell"
          tone="warn"
          label={t({ fr: "Orientations à confirmer", en: "Referrals awaiting your reply" })}
          value={formatNumber(awaitingReply)}
          caption={t({
            fr: "réponse attendue sous 4 heures",
            en: "reply expected within 4 hours",
          })}
        />
        <KpiCard
          icon="users"
          label={t({ fr: "Personnes accompagnées ce mois", en: "People supported this month" })}
          value="12"
          caption={t({ fr: "dont 5 enfants", en: "including 5 children" })}
        />
        <KpiCard
          icon="clock"
          label={t({ fr: "Rendez-vous cette semaine", en: "Appointments this week" })}
          value={formatNumber(plannedAppointments)}
          caption={t({ fr: `dont ${toConfirm} à confirmer`, en: `${toConfirm} still to confirm` })}
        />
        <KpiCard
          icon="check"
          label={t({ fr: "Délai moyen de réponse", en: "Average reply time" })}
          value={t({ fr: "3 h 10", en: "3 h 10" })}
          caption={t({ fr: "30 derniers jours", en: "last 30 days" })}
        />
      </div>

      <SubTabs
        label={t({ fr: "Sections de l’espace partenaires", en: "Partner area sections" })}
        value={tab}
        onChange={(next) => setTab(next)}
        tabs={tabs}
      />

      {tab === "referrals" ? <PartnerReferrals /> : <PartnerAppointments />}
    </>
  );
}
