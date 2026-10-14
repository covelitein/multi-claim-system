"use client";

import { StatusBadge } from "@/components/dashboard/status-badge";
import type { AnalyticsStat } from "@/lib/dashboard/analytics-data";
import { signalFor, signalStyles } from "@/lib/dashboard/signal-colors";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import {
  ArrowUpFromSquare,
  CircleCheck,
  Clock,
  CreditCard,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";
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

export function AnalyticsStatRow({ stats }: { stats: AnalyticsStat[] }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = ICON_MAP[stat.id] ?? ArrowUpFromSquare;
        const tone = signalStyles(stat.tone);

        return (
          <Card
            key={stat.id}
            className={`${dashboardCardClass} h-full border ${tone.card}`}
          >
            <Card.Content className="flex flex-row items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-wide text-foreground/70">
                  {stat.label}
                </p>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p
                    className={`text-3xl font-bold tracking-tight ${tone.value}`}
                  >
                    {stat.value}
                  </p>
                  <StatusBadge signal={signalFor(stat.tone)}>
                    {stat.change}
                  </StatusBadge>
                </div>
              </div>
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
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
