"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { InvoiceStat } from "@/lib/dashboard/invoices-data";
import { signalStyles } from "@/lib/dashboard/signal-colors";
import {
  CircleCheck,
  Clock,
  Receipt,
  TriangleExclamation,
  CircleXmark,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  total: Receipt,
  matched: CircleCheck,
  pending: Clock,
  missing: TriangleExclamation,
  overdue: CircleXmark,
};

const SHORT_LABEL: Record<string, string> = {
  total: "Total",
  matched: "Matched",
  pending: "Pending",
  missing: "Missing",
  overdue: "Overdue",
};

export function InvoicesStatCards({ stats }: { stats: InvoiceStat[] }) {
  return (
    <div className="grid min-w-0 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = ICON_MAP[stat.id] ?? Receipt;
        const tone =
          stat.tone === "default"
            ? {
                card: "border-2 border-border bg-surface-secondary",
                icon: "bg-foreground text-background",
                value: "text-foreground",
              }
            : signalStyles(stat.tone);

        return (
          <Card
            key={stat.id}
            className={`${dashboardCardClass} h-full border ${tone.card}`}
          >
            <Card.Content className="flex flex-row items-center justify-between gap-3 py-3">
              <div className="min-w-0">
                <p className="text-sm font-bold uppercase tracking-wide text-foreground/70">
                  {SHORT_LABEL[stat.id] ?? stat.label}
                </p>
                <p
                  className={`mt-1 text-3xl font-bold tracking-tight ${tone.value}`}
                >
                  {stat.value}
                </p>
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
