"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { HomeKpiCard, HomeKpiIcon } from "@/lib/dashboard/home-data";
import { signalStyles } from "@/lib/dashboard/signal-colors";
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

export function KpiStatCards({ kpis }: { kpis: HomeKpiCard[] }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const Icon = ICON_MAP[kpi.icon];
        const tone = signalStyles(kpi.tone);

        const body = (
          <Card
            className={`${dashboardCardClass} h-full border transition-shadow hover:shadow-sm ${tone.card}`}
          >
            <Card.Content className="flex flex-row items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-wide text-foreground/70">
                  {kpi.label}
                </p>
                <p
                  className={`mt-1 text-3xl font-bold tracking-tight sm:text-4xl ${tone.value}`}
                >
                  {kpi.value}
                </p>
              </div>
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-2xl ${tone.icon}`}
              >
                <Icon className="size-6" />
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
