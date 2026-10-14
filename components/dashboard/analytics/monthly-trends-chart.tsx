"use client";

import type { MonthlyTrend } from "@/lib/dashboard/analytics-data";
import { ChartLegend } from "@/components/dashboard/chart-legend";
import { CHART } from "@/lib/dashboard/signal-colors";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card } from "@heroui/react";

export function MonthlyTrendsChart({ trends }: { trends: MonthlyTrend[] }) {
  const maxValue = Math.max(
    ...trends.flatMap((t) => [t.submitted, t.paid, t.denied]),
    1,
  );

  const barHeight = 220;

  const series = [
    { key: "submitted" as const, label: "Submitted", color: CHART.submitted },
    { key: "paid" as const, label: "Paid", color: CHART.paid },
    { key: "denied" as const, label: "Denied", color: CHART.denied },
  ];

  return (
    <Card
      className={`${dashboardCardClass} h-full`}
    >
      <Card.Header className="flex-col items-start gap-2 !pb-0 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Card.Title className="type-card-title">Monthly Trends</Card.Title>
          <p className="mt-0.5 type-meta text-muted">
            Facility submission performance
          </p>
        </div>
        <ChartLegend items={series} />
      </Card.Header>
      <Card.Content className="pt-3">
        <div className="flex items-end gap-1.5 pb-1 sm:gap-3">
          {trends.map((t) => (
            <div
              key={t.month}
              className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
            >
              <div
                className="flex w-full items-end justify-center gap-0.5"
                style={{ height: barHeight }}
              >
                {series.map((s) => {
                  const value = t[s.key];
                  const height = Math.max(
                    (value / maxValue) * barHeight,
                    value > 0 ? 4 : 0,
                  );
                  return (
                    <div
                      key={s.key}
                      className="w-2 rounded-t-md transition-all duration-500 sm:w-3"
                      style={{
                        height,
                        backgroundColor: s.color,
                      }}
                      title={`${s.label}: ${value}`}
                    />
                  );
                })}
              </div>
              <span className="type-meta font-bold text-foreground">
                {t.month}
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
