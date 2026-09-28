"use client";

import { ViewInvoiceDrawer } from "@/components/dashboard/drawers/view-invoice-drawer";
import { DataTable } from "@/components/ui/data-table";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import {
  INVOICE_STATUS_CONFIG,
  type Invoice,
} from "@/lib/dashboard/invoices-data";
import { ArrowDownToLine, Magnifier } from "@gravity-ui/icons";
import { Card, Chip } from "@heroui/react";
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { useMemo, useState } from "react";

export function InvoicesTable({ invoices }: { invoices: Invoice[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return invoices;
    const lower = query.toLowerCase();
    return invoices.filter(
      (invoice) =>
        invoice.invoiceId.toLowerCase().includes(lower) ||
        invoice.residentName.toLowerCase().includes(lower) ||
        (invoice.matchedClaim?.toLowerCase().includes(lower) ?? false),
    );
  }, [invoices, query]);

  const columns: ColumnDef<Invoice>[] = useMemo(
    () => [
      {
        accessorKey: "invoiceId",
        header: "Invoice ID",
        cell: ({ row }) => (
          <span className="font-medium text-accent">{row.original.invoiceId}</span>
        ),
      },
      {
        accessorKey: "residentName",
        header: "Resident",
        cell: ({ row }) => row.original.residentName,
      },
      {
        accessorKey: "invoiceDate",
        header: "Invoice Date",
        cell: ({ row }) => (
          <span className="text-muted">{row.original.invoiceDate}</span>
        ),
      },
      {
        accessorKey: "servicePeriod",
        header: "Service Period",
        cell: ({ row }) => (
          <span className="text-muted">{row.original.servicePeriod}</span>
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <span className="font-medium tabular-nums">{row.original.amount}</span>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = INVOICE_STATUS_CONFIG[row.original.status];
          return (
            <Chip color={status.color} size="sm" variant="soft">
              <Chip.Label>{status.label}</Chip.Label>
            </Chip>
          );
        },
      },
      {
        accessorKey: "matchedClaim",
        header: "Matched Claim",
        cell: ({ row }) =>
          row.original.matchedClaim ? (
            <Link className="text-accent" href="/billing">
              {row.original.matchedClaim}
            </Link>
          ) : (
            <span className="text-muted">—</span>
          ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex items-center gap-1">
            <ViewInvoiceDrawer invoice={row.original} />
            <button
              aria-label="Download invoice"
              className="rounded-lg p-1.5 text-accent hover:bg-accent-soft"
              type="button"
            >
              <ArrowDownToLine className="size-4" />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="flex-col items-stretch gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Card.Title className="text-base font-semibold">All invoices</Card.Title>
          <p className="mt-0.5 text-xs text-muted">
            {filtered.length} of {invoices.length} shown
          </p>
        </div>
        <div className="flex w-full flex-col gap-2 sm:max-w-md sm:flex-row sm:items-center">
          <div className="flex w-full items-center gap-2 rounded-lg border border-border bg-surface px-2.5 py-1.5 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
            <Magnifier className="size-3.5 shrink-0 text-muted" />
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              placeholder="Search invoices..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <button
            className="inline-flex h-9 shrink-0 items-center justify-center rounded-lg border border-border px-3 text-sm font-medium text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
            type="button"
          >
            Filters
          </button>
        </div>
      </Card.Header>
      <Card.Content className="-mx-5 overflow-x-auto px-0 pb-0">
        <div className="min-w-[900px]">
          <DataTable
            columns={columns}
            data={filtered}
            emptyContent="No invoices match your search."
            enablePagination
          />
        </div>
      </Card.Content>
    </Card>
  );
}
