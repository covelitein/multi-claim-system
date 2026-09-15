"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { SubmissionHistoryDay } from "@/lib/dashboard/home-data";
import { Card } from "@heroui/react";

const SERIES = [
  { key: "submitted" as const, label: "Submitted", color: "var(--accent)" },
  { key: "approved" as const, label: "Approved", color: "var(--success)" },
  { key: "pending" as const, label: "Pending", color: "var(--warning)" },
  { key: "rejected" as const, label: "Rejected", color: "var(--danger)" },
];

export function SubmissionHistory({ days }: { days: SubmissionHistoryDay[] }) {
  const maxValue = Math.max(
    ...days.flatMap((d) => [d.submitted, d.approved, d.pending, d.rejected]),
    1,
  );
  const barHeight = 120;

  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header className="shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Card.Title className="text-base font-semibold">
          Submission History
        </Card.Title>
        <div className="flex flex-wrap items-center gap-3">
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="text-xs text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      </Card.Header>
      <Card.Content className="mt-auto flex min-h-0 flex-1 flex-col justify-end pt-6">
        <div className="flex items-end gap-2 overflow-x-auto pb-1 sm:gap-3">
          {days.map((day) => (
            <div
              key={day.date}
              className="flex min-w-14 flex-1 flex-col items-center gap-2"
            >
              <div
                className="flex w-full items-end justify-center gap-0.5"
                style={{ height: barHeight }}
              >
                {SERIES.map((s) => {
                  const value = day[s.key];
                  const height = Math.max(
                    (value / maxValue) * barHeight,
                    value > 0 ? 4 : 0,
                  );
                  return (
                    <div
                      key={s.key}
                      className="w-2 rounded-t-sm sm:w-2.5"
                      style={{ height, backgroundColor: s.color }}
                      title={`${s.label}: ${value}`}
                    />
                  );
                })}
              </div>
              <span className="text-[10px] text-muted sm:text-xs">
                {day.label}
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
