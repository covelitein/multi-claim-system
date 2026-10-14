"use client";

import type { FacilitySubmissionMonth } from "@/lib/dashboard/analytics-data";
import { ChartLegend } from "@/components/dashboard/chart-legend";
import { CHART } from "@/lib/dashboard/signal-colors";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card } from "@heroui/react";

const SERIES = [
  { key: "submitted" as const, label: "Submitted", color: CHART.submitted },
  { key: "approved" as const, label: "Approved", color: CHART.approved },
  { key: "pending" as const, label: "Pending", color: CHART.pending },
  { key: "rejected" as const, label: "Rejected", color: CHART.rejected },
];

export function FacilitySubmissionHistory({
  months,
}: {
  months: FacilitySubmissionMonth[];
}) {
  const maxValue = Math.max(
    ...months.flatMap((d) => [
      d.submitted,
      d.approved,
      d.pending,
      d.rejected,
    ]),
    1,
  );
  const barHeight = 160;

  return (
    <Card
      className={dashboardCardClass}
    >
      <Card.Header className="flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Card.Title className="type-card-title">
            Facility submission history
          </Card.Title>
          <p className="mt-0.5 type-meta text-muted">
            Overall facility monthly submissions (resident-level history lives
            on each resident profile)
          </p>
        </div>
        <ChartLegend items={SERIES} />
      </Card.Header>
      <Card.Content>
        <div className="flex items-end gap-2 pb-1 sm:gap-4">
          {months.map((month) => (
            <div
              key={month.month}
              className="flex min-w-0 flex-1 flex-col items-center gap-2"
            >
              <div
                className="flex w-full items-end justify-center gap-0.5"
                style={{ height: barHeight }}
              >
                {SERIES.map((s) => {
                  const value = month[s.key];
                  const height = Math.max(
                    (value / maxValue) * barHeight,
                    value > 0 ? 4 : 0,
                  );
                  return (
                    <div
                      key={s.key}
                      className="w-3 rounded-t-md sm:w-4"
                      style={{ height, backgroundColor: s.color }}
                      title={`${s.label}: ${value}`}
                    />
                  );
                })}
              </div>
              <span className="type-meta font-bold text-foreground">
                {month.month}
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
