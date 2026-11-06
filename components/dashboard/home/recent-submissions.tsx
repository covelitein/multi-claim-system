"use client";

import {
  SubmissionClaimDrawer,
  signalForSubmissionLabel,
} from "@/components/dashboard/claims/claim-detail-drawer";
import { StatusBadge } from "@/components/dashboard/status-badge";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { RecentSubmission } from "@/lib/dashboard/home-data";
import { SIGNAL, type SignalName } from "@/lib/dashboard/signal-colors";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Avatar, Card, cn } from "@heroui/react";
import Link from "next/link";

const STATUS: Record<
  RecentSubmission["status"],
  { label: string; signal: SignalName }
> = {
  approved: { label: "Approved", signal: "green" },
  pending: { label: "Pending", signal: "amber" },
  "missing-docs": { label: "Missing Docs", signal: "red" },
  submitted: { label: "Submitted", signal: "blue" },
  "in-progress": { label: "In Progress", signal: "amber" },
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
  const savedStatus = useWorkspace((s) => s.submissionStatus);
  const savedUpdated = useWorkspace((s) => s.submissionUpdated);

  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header className="flex-row items-start justify-between gap-3 py-4">
        <div>
          <Card.Title className="type-card-title">
            Recent Submissions
          </Card.Title>
          <p className="mt-1 type-meta text-muted">
            Open a resident or claim to continue working.
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
          const label = savedStatus[item.claimId] ?? STATUS[item.status].label;
          const signal = savedStatus[item.claimId]
            ? signalForSubmissionLabel(label)
            : STATUS[item.status].signal;
          const updated = savedUpdated[item.claimId] ?? item.submittedAt;
          const selected = item.id === selectedId;
          return (
            <SubmissionClaimDrawer
              key={item.id}
              submission={item}
              trigger={
                <button
                  aria-pressed={selected}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl border border-border bg-surface px-3 py-3 text-left transition-colors",
                    SIGNAL[signal].edge,
                    selected
                      ? "bg-accent-soft ring-2 ring-accent"
                      : "hover:bg-surface-secondary",
                  )}
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
                      {item.claimId} · {updated}
                    </span>
                  </span>
                  <span className="flex shrink-0 flex-col items-end gap-1.5">
                    <span className="type-row tabular-nums">{item.amount}</span>
                    <StatusBadge signal={signal}>{label}</StatusBadge>
                  </span>
                </button>
              }
            />
          );
        })}
      </Card.Content>
    </Card>
  );
}
