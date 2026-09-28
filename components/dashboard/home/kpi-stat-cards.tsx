"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { HomeKpiCard, HomeKpiIcon } from "@/lib/dashboard/home-data";
import {
  ArrowUpFromSquare,
  CircleCheck,
  CircleXmark,
  Clock,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<
  HomeKpiIcon,
  ComponentType<SVGProps<SVGSVGElement>>
> = {
  submitted: ArrowUpFromSquare,
  approved: CircleCheck,
  pending: Clock,
  rejected: CircleXmark,
};

const TONE_STYLES: Record<
  HomeKpiCard["tone"],
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

export function KpiStatCards({ kpis }: { kpis: HomeKpiCard[] }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = ICON_MAP[kpi.icon];
        const tone = TONE_STYLES[kpi.tone];

        const body = (
          <Card
            className={`${dashboardCardClass} h-full border transition-shadow hover:shadow-sm ${tone.card}`}
          >
            <Card.Content className="flex flex-row items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted">
                  {kpi.label}
                </p>
                <p
                  className={`mt-1 text-2xl font-bold tracking-tight ${tone.value}`}
                >
                  {kpi.value}
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

        return kpi.href ? (
          <Link key={kpi.id} className="min-w-0" href={kpi.href}>
            {body}
          </Link>
        ) : (
          <div key={kpi.id} className="min-w-0">
            {body}
          </div>
        );
      })}
    </div>
  );
}
