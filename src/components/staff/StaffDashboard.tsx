import { useState } from "react";
import { toast } from "sonner";
import { ActionButton } from "@/components/common/ActionButton";
import { Icon } from "@/components/common/Icon";
import { KpiCard } from "@/components/common/KpiCard";
import { Notice } from "@/components/common/Notice";
import { Panel, PanelBody, PanelHeader, PanelTitle } from "@/components/common/Panel";
import { RegionSelect } from "@/components/common/RegionSelect";
import { SegmentedControl } from "@/components/common/SegmentedControl";
import { BarList } from "@/components/charts/BarList";
import { MonthlyLineChart } from "@/components/charts/MonthlyLineChart";
import { RegionMap } from "@/components/charts/RegionMap";
import { REGION_STATISTICS } from "@/data/statistics";
import { EXPORT_NOTICE, buildCsv, downloadTextFile } from "@/domain/export";
import { findRegion } from "@/domain/referentials";
import type { RegionCode } from "@/domain/types";
import { useDashboardMetrics, type DashboardPeriod } from "@/hooks/useDashboardMetrics";
import { useI18n } from "@/i18n/useI18n";
import { cn } from "@/lib/utils";

/**
 * Tableau de bord national. Il aide à renforcer les moyens là où les besoins
 * sont les plus forts, sans jamais exposer de situation individuelle.
 */
export function StaffDashboard() {
  const { t, formatNumber, formatDecimal } = useI18n();
  const [period, setPeriod] = useState<DashboardPeriod>(12);
  const [region, setRegion] = useState<RegionCode | "">("");
  const metrics = useDashboardMetrics(period, region);

  const reportsUnit = t({ fr: "signalements", en: "reports" });
  const scopeLabel = region
    ? t(findRegion(region).label)
    : t({ fr: "toutes régions", en: "all regions" });

  const exportReport = () => {
    const header = [
      t({ fr: "Région", en: "Region" }),
      t({ fr: "Signalements", en: "Reports" }),
      t({ fr: "Part (%)", en: "Share (%)" }),
      t({ fr: "Première réponse (h)", en: "First review (h)" }),
      t({ fr: "Suivis sous 30 j (%)", en: "Followed up 30 days (%)" }),
    ];
    const rows = REGION_STATISTICS.map((statistics) => [
      t(findRegion(statistics.region).label),
      Math.round(metrics.nationalTotal * statistics.share),
      (statistics.share * 100).toFixed(1),
      statistics.firstReviewHours,
      statistics.followedUpRate,
    ]);

    try {
      downloadTextFile(
        `protect-cameroun-${period}-${t({ fr: "mois", en: "months" })}.csv`,
        buildCsv([header, ...rows]),
        "text/csv",
      );
      toast.success(t(EXPORT_NOTICE));
    } catch {
      toast.error(
        t({
          fr: "Le téléchargement n’a pas pu aboutir.",
          en: "The download could not be completed.",
        }),
      );
    }
  };

  const toggleRegion = (next: RegionCode) => setRegion((current) => (current === next ? "" : next));

  return (
    <div>
      <div className="mb-3.5 flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <span className="gov-label mb-0">{t({ fr: "Période", en: "Period" })}</span>
        <SegmentedControl
          value={String(period)}
          onChange={(value) => setPeriod(Number(value) as DashboardPeriod)}
          label={t({ fr: "Période", en: "Period" })}
          options={[
            { value: "3", label: t({ fr: "3 mois", en: "3 months" }) },
            { value: "6", label: t({ fr: "6 mois", en: "6 months" }) },
            { value: "12", label: t({ fr: "12 mois", en: "12 months" }) },
          ]}
        />
        <label className="gov-label mb-0" htmlFor="dashboard-region">
          {t({ fr: "Région", en: "Region" })}
        </label>
        <RegionSelect
          id="dashboard-region"
          value={region}
          onChange={setRegion}
          includeAll
          className="w-auto"
        />
        <span className="flex-1" />
        <ActionButton onClick={exportReport}>
          <Icon name="download" />
          {t({ fr: "Télécharger le rapport", en: "Download the report" })}
        </ActionButton>
      </div>

      <div className="mb-3.5 grid gap-3.5 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <div className="gov-card flex flex-col gap-1">
          <span className="text-muted-ink">
            {t({
              fr: `Signalements reçus · ${period} derniers mois`,
              en: `Reports received · last ${period} months`,
            })}
            {region ? ` · ${scopeLabel}` : ""}
          </span>
          <span className="text-[52px] font-bold leading-[1.05] tracking-[-0.02em] text-navy">
            {formatNumber(metrics.total)}
          </span>
          <span className="text-[13px]">
            {t({
              fr: `${formatNumber(metrics.latest)} en septembre (${metrics.change >= 0 ? "+" : ""}${formatDecimal(metrics.change)} % par rapport à août)`,
              en: `${formatNumber(metrics.latest)} in September (${metrics.change >= 0 ? "+" : ""}${formatDecimal(metrics.change)}% vs August)`,
            })}
          </span>
        </div>

        <div className="grid gap-3.5 [grid-template-columns:repeat(auto-fit,minmax(150px,1fr))]">
          <KpiCard
            label={t({ fr: "Dossiers critiques ouverts", en: "Critical cases open" })}
            value={formatNumber(metrics.openCriticalCases)}
            caption={t({ fr: "à ce jour", en: "to date" })}
          />
          <KpiCard
            label={t({ fr: "Délai de première réponse", en: "Time to first review" })}
            value={`${formatDecimal(metrics.firstReviewHours)} h`}
            caption={t({ fr: "valeur médiane", en: "median" })}
          />
          <KpiCard
            label={t({ fr: "Suivis sous 30 jours", en: "Followed up within 30 days" })}
            value={`${Math.round(metrics.followedUpRate)} %`}
            caption={t({ fr: "des dossiers", en: "of cases" })}
          />
          <KpiCard
            label={t({ fr: "Impliquant un enfant", en: "Involving a child" })}
            value={`${Math.round(metrics.childRate)} %`}
            caption={t({ fr: "des signalements", en: "of reports" })}
          />
        </div>
      </div>

      <div className="grid gap-3.5 lg:grid-cols-2">
        <Panel className="lg:col-span-2">
          <PanelHeader>
            <PanelTitle>{t({ fr: "Signalements par mois", en: "Reports per month" })}</PanelTitle>
            <span className="text-[13px] text-muted-ink">
              {scopeLabel} · {t({ fr: "survolez pour le détail", en: "hover for details" })}
            </span>
          </PanelHeader>
          <PanelBody>
            <MonthlyLineChart
              title={t({ fr: "Signalements par mois", en: "Reports per month" })}
              unit={reportsUnit}
              comparisonLabel={t({
                fr: "par rapport au mois précédent",
                en: "vs previous month",
              })}
              points={metrics.points.map((point) => ({
                short: t(point.short),
                full: t(point.label),
                value: point.reports,
              }))}
            />
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader>
            <PanelTitle>{t({ fr: "Types de situations", en: "Types of situations" })}</PanelTitle>
          </PanelHeader>
          <PanelBody>
            <BarList
              total={metrics.total}
              unit={reportsUnit}
              items={metrics.typeBreakdown.map((slice) => ({
                label: t(slice.label),
                value: slice.value,
              }))}
            />
          </PanelBody>
        </Panel>

        <Panel>
          <PanelHeader>
            <PanelTitle>
              {t({ fr: "Comment les demandes sont arrivées", en: "How requests arrived" })}
            </PanelTitle>
          </PanelHeader>
          <PanelBody>
            <BarList
              total={metrics.total}
              unit={reportsUnit}
              items={metrics.channelBreakdown.map((slice) => ({
                label: t(slice.label),
                value: slice.value,
              }))}
            />
          </PanelBody>
        </Panel>

        <Panel className="lg:col-span-2">
          <PanelHeader>
            <PanelTitle>{t({ fr: "Répartition par région", en: "Breakdown by region" })}</PanelTitle>
            <span className="text-[13px] text-muted-ink">
              {t({
                fr: "part des signalements · carte simplifiée",
                en: "share of reports · simplified map",
              })}
            </span>
          </PanelHeader>
          <PanelBody className="grid items-start gap-[18px] md:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)]">
            <RegionMap
              nationalTotal={metrics.nationalTotal}
              selected={region}
              onSelect={toggleRegion}
            />
            <div className="flex flex-col gap-3">
              <Notice
                icon="lock"
                tone="navy"
                title={t({ fr: "Chiffres regroupés uniquement", en: "Grouped figures only" })}
              >
                {t({
                  fr: "Les cartes n’affichent que des totaux par région. L’adresse d’une victime ou d’un enfant n’apparaît jamais.",
                  en: "Maps only show totals per region. The address of a victim or a child never appears.",
                })}
              </Notice>
              <p className="text-[13px] text-muted-ink">
                {t({
                  fr: "Cliquez sur une région pour filtrer tout le tableau de bord. Ces chiffres aident à renforcer les centres d’accueil, travailleurs sociaux, services de santé et d’aide juridique là où les besoins sont les plus forts.",
                  en: "Click a region to filter the whole dashboard. These figures help plan shelters, social workers, health and legal services where they are most needed.",
                })}
              </p>
            </div>
          </PanelBody>
        </Panel>

        <div className="overflow-x-auto rounded-xl border border-line bg-white shadow-panel lg:col-span-2">
          <table className="w-full border-collapse text-sm">
            <caption className="sr-only">
              {t({
                fr: "Indicateurs par région sur la période choisie",
                en: "Indicators per region for the selected period",
              })}
            </caption>
            <thead>
              <tr>
                {[
                  { label: t({ fr: "Région", en: "Region" }), align: "left" },
                  { label: t({ fr: "Signalements", en: "Reports" }), align: "right" },
                  { label: t({ fr: "Part", en: "Share" }), align: "right" },
                  { label: t({ fr: "Première réponse", en: "Time to first review" }), align: "right" },
                  { label: t({ fr: "Suivis sous 30 j", en: "Followed up (30 days)" }), align: "right" },
                  { label: t({ fr: "En attente > 3 j", en: "Waiting over 3 days" }), align: "right" },
                ].map((column) => (
                  <th
                    key={column.label}
                    scope="col"
                    className={cn(
                      "whitespace-nowrap bg-navy px-3 py-[11px] text-[13px] font-semibold text-white",
                      column.align === "right" ? "text-right" : "text-left",
                    )}
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {REGION_STATISTICS.map((statistics) => (
                <tr
                  key={statistics.region}
                  onClick={() => toggleRegion(statistics.region)}
                  className={cn(
                    "cursor-pointer even:bg-zebra hover:bg-blue-soft",
                    statistics.region === region && "bg-blue-soft",
                  )}
                >
                  <td className="border-b border-line px-3 py-[11px]">
                    <b>{t(findRegion(statistics.region).label)}</b>
                  </td>
                  <td className="tabular border-b border-line px-3 py-[11px] text-right">
                    {formatNumber(metrics.nationalTotal * statistics.share)}
                  </td>
                  <td className="tabular border-b border-line px-3 py-[11px] text-right">
                    {formatDecimal(statistics.share * 100)} %
                  </td>
                  <td className="tabular border-b border-line px-3 py-[11px] text-right">
                    {formatDecimal(statistics.firstReviewHours)} h
                  </td>
                  <td className="tabular border-b border-line px-3 py-[11px] text-right">
                    {statistics.followedUpRate} %
                  </td>
                  <td className="tabular border-b border-line px-3 py-[11px] text-right">
                    {statistics.waitingOverThreeDays >= 6 ? (
                      <span className="rounded bg-orange-soft px-2 py-0.5 font-semibold text-orange">
                        {statistics.waitingOverThreeDays}
                      </span>
                    ) : (
                      statistics.waitingOverThreeDays
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
