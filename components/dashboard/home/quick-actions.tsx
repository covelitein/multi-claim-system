"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { QuickAction, RecentSubmission } from "@/lib/dashboard/home-data";
import { signalStyles } from "@/lib/dashboard/signal-colors";
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

export function QuickActions({
  actions,
  resident,
}: {
  actions: QuickAction[];
  resident: RecentSubmission | null;
}) {
  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col border-2 border-signal-amber bg-signal-amber-soft/40`}>
      <Card.Header className="py-4">
        <Card.Title className="text-lg font-bold">Quick Actions</Card.Title>
        <p className="mt-1 text-base font-semibold text-muted">
          {resident
            ? `Working on ${resident.residentName}`
            : "Select a resident to create or upload an invoice."}
        </p>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3 pt-1 pb-4">
        {actions.map((action) => {
          if (action.requiresResident && !resident) return null;
          const Icon = ACTION_ICONS[action.id] ?? FileText;
          const tone = signalStyles(action.tone);
          const href =
            action.requiresResident && resident
              ? `${action.href}?resident=${resident.residentId}`
              : action.href;
          const description =
            action.requiresResident && resident
              ? resident.residentName
              : action.description;

          return (
            <Link
              key={action.id}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:brightness-95 ${tone.card}`}
              href={href}
            >
              <span
                className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className={`block text-base font-bold leading-snug ${tone.ink}`}>
                  {action.label}
                </span>
                <span className="mt-0.5 block text-sm font-semibold text-foreground/75">
                  {description}
                </span>
              </span>
              <ArrowRight className={`size-5 shrink-0 ${tone.ink}`} />
            </Link>
          );
        })}
      </Card.Content>
    </Card>
  );
}
