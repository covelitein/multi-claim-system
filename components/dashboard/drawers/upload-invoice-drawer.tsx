"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import {
  DocumentUploadZone,
  type UploadedDocument,
} from "@/components/dashboard/drawers/document-upload-zone";
import { RESIDENTS_DATA } from "@/lib/dashboard/residents-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Button, Label } from "@heroui/react";
import { useState } from "react";

/** Gen-1: dummy upload invoice drawer. */
export function UploadInvoiceDrawer({
  residentKey,
}: {
  residentKey?: string;
}) {
  const [files, setFiles] = useState<UploadedDocument[]>([]);
  const [period, setPeriod] = useState("2026-09-01 – 2026-09-30");
  const addInvoice = useWorkspace((s) => s.addInvoice);
  const addDocument = useWorkspace((s) => s.addDocument);
  const showToast = useWorkspace((s) => s.showToast);
  const [residentId, setResidentId] = useState(
    RESIDENTS_DATA.residents.find((resident) => resident.residentId === residentKey)
      ?.id ?? RESIDENTS_DATA.residents[0]?.id ?? "",
  );
  const selected = RESIDENTS_DATA.residents.find((r) => r.id === residentId);

  return (
    <DashboardDrawer
      description="Upload an invoice packet for review. You do not fill claim forms here."
      footer={
        <>
          <DrawerCancelButton />
          <Button
            slot="close"
            variant="primary"
            onPress={() => {
              const name = selected
                ? `${selected.firstName} ${selected.lastName}`
                : "Resident";
              const id = `INV-2026-${String(70 + Date.now()).slice(-3)}`;
              addInvoice({
                id,
                invoiceId: id,
                residentName: name,
                invoiceDate: new Date().toISOString().slice(0, 10),
                servicePeriod: period,
                amount: "$0.00",
                status: "pending-review",
                matchedClaim: null,
              });
              files.forEach((file) =>
                addDocument({ name: file.name, residentName: name, kind: "Invoice" }),
              );
              showToast(`Invoice ${id} saved`);
            }}
          >
            Upload for review
          </Button>
        </>
      }
      title="Upload invoice"
      trigger={
        <Button
          className="h-12 gap-2 px-4 text-base font-bold"
          variant="outline"
        >
          Upload Invoice
        </Button>
      }
    >
      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-bold">Resident</Label>
        <select
          className="h-12 w-full rounded-xl border border-border bg-surface px-3 text-base font-semibold"
          name="invoiceResidentId"
          value={residentId}
          onChange={(event) => setResidentId(event.target.value)}
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
        value={period}
        onChange={setPeriod}
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
