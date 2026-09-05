"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { VisitStat } from "@/lib/dashboard/home-data";
import { Card, cn } from "@heroui/react";
import { useState } from "react";

const TONE_FILL: Record<string, string> = {
  accent: "bg-accent/70",
  warning: "bg-warning/80",
  success: "bg-success/80",
  danger: "bg-danger/70",
};

export function VisitStats({
  stats,
  range,
}: {
  stats: VisitStat[];
  range: string;
}) {
  const [activeDay, setActiveDay] = useState("Fri");
  const max = Math.max(...stats.map((item) => item.value), 1);

  return (
    <Card className={dashboardCardClass}>
      <Card.Header>
        <Card.Title className="text-sm font-medium">Packet completion</Card.Title>
        <Card.Description className="text-sm text-muted">{range}</Card.Description>
      </Card.Header>
      <Card.Content>
        <div className="flex h-44 items-end justify-between gap-3">
          {stats.map((stat) => {
            const active = stat.day === activeDay;
            const showLabel = active || stat.pinned;
            const height = Math.max(16, Math.round((stat.value / max) * 128));

            return (
              <button
                key={stat.day}
                className="flex min-w-0 flex-1 flex-col items-center gap-1.5"
                type="button"
                onClick={() => setActiveDay(stat.day)}
              >
                <span
                  className={cn(
                    "rounded-full bg-surface px-2 py-0.5 text-xs font-medium shadow-sm",
                    showLabel ? "visible" : "invisible",
                  )}
                >
                  {stat.percent}%
                </span>
                <span
                  className={cn(
                    "w-5 rounded-full transition-all",
                    TONE_FILL[stat.tone],
                    active ? "opacity-100" : "opacity-80",
                  )}
                  style={{ height }}
                />
                <span
                  className={cn(
                    "text-xs",
                    active ? "font-medium text-foreground" : "text-muted",
                  )}
                >
                  {stat.day}
                </span>
              </button>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
}
