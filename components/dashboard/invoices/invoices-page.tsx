"use client";

import { CreateInvoiceDrawer } from "@/components/dashboard/drawers/create-invoice-drawer";
import { UploadInvoiceDrawer } from "@/components/dashboard/drawers/upload-invoice-drawer";
import { InvoicesStatCards } from "@/components/dashboard/invoices/invoices-stat-cards";
import { InvoicesTable } from "@/components/dashboard/invoices/invoices-table";
import { useInvoices } from "@/lib/dashboard/use-invoices";

export function InvoicesPage() {
  const { data, loading } = useInvoices();

  if (loading || !data) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 pb-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Invoices
          </h1>
          <p className="mt-0.5 text-sm text-muted">
            Upload a signed invoice or create one with the guided builder.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <UploadInvoiceDrawer />
          <CreateInvoiceDrawer />
        </div>
      </div>

      <InvoicesStatCards stats={data.stats} />
      <InvoicesTable invoices={data.invoices} />
    </div>
  );
}
