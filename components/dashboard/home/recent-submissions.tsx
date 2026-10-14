"use client";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { RecentSubmission } from "@/lib/dashboard/home-data";
import { SIGNAL, type SignalName } from "@/lib/dashboard/signal-colors";
import { ArrowDownToLine } from "@gravity-ui/icons";
import { Avatar, Card, cn } from "@heroui/react";
import Link from "next/link";

const STATUS: Record<
  RecentSubmission["status"],
  { label: string; signal: SignalName }
> = {
  approved: { label: "Approved", signal: "green" },
  pending: { label: "Pending", signal: "amber" },
  rejected: { label: "Rejected", signal: "rose" },
  submitted: { label: "Submitted", signal: "blue" },
};

export function RecentSubmissions({
  items,
  selectedId,
  onSelect,
}: {
  items: RecentSubmission[];
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  const visible = items.slice(0, 5);

  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header className="flex-row items-start justify-between gap-3 py-4">
        <div>
          <Card.Title className="type-card-title">
            Recent Submissions
          </Card.Title>
          <p className="mt-1 type-meta text-muted">
            Tap a resident to work on their invoice.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-xl bg-accent px-4 py-2 type-body font-bold text-accent-foreground hover:opacity-90"
          href="/billing"
        >
          View all
        </Link>
      </Card.Header>
      <Card.Content className="flex flex-col gap-2 pb-2">
        {visible.map((item) => {
          const status = STATUS[item.status];
          const selected = item.id === selectedId;
          return (
            <div
              key={item.id}
              className={cn(
                "flex items-center gap-1 rounded-xl border border-border bg-surface pr-2 transition-colors",
                SIGNAL[status.signal].edge,
                selected
                  ? "bg-accent-soft ring-2 ring-accent"
                  : "hover:bg-surface-secondary",
              )}
            >
              <button
                aria-pressed={selected}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-lg px-3 py-3 text-left"
                type="button"
                onClick={() => onSelect(item.id)}
              >
                <Avatar className="size-10 shrink-0">
                  <Avatar.Image alt={item.residentName} src={item.image} />
                  <Avatar.Fallback>{item.initials}</Avatar.Fallback>
                </Avatar>
                <span className="min-w-0 flex-1">
                  <span className="block truncate type-row">
                    {item.residentName}
                  </span>
                  <span className="mt-0.5 block truncate type-meta text-muted">
                    {item.submittedAt}
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-1.5">
                  <span className="type-row tabular-nums">
                    {item.amount}
                  </span>
                  <StatusBadge signal={status.signal}>
                    {status.label}
                  </StatusBadge>
                </span>
              </button>
              <button
                aria-label={`Download submission for ${item.residentName}`}
                className="rounded-lg p-2.5 text-muted hover:bg-surface-secondary hover:text-foreground"
                type="button"
              >
                <ArrowDownToLine className="size-5" />
              </button>
            </div>
          );
        })}
      </Card.Content>
    </Card>
  );
}
