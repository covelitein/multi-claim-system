"use client";

import type { MonthlyTrend } from "@/lib/dashboard/analytics-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card } from "@heroui/react";

export function MonthlyTrendsChart({ trends }: { trends: MonthlyTrend[] }) {
  const maxValue = Math.max(
    ...trends.flatMap((t) => [t.submitted, t.paid, t.denied]),
    1,
  );

  const barHeight = 220;

  const series = [
    { key: "submitted" as const, label: "Submitted", color: "var(--accent)" },
    { key: "paid" as const, label: "Paid", color: "var(--success)" },
    { key: "denied" as const, label: "Denied", color: "var(--danger)" },
  ];

  return (
    <Card
      className={`${dashboardCardClass} h-full border border-success/25 bg-gradient-to-br from-success-soft/30 to-surface`}
    >
      <Card.Header className="flex-col items-start gap-2 !pb-0 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Card.Title className="text-lg font-bold">Monthly Trends</Card.Title>
          <p className="mt-0.5 text-xs font-semibold text-muted">
            Facility submission performance
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          {series.map((s) => (
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
      <Card.Content className="pt-3">
        <div className="flex items-end gap-3 overflow-x-auto pb-1 sm:gap-3">
          {trends.map((t) => (
            <div
              key={t.month}
              className="flex flex-1 flex-col items-center gap-1.5"
              style={{ minWidth: 56 }}
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
                      className="w-2.5 rounded-t-sm transition-all duration-500 sm:w-3"
                      style={{
                        height,
                        backgroundColor: s.color,
                      }}
                      title={`${s.label}: ${value}`}
                    />
                  );
                })}
              </div>
              <span className="text-xs text-muted">{t.month}</span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
