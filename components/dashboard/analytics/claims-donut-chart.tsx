"use client";

import type { StatusBreakdown } from "@/lib/dashboard/analytics-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card } from "@heroui/react";

export function ClaimsDonutChart({
  breakdown,
}: {
  breakdown: StatusBreakdown[];
}) {
  const total = breakdown.reduce((sum, item) => sum + item.value, 0);
  const size = 200;
  const strokeWidth = 26;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativeOffset = 0;
  const arcs = breakdown.map((item) => {
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
      className={`${dashboardCardClass} h-full border border-accent/25 bg-gradient-to-br from-accent-soft/40 to-surface`}
    >
      <Card.Header className="!pb-0">
        <Card.Title className="text-lg font-bold">Claims by Status</Card.Title>
        <p className="mt-0.5 text-xs font-semibold text-muted">
          Facility-wide long-term care packet status
        </p>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-4 pt-3 sm:flex-row sm:items-center">
        <div className="relative shrink-0">
          <svg
            className="block"
            height={size}
            viewBox={`0 0 ${size} ${size}`}
            width={size}
          >
            {arcs.map((arc) => (
              <circle
                key={arc.label}
                className="transition-all duration-500"
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
            <span className="text-xl font-bold">{total}</span>
            <span className="text-xs text-muted">Total</span>
          </div>
        </div>
        <div className="flex w-full flex-1 flex-col gap-2">
          {breakdown.map((item) => (
            <div key={item.label} className="flex items-center gap-2.5">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="flex-1 truncate text-sm text-foreground">
                {item.label}
              </span>
              <span className="text-sm font-semibold tabular-nums">
                {item.value}
              </span>
              <span className="w-10 text-right text-xs text-muted">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
