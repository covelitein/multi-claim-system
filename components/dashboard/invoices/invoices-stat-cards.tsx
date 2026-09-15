"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { InvoiceStat } from "@/lib/dashboard/invoices-data";
import { Card } from "@heroui/react";

const TONE_BG: Record<InvoiceStat["tone"], string> = {
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
  default: "bg-surface-secondary text-muted",
};

export function InvoicesStatCards({ stats }: { stats: InvoiceStat[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.id} className={dashboardCardClass}>
          <Card.Content className="gap-2">
            <span
              className={`inline-flex size-8 items-center justify-center rounded-lg text-xs font-semibold ${TONE_BG[stat.tone]}`}
            >
              {stat.value}
            </span>
            <p className="text-2xl font-semibold tracking-tight">{stat.value}</p>
            <p className="text-sm text-muted">{stat.label}</p>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
