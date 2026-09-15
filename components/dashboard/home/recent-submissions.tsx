"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { RecentSubmission } from "@/lib/dashboard/home-data";
import { ArrowDownToLine } from "@gravity-ui/icons";
import { Avatar, Card, Chip } from "@heroui/react";
import Link from "next/link";

const STATUS: Record<
  RecentSubmission["status"],
  { label: string; color: "success" | "warning" | "danger" | "accent" }
> = {
  approved: { label: "Approved", color: "success" },
  pending: { label: "Pending", color: "warning" },
  rejected: { label: "Rejected", color: "danger" },
  submitted: { label: "Submitted", color: "accent" },
};

export function RecentSubmissions({ items }: { items: RecentSubmission[] }) {
  const visible = items.slice(0, 3);

  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header className="shrink-0 flex-row items-center justify-between gap-3">
        <Card.Title className="text-base font-semibold">
          Recent Submissions
        </Card.Title>
        <Link className="shrink-0 text-xs font-medium text-accent" href="/billing">
          View all
        </Link>
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col justify-start gap-3 p-0 pt-2">
        {visible.map((item) => {
          const status = STATUS[item.status];
          return (
            <div
              key={item.id}
              className="mx-1 rounded-2xl border border-border/70 bg-surface px-4 py-3.5"
            >
              <div className="flex items-start gap-3">
                <Avatar className="size-10 shrink-0">
                  <Avatar.Image alt={item.residentName} src={item.image} />
                  <Avatar.Fallback>{item.initials}</Avatar.Fallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold leading-5">
                        {item.residentName}
                      </p>
                      <p className="mt-0.5 truncate text-xs text-muted">
                        {item.residentId} · {item.submittedAt}
                      </p>
                    </div>
                    <button
                      aria-label={`Download submission for ${item.residentName}`}
                      className="shrink-0 rounded-lg p-1.5 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
                      type="button"
                    >
                      <ArrowDownToLine className="size-4" />
                    </button>
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3">
                    <Chip color={status.color} size="sm" variant="soft">
                      <Chip.Label>{status.label}</Chip.Label>
                    </Chip>
                    <span className="text-sm font-semibold tabular-nums">
                      {item.amount}
                    </span>
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
