"use client";

import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import {
  INVOICE_STATUS_CONFIG,
  type Invoice,
} from "@/lib/dashboard/invoices-data";
import { Eye } from "@gravity-ui/icons";
import { Chip } from "@heroui/react";

export function ViewInvoiceDrawer({ invoice }: { invoice: Invoice }) {
  const status = INVOICE_STATUS_CONFIG[invoice.status];

  return (
    <DashboardDrawer
      description="Invoice details. Claim forms are completed during Helix review."
      footer={<DrawerCancelButton label="Close" />}
      title="Invoice details"
      trigger={
        <button
          aria-label="View invoice"
          className="rounded-lg p-1.5 text-accent hover:bg-accent-soft"
          type="button"
        >
          <Eye className="size-4" />
        </button>
      }
    >
      <div className="rounded-xl border border-border px-4 py-3">
        <p className="text-xs font-medium text-muted">Invoice ID</p>
        <p className="mt-1 text-sm font-semibold">{invoice.invoiceId}</p>
      </div>
      <div className="rounded-xl border border-border px-4 py-3">
        <p className="text-xs font-medium text-muted">Resident</p>
        <p className="mt-1 text-sm font-semibold">{invoice.residentName}</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border px-4 py-3">
          <p className="text-xs font-medium text-muted">Date</p>
          <p className="mt-1 text-sm font-semibold">{invoice.invoiceDate}</p>
        </div>
        <div className="rounded-xl border border-border px-4 py-3">
          <p className="text-xs font-medium text-muted">Amount</p>
          <p className="mt-1 text-sm font-semibold">{invoice.amount}</p>
        </div>
      </div>
      <div className="rounded-xl border border-border px-4 py-3">
        <p className="text-xs font-medium text-muted">Service period</p>
        <p className="mt-1 text-sm font-semibold">{invoice.servicePeriod}</p>
      </div>
      <div className="flex items-center justify-between rounded-xl border border-border px-4 py-3">
        <div>
          <p className="text-xs font-medium text-muted">Status</p>
          <p className="mt-1 text-sm text-muted">
            Matched claim: {invoice.matchedClaim ?? "—"}
          </p>
        </div>
        <Chip color={status.color} size="sm" variant="soft">
          <Chip.Label>{status.label}</Chip.Label>
        </Chip>
      </div>
    </DashboardDrawer>
  );
}
