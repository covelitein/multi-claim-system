"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { ClaimsOverviewSlice } from "@/lib/dashboard/home-data";
import { Card } from "@heroui/react";

export function ClaimsOverview({
  slices,
  rangeLabel,
}: {
  slices: ClaimsOverviewSlice[];
  rangeLabel: string;
}) {
  const chartSlices = slices.filter((s) => s.id !== "submitted");
  const total = chartSlices.reduce((sum, item) => sum + item.value, 0) || 1;
  const size = 148;
  const strokeWidth = 22;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;
  const arcs = chartSlices.map((item) => {
    const fraction = item.value / total;
    const dashLength = fraction * circumference;
    const gapLength = circumference - dashLength;
    const offset = cumulativeOffset;
    cumulativeOffset += fraction;
    return {
      ...item,
      dashArray: `${dashLength} ${gapLength}`,
      dashOffset: -(offset * circumference),
    };
  });

  return (
    <Card
      className={`${dashboardCardClass} flex h-full flex-col border border-accent/25 bg-gradient-to-br from-accent-soft/25 to-surface`}
    >
      <Card.Header className="shrink-0 flex-row items-center justify-between gap-3">
        <Card.Title className="text-base font-bold">
          Claims Overview
        </Card.Title>
        <span className="rounded-full bg-surface-secondary px-3 py-1 text-xs font-medium text-muted">
          {rangeLabel}
        </span>
      </Card.Header>
      <Card.Content className="mt-auto flex min-h-0 flex-1 flex-col justify-end pt-6">
        <div className="flex flex-col items-center gap-5 sm:flex-row sm:items-center">
          <div className="relative shrink-0">
            <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
              {arcs.map((arc) => (
                <circle
                  key={arc.id}
                  cx={size / 2}
                  cy={size / 2}
                  fill="none"
                  r={radius}
                  stroke={arc.color}
                  strokeDasharray={arc.dashArray}
                  strokeDashoffset={arc.dashOffset}
                  strokeLinecap="round"
                  strokeWidth={strokeWidth}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xl font-semibold">{total}</span>
              <span className="text-xs text-muted">Active</span>
            </div>
          </div>
          <div className="flex w-full flex-1 flex-col gap-3">
            {chartSlices.map((item) => (
              <div key={item.id} className="flex items-center gap-3">
                <span
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="flex-1 text-sm">{item.label}</span>
                <span className="text-sm font-medium tabular-nums">
                  {item.value}
                </span>
                <span className="w-10 text-right text-xs text-muted">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
