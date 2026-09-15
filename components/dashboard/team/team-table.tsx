"use client";

import { EditMemberDrawer } from "@/components/dashboard/drawers/invite-member-drawer";
import { DataTable } from "@/components/ui/data-table";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { TeamMember } from "@/lib/dashboard/team-data";
import { Eye, Funnel, Magnifier } from "@gravity-ui/icons";
import { Avatar, Card, Chip } from "@heroui/react";
import type { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

const ROLE_COLOR: Record<
  string,
  "accent" | "success" | "warning" | "danger" | "default"
> = {
  "Billing Manager": "accent",
  "Claims Specialist": "success",
  "Facility Admin": "warning",
  "Staff Nurse": "default",
  Administrator: "danger",
};

export function TeamTable({ members }: { members: TeamMember[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return members;
    const lower = query.toLowerCase();
    return members.filter(
      (m) =>
        `${m.firstName} ${m.lastName}`.toLowerCase().includes(lower) ||
        m.role.toLowerCase().includes(lower) ||
        m.email.toLowerCase().includes(lower) ||
        m.facility.toLowerCase().includes(lower),
    );
  }, [members, query]);

  const columns: ColumnDef<TeamMember>[] = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "Member",
        cell: ({ row }) => {
          const m = row.original;
          return (
            <div className="flex items-center gap-3">
              <Avatar className="size-9 shrink-0">
                <Avatar.Image
                  alt={`${m.firstName} ${m.lastName}`}
                  src={m.image}
                />
                <Avatar.Fallback>{m.initials}</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate font-medium">
                  {m.firstName} {m.lastName}
                </p>
                <p className="truncate text-xs text-muted">{m.email}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: "role",
        header: "Role",
        cell: ({ row }) => {
          const m = row.original;
          return (
            <Chip
              color={ROLE_COLOR[m.role] ?? "default"}
              size="sm"
              variant="soft"
            >
              <Chip.Label>{m.role}</Chip.Label>
            </Chip>
          );
        },
      },
      {
        accessorKey: "facility",
        header: "Facility",
        cell: ({ row }) => (
          <span className="text-muted">{row.original.facility}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const m = row.original;
          return (
            <Chip
              color={m.status === "active" ? "success" : "default"}
              size="sm"
              variant="soft"
            >
              <Chip.Label>
                {m.status === "active" ? "Active" : "Inactive"}
              </Chip.Label>
            </Chip>
          );
        },
      },
      {
        accessorKey: "lastActive",
        header: "Last active",
        cell: ({ row }) => (
          <span className="tabular-nums text-muted">
            {row.original.lastActive}
          </span>
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <div className="flex items-center justify-end gap-1">
            <button
              aria-label="View member"
              className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
              type="button"
            >
              <Eye className="size-4" />
            </button>
            <EditMemberDrawer member={row.original} />
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
            All members
          </Card.Title>
          <p className="mt-0.5 text-sm text-muted">
            {filtered.length} of {members.length} shown
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
            <Magnifier className="size-4 shrink-0 text-muted" />
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              placeholder="Search team..."
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
            emptyContent="No team members match your search."
            enablePagination
            pageSize={8}
          />
        </div>
      </Card.Content>
    </Card>
  );
}
