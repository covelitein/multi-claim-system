"use client";

import {
  NewInvoiceDrawer,
  UploadInvoiceDrawer,
} from "@/components/dashboard/drawers/upload-invoice-drawer";
import { InvoicesStatCards } from "@/components/dashboard/invoices/invoices-stat-cards";
import { InvoicesTable } from "@/components/dashboard/invoices/invoices-table";
import { useInvoices } from "@/lib/dashboard/use-invoices";

export function InvoicesPage() {
  const { data, loading } = useInvoices();

  if (loading || !data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Invoices</h1>
          <p className="text-sm text-muted">
            Manage and track all billing invoices.
          </p>
        </div>
        <div className="mt-3 flex flex-wrap gap-2 sm:mt-0">
          <UploadInvoiceDrawer />
          <NewInvoiceDrawer />
        </div>
      </div>

      <InvoicesStatCards stats={data.stats} />
      <InvoicesTable invoices={data.invoices} />
    </div>
  );
}
