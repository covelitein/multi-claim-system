"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { QuickAction } from "@/lib/dashboard/home-data";
import {
  ArrowRight,
  ArrowUpFromSquare,
  ChartColumn,
  FileText,
  Receipt,
} from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

const ACTION_ICONS: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  "new-claim": ArrowUpFromSquare,
  cmr: FileText,
  "upload-invoice": Receipt,
  reports: ChartColumn,
};

const TONE_CARD: Record<QuickAction["tone"], string> = {
  accent:
    "border-accent/40 bg-accent-soft text-accent hover:border-accent hover:bg-accent hover:text-accent-foreground",
  success:
    "border-success/40 bg-success-soft text-success hover:border-success hover:bg-success hover:text-success-foreground",
  warning:
    "border-warning/40 bg-warning-soft text-warning hover:border-warning hover:bg-warning hover:text-warning-foreground",
  danger:
    "border-danger/40 bg-danger-soft text-danger hover:border-danger hover:bg-danger hover:text-danger-foreground",
};

const TONE_ICON: Record<QuickAction["tone"], string> = {
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
};

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <Card
      className={`${dashboardCardClass} flex h-full flex-col border border-warning/25 bg-gradient-to-b from-warning-soft/30 to-surface`}
    >
      <Card.Header className="py-3">
        <Card.Title className="text-base font-bold">Quick Actions</Card.Title>
        <p className="mt-0.5 text-xs text-muted">Color-coded shortcuts</p>
      </Card.Header>
      <Card.Content className="flex flex-col gap-2 pt-1 pb-3">
        {actions.map((action) => {
          const Icon = ACTION_ICONS[action.id] ?? FileText;
          return (
            <Link
              key={action.id}
              className={`group flex items-center gap-2.5 rounded-xl border px-3 py-2.5 transition-colors ${TONE_CARD[action.tone]}`}
              href={action.href}
            >
              <span
                className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${TONE_ICON[action.tone]}`}
              >
                <Icon className="size-4" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm font-semibold leading-snug">
                  {action.label}
                </span>
                <span className="mt-0.5 block truncate text-xs opacity-80">
                  {action.description}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 opacity-70 transition-transform group-hover:translate-x-0.5" />
            </Link>
          );
        })}
      </Card.Content>
    </Card>
  );
}
