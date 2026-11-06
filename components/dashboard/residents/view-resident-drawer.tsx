"use client";

import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { CreateClaimDrawer } from "@/components/dashboard/drawers/create-claim-drawer";
import { CLAIMS_DATA } from "@/lib/dashboard/claims-data";
import { INVOICES_DATA } from "@/lib/dashboard/invoices-data";
import type { Resident } from "@/lib/dashboard/residents-data";
import {
  defaultElimination,
  useWorkspace,
  type EliminationPeriod,
} from "@/lib/dashboard/workspace-store";
import { Eye } from "@gravity-ui/icons";
import { Button, Chip, cn } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

type MonthlySubmission = {
  month: string;
  submitted: number;
  approved: number;
  pending: number;
  amount: string;
};

function mockMonthlyHistory(resident: Resident): MonthlySubmission[] {
  const seed = resident.residentId.charCodeAt(resident.residentId.length - 1);
  return [
    {
      month: "Sep 2026",
      submitted: 1 + (seed % 2),
      approved: seed % 2,
      pending: 1,
      amount: "$4,200.00",
    },
    {
      month: "Aug 2026",
      submitted: 1,
      approved: 1,
      pending: 0,
      amount: "$4,100.00",
    },
    {
      month: "Jul 2026",
      submitted: 1,
      approved: 1,
      pending: 0,
      amount: "$4,050.00",
    },
    {
      month: "Jun 2026",
      submitted: 1,
      approved: 0,
      pending: 0,
      amount: "$3,980.00",
    },
  ];
}

function EliminationTracker({ resident }: { resident: Resident }) {
  const saved = useWorkspace((s) => s.elimination[resident.residentId]);
  const saveElimination = useWorkspace((s) => s.saveElimination);
  const [draft, setDraft] = useState<EliminationPeriod>(
    () => saved ?? defaultElimination(resident.residentId),
  );
  const remaining = Math.max(0, draft.required - draft.accrued);
  const percent = Math.min(
    100,
    Math.round((draft.accrued / Math.max(1, draft.required)) * 100),
  );

  function update(patch: Partial<EliminationPeriod>) {
    setDraft((current) => ({ ...current, ...patch }));
  }

  return (
    <div className="rounded-xl border border-border px-3 py-3">
      <p className="text-sm font-bold">Elimination period</p>
      <p className="mt-0.5 text-xs font-medium text-muted">
        {percent}% complete · {remaining} days remaining
      </p>
      <div
        aria-valuenow={percent}
        className="mt-2 h-2 overflow-hidden rounded-full bg-border"
        role="progressbar"
      >
        <div className="h-full rounded-full bg-accent" style={{ width: `${percent}%` }} />
      </div>
      <div className="mt-3 grid gap-3">
        <label className="flex flex-col gap-1 text-sm font-bold">
          Period type
          <select
            className="h-11 rounded-xl border border-border bg-surface px-3 font-semibold"
            value={draft.type}
            onChange={(e) =>
              update({ type: e.target.value as EliminationPeriod["type"] })
            }
          >
            <option>Service Days</option>
            <option>Calendar Days</option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-3">
          <label className="flex flex-col gap-1 text-sm font-bold">
            Required days
            <input
              className="h-11 rounded-xl border border-border bg-surface px-3 font-semibold"
              min={1}
              type="number"
              value={draft.required}
              onChange={(e) => update({ required: Math.max(1, Number(e.target.value) || 1) })}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-bold">
            Days accrued
            <input
              className="h-11 rounded-xl border border-border bg-surface px-3 font-semibold"
              min={0}
              type="number"
              value={draft.accrued}
              onChange={(e) => update({ accrued: Math.max(0, Number(e.target.value) || 0) })}
            />
          </label>
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button size="sm" variant="primary" onPress={() => saveElimination(resident.residentId, draft)}>
          Save counter
        </Button>
        <Button
          size="sm"
          variant="outline"
          onPress={() => {
            const met = { ...draft, accrued: draft.required };
            setDraft(met);
            saveElimination(resident.residentId, met);
          }}
        >
          Mark as met
        </Button>
        <Button
          size="sm"
          variant="outline"
          onPress={() => {
            const cleared = {
              ...draft,
              accrued: Math.min(draft.accrued, Math.max(0, draft.required - 1)),
            };
            setDraft(cleared);
            saveElimination(resident.residentId, cleared);
          }}
        >
          Clear met status
        </Button>
      </div>
      <p className="mt-2 text-xs font-medium text-muted">
        Use Mark as met if the resident finished this period at another facility.
        Confirm the policy rules before recording real days.
      </p>
    </div>
  );
}

const PROFILE_TABS = ["Overview", "Claims", "Invoices", "Elimination period"] as const;

export function ViewResidentDrawer({ resident }: { resident: Resident }) {
  const history = mockMonthlyHistory(resident);
  const [tab, setTab] = useState<(typeof PROFILE_TABS)[number]>("Overview");
  const addedClaims = useWorkspace((s) => s.addedClaims);
  const addedInvoices = useWorkspace((s) => s.addedInvoices);
  const name = `${resident.firstName} ${resident.lastName}`;
  const claims = [...addedClaims, ...CLAIMS_DATA.claims].filter(
    (claim) => claim.residentName === name,
  );
  const invoices = [...addedInvoices, ...INVOICES_DATA.invoices].filter(
    (invoice) => invoice.residentName === name,
  );

  return (
    <DashboardDrawer
      description="Resident profile and monthly claim submission history."
      footer={<DrawerCancelButton label="Close" />}
      sizeClassName="sm:max-w-lg"
      title={`${resident.firstName} ${resident.lastName}`}
      trigger={
        <button
          aria-label="View resident"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
          type="button"
        >
          <Eye className="size-4" />
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border px-3 py-3">
          <p className="text-sm font-bold uppercase text-muted">Policy</p>
          <p className="mt-1 text-base font-bold">{resident.policyId}</p>
        </div>
        <div className="rounded-xl border border-border px-3 py-3">
          <p className="text-sm font-bold uppercase text-muted">Carrier</p>
          <p className="mt-1 text-base font-bold">{resident.payer}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border px-3 py-3">
        <p className="text-xs font-bold uppercase text-muted">Facility</p>
        <p className="mt-1 font-bold">{resident.facility}</p>
        <p className="mt-1 text-sm font-medium text-muted">{resident.phone}</p>
      </div>

      <CreateClaimDrawer
        resident={resident}
        trigger={
          <button
            className="h-10 rounded-xl bg-accent px-3 text-sm font-bold text-accent-foreground"
            type="button"
          >
            + Create claim
          </button>
        }
      />

      <div className="flex flex-wrap gap-2">
        {PROFILE_TABS.map((item) => (
          <button
            key={item}
            className={cn(
              "h-9 rounded-xl border px-3 text-sm font-bold",
              tab === item
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface",
            )}
            type="button"
            onClick={() => setTab(item)}
          >
            {item}
          </button>
        ))}
      </div>

      {tab === "Elimination period" ? <EliminationTracker resident={resident} /> : null}

      {tab === "Claims" ? (
        claims.length === 0 ? (
          <p className="py-6 text-center text-sm font-medium text-muted">No claims for this resident.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {claims.map((claim) => (
              <li key={claim.id} className="rounded-xl border border-border px-3 py-3">
                <p className="font-bold">{claim.policyId}</p>
                <p className="text-sm text-muted">{claim.billingPeriod}</p>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {tab === "Invoices" ? (
        invoices.length === 0 ? (
          <p className="py-6 text-center text-sm font-medium text-muted">No invoices for this resident.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {invoices.map((invoice) => (
              <li key={invoice.id} className="rounded-xl border border-border px-3 py-3">
                <p className="font-bold">{invoice.invoiceId} · {invoice.amount}</p>
                <p className="text-sm text-muted">{invoice.servicePeriod}</p>
              </li>
            ))}
          </ul>
        )
      ) : null}

      {tab === "Overview" ? (
      <div>
        <div className="mb-3 flex flex-wrap gap-2">
          <Link className="inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-bold hover:bg-surface-secondary" href={`/billing/cmr?resident=${resident.residentId}`}>
            Open CMR workflow
          </Link>
          <Link className="inline-flex h-10 items-center rounded-xl border border-border px-3 text-sm font-bold hover:bg-surface-secondary" href={`/invoices?resident=${resident.residentId}`}>
            Add invoice
          </Link>
        </div>
        <p className="mb-2 text-sm font-bold">Monthly submission history</p>
        <ul className="flex flex-col gap-2">
          {history.map((row) => (
            <li
              key={row.month}
              className="rounded-xl border-2 border-border bg-surface-secondary/50 px-3 py-3"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="font-bold">{row.month}</p>
                <span className="text-sm font-bold tabular-nums">
                  {row.amount}
                </span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Chip color="accent" size="sm" variant="soft">
                  <Chip.Label className="font-bold">
                    {row.submitted} submitted
                  </Chip.Label>
                </Chip>
                <Chip color="success" size="sm" variant="soft">
                  <Chip.Label className="font-bold">
                    {row.approved} approved
                  </Chip.Label>
                </Chip>
                {row.pending > 0 ? (
                  <Chip color="warning" size="sm" variant="soft">
                    <Chip.Label className="font-bold">
                      {row.pending} pending
                    </Chip.Label>
                  </Chip>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
      ) : null}
    </DashboardDrawer>
  );
}
