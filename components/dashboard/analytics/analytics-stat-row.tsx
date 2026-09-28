"use client";

import type { AnalyticsStat } from "@/lib/dashboard/analytics-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import {
  ArrowUpFromSquare,
  CircleCheck,
  Clock,
  CreditCard,
} from "@gravity-ui/icons";
import { Card, Chip } from "@heroui/react";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<
  string,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  filed: ArrowUpFromSquare,
  approval: CircleCheck,
  processing: Clock,
  revenue: CreditCard,
};

const TONE_STYLES: Record<
  AnalyticsStat["tone"],
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

export function AnalyticsStatRow({ stats }: { stats: AnalyticsStat[] }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICON_MAP[stat.id] ?? ArrowUpFromSquare;
        const tone = TONE_STYLES[stat.tone];

        return (
          <Card
            key={stat.id}
            className={`${dashboardCardClass} h-full border ${tone.card}`}
          >
            <Card.Content className="flex flex-row items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {stat.label}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p
                    className={`text-2xl font-bold tracking-tight ${tone.value}`}
                  >
                    {stat.value}
                  </p>
                  <Chip
                    color={stat.tone === "accent" ? "accent" : stat.tone}
                    size="sm"
                    variant="soft"
                  >
                    <Chip.Label className="text-[11px] font-semibold">
                      {stat.change}
                    </Chip.Label>
                  </Chip>
                </div>
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
