import { useMemo } from "react";
import {
  CHANNEL_DISTRIBUTION,
  MONTHLY_REPORTS,
  OPEN_CRITICAL_CASES,
  REGION_STATISTICS,
  TYPE_DISTRIBUTION,
  weightedAverage,
} from "@/data/statistics";
import type { MonthlyPoint, RegionCode, RegionStatistics } from "@/domain/types";

export type DashboardPeriod = 3 | 6 | 12;

export interface DashboardMetrics {
  /** Points du graphique, filtrés par période et pondérés par la région. */
  points: MonthlyPoint[];
  /** Total de la période pour la sélection courante. */
  total: number;
  /** Total national de la période, quelle que soit la région choisie. */
  nationalTotal: number;
  latest: number;
  previous: number;
  /** Variation du dernier mois, en pourcentage. */
  change: number;
  openCriticalCases: number;
  firstReviewHours: number;
  followedUpRate: number;
  childRate: number;
  typeBreakdown: { label: MonthlyPoint["label"]; value: number }[];
  channelBreakdown: { label: MonthlyPoint["label"]; value: number }[];
}

/** Coefficient appliqué aux dossiers critiques quand une région est isolée. */
const REGIONAL_CRITICAL_FACTOR = 1.2;

function findStatistics(region: RegionCode | ""): RegionStatistics | undefined {
  return region ? REGION_STATISTICS.find((entry) => entry.region === region) : undefined;
}

/**
 * Agrège les statistiques publiques selon la période et la région choisies.
 * Tous les chiffres restent regroupés : aucune donnée individuelle n'est
 * manipulée ici.
 */
export function useDashboardMetrics(
  period: DashboardPeriod,
  region: RegionCode | "",
): DashboardMetrics {
  return useMemo(() => {
    const statistics = findStatistics(region);
    const share = statistics?.share ?? 1;

    const window = MONTHLY_REPORTS.slice(-period);
    const points = window.map((point) => ({
      ...point,
      reports: Math.round(point.reports * share),
    }));

    const total = points.reduce((sum, point) => sum + point.reports, 0);
    const nationalTotal = window.reduce((sum, point) => sum + point.reports, 0);
    const latest = points[points.length - 1].reports;
    const previous = points[points.length - 2]?.reports ?? latest;

    return {
      points,
      total,
      nationalTotal,
      latest,
      previous,
      change: previous === 0 ? 0 : ((latest - previous) / previous) * 100,
      openCriticalCases: statistics
        ? Math.max(1, Math.round(OPEN_CRITICAL_CASES * statistics.share * REGIONAL_CRITICAL_FACTOR))
        : OPEN_CRITICAL_CASES,
      firstReviewHours:
        statistics?.firstReviewHours ?? weightedAverage((entry) => entry.firstReviewHours),
      followedUpRate: statistics?.followedUpRate ?? weightedAverage((entry) => entry.followedUpRate),
      childRate: statistics?.childRate ?? weightedAverage((entry) => entry.childRate),
      typeBreakdown: TYPE_DISTRIBUTION.map((slice) => ({
        label: slice.label,
        value: total * slice.share,
      })),
      channelBreakdown: CHANNEL_DISTRIBUTION.map((slice) => ({
        label: slice.label,
        value: total * slice.share,
      })),
    };
  }, [period, region]);
}
