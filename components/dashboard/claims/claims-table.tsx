"use client";

import type { Claim, ClaimStatus } from "@/lib/dashboard/claims-data";
import { STATUS_CONFIG } from "@/lib/dashboard/claims-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Magnifier } from "@gravity-ui/icons";
import { Avatar, Card, Chip } from "@heroui/react";
import { useMemo, useState } from "react";
import { DataTable } from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

export function ClaimsTable({
  claims,
  statusFilter,
}: {
  claims: Claim[];
  statusFilter: string;
}) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    let result = claims;
    if (statusFilter !== "all") {
      result = result.filter((c) => c.status === statusFilter);
    }
    if (query.trim()) {
      const lower = query.toLowerCase();
      result = result.filter(
        (c) =>
          c.residentName.toLowerCase().includes(lower) ||
          c.policyId.toLowerCase().includes(lower) ||
          c.insurer.toLowerCase().includes(lower) ||
          c.facility.toLowerCase().includes(lower),
      );
    }
    return result;
  }, [claims, statusFilter, query]);

  const columns: ColumnDef<Claim>[] = useMemo(
    () => [
      {
        accessorKey: "policyId",
        header: "Policy ID",
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-accent">
            {row.original.policyId}
          </span>
        ),
      },
      {
        accessorKey: "resident",
        header: "Resident",
        cell: ({ row }) => {
          const c = row.original;
          return (
            <div className="flex items-center gap-2.5">
              <Avatar className="size-7 shrink-0">
                <Avatar.Image alt={c.residentName} src={c.residentImage} />
                <Avatar.Fallback>{c.residentInitials}</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{c.residentName}</p>
                <p className="truncate text-xs text-muted">{c.facility}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "insurer",
        header: "Client / Insurer",
        cell: ({ row }) => (
          <span className="text-sm text-foreground">{row.original.insurer}</span>
        ),
      },
      {
        accessorKey: "billingPeriod",
        header: "Period",
        cell: ({ row }) => (
          <span className="text-sm text-muted">{row.original.billingPeriod}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const statusCfg = STATUS_CONFIG[row.original.status as ClaimStatus];
          return (
            <Chip color={statusCfg.color} size="sm" variant="soft">
              <Chip.Label>{statusCfg.label}</Chip.Label>
            </Chip>
          );
        },
      },
      {
        accessorKey: "missingItems",
        header: () => <div className="text-center">Missing</div>,
        cell: ({ row }) => {
          const missing = row.original.missingItems;
          return (
            <div className="text-center">
              {missing > 0 ? (
                <Chip color="danger" size="sm" variant="soft">
                  <Chip.Label>{missing}</Chip.Label>
                </Chip>
              ) : (
                <span className="text-muted">—</span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "lastUpdated",
        header: "Updated",
        cell: ({ row }) => (
          <span className="text-sm text-muted">{row.original.lastUpdated}</span>
        ),
      },
    ],
    [],
  );

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="flex-col items-stretch gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Card.Title className="text-base font-semibold">
            Claims workflow
          </Card.Title>
          <p className="mt-0.5 text-xs text-muted">
            {filtered.length} of {claims.length} shown
          </p>
        </div>
        <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 sm:max-w-xs focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
          <Magnifier className="size-3.5 shrink-0 text-muted" />
          <input
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            placeholder="Search policy, resident…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </Card.Header>
      <Card.Content className="-mx-5 overflow-x-auto px-0 pb-0">
        <div className="min-w-[800px]">
          <DataTable
            columns={columns}
            data={filtered}
            emptyContent="No claims match your criteria."
            enablePagination
          />
        </div>
      </Card.Content>
    </Card>
  );
}
