"use client";

import { EditResidentDrawer } from "@/components/dashboard/drawers/add-resident-drawer";
import { ViewResidentDrawer } from "@/components/dashboard/residents/view-resident-drawer";
import { DataTable } from "@/components/ui/data-table";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { Resident, ResidentStatus } from "@/lib/dashboard/residents-data";
import { Funnel, Magnifier } from "@gravity-ui/icons";
import { Avatar, Card, Chip } from "@heroui/react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

const STATUS_CONFIG: Record<
  ResidentStatus,
  { label: string; color: "success" | "danger" | "warning" | "accent" }
> = {
  active: { label: "Active", color: "success" },
  inactive: { label: "Inactive", color: "danger" },
  pending: { label: "Pending", color: "warning" },
  "on-hold": { label: "On Hold", color: "accent" },
};

export function ResidentsTable({ residents }: { residents: Resident[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return residents;
    const lower = query.toLowerCase();
    return residents.filter(
      (r) =>
        `${r.firstName} ${r.lastName}`.toLowerCase().includes(lower) ||
        r.residentId.toLowerCase().includes(lower) ||
        r.payer.toLowerCase().includes(lower) ||
        r.facility.toLowerCase().includes(lower),
    );
  }, [residents, query]);

  const columns: ColumnDef<Resident>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Resident",
        cell: ({ row }) => {
          const r = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0">
                <Avatar.Image
                  alt={`${r.firstName} ${r.lastName}`}
                  src={r.image}
                />
                <Avatar.Fallback>{r.initials}</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {r.firstName} {r.lastName}
                </p>
                <p className="truncate text-xs text-muted">{r.facility}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "residentId",
        header: "ID",
        cell: ({ row }) => (
          <span className="font-mono text-xs text-muted">
            {row.original.residentId}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = STATUS_CONFIG[row.original.status];
          return (
            <Chip color={status.color} size="sm" variant="soft">
              <Chip.Label>{status.label}</Chip.Label>
            </Chip>
          );
        },
      },
      {
        accessorKey: "activeClaims",
        header: "Active claims",
        cell: ({ row }) => (
          <span className="font-medium tabular-nums">
            {row.original.activeClaims}
          </span>
        ),
      },
      {
        accessorKey: "pendingRequests",
        header: "Pending",
        cell: ({ row }) => (
          <span className="tabular-nums text-muted">
            {row.original.pendingRequests}
          </span>
        ),
      },
      {
        accessorKey: "lastClaim",
        header: "Last claim",
        cell: ({ row }) =>
          row.original.lastClaim ? (
            <Link
              className="font-mono text-xs font-medium text-accent hover:underline"
              href="/billing"
            >
              {row.original.lastClaim}
            </Link>
          ) : (
            <span className="text-muted">—</span>
          ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <ViewResidentDrawer resident={row.original} />
            <EditResidentDrawer resident={row.original} />
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Card.Title className="text-base font-semibold">
            All residents
          </Card.Title>
          <p className="mt-0.5 text-sm text-muted">
            {filtered.length} of {residents.length} shown
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
            <Magnifier className="size-4 shrink-0 text-muted" />
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              placeholder="Search residents..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-xl border border-border px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
            type="button"
          >
            <Funnel className="size-4" />
            Filters
          </button>
        </div>
      </Card.Header>
      <Card.Content className="-mx-5 overflow-x-auto px-0 pb-0">
        <div className="min-w-[760px]">
          <DataTable
            columns={columns}
            data={filtered}
            emptyContent="No residents match your search."
            enablePagination
            pageSize={8}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
