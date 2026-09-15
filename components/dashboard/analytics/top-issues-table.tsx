"use client";

import type { TopIssue } from "@/lib/dashboard/analytics-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card, Chip } from "@heroui/react";
import { useMemo } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

export function TopIssuesTable({ issues }: { issues: TopIssue[] }) {
  const columns: ColumnDef<TopIssue>[] = useMemo(
    () => [
      {
        accessorKey: "issue",
        header: "Issue",
        cell: ({ row }) => <span className="font-medium">{row.original.issue}</span>,
      },
      {
        accessorKey: "count",
        header: () => <div className="text-center">Count</div>,
        cell: ({ row }) => <div className="text-center">{row.original.count}</div>,
      },
      {
        accessorKey: "percentage",
        header: "% of Total",
        cell: ({ row }) => {
          const issue = row.original;
          return (
            <div className="flex items-center gap-2">
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-secondary">
                <div
                  className="h-full rounded-full bg-accent transition-all duration-500"
                  style={{ width: `${issue.percentage}%` }}
                />
              </div>
              <span className="w-10 text-right text-xs text-muted">
                {issue.percentage}%
              </span>
            </div>
          );
        },
      },
      {
        accessorKey: "trend",
        header: "Trend",
        cell: ({ row }) => {
          const trend = row.original.trend;
          return (
            <Chip
              color={
                trend === "up" ? "danger" : trend === "down" ? "success" : "default"
              }
              size="sm"
              variant="soft"
            >
              <Chip.Label>
                {trend === "up"
                  ? "↑ Rising"
                  : trend === "down"
                    ? "↓ Falling"
                    : "— Flat"}
              </Chip.Label>
            </Chip>
          );
        },
      },
    ],
    [],
  );

  return (
    <Card className={dashboardCardClass}>
      <Card.Header>
        <Card.Title className="text-base font-semibold">Top Issues</Card.Title>
        <Card.Description className="text-sm text-muted">
          Most common missing items and errors across all claims
        </Card.Description>
      </Card.Header>
      <Card.Content className="-mx-5 overflow-x-auto px-0 pb-0">
        <div className="min-w-[500px]">
          <DataTable
            columns={columns}
            data={issues}
            enablePagination={false}
            emptyContent="No issues found."
          />
        </div>
      </Card.Content>
    </Card>
  );
}
