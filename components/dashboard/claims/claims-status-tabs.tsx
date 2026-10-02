"use client";

import type { ClaimStat } from "@/lib/dashboard/claims-data";
import { cn } from "@heroui/react";

const TAB_TONES: Record<
  string,
  { idle: string; active: string; badge: string }
> = {
  all: {
    idle: "border-border bg-surface text-foreground hover:bg-surface-secondary",
    active: "border-foreground bg-foreground text-background",
    badge: "bg-background/20 text-inherit",
  },
  "in-progress": {
    idle: "border-warning/35 bg-warning-soft text-warning hover:border-warning",
    active: "border-warning bg-warning text-warning-foreground",
    badge: "bg-white/25",
  },
  "missing-docs": {
    idle: "border-danger/35 bg-danger-soft text-danger hover:border-danger",
    active: "border-danger bg-danger text-danger-foreground",
    badge: "bg-white/25",
  },
  "ready-for-review": {
    idle: "border-accent/35 bg-accent-soft text-accent hover:border-accent",
    active: "border-accent bg-accent text-accent-foreground",
    badge: "bg-white/25",
  },
  submitted: {
    idle: "border-success/35 bg-success-soft text-success hover:border-success",
    active: "border-success bg-success text-success-foreground",
    badge: "bg-white/25",
  },
  denied: {
    idle: "border-danger/35 bg-danger-soft/70 text-danger hover:border-danger",
    active: "border-danger bg-danger text-danger-foreground",
    badge: "bg-white/25",
  },
};

const SHORT_LABEL: Record<string, string> = {
  all: "All",
  "in-progress": "In Progress",
  "missing-docs": "Missing",
  "ready-for-review": "Ready",
  submitted: "Submitted",
  denied: "Denied",
};

export function ClaimsStatusTabs({
  stats,
  active,
  onSelect,
}: {
  stats: ClaimStat[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="flex w-full gap-2">
      {stats.map((stat) => {
        const tone = TAB_TONES[stat.id] ?? TAB_TONES.all;
        const isActive = active === stat.id;
        return (
          <button
            key={stat.id}
            className={cn(
              "inline-flex min-w-0 flex-1 items-center justify-center gap-2 rounded-full border px-3 py-2.5 text-sm font-bold whitespace-nowrap transition-colors",
              isActive ? tone.active : tone.idle,
            )}
            type="button"
            onClick={() => onSelect(stat.id)}
          >
            <span className="truncate">{SHORT_LABEL[stat.id] ?? stat.label}</span>
            <span
              className={cn(
                "flex min-w-6 shrink-0 items-center justify-center rounded-full px-2 py-0.5 text-xs font-bold tabular-nums",
                isActive ? tone.badge : "bg-surface/80 text-inherit",
              )}
            >
              {stat.value}
            </span>
          </button>
        );
      })}
    </div>
  );
}
