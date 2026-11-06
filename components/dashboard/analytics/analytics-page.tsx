"use client";

import { AnalyticsStatRow } from "@/components/dashboard/analytics/analytics-stat-row";
import { ClaimsDonutChart } from "@/components/dashboard/analytics/claims-donut-chart";
import { FacilitySubmissionHistory } from "@/components/dashboard/analytics/facility-submission-history";
import { MonthlyTrendsChart } from "@/components/dashboard/analytics/monthly-trends-chart";
import { TopIssuesTable } from "@/components/dashboard/analytics/top-issues-table";
import { InfoBanner } from "@/components/dashboard/info-banner";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import {
  fetchAnalytics,
  type AnalyticsPageData,
} from "@/lib/dashboard/analytics-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";

export function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsPageData | null>(null);
  const requests = useWorkspace((s) => s.requests);
  const invoices = useWorkspace((s) => s.addedInvoices);
  const missingRequests = requests.filter((r) => r.status === "Missing Docs").length;
  const openInvoices = invoices.filter((i) => i.status !== "matched").length;

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
    <div className="flex min-w-0 flex-col gap-5 pb-2">
      <div>
        <h1 className="type-page">
          Analytics
        </h1>
        <p className="mt-1 type-meta text-muted">
          Facility submission history, claim status, and trends — built for
          quick scanning.
        </p>
      </div>

      <AnalyticsStatRow stats={data.stats} />
      <Card className={dashboardCardClass}>
        <Card.Header>
          <Card.Title className="type-card-title">Workflow health</Card.Title>
          <Card.Description className="type-meta text-muted">
            Counts from the work you have done in this session, plus the sample
            requests.
          </Card.Description>
        </Card.Header>
        <Card.Content className="gap-2">
          <InfoBanner tone={missingRequests ? "amber" : "green"}>
            {missingRequests} request{missingRequests === 1 ? "" : "s"} have
            missing items.
          </InfoBanner>
          <InfoBanner>
            {openInvoices} invoice{openInvoices === 1 ? "" : "s"} saved this
            session {openInvoices === 1 ? "is" : "are"} not matched yet.
          </InfoBanner>
          <InfoBanner tone="green">
            Resident and carrier details stay on the resident profile.
          </InfoBanner>
        </Card.Content>
      </Card>
      <div className="grid min-w-0 gap-4 lg:grid-cols-[repeat(5,minmax(0,1fr))]">
        <div className="min-w-0 lg:col-span-2">
          <ClaimsDonutChart breakdown={data.statusBreakdown} />
        </div>
        <div className="min-w-0 lg:col-span-3">
          <MonthlyTrendsChart trends={data.monthlyTrends} />
        </div>
      </div>
      <FacilitySubmissionHistory months={data.facilitySubmissionHistory} />
      <TopIssuesTable issues={data.topIssues} />
    </div>
  );
}
