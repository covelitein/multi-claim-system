"use client";

import { AnalyticsStatRow } from "@/components/dashboard/analytics/analytics-stat-row";
import { ClaimsDonutChart } from "@/components/dashboard/analytics/claims-donut-chart";
import { FacilitySubmissionHistory } from "@/components/dashboard/analytics/facility-submission-history";
import { MonthlyTrendsChart } from "@/components/dashboard/analytics/monthly-trends-chart";
import { TopIssuesTable } from "@/components/dashboard/analytics/top-issues-table";
import {
  fetchAnalytics,
  type AnalyticsPageData,
} from "@/lib/dashboard/analytics-data";
import { useEffect, useState } from "react";

export function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsPageData | null>(null);

  useEffect(() => {
    fetchAnalytics().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 pb-2">
      <div>
        <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
          Analytics
        </h1>
        <p className="mt-0.5 text-sm text-muted">
          Facility submission history, claim status, and trends — built for
          quick scanning.
        </p>
      </div>

      <AnalyticsStatRow stats={data.stats} />

      <div className="grid min-w-0 gap-4 xl:grid-cols-2">
        <ClaimsDonutChart breakdown={data.statusBreakdown} />
        <MonthlyTrendsChart trends={data.monthlyTrends} />
      </div>

      <FacilitySubmissionHistory months={data.facilitySubmissionHistory} />

      <TopIssuesTable issues={data.topIssues} />
    </div>
  );
}
