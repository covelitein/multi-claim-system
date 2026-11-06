"use client";

import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { InfoBanner } from "@/components/dashboard/info-banner";
import { StatusBadge } from "@/components/dashboard/status-badge";
import {
  STATUS_CONFIG,
  type Claim,
  type ClaimStatus,
} from "@/lib/dashboard/claims-data";
import type { RecentSubmission } from "@/lib/dashboard/home-data";
import { RESIDENTS_DATA, residentByKey } from "@/lib/dashboard/residents-data";
import type { SignalName } from "@/lib/dashboard/signal-colors";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";

const STATUSES = Object.keys(STATUS_CONFIG) as ClaimStatus[];

/** Labels in the claim-details window. Matches the choices on that screen. */
export const SUBMISSION_STATUSES = [
  "In Progress",
  "Missing Docs",
  "Ready for Review",
  "Submitted",
  "Pending",
  "Approved",
  "Denied",
  "Paid",
] as const;

export function submissionStatusLabel(status: RecentSubmission["status"]) {
  if (status === "approved") return "Approved";
  if (status === "pending") return "Pending";
  if (status === "missing-docs") return "Missing Docs";
  if (status === "submitted") return "Submitted";
  return "In Progress";
}

export function signalForSubmissionLabel(label: string): SignalName {
  if (label === "Approved" || label === "Paid") return "green";
  if (label === "Missing Docs" || label === "Denied") return "red";
  if (label === "Submitted" || label === "Ready for Review") return "blue";
  return "amber";
}

/**
 * Step 1 is done. Step 2 is done once the saved status leaves "In Progress".
 * Steps 3–5 stay ahead until a later screen defines them. The dropdown does
 * not move these steps; only Save status does.
 */
function workflowState(statusLabel: string): Array<"done" | "active" | "upcoming"> {
  const cmr =
    statusLabel === "In Progress" ? "active" : "done";
  return ["done", cmr, "upcoming", "upcoming", "upcoming"];
}

const fieldClass =
  "h-11 w-full rounded-xl border border-border bg-surface px-3 text-sm font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20";

/** Opens from a claim row. Status changes stay in this session, same as the demo. */
export function ClaimDetailDrawer({ claim }: { claim: Claim }) {
  const status = useWorkspace(
    (s) => s.claimStatusByResident[claim.residentName] ?? claim.status,
  );
  const setClaimStatus = useWorkspace((s) => s.setClaimStatus);
  const request = useWorkspace((s) =>
    s.requests.find(
      (item) =>
        item.residentName === claim.residentName && item.status !== "Completed",
    ),
  );
  const resident = RESIDENTS_DATA.residents.find(
    (item) => `${item.firstName} ${item.lastName}` === claim.residentName,
  );

  return (
    <DashboardDrawer
      description={`${claim.residentName} · ${claim.facility}`}
      footer={<DrawerCancelButton label="Close" />}
      sizeClassName="sm:max-w-lg"
      title={`Claim · ${claim.policyId}`}
      trigger={
        <button
          className="font-mono text-xs font-semibold text-accent hover:underline"
          type="button"
        >
          {claim.policyId}
        </button>
      }
    >
      <div className="grid grid-cols-2 gap-3">
        {(
          [
            ["Client / insurer", claim.insurer],
            ["Period", claim.billingPeriod],
            ["Missing items", String(claim.missingItems)],
            ["Updated", claim.lastUpdated],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border px-3 py-3">
            <p className="text-xs font-bold uppercase text-muted">{label}</p>
            <p className="mt-1 text-sm font-bold">{value}</p>
          </div>
        ))}
      </div>

      {claim.notes ? <InfoBanner>{claim.notes}</InfoBanner> : null}

      <div className="flex flex-col gap-2">
        {resident ? (
          <Link
            className="rounded-xl border border-border px-4 py-3 type-body hover:bg-surface-secondary"
            href={`/billing/cmr?resident=${resident.residentId}`}
          >
            Open CMR questionnaire
            <span className="mt-0.5 block type-meta font-medium text-muted">
              Answer the monthly questions for {claim.residentName}
            </span>
          </Link>
        ) : null}
        <Link
          className="rounded-xl border border-border px-4 py-3 type-body hover:bg-surface-secondary"
          href={
            resident
              ? `/invoices?resident=${resident.residentId}`
              : "/invoices"
          }
        >
          Attach or create invoice
          <span className="mt-0.5 block type-meta font-medium text-muted">
            Invoice dates must match {claim.billingPeriod}
          </span>
        </Link>
        {request ? (
          <p className="type-meta text-muted">
            {request.id} · next: {request.next}
          </p>
        ) : null}
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="type-body">Update claim status</span>
        <select
          className={fieldClass}
          value={status}
          onChange={(e) =>
            setClaimStatus(claim.residentName, e.target.value as ClaimStatus)
          }
        >
          {STATUSES.map((item) => (
            <option key={item} value={item}>
              {STATUS_CONFIG[item].label}
            </option>
          ))}
        </select>
      </label>
      <p className="type-meta text-muted">
        Changing the status here updates this workspace only. It does not send
        anything to an insurer.
      </p>
    </DashboardDrawer>
  );
}

const STEP_LABELS = ["Resident", "CMR", "Invoice", "Review", "Submit"];

/** Opened from a recent submission. Status is saved only when Save status is pressed. */
export function SubmissionClaimDrawer({
  submission,
  trigger,
}: {
  submission: RecentSubmission;
  trigger: ReactNode;
}) {
  const saved = useWorkspace(
    (s) => s.submissionStatus[submission.claimId] ?? submissionStatusLabel(submission.status),
  );
  const updated = useWorkspace(
    (s) => s.submissionUpdated[submission.claimId] ?? submission.submittedAt,
  );
  const setSubmissionStatus = useWorkspace((s) => s.setSubmissionStatus);
  const showToast = useWorkspace((s) => s.showToast);
  const request = useWorkspace((s) =>
    s.requests.find((item) => item.claimId === submission.claimId),
  );
  const [draft, setDraft] = useState(saved);
  useEffect(() => {
    setDraft(saved);
  }, [saved]);
  const resident = residentByKey(submission.residentId);
  const steps = workflowState(saved);

  return (
    <DashboardDrawer
      onOpenChange={(open) => {
        if (open) return;
        const current =
          useWorkspace.getState().submissionStatus[submission.claimId] ??
          submissionStatusLabel(submission.status);
        setDraft(current);
      }}
      footer={
        <>
          <DrawerCancelButton label="Close" />
          <Button
            slot="close"
            variant="primary"
            onPress={() => {
              setSubmissionStatus(submission.claimId, draft);
              showToast("Claim status updated");
            }}
          >
            Save status
          </Button>
        </>
      }
      sizeClassName="sm:max-w-xl"
      title={`Claim details · ${submission.claimId}`}
      trigger={trigger}
    >
      <div className="flex items-center gap-3">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
          {submission.initials}
        </span>
        <div className="min-w-0">
          <p className="type-card-title">{submission.residentName}</p>
          <p className="type-meta text-muted">
            {resident?.policyId ?? "Policy on file"} · {resident?.payer ?? "Carrier"} ·{" "}
            {submission.administrator}
          </p>
          <div className="mt-1">
            <StatusBadge signal={signalForSubmissionLabel(saved)}>{saved}</StatusBadge>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {(
          [
            ["Claim type", submission.claimType],
            ["Service period", submission.period],
            ["Invoice amount", submission.amount],
            ["Missing items", String(submission.missingItems)],
            ["Invoice", submission.invoiceId ?? "Not linked"],
            ["Last updated", updated],
          ] as const
        ).map(([label, value]) => (
          <div key={label} className="rounded-xl border border-border px-3 py-3">
            <p className="text-xs font-bold uppercase text-muted">{label}</p>
            <p className="mt-1 text-sm font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div>
        <p className="type-row">Workflow</p>
        <ol className="mt-2 grid grid-cols-5 gap-2">
          {STEP_LABELS.map((label, index) => {
            const state = steps[index];
            return (
              <li
                key={label}
                className={
                  state === "done"
                    ? "flex items-center justify-center gap-1 rounded-xl bg-signal-green px-1 py-2 text-center text-white"
                    : state === "active"
                      ? "flex items-center justify-center gap-1 rounded-xl bg-accent px-1 py-2 text-center text-accent-foreground"
                      : "flex items-center justify-center gap-1 rounded-xl border border-border px-1 py-2 text-center text-muted"
                }
              >
                <span className="text-sm font-bold">{index + 1}</span>
                <span className="text-[11px] font-bold leading-tight">{label}</span>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          className="rounded-xl border border-border px-4 py-3 type-body hover:bg-surface-secondary"
          href={
            resident
              ? `/billing/cmr?resident=${resident.residentId}`
              : "/billing/cmr"
          }
        >
          Open CMR questionnaire
          <span className="mt-0.5 block type-meta font-medium text-muted">
            Answer required questions and review generated form
          </span>
        </Link>
        <Link
          className="rounded-xl border border-border px-4 py-3 type-body hover:bg-surface-secondary"
          href={
            resident
              ? `/invoices?resident=${resident.residentId}`
              : "/invoices"
          }
        >
          Attach or create invoice
          <span className="mt-0.5 block type-meta font-medium text-muted">
            Link an invoice to this claim
          </span>
        </Link>
        <Link
          className="rounded-xl border border-border px-4 py-3 type-body hover:bg-surface-secondary"
          href={
            request
              ? `/billing?view=requests&request=${request.id}`
              : "/billing?view=requests"
          }
        >
          Open request tracker
          <span className="mt-0.5 block type-meta font-medium text-muted">
            {request ? `${request.id} · ${request.next}` : "No request linked yet"}
          </span>
        </Link>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className="type-body">Update claim status</span>
        <select
          className={fieldClass}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        >
          {SUBMISSION_STATUSES.map((item) => (
            <option key={item}>{item}</option>
          ))}
        </select>
      </label>
      <p className="type-meta text-muted">
        Prototype only: submitting here changes the demo status; it does not
        transmit information to an insurer.
      </p>
    </DashboardDrawer>
  );
}
