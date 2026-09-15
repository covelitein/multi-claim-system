"use client";

import type { ClaimStat } from "@/lib/dashboard/claims-data";
import { cn } from "@heroui/react";

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
    <div className="flex flex-wrap gap-2">
      {stats.map((stat) => (
        <button
          key={stat.id}
          className={cn(
            "flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            active === stat.id
              ? "bg-accent text-accent-foreground shadow-sm"
              : "bg-surface text-muted shadow-sm hover:bg-surface-hover hover:text-foreground",
          )}
          type="button"
          onClick={() => onSelect(stat.id)}
        >
          <span>{stat.label}</span>
          <span
            className={cn(
              "flex size-6 items-center justify-center rounded-full text-xs font-semibold",
              active === stat.id
                ? "bg-white/20 text-accent-foreground"
                : "bg-surface-secondary text-muted",
            )}
          >
            {stat.value}
          </span>
        </button>
      ))}
    </div>
  );
}
