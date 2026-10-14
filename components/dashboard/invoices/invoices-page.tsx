"use client";

import { CreateInvoiceDrawer } from "@/components/dashboard/drawers/create-invoice-drawer";
import { UploadInvoiceDrawer } from "@/components/dashboard/drawers/upload-invoice-drawer";
import { InvoicesStatCards } from "@/components/dashboard/invoices/invoices-stat-cards";
import { InvoicesTable } from "@/components/dashboard/invoices/invoices-table";
import { residentByKey } from "@/lib/dashboard/residents-data";
import { useInvoices } from "@/lib/dashboard/use-invoices";
import { useEffect, useState } from "react";

export function InvoicesPage() {
  const { data, loading } = useInvoices();
  const [residentKey, setResidentKey] = useState<string | null>(null);

  useEffect(() => {
    setResidentKey(new URLSearchParams(window.location.search).get("resident"));
  }, []);

  const focused = residentByKey(residentKey);

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
          <h1 className="type-page">
            Invoices
          </h1>
          <p className="mt-1 type-meta text-muted">
            {focused
              ? `Invoice for ${focused.firstName} ${focused.lastName} · ${focused.policyId} · ${focused.payer}`
              : "Upload a signed invoice or create one with the guided builder."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <UploadInvoiceDrawer
            key={focused?.id ?? "upload"}
            residentKey={focused?.residentId}
          />
          <CreateInvoiceDrawer
            key={focused?.id ?? "create"}
            residentKey={focused?.residentId}
          />
        </div>
      </div>

      <InvoicesStatCards stats={data.stats} />
      <InvoicesTable invoices={data.invoices} />
    </div>
  );
}
