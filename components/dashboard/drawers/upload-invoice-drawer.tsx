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
import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useState } from "react";

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
        <Button className="h-9 px-3 text-sm font-semibold" variant="outline">
          Upload Invoice
        </Button>
      }
    >
      <AuthTextField
        label="Resident"
        name="invoiceResident"
        placeholder="Ada Okoye"
      />
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

export function NewInvoiceDrawer() {
  const [files, setFiles] = useState<UploadedDocument[]>([]);

  return (
    <DashboardDrawer
      description="Create an invoice record and attach documents for Helix review."
      footer={
        <>
          <DrawerCancelButton />
          <DrawerPrimaryCloseButton label="Create invoice" />
        </>
      }
      title="New invoice"
      trigger={
        <Button className="w-fit" size="sm" variant="primary">
          <Plus className="size-4" />
          New Invoice
        </Button>
      }
    >
      <AuthTextField
        label="Resident"
        name="newInvoiceResident"
        placeholder="Ada Okoye"
      />
      <AuthTextField
        label="Amount"
        name="newInvoiceAmount"
        placeholder="$4,200.00"
      />
      <AuthTextField
        label="Period"
        name="newInvoicePeriod"
        placeholder="August 2026"
      />
      <AuthTextField
        label="Payer"
        name="newInvoicePayer"
        placeholder="Medicare"
      />
      <DocumentUploadZone
        files={files}
        hint="Optional attachments for the invoice packet."
        title="Attach documents"
        onAdd={(next) => setFiles((prev) => [...prev, ...next])}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />
    </DashboardDrawer>
  );
}
