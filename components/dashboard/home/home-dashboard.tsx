"use client";

import { ClaimsOverview } from "@/components/dashboard/home/claims-overview";
import { FacilityPlanCard } from "@/components/dashboard/home/facility-plan-card";
import { HomeSkeleton } from "@/components/dashboard/home/home-skeleton";
import { ImportantReminders } from "@/components/dashboard/home/important-reminders";
import { KpiStatCards } from "@/components/dashboard/home/kpi-stat-cards";
import { QuickActions } from "@/components/dashboard/home/quick-actions";
import { RecentSubmissions } from "@/components/dashboard/home/recent-submissions";
import { SubmissionHistory } from "@/components/dashboard/home/submission-history";
import { useDashboardHome } from "@/lib/dashboard/use-dashboard-home";
import { Calendar } from "@gravity-ui/icons";
import Link from "next/link";

export function HomeDashboard() {
  const { data, loading } = useDashboardHome();

  if (loading || !data) {
    return <HomeSkeleton />;
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 overflow-x-hidden pb-4 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Welcome back, Billing Manager
          </h1>
          <p className="mt-1 text-sm text-muted">{data.greetingSubtitle}</p>
        </div>
        <Link
          className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-surface px-3.5 py-2 text-sm text-muted transition-colors hover:border-accent/40 hover:text-foreground"
          href="/billing"
        >
          <Calendar className="size-4 text-accent" />
          <span>
            Last submission{" "}
            <span className="font-medium text-foreground">
              {data.lastSubmissionDate}
            </span>
          </span>
        </Link>
      </div>

      <KpiStatCards kpis={data.kpis} />

      <div className="grid min-w-0 gap-5 xl:grid-cols-3 xl:gap-6">
        <ClaimsOverview
          rangeLabel={data.overviewRangeLabel}
          slices={data.overview}
        />
        <RecentSubmissions items={data.recentSubmissions} />
        <QuickActions actions={data.quickActions} />
      </div>

      <div className="grid min-w-0 gap-5 xl:grid-cols-3 xl:gap-6">
        <ImportantReminders reminders={data.reminders} />
        <SubmissionHistory days={data.submissionHistory} />
        <FacilityPlanCard plan={data.facilityPlan} />
      </div>
    </div>
  );
}
