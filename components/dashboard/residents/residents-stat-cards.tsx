"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { ResidentStat } from "@/lib/dashboard/residents-data";
import {
  CircleCheck,
  CircleXmark,
  Persons,
  TriangleExclamation,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  total: Persons,
  active: CircleCheck,
  inactive: CircleXmark,
  "pending-claims": TriangleExclamation,
};

const TONE_STYLES: Record<
  ResidentStat["tone"],
  { card: string; icon: string; value: string }
> = {
  accent: {
    card: "border-accent/35 bg-accent-soft/50",
    icon: "bg-accent text-accent-foreground",
    value: "text-accent",
  },
  success: {
    card: "border-success/35 bg-success-soft/50",
    icon: "bg-success text-success-foreground",
    value: "text-success",
  },
  warning: {
    card: "border-warning/35 bg-warning-soft/50",
    icon: "bg-warning text-warning-foreground",
    value: "text-warning",
  },
  danger: {
    card: "border-danger/35 bg-danger-soft/50",
    icon: "bg-danger text-danger-foreground",
    value: "text-danger",
  },
};

const LABEL_MAP: Record<string, string> = {
  total: "Total",
  active: "Active",
  inactive: "Inactive",
  "pending-claims": "Pending claims",
};

export function ResidentsStatCards({ stats }: { stats: ResidentStat[] }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICON_MAP[stat.id] ?? Persons;
        const tone = TONE_STYLES[stat.tone];

        return (
          <Card
            key={stat.id}
            className={`${dashboardCardClass} h-full border ${tone.card}`}
          >
            <Card.Content className="flex flex-row items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {LABEL_MAP[stat.id] ?? stat.label}
                </p>
                <p
                  className={`mt-1 text-2xl font-bold tracking-tight ${tone.value}`}
                >
                  {stat.value}
                </p>
              </div>
              <span
                className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
              >
                <Icon className="size-4" />
              </span>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}
