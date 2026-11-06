"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { InfoBanner } from "@/components/dashboard/info-banner";
import { LTC_INSURERS } from "@/lib/dashboard/claims-data";
import { RESIDENTS_DATA, type Resident } from "@/lib/dashboard/residents-data";
import { NEXT_ACTIONS, useWorkspace } from "@/lib/dashboard/workspace-store";
import { Plus } from "@gravity-ui/icons";
import { Button, Label } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";

const REQUEST_TYPES = [
  "Monthly CMR",
  "Initial CMR",
  "Reassessment",
  "Supporting documents",
  "Invoice only",
];

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

/** Same response as the demo: one form creates a claim and a request, then opens the tracker. */
export function CreateClaimDrawer({
  resident,
  trigger,
}: {
  resident?: Resident;
  trigger?: ReactNode;
}) {
  const router = useRouter();
  const addedResidents = useWorkspace((s) => s.addedResidents);
  const people = useMemo(
    () => [...addedResidents, ...RESIDENTS_DATA.residents],
    [addedResidents],
  );
  const [residentId, setResidentId] = useState(
    resident?.residentId ?? people[0]?.residentId ?? "",
  );
  const selected =
    people.find((item) => item.residentId === residentId) ?? people[0];
  const [type, setType] = useState(REQUEST_TYPES[0]);
  const [period, setPeriod] = useState("2026-09-01 – 2026-09-30");
  const [carrier, setCarrier] = useState(selected?.payer ?? LTC_INSURERS[0]);
  const [amount, setAmount] = useState("");
  const [next, setNext] = useState<string>(NEXT_ACTIONS[0]);
  const [notes, setNotes] = useState("");
  const addClaim = useWorkspace((s) => s.addClaim);
  const addRequest = useWorkspace((s) => s.addRequest);
  const showToast = useWorkspace((s) => s.showToast);

  return (
    <DashboardDrawer
      description="The claim, the request, and the CMR stay linked to this resident."
      footer={
        <>
          <DrawerCancelButton />
          <Button
            slot="close"
            variant="primary"
            onPress={() => {
              if (!selected) return;
              const name = `${selected.firstName} ${selected.lastName}`;
              const claimId = `CLM-2026-${String(Date.now()).slice(-3)}`;
              addClaim({
                id: claimId,
                policyId: selected.policyId,
                residentName: name,
                residentImage: selected.image,
                residentInitials: selected.initials,
                insurer: carrier,
                billingPeriod: period,
                status: "in-progress",
                missingItems: 0,
                lastUpdated: new Date().toISOString().slice(0, 10),
                facility: selected.facility,
                notes:
                  [notes.trim(), amount.trim() ? `Invoice amount $${amount.trim()}` : ""]
                    .filter(Boolean)
                    .join(" · ") || "Created from the claim form.",
              });
              const requestId = addRequest({
                residentId: selected.residentId,
                residentName: name,
                type: type.includes("CMR") ? "CMR" : type,
                status: "In Progress",
                next,
                policyId: selected.policyId,
                claimId,
              });
              showToast(`Created ${claimId} and ${requestId}`);
              router.push("/billing?view=requests");
            }}
          >
            Create claim & request
          </Button>
        </>
      }
      sizeClassName="sm:max-w-lg"
      title="Create claim / request"
      trigger={
        trigger ?? (
          <Button className="h-11 gap-2 px-4 font-bold" variant="primary">
            <Plus className="size-4" />
            New Claim
          </Button>
        )
      }
    >
      <InfoBanner>
        Choose an existing resident. The claim, request, CMR, and invoice stay
        linked to that resident.
      </InfoBanner>
      <label className="flex flex-col gap-1.5">
        <Label className="text-sm font-bold">Resident</Label>
        <select
          className={fieldClass}
          value={residentId}
          onChange={(e) => {
            const nextResident = people.find(
              (item) => item.residentId === e.target.value,
            );
            setResidentId(e.target.value);
            if (nextResident) setCarrier(nextResident.payer);
          }}
        >
          {people.map((item) => (
            <option key={item.residentId} value={item.residentId}>
              {item.firstName} {item.lastName} — {item.policyId}
            </option>
          ))}
        </select>
      </label>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold">Request type</Label>
          <select className={fieldClass} value={type} onChange={(e) => setType(e.target.value)}>
            {REQUEST_TYPES.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <AuthTextField
          label="Billing period"
          name="billingPeriod"
          value={period}
          onChange={setPeriod}
        />
        <label className="flex flex-col gap-1.5">
          <Label className="text-sm font-bold">Carrier / insurer</Label>
          <select className={fieldClass} value={carrier} onChange={(e) => setCarrier(e.target.value)}>
            {LTC_INSURERS.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
        </label>
        <AuthTextField
          label="Invoice amount (optional)"
          name="amount"
          placeholder="0.00"
          value={amount}
          onChange={setAmount}
        />
      </div>
      <label className="flex flex-col gap-1.5">
        <Label className="text-sm font-bold">Initial next action</Label>
        <select className={fieldClass} value={next} onChange={(e) => setNext(e.target.value)}>
          {NEXT_ACTIONS.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-1.5">
        <Label className="text-sm font-bold">Notes (optional)</Label>
        <textarea
          className="min-h-20 rounded-xl border border-border bg-surface px-3 py-2 text-sm font-medium outline-none focus:border-accent"
          placeholder="Add an internal note…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </label>
    </DashboardDrawer>
  );
}
