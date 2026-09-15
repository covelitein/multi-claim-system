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
  { icon: string }
> = {
  accent: { icon: "bg-accent-soft text-accent" },
  success: { icon: "bg-success-soft text-success" },
  warning: { icon: "bg-warning-soft text-warning" },
  danger: { icon: "bg-danger-soft text-danger" },
};

const LABEL_MAP: Record<string, string> = {
  total: "Total",
  active: "Active",
  inactive: "Inactive",
  "pending-claims": "Pending claims",
};

export function ResidentsStatCards({ stats }: { stats: ResidentStat[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICON_MAP[stat.id] ?? Persons;
        const tone = TONE_STYLES[stat.tone];

        return (
          <Card
            key={stat.id}
            className={`${dashboardCardClass} transition-shadow hover:shadow-md`}
          >
            <Card.Content className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted">
                  {LABEL_MAP[stat.id] ?? stat.label}
                </p>
                <p className="mt-2 text-3xl font-semibold tracking-tight">
                  {stat.value}
                </p>
              </div>
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${tone.icon}`}
              >
                <Icon className="size-5" />
              </span>
            </Card.Content>
          </Card>
        );
      })}
    </div>
  );
}
