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

const TONE_SOFT: Record<QuickAction["tone"], string> = {
  accent: "bg-accent-soft text-accent",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-warning",
  danger: "bg-danger-soft text-danger",
};

export function QuickActions({ actions }: { actions: QuickAction[] }) {
  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header className="shrink-0">
        <Card.Title className="text-base font-semibold">Quick Actions</Card.Title>
      </Card.Header>
      <Card.Content className="mt-auto flex flex-1 flex-col justify-end gap-3 pt-4">
        {actions.map((action) => {
          const Icon = ACTION_ICONS[action.id] ?? FileText;
          return (
            <Link
              key={action.id}
              className="group flex items-center gap-3 rounded-2xl border border-border bg-surface px-3.5 py-3.5 transition-colors hover:border-accent/30 hover:bg-surface-secondary"
              href={action.href}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${TONE_SOFT[action.tone]}`}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-foreground">
                  {action.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  {action.description}
                </span>
              </span>
              <ArrowRight className="size-4 shrink-0 text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-accent" />
            </Link>
          );
        })}
      </Card.Content>
    </Card>
  );
}
