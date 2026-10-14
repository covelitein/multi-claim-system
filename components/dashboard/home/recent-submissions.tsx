"use client";

import { StatusBadge } from "@/components/dashboard/status-badge";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { RecentSubmission } from "@/lib/dashboard/home-data";
import { SIGNAL, type SignalName } from "@/lib/dashboard/signal-colors";
import { ArrowDownToLine } from "@gravity-ui/icons";
import { Avatar, Card } from "@heroui/react";
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
    <Card className={`${dashboardCardClass} flex h-full flex-col border-2 border-signal-blue bg-surface`}>
      <Card.Header className="flex-row items-center justify-between gap-3 py-4">
        <div>
          <Card.Title className="text-lg font-bold">
            Recent Submissions
          </Card.Title>
          <p className="mt-1 text-base font-semibold text-muted">
            Select a resident to create or upload an invoice.
          </p>
        </div>
        <Link
          className="shrink-0 rounded-xl bg-signal-blue px-3 py-2 text-sm font-bold text-white"
          href="/billing"
        >
          View all
        </Link>
      </Card.Header>
      <Card.Content className="flex flex-col gap-2 p-0 pt-1 pb-4">
        {visible.map((item) => {
          const status = STATUS[item.status];
          const selected = item.id === selectedId;
          return (
            <div
              key={item.id}
              className={`mx-1 flex items-center gap-2 rounded-xl px-2 py-2 ${SIGNAL[status.signal].card} ${
                selected
                  ? "shadow-[inset_0_0_0_3px_var(--foreground)]"
                  : ""
              }`}
            >
              <button
                aria-pressed={selected}
                className="flex min-w-0 flex-1 items-center gap-3 rounded-lg px-1 py-1 text-left"
                type="button"
                onClick={() => onSelect(item.id)}
              >
                <Avatar className="size-11 shrink-0">
                  <Avatar.Image alt={item.residentName} src={item.image} />
                  <Avatar.Fallback>{item.initials}</Avatar.Fallback>
                </Avatar>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center justify-between gap-2">
                    <span className="truncate text-base font-bold">
                      {item.residentName}
                    </span>
                    <span className="shrink-0 text-base font-bold tabular-nums">
                      {item.amount}
                    </span>
                  </span>
                  <span className="mt-1 flex items-center justify-between gap-2">
                    <span className="truncate text-sm font-semibold text-foreground/70">
                      {item.submittedAt}
                    </span>
                    <StatusBadge signal={status.signal}>{status.label}</StatusBadge>
                  </span>
                </span>
              </button>
              <button
                aria-label={`Download submission for ${item.residentName}`}
                className="rounded-lg p-2 text-foreground/70 hover:bg-white/70 hover:text-foreground"
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
