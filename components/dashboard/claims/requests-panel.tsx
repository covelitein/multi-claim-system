"use client";

import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { InfoBanner } from "@/components/dashboard/info-banner";
import { DataTable } from "@/components/ui/data-table";
import {
  NEXT_ACTIONS,
  useWorkspace,
  type RequestStatus,
  type WorkRequest,
} from "@/lib/dashboard/workspace-store";
import { Button, Card, Chip } from "@heroui/react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

const STATUSES: RequestStatus[] = [
  "In Progress",
  "Missing Docs",
  "Ready for Review",
  "Submitted",
  "Completed",
];

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

function statusColor(status: RequestStatus) {
  if (status === "Ready for Review" || status === "Submitted") return "accent";
  if (status === "Completed") return "success";
  if (status === "Missing Docs") return "danger";
  return "warning";
}

function WorkRequestDrawer({ request }: { request: WorkRequest }) {
  const updateRequest = useWorkspace((s) => s.updateRequest);
  const [status, setStatus] = useState(request.status);
  const [next, setNext] = useState(request.next);

  return (
    <DashboardDrawer
      description={`${request.residentName} · ${request.policyId}`}
      footer={
        <>
          <DrawerCancelButton label="Close" />
          <Button
            slot="close"
            variant="primary"
            onPress={() =>
              updateRequest(request.id, {
                status,
                next: status === "Completed" ? "Complete" : next,
              })
            }
          >
            Save request
          </Button>
        </>
      }
      sizeClassName="sm:max-w-lg"
      title={`Request · ${request.id}`}
      trigger={
        <Button className="h-9 px-3 text-sm font-bold" size="sm" variant="primary">
          Work request
        </Button>
      }
    >
      <InfoBanner>
        Next action: {request.next}. Work the steps, then save the new status.
      </InfoBanner>
      <div className="flex flex-col gap-2">
        <Link
          className="rounded-xl border border-border px-4 py-3 type-body hover:bg-surface-secondary"
          href={`/billing/cmr?resident=${request.residentId}`}
        >
          Complete CMR review
          <span className="mt-0.5 block type-meta font-medium text-muted">
            Open the monthly residence form for {request.residentName}.
          </span>
        </Link>
        <Link
          className="rounded-xl border border-border px-4 py-3 type-body hover:bg-surface-secondary"
          href={`/invoices?resident=${request.residentId}`}
        >
          Attach invoice
          <span className="mt-0.5 block type-meta font-medium text-muted">
            Confirm the invoice dates match the claim period.
          </span>
        </Link>
        <button
          className="rounded-xl border border-border px-4 py-3 text-left type-body hover:bg-surface-secondary"
          type="button"
          onClick={() => {
            setStatus("Ready for Review");
            setNext("Prepare submission checklist");
          }}
        >
          Prepare submission checklist
          <span className="mt-0.5 block type-meta font-medium text-muted">
            Sets the request to review. Confirm the carrier before any real
            submission.
          </span>
        </button>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className="type-body">Status</span>
          <select
            className={fieldClass}
            value={status}
            onChange={(e) => setStatus(e.target.value as RequestStatus)}
          >
            {STATUSES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1.5">
          <span className="type-body">Next action</span>
          <select
            className={fieldClass}
            value={next}
            onChange={(e) => setNext(e.target.value)}
          >
            {NEXT_ACTIONS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
      </div>
    </DashboardDrawer>
  );
}

export function RequestsPanel() {
  const requests = useWorkspace((s) => s.requests);
  const [query, setQuery] = useState("");
  const visible = requests.filter((request) => {
    const blob = `${request.id} ${request.residentName} ${request.type} ${request.next}`.toLowerCase();
    return blob.includes(query.trim().toLowerCase());
  });

  const columns: ColumnDef<WorkRequest>[] = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "Request ID",
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-accent">
            {row.original.id}
          </span>
        ),
      },
      {
        accessorKey: "residentName",
        header: "Resident",
        cell: ({ row }) => (
          <span className="text-sm font-semibold">{row.original.residentName}</span>
        ),
      },
      {
        accessorKey: "type",
        header: "Type",
        cell: ({ row }) => <span className="text-sm">{row.original.type}</span>,
      },
      {
        accessorKey: "policyId",
        header: "Policy",
        cell: ({ row }) => (
          <span className="font-mono text-xs">{row.original.policyId}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Chip color={statusColor(row.original.status)} size="sm" variant="soft">
            <Chip.Label>{row.original.status}</Chip.Label>
          </Chip>
        ),
      },
      {
        accessorKey: "next",
        header: "Next action",
        cell: ({ row }) => (
          <span className="text-sm font-semibold">{row.original.next}</span>
        ),
      },
      {
        accessorKey: "created",
        header: "Created",
        cell: ({ row }) => (
          <span className="text-sm text-muted">{row.original.created}</span>
        ),
      },
      {
        id: "action",
        header: "",
        cell: ({ row }) => <WorkRequestDrawer request={row.original} />,
      },
    ],
    [],
  );

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="py-3">
        <Card.Title className="text-base font-semibold">Request tracker</Card.Title>
        <p className="mt-0.5 text-xs text-muted">
          Each piece of work has its own request ID, status and next action.
          Example: REQ-10048 · Mary Johnson · Complete CMR review.
        </p>
        <input
          className="mt-3 h-10 w-full max-w-sm rounded-xl border border-border bg-surface px-3 text-sm font-medium outline-none focus:border-accent"
          placeholder="Search request ID or resident…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Card.Header>
      <Card.Content className="-mx-5 overflow-x-auto px-0 pb-0">
        <div className="min-w-[860px]">
          <DataTable columns={columns} data={visible} enablePagination />
        </div>
      </Card.Content>
    </Card>
  );
}
