"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
  DrawerPrimaryCloseButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import {
  DocumentUploadZone,
  type UploadedDocument,
} from "@/components/dashboard/drawers/document-upload-zone";
import { RESIDENTS_DATA } from "@/lib/dashboard/residents-data";
import { Button, Label } from "@heroui/react";
import { useState } from "react";

/** Gen-1: dummy upload invoice drawer. */
export function UploadInvoiceDrawer() {
  const [files, setFiles] = useState<UploadedDocument[]>([]);

  return (
    <DashboardDrawer
      description="Upload an invoice packet for review. You do not fill claim forms here."
      footer={
        <>
          <DrawerCancelButton />
          <DrawerPrimaryCloseButton label="Upload for review" />
        </>
      }
      title="Upload invoice"
      trigger={
        <Button
          className="h-11 gap-2 border border-accent/35 bg-accent-soft px-4 text-sm font-bold text-accent"
          variant="outline"
        >
          Upload Invoice
        </Button>
      }
    >
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-bold">Resident</Label>
        <select
          className="h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-semibold"
          defaultValue={RESIDENTS_DATA.residents[0]?.id}
          name="invoiceResidentId"
        >
          {RESIDENTS_DATA.residents.map((r) => (
            <option key={r.id} value={r.id}>
              {r.firstName} {r.lastName}
            </option>
          ))}
        </select>
      </div>
      <AuthTextField
        label="Claim / invoice period"
        name="invoicePeriod"
        placeholder="August 2026"
      />
      <DocumentUploadZone
        files={files}
        hint="Attach the signed invoice and supporting pages. Staff will review."
        title="Upload invoice documents"
        onAdd={(next) => setFiles((prev) => [...prev, ...next])}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />
    </DashboardDrawer>
  );
}
