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

/** Soft filled squares — readable color coding without a neon riot. */
const TONE_STYLES: Record<
  ResidentStat["tone"],
  { card: string; icon: string; label: string; value: string }
> = {
  accent: {
    card: "border-accent/40 bg-accent-soft",
    icon: "bg-accent/15 text-accent",
    label: "text-accent",
    value: "text-accent",
  },
  success: {
    card: "border-success/40 bg-success-soft",
    icon: "bg-success/15 text-success",
    label: "text-success",
    value: "text-success",
  },
  warning: {
    card: "border-warning/40 bg-warning-soft",
    icon: "bg-warning/15 text-warning",
    label: "text-warning",
    value: "text-warning",
  },
  danger: {
    card: "border-danger/40 bg-danger-soft",
    icon: "bg-danger/15 text-danger",
    label: "text-danger",
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
            className={`${dashboardCardClass} h-full border-2 ${tone.card}`}
          >
            <Card.Content className="flex flex-row items-center justify-between gap-3 py-4">
              <div className="min-w-0">
                <p
                  className={`text-xs font-bold uppercase tracking-wide ${tone.label}`}
                >
                  {LABEL_MAP[stat.id] ?? stat.label}
                </p>
                <p
                  className={`mt-1.5 text-3xl font-bold tracking-tight ${tone.value}`}
                >
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
