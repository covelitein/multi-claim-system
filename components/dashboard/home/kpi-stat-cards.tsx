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
  { icon: string; value: string }
> = {
  accent: { icon: "bg-accent-soft text-accent", value: "text-foreground" },
  success: { icon: "bg-success-soft text-success", value: "text-foreground" },
  warning: { icon: "bg-warning-soft text-warning", value: "text-foreground" },
  danger: { icon: "bg-danger-soft text-danger", value: "text-foreground" },
};

export function KpiStatCards({ kpis }: { kpis: HomeKpiCard[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = ICON_MAP[kpi.icon];
        const tone = TONE_STYLES[kpi.tone];

        const body = (
          <Card
            className={`${dashboardCardClass} h-full transition-shadow hover:shadow-md`}
          >
            <Card.Content className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-medium text-muted">{kpi.label}</p>
                <p
                  className={`mt-2 text-3xl font-semibold tracking-tight ${tone.value}`}
                >
                  {kpi.value}
                </p>
                {kpi.href ? (
                  <span className="mt-3 inline-block text-xs font-medium text-accent">
                    View claims
                  </span>
                ) : null}
              </div>
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-2xl ${tone.icon}`}
              >
                <Icon className="size-5" />
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
