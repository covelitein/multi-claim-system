"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { RecentSubmission } from "@/lib/dashboard/home-data";
import { ArrowDownToLine } from "@gravity-ui/icons";
import { Avatar, Card, Chip } from "@heroui/react";
import Link from "next/link";

const STATUS: Record<
  RecentSubmission["status"],
  { label: string; color: "success" | "warning" | "danger" | "accent"; card: string }
> = {
  approved: {
    label: "Approved",
    color: "success",
    card: "border-success/30 bg-success-soft/35",
  },
  pending: {
    label: "Pending",
    color: "warning",
    card: "border-warning/30 bg-warning-soft/35",
  },
  rejected: {
    label: "Rejected",
    color: "danger",
    card: "border-danger/30 bg-danger-soft/35",
  },
  submitted: {
    label: "Submitted",
    color: "accent",
    card: "border-accent/30 bg-accent-soft/35",
  },
};

export function RecentSubmissions({ items }: { items: RecentSubmission[] }) {
  const visible = items.slice(0, 5);

  return (
    <Card
      className={`${dashboardCardClass} flex h-full flex-col border border-accent/20 bg-gradient-to-br from-accent-soft/20 to-surface`}
    >
      <Card.Header className="flex-row items-center justify-between gap-3 py-3">
        <div>
          <Card.Title className="text-base font-bold">
            Recent Submissions
          </Card.Title>
          <p className="mt-0.5 text-xs text-muted">Most-used workspace</p>
        </div>
        <Link
          className="shrink-0 rounded-lg bg-accent px-2.5 py-1.5 text-xs font-semibold text-accent-foreground"
          href="/billing"
        >
          View all
        </Link>
      </Card.Header>
      <Card.Content className="flex flex-col gap-2 p-0 pt-1 pb-3">
        {visible.map((item) => {
          const status = STATUS[item.status];
          return (
            <div
              key={item.id}
              className={`mx-1 flex items-center gap-3 rounded-xl border px-3 py-2.5 ${status.card}`}
            >
              <Avatar className="size-9 shrink-0">
                <Avatar.Image alt={item.residentName} src={item.image} />
                <Avatar.Fallback>{item.initials}</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold">
                    {item.residentName}
                  </p>
                  <span className="shrink-0 text-sm font-bold tabular-nums">
                    {item.amount}
                  </span>
                </div>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="truncate text-xs text-muted">
                    {item.residentId} · {item.submittedAt}
                  </p>
                  <div className="flex shrink-0 items-center gap-1">
                    <Chip color={status.color} size="sm" variant="soft">
                      <Chip.Label>{status.label}</Chip.Label>
                    </Chip>
                    <button
                      aria-label={`Download submission for ${item.residentName}`}
                      className="rounded-md p-1 text-muted hover:bg-surface/80 hover:text-foreground"
                      type="button"
                    >
                      <ArrowDownToLine className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}
