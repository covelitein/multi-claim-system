"use client";

import { ClaimsOverview } from "@/components/dashboard/home/claims-overview";
import { FacilityPlanCard } from "@/components/dashboard/home/facility-plan-card";
import { HomeSkeleton } from "@/components/dashboard/home/home-skeleton";
import { ImportantReminders } from "@/components/dashboard/home/important-reminders";
import { KpiStatCards } from "@/components/dashboard/home/kpi-stat-cards";
import { QuickActions } from "@/components/dashboard/home/quick-actions";
import { RecentSubmissions } from "@/components/dashboard/home/recent-submissions";
import { useDashboardHome } from "@/lib/dashboard/use-dashboard-home";
import { Calendar } from "@gravity-ui/icons";
import Link from "next/link";
import { useState } from "react";

export function HomeDashboard() {
  const { data, loading } = useDashboardHome();
  const [selectedId, setSelectedId] = useState<string | null>(null);

  if (loading || !data) {
    return <HomeSkeleton />;
  }

  const selected =
    data.recentSubmissions.find((item) => item.id === selectedId) ?? null;

  return (
    <div className="flex min-w-0 flex-col gap-4 overflow-x-hidden pb-4">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, Billing Manager
          </h1>
          <p className="mt-1 text-base font-semibold text-muted">
            {data.greetingSubtitle}
          </p>
        </div>
        <Link
          className="inline-flex w-fit items-center gap-2 rounded-full border-2 border-signal-blue bg-signal-blue-soft px-4 py-2 text-sm font-bold text-signal-blue-ink"
          href="/billing"
        >
          <Calendar className="size-4" />
          Last submission{" "}
          <span className="font-bold text-foreground">
            {data.lastSubmissionDate}
          </span>
        </Link>
      </div>

      <KpiStatCards kpis={data.kpis} />

      <div className="grid min-w-0 gap-4 xl:grid-cols-12">
        <div className="min-w-0 xl:col-span-8">
          <RecentSubmissions
            items={data.recentSubmissions}
            selectedId={selectedId}
            onSelect={(id) =>
              setSelectedId((current) => (current === id ? null : id))
            }
          />
        </div>
        <div className="min-w-0 xl:col-span-4">
          <QuickActions actions={data.quickActions} resident={selected} />
        </div>
      </div>

      <div className="grid min-w-0 gap-4 xl:grid-cols-3">
        <ClaimsOverview
          rangeLabel={data.overviewRangeLabel}
          slices={data.overview}
        />
        <ImportantReminders reminders={data.reminders} />
        <FacilityPlanCard plan={data.facilityPlan} />
      </div>
    </div>
  );
}
