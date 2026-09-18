import { useState } from "react";
import { ActionButton } from "@/components/common/ActionButton";
import { Icon } from "@/components/common/Icon";
import { SubTabs, type SubTab } from "@/components/common/SubTabs";
import { CaseWorkspace } from "@/components/staff/CaseWorkspace";
import { NewCaseDialog } from "@/components/staff/NewCaseDialog";
import { ReferralWorkspace } from "@/components/staff/ReferralWorkspace";
import { StaffDashboard } from "@/components/staff/StaffDashboard";
import { useI18n } from "@/i18n/useI18n";
import { countNewCases } from "@/state/caseRegistry";
import { useService } from "@/state/useService";

type StaffTab = "cases" | "dashboard" | "referrals";

/** Agent connecté à l'espace de démonstration. */
const CURRENT_OFFICER = "A. Mbarga";

/** Espace de travail des agents du MINPROFF. */
export default function StaffPage() {
  const { t } = useI18n();
  const { caseState } = useService();
  const [tab, setTab] = useState<StaffTab>("cases");
  const [newCaseOpen, setNewCaseOpen] = useState(false);

  const tabs: SubTab<StaffTab>[] = [
    {
      value: "cases",
      icon: "folder",
      label: t({ fr: "Dossiers à traiter", en: "Cases to handle" }),
      count: countNewCases(caseState.cases),
    },
    { value: "dashboard", icon: "chart", label: t({ fr: "Tableau de bord", en: "Dashboard" }) },
    { value: "referrals", icon: "network", label: t({ fr: "Orientations", en: "Referrals" }) },
  ];

  return (
    <>
      <div className="mb-[18px] flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="gov-eyebrow">{t({ fr: "Espace agents", en: "Staff area" })}</div>
          <h1 className="text-[30px] font-extrabold">
            {t({ fr: "Espace MINPROFF", en: "MINPROFF area" })}
          </h1>
          <div className="mt-2 flex flex-wrap items-center gap-2.5 text-[13.5px] text-ink-2">
            <span>
              {t({
                fr: `Connectée : ${CURRENT_OFFICER}, agente d’accueil · Délégation régionale du Centre`,
                en: `Signed in: ${CURRENT_OFFICER}, triage officer · Centre Regional Delegation`,
              })}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-soft px-2.5 py-1 text-[12.5px] font-bold text-teal">
              <Icon name="shield" className="size-3.5" />
              {t({ fr: "Connexion sécurisée", en: "Secure connection" })}
            </span>
          </div>
        </div>

        <ActionButton variant="primary" onClick={() => setNewCaseOpen(true)}>
          <Icon name="plus" />
          {t({ fr: "Nouveau dossier", en: "New case" })}
        </ActionButton>
      </div>

      <SubTabs
        label={t({ fr: "Sections de l’espace agents", en: "Staff area sections" })}
        value={tab}
        onChange={(next) => setTab(next)}
        tabs={tabs}
      />

      {tab === "cases" ? <CaseWorkspace /> : null}
      {tab === "dashboard" ? <StaffDashboard /> : null}
      {tab === "referrals" ? <ReferralWorkspace /> : null}

      <NewCaseDialog open={newCaseOpen} onOpenChange={setNewCaseOpen} officer={CURRENT_OFFICER} />
    </>
  );
}
