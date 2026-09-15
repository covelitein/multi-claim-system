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
  const size = 160;
  const strokeWidth = 24;
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
    <Card className={dashboardCardClass}>
      <Card.Header>
        <Card.Title className="text-base font-semibold">
          Claims by Status
        </Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col items-center gap-6 sm:flex-row">
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
            <span className="text-2xl font-semibold">{total}</span>
            <span className="text-xs text-muted">Total</span>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-3">
          {breakdown.map((item) => (
            <div key={item.label} className="flex items-center gap-3">
              <span
                className="size-3 shrink-0 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="flex-1 text-sm">{item.label}</span>
              <span className="text-sm font-medium">{item.value}</span>
              <span className="w-12 text-right text-xs text-muted">
                {((item.value / total) * 100).toFixed(0)}%
              </span>
            </div>
          ))}
        </div>
      </Card.Content>
    </Card>
  );
}
