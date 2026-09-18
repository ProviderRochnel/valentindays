import { useMemo, useState } from "react";
import { KpiCard } from "@/components/common/KpiCard";
import { useI18n } from "@/i18n/useI18n";
import { selectCase } from "@/state/caseRegistry";
import { useService } from "@/state/useService";
import { CaseDetail } from "./CaseDetail";
import { CaseFilters, type CaseFilterState } from "./CaseFilters";
import { CaseTable } from "./CaseTable";

const NARROW_VIEWPORT = 1060;
const MINUTES_PER_DAY = 1440;

/**
 * Dossiers déjà traités et sortis de la file aujourd'hui. Ils comptent dans le
 * total des dernières 24 heures sans rester dans la liste de travail.
 */
const CASES_CLOSED_TODAY = 10;

/** File des dossiers à traiter et volet de traitement associé. */
export function CaseWorkspace() {
  const { t, formatNumber } = useI18n();
  const { caseState, dispatchCase } = useService();
  const [filters, setFilters] = useState<CaseFilterState>({
    priority: "",
    childOnly: false,
    search: "",
  });

  const visibleCases = useMemo(() => {
    const query = filters.search.trim().toLowerCase();
    return caseState.cases.filter(
      (file) =>
        (!filters.priority || file.priority === filters.priority) &&
        (!filters.childOnly || file.childInvolved) &&
        (!query || file.reference.toLowerCase().includes(query)),
    );
  }, [caseState.cases, filters]);

  const selectCaseAndScroll = (reference: string) => {
    dispatchCase({ type: "select", reference });
    if (window.innerWidth < NARROW_VIEWPORT) {
      document.getElementById("case-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const newReports =
    caseState.cases.filter((file) => file.receivedMinutesAgo <= MINUTES_PER_DAY).length +
    CASES_CLOSED_TODAY;
  const criticalCases = caseState.cases.filter((file) => file.priority === "crit");
  const criticalWithChild = criticalCases.filter((file) => file.childInvolved).length;

  return (
    <div>
      <div className="mb-4 grid gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
        <KpiCard
          icon="doc"
          label={t({ fr: "Nouveaux signalements", en: "New reports" })}
          value={formatNumber(newReports)}
          caption={t({ fr: "dernières 24 heures", en: "last 24 hours" })}
        />
        <KpiCard
          icon="alert"
          tone="crit"
          label={t({ fr: "Dossiers critiques", en: "Critical cases" })}
          value={formatNumber(criticalCases.length)}
          caption={t({
            fr: `dont ${criticalWithChild} avec un enfant`,
            en: `${criticalWithChild} involve a child`,
          })}
        />
        <KpiCard
          icon="bell"
          tone="warn"
          label={t({ fr: "En attente depuis 3 jours", en: "Waiting over 3 days" })}
          value="3"
          caption={t({
            fr: "relance envoyée aux responsables",
            en: "reminder sent to the officers",
          })}
        />
        <KpiCard
          icon="clock"
          label={t({
            fr: "Délai moyen de première réponse",
            en: "Average time to first review",
          })}
          value={t({ fr: "2 h 40", en: "2 h 40" })}
          caption={t({ fr: "objectif : moins de 4 heures", en: "target: under 4 hours" })}
        />
      </div>

      <div className="grid items-start gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <div className="min-w-0">
          <CaseFilters filters={filters} onChange={setFilters} />
          <CaseTable
            cases={visibleCases}
            selectedReference={caseState.selectedReference}
            onSelect={selectCaseAndScroll}
          />
          <p className="mt-2 text-[13px] text-muted-ink">
            {t({
              fr: "La priorité affichée est une suggestion : elle est toujours confirmée par un agent.",
              en: "The priority shown is a suggestion: it is always confirmed by an officer.",
            })}
          </p>
        </div>

        <div id="case-detail" className="min-w-0 scroll-mt-24">
          <CaseDetail file={selectCase(caseState)} />
        </div>
      </div>
    </div>
  );
}

