"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
  DrawerPrimaryCloseButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { RESIDENTS_DATA } from "@/lib/dashboard/residents-data";
import { Plus, TrashBin } from "@gravity-ui/icons";
import { Button, Label } from "@heroui/react";
import { useMemo, useState } from "react";

type LineItem = {
  id: string;
  description: string;
  amount: string;
};

/** Client reference database — pull saved resident details into invoices. */
const CLIENT_REFERENCE = RESIDENTS_DATA.residents.map((r) => ({
  id: r.id,
  name: `${r.firstName} ${r.lastName}`,
  billTo: `${r.facility}, Austin, TX`,
  room: r.id === "r1" ? "214-B" : r.id === "r2" ? "108-A" : "301-C",
  payer: r.payer,
}));

function currencyTotal(lines: LineItem[]) {
  const sum = lines.reduce((acc, line) => {
    const n = Number(line.amount.replace(/[^0-9.-]/g, ""));
    return acc + (Number.isFinite(n) ? n : 0);
  }, 0);
  return sum.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
}

/** Guided Create Invoice builder for facility billing managers (dummy Gen-1). */
export function CreateInvoiceDrawer() {
  const [residentId, setResidentId] = useState(CLIENT_REFERENCE[0]?.id ?? "");
  const [logoName, setLogoName] = useState<string | null>(null);
  const [lines, setLines] = useState<LineItem[]>([
    { id: "room", description: "Room & board", amount: "3200.00" },
    { id: "adl", description: "ADL / care service level", amount: "850.00" },
  ]);

  const resident = useMemo(
    () => CLIENT_REFERENCE.find((r) => r.id === residentId),
    [residentId],
  );

  const total = currencyTotal(lines);

  function addLine() {
    setLines((prev) => [
      ...prev,
      {
        id: `extra-${Date.now()}`,
        description: "Guest meals / additional charge",
        amount: "0.00",
      },
    ]);
  }

  function updateLine(id: string, patch: Partial<LineItem>) {
    setLines((prev) =>
      prev.map((line) => (line.id === id ? { ...line, ...patch } : line)),
    );
  }

  function removeLine(id: string) {
    setLines((prev) => prev.filter((line) => line.id !== id));
  }

  return (
    <DashboardDrawer
      description="Guided invoice builder with client reference lookup. Generates a complete facility invoice for LTC billing."
      footer={
        <>
          <DrawerCancelButton />
          <DrawerPrimaryCloseButton label="Create invoice" />
        </>
      }
      sizeClassName="sm:max-w-xl"
      title="Create invoice"
      trigger={
        <Button className="h-11 gap-2 px-4 text-sm font-bold" variant="primary">
          <Plus className="size-4" />
          Create Invoice
        </Button>
      }
    >
      <div className="rounded-xl border border-accent/30 bg-accent-soft/40 px-3 py-3 text-sm font-semibold text-foreground">
        Include facility letterhead/logo, billing manager address, and service
        dates. Client reference fills resident details.
      </div>

      <AuthTextField
        defaultValue="Sunrise Assisted Living"
        label="Facility name / letterhead"
        name="facilityName"
      />

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-bold">Facility logo</Label>
        <label className="flex h-12 cursor-pointer items-center justify-between gap-3 rounded-xl border border-dashed border-border bg-surface-secondary/40 px-3 text-sm font-semibold transition-colors hover:border-accent/40">
          <span className="truncate text-muted">
            {logoName ?? "Upload logo (PNG or SVG)"}
          </span>
          <span className="shrink-0 text-accent">Browse</span>
          <input
            accept="image/png,image/jpeg,image/svg+xml"
            className="hidden"
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              setLogoName(file?.name ?? null);
            }}
          />
        </label>
      </div>

      <AuthTextField
        defaultValue="1200 Wellness Blvd, Austin, TX 78701"
        label="Billing manager address"
        name="billingAddress"
      />
      <AuthTextField
        defaultValue={new Date().toISOString().slice(0, 10)}
        label="Invoice date"
        name="invoiceDate"
        placeholder="YYYY-MM-DD"
      />

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-bold">
          Client reference (resident)
        </Label>
        <select
          className="h-12 w-full rounded-xl border border-border bg-surface px-3 text-sm font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          value={residentId}
          onChange={(e) => setResidentId(e.target.value)}
        >
          {CLIENT_REFERENCE.map((r) => (
            <option key={r.id} value={r.id}>
              {r.name} — {r.payer}
            </option>
          ))}
        </select>
      </div>

      <AuthTextField
        key={`bill-${residentId}`}
        defaultValue={resident?.billTo}
        label="Personal bill-to address"
        name="billTo"
      />
      <AuthTextField
        key={`room-${residentId}`}
        defaultValue={resident?.room}
        label="Room number"
        name="roomNumber"
      />

      <div className="grid grid-cols-2 gap-3">
        <AuthTextField
          defaultValue="2026-09-01"
          label="Billing period start"
          name="serviceFrom"
        />
        <AuthTextField
          defaultValue="2026-09-30"
          label="Billing period end"
          name="serviceTo"
        />
      </div>

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <p className="text-sm font-bold">Charges & care level</p>
          <Button size="sm" variant="outline" onPress={addLine}>
            <Plus className="size-3.5" />
            Add charge
          </Button>
        </div>
        {lines.map((line) => (
          <div
            key={line.id}
            className="grid grid-cols-[1fr_100px_auto] items-end gap-2"
          >
            <label className="flex flex-col gap-1 text-xs font-bold">
              Description
              <input
                className="h-11 rounded-xl border border-border bg-surface px-3 text-sm font-semibold outline-none focus:border-accent"
                value={line.description}
                onChange={(e) =>
                  updateLine(line.id, { description: e.target.value })
                }
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-bold">
              Amount
              <input
                className="h-11 rounded-xl border border-border bg-surface px-3 text-sm font-bold outline-none focus:border-accent"
                value={line.amount}
                onChange={(e) =>
                  updateLine(line.id, { amount: e.target.value })
                }
              />
            </label>
            <button
              aria-label="Remove line"
              className="mb-0.5 rounded-lg p-2.5 text-muted hover:bg-danger-soft hover:text-danger"
              type="button"
              onClick={() => removeLine(line.id)}
            >
              <TrashBin className="size-4" />
            </button>
          </div>
        ))}
        <div className="mt-1 flex items-center justify-between rounded-xl border border-success/35 bg-success-soft/40 px-4 py-3">
          <span className="text-sm font-bold">Total</span>
          <span className="text-lg font-bold tabular-nums">{total}</span>
        </div>
      </div>
    </DashboardDrawer>
  );
}
