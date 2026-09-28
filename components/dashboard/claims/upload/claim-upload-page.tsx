"use client";

import { DocumentUploadZone } from "@/components/dashboard/drawers/document-upload-zone";
import {
  UploadPhaseCard,
  UploadPhaseStepper,
} from "@/components/dashboard/claims/upload/upload-phase-stepper";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { useClaimUploadFlow } from "@/lib/dashboard/use-claim-upload-flow";
import { CircleCheck, CircleInfo } from "@gravity-ui/icons";
import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function ClaimUploadPage() {
  const router = useRouter();
  const {
    data,
    loading,
    phase,
    phaseIndex,
    basics,
    files,
    updateBasics,
    addFiles,
    removeFile,
    goNext,
    goBack,
    canGoBack,
    isLastPhase,
  } = useClaimUploadFlow();

  if (loading || !data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  const selectedResident = data.residents.find((r) => r.id === basics.residentId);

  return (
    <div className="flex min-w-0 flex-col gap-5 pb-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {data.title}
            </h1>
            <Chip color="accent" size="sm" variant="soft">
              <Chip.Label className="font-bold">{data.modeLabel}</Chip.Label>
            </Chip>
          </div>
          <p className="mt-1 max-w-2xl text-base font-medium text-muted">
            {data.subtitle}
          </p>
        </div>
        <Link
          className="inline-flex h-11 items-center rounded-xl border-2 border-border px-4 text-sm font-bold hover:bg-surface-secondary"
          href="/billing"
        >
          Back to claims
        </Link>
      </div>

      <Card className={`${dashboardCardClass} border-2 border-accent/20`}>
        <Card.Content>
          <UploadPhaseStepper activeIndex={phaseIndex} phases={data.phases} />
        </Card.Content>
      </Card>

      {phase === "basics" ? (
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <UploadPhaseCard>
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold">Claim basics</h2>
                <p className="mt-1 text-sm font-medium text-muted">
                  Long-term care context for reviewers — not a Medicare/Medicaid
                  medical claim form.
                </p>
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-bold">
                Resident
                <select
                  className="h-12 rounded-xl border-2 border-border bg-surface px-3 font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  value={basics.residentId}
                  onChange={(e) => updateBasics({ residentId: e.target.value })}
                >
                  {data.residents.map((resident) => (
                    <option key={resident.id} value={resident.id}>
                      {resident.name} — {resident.policyId} — {resident.facility}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-1.5 text-sm font-bold">
                Client / Insurer
                <select
                  className="h-12 rounded-xl border-2 border-border bg-surface px-3 font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  value={basics.insurer}
                  onChange={(e) => updateBasics({ insurer: e.target.value })}
                >
                  {data.insurers.map((insurer) => (
                    <option key={insurer} value={insurer}>
                      {insurer}
                    </option>
                  ))}
                </select>
              </label>

              <div className="grid gap-4 sm:grid-cols-2">
                <label className="flex flex-col gap-1.5 text-sm font-bold">
                  Period from
                  <input
                    className="h-12 rounded-xl border-2 border-border bg-surface px-3 font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    type="date"
                    value={basics.periodFrom}
                    onChange={(e) =>
                      updateBasics({ periodFrom: e.target.value })
                    }
                  />
                </label>
                <label className="flex flex-col gap-1.5 text-sm font-bold">
                  Period to
                  <input
                    className="h-12 rounded-xl border-2 border-border bg-surface px-3 font-semibold outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                    type="date"
                    value={basics.periodTo}
                    onChange={(e) => updateBasics({ periodTo: e.target.value })}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-1.5 text-sm font-bold">
                Notes for reviewer (optional)
                <textarea
                  className="min-h-24 rounded-xl border-2 border-border bg-surface px-3 py-2 font-medium outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                  placeholder="Anything Helix should know before reviewing the packet…"
                  value={basics.notes}
                  onChange={(e) => updateBasics({ notes: e.target.value })}
                />
              </label>
            </div>
          </UploadPhaseCard>

          <Card className={`${dashboardCardClass} h-fit border-2 border-accent/30 bg-accent-soft/40`}>
            <Card.Content className="gap-3">
              <div className="flex items-start gap-2">
                <CircleInfo className="mt-0.5 size-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-bold">Upload model (Gen 1)</p>
                  <p className="mt-1 text-sm font-medium text-muted">
                    Facilities upload documents. Helix reviews and completes LTC
                    claim paperwork. In-app CMR walkthrough arrives after CMR
                    templates are loaded.
                  </p>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      ) : null}

      {phase === "documents" ? (
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_280px]">
          <UploadPhaseCard>
            <div className="flex flex-col gap-4">
              <div>
                <h2 className="text-lg font-bold">Upload claim documents</h2>
                <p className="mt-1 text-sm font-medium text-muted">
                  Attach the packet for this period. Missing pieces can be
                  requested during review.
                </p>
              </div>
              <DocumentUploadZone
                files={files}
                hint="PDF, images, or Word. Drop the full LTC packet — invoices, CMR, census, etc."
                title="Choose files to upload"
                onAdd={addFiles}
                onRemove={removeFile}
              />
            </div>
          </UploadPhaseCard>

          <Card className={`${dashboardCardClass} h-fit border-2 border-success/30 bg-success-soft/30`}>
            <Card.Header>
              <Card.Title className="text-sm font-bold">
                Suggested packet
              </Card.Title>
            </Card.Header>
            <Card.Content className="gap-3">
              {data.suggestedDocuments.map((doc) => (
                <div key={doc.id} className="text-sm">
                  <p className="font-bold">
                    {doc.label}
                    {doc.required ? (
                      <span className="ms-1 text-xs text-danger">Required</span>
                    ) : (
                      <span className="ms-1 text-xs text-muted">Optional</span>
                    )}
                  </p>
                  <p className="mt-0.5 text-xs font-medium text-muted">
                    {doc.description}
                  </p>
                </div>
              ))}
            </Card.Content>
          </Card>
        </div>
      ) : null}

      {phase === "review" ? (
        <UploadPhaseCard>
          <div className="flex flex-col gap-5">
            <div>
              <h2 className="text-lg font-bold">Review & submit</h2>
              <p className="mt-1 text-sm font-medium text-muted">
                Confirm the packet, then submit for Helix review.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border-2 border-accent/30 bg-accent-soft/30 px-4 py-3">
                <p className="text-xs font-bold uppercase text-muted">Resident</p>
                <p className="mt-1 text-sm font-bold">
                  {selectedResident?.name ?? "—"}
                </p>
                <p className="text-xs font-medium text-muted">
                  Policy {selectedResident?.policyId} · {selectedResident?.facility}
                </p>
              </div>
              <div className="rounded-xl border-2 border-success/30 bg-success-soft/30 px-4 py-3">
                <p className="text-xs font-bold uppercase text-muted">
                  Client / Insurer
                </p>
                <p className="mt-1 text-sm font-bold">{basics.insurer}</p>
              </div>
              <div className="rounded-xl border-2 border-warning/30 bg-warning-soft/30 px-4 py-3">
                <p className="text-xs font-bold uppercase text-muted">
                  Claim period
                </p>
                <p className="mt-1 text-sm font-bold">
                  {basics.periodFrom || "—"} → {basics.periodTo || "—"}
                </p>
              </div>
              <div className="rounded-xl border-2 border-border px-4 py-3">
                <p className="text-xs font-bold uppercase text-muted">Documents</p>
                <p className="mt-1 text-sm font-bold">
                  {files.length} file{files.length === 1 ? "" : "s"} attached
                </p>
              </div>
            </div>

            {basics.notes ? (
              <div className="rounded-xl bg-surface-secondary px-4 py-3 text-sm font-medium">
                <p className="text-xs font-bold text-muted">Notes</p>
                <p className="mt-1">{basics.notes}</p>
              </div>
            ) : null}

            {files.length > 0 ? (
              <ul className="flex flex-col gap-2">
                {files.map((file) => (
                  <li
                    key={file.id}
                    className="flex items-center gap-2 text-sm font-medium text-muted"
                  >
                    <CircleCheck className="size-4 shrink-0 text-success" />
                    <span className="truncate">{file.name}</span>
                    <span className="shrink-0 text-xs">({file.sizeLabel})</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl border-2 border-warning/40 bg-warning-soft/50 px-4 py-3 text-sm font-bold text-warning">
                No documents attached yet. Go back to upload a packet before
                submitting.
              </p>
            )}
          </div>
        </UploadPhaseCard>
      ) : null}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Button
          className="h-11 font-bold"
          isDisabled={!canGoBack}
          variant="outline"
          onPress={goBack}
        >
          Back
        </Button>
        <Button
          className="h-11 font-bold"
          isDisabled={phase === "review" && files.length === 0}
          variant="primary"
          onPress={() => {
            if (isLastPhase) {
              router.push("/billing");
              return;
            }
            goNext();
          }}
        >
          {isLastPhase ? "Submit for review" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
