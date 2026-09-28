"use client";

import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import type { Resident } from "@/lib/dashboard/residents-data";
import { Eye } from "@gravity-ui/icons";
import { Chip } from "@heroui/react";

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

export function ViewResidentDrawer({ resident }: { resident: Resident }) {
  const history = mockMonthlyHistory(resident);

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
        <div className="rounded-xl border-2 border-accent/30 bg-accent-soft/40 px-3 py-3">
          <p className="text-xs font-bold uppercase text-muted">Resident ID</p>
          <p className="mt-1 font-bold">{resident.residentId}</p>
        </div>
        <div className="rounded-xl border-2 border-success/30 bg-success-soft/40 px-3 py-3">
          <p className="text-xs font-bold uppercase text-muted">Insurer</p>
          <p className="mt-1 font-bold">{resident.payer}</p>
        </div>
      </div>

      <div className="rounded-xl border border-border px-3 py-3">
        <p className="text-xs font-bold uppercase text-muted">Facility</p>
        <p className="mt-1 font-bold">{resident.facility}</p>
        <p className="mt-1 text-sm font-medium text-muted">{resident.phone}</p>
      </div>

      <div>
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
    </DashboardDrawer>
  );
}
