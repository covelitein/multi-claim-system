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
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header className="py-4">
        <Card.Title className="type-card-title">Quick Actions</Card.Title>
        <p className="mt-1 type-meta text-muted">
          {resident ? (
            <>
              Working on{" "}
              <span className="font-bold text-foreground">
                {resident.residentName}
              </span>
            </>
          ) : (
            "Select a resident to see their monthly form and invoice actions."
          )}
        </p>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3 pb-2">
        {actions.map((action) => {
          if (action.requiresResident && !resident) return null;
          const Icon = ACTION_ICONS[action.id] ?? FileText;
          const tone = signalStyles(action.tone);
          const scoped = action.requiresResident && resident;
          const href = scoped
            ? `${action.href}?resident=${resident.residentId}`
            : action.href;

          return (
            <Link
              key={action.id}
              className={`group flex items-center gap-3 rounded-xl px-3.5 py-3.5 transition-shadow hover:shadow-md ${tone.tile}`}
              href={href}
            >
              <span
                className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${tone.icon}`}
              >
                <Icon className="size-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span
                  className={`block type-row ${tone.ink}`}
                >
                  {action.label}
                </span>
                <span className="mt-0.5 block type-meta text-foreground/70">
                  {scoped ? `For ${resident.residentName}` : action.description}
                </span>
              </span>
              <ArrowRight
                className={`size-5 shrink-0 transition-transform group-hover:translate-x-0.5 ${tone.ink}`}
              />
            </Link>
          );
        })}
      </Card.Content>
    </Card>
  );
}
