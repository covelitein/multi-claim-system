"use client";

import { AnalyticsStatRow } from "@/components/dashboard/analytics/analytics-stat-row";
import { ClaimsDonutChart } from "@/components/dashboard/analytics/claims-donut-chart";
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
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-4">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Analytics</h1>
        <p className="text-sm text-muted">
          Overview of claim performance, trends, and common issues.
        </p>
      </div>

      <AnalyticsStatRow stats={data.stats} />

      <div className="grid min-w-0 gap-6 xl:grid-cols-2">
        <ClaimsDonutChart breakdown={data.statusBreakdown} />
        <MonthlyTrendsChart trends={data.monthlyTrends} />
      </div>

      <TopIssuesTable issues={data.topIssues} />
    </div>
  );
}
