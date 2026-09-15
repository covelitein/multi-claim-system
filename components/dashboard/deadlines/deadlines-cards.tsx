"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { DeadlineStat } from "@/lib/dashboard/deadlines-data";
import {
  Calendar,
  CircleCheck,
  CircleExclamation,
  Clock,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  overdue: CircleExclamation,
  today: Clock,
  "this-week": Calendar,
  upcoming: CircleCheck,
};

const TONE_STYLES: Record<string, string> = {
  danger: "bg-danger-soft text-danger",
  warning: "bg-warning-soft text-warning",
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
};

const LABEL_MAP: Record<string, string> = {
  overdue: "Overdue",
  today: "Due today",
  "this-week": "This week",
  upcoming: "Upcoming",
};

export function DeadlinesCards({ stats }: { stats: DeadlineStat[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICON_MAP[stat.id] ?? Clock;
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
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${TONE_STYLES[stat.tone]}`}
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
