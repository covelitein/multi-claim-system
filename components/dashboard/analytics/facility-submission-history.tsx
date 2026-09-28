"use client";

import type { FacilitySubmissionMonth } from "@/lib/dashboard/analytics-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card } from "@heroui/react";

const SERIES = [
  { key: "submitted" as const, label: "Submitted", color: "var(--accent)" },
  { key: "approved" as const, label: "Approved", color: "var(--success)" },
  { key: "pending" as const, label: "Pending", color: "var(--warning)" },
  { key: "rejected" as const, label: "Rejected", color: "var(--danger)" },
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
      className={`${dashboardCardClass} border-2 border-warning/30 bg-gradient-to-br from-warning-soft/30 to-surface`}
    >
      <Card.Header className="flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Card.Title className="text-lg font-bold">
            Facility submission history
          </Card.Title>
          <p className="mt-0.5 text-sm font-medium text-muted">
            Overall facility monthly submissions (resident-level history lives
            on each resident profile)
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs font-bold text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </Card.Header>
      <Card.Content>
        <div className="flex items-end gap-3 overflow-x-auto pb-1 sm:gap-4">
          {months.map((month) => (
            <div
              key={month.month}
              className="flex min-w-16 flex-1 flex-col items-center gap-2"
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
                      className="w-2.5 rounded-t-sm sm:w-3"
                      style={{ height, backgroundColor: s.color }}
                      title={`${s.label}: ${value}`}
                    />
                  );
                })}
              </div>
              <span className="text-sm font-bold text-muted">{month.month}</span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
