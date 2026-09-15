"use client";

import type { MonthlyTrend } from "@/lib/dashboard/analytics-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card } from "@heroui/react";

export function MonthlyTrendsChart({ trends }: { trends: MonthlyTrend[] }) {
  const maxValue = Math.max(
    ...trends.flatMap((t) => [t.submitted, t.paid, t.denied]),
  );

  const barHeight = 140;

  const series = [
    { key: "submitted" as const, label: "Submitted", color: "var(--accent)" },
    { key: "paid" as const, label: "Paid", color: "var(--success)" },
    { key: "denied" as const, label: "Denied", color: "var(--danger)" },
  ];

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="flex-row items-center justify-between">
        <Card.Title className="text-base font-semibold">
          Monthly Trends
        </Card.Title>
        <div className="flex items-center gap-4">
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
      <Card.Content>
        <div className="flex items-end gap-3 overflow-x-auto pb-1">
          {trends.map((t) => (
            <div
              key={t.month}
              className="flex flex-1 flex-col items-center gap-2"
              style={{ minWidth: 60 }}
            >
              <div
                className="flex w-full items-end justify-center gap-1"
                style={{ height: barHeight }}
              >
                {series.map((s) => {
                  const value = t[s.key];
                  const height = (value / maxValue) * barHeight;
                  return (
                    <div
                      key={s.key}
                      className="w-3 rounded-t-sm transition-all duration-500"
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
