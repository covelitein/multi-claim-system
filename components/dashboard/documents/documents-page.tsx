"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { InfoBanner } from "@/components/dashboard/info-banner";
import { RESIDENTS_DATA } from "@/lib/dashboard/residents-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Button, Card } from "@heroui/react";
import Link from "next/link";
import { useState } from "react";

const KINDS = [
  "Supporting document",
  "CMR",
  "Invoice",
  "Care plan",
  "Assessment",
  "Other",
];

export function DocumentsPage() {
  const documents = useWorkspace((s) => s.documents);
  const addDocument = useWorkspace((s) => s.addDocument);
  const showToast = useWorkspace((s) => s.showToast);
  const [name, setName] = useState("");
  const [residentName, setResidentName] = useState(
    `${RESIDENTS_DATA.residents[0]?.firstName ?? ""} ${RESIDENTS_DATA.residents[0]?.lastName ?? ""}`.trim(),
  );
  const [kind, setKind] = useState(KINDS[0]);

  return (
    <div className="flex min-w-0 flex-col gap-4 pb-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="type-page">Documents & forms</h1>
          <p className="mt-1 type-meta text-muted">
            CMR forms, invoices, supporting documents, and facility files.
            Records stay in this browser session only.
          </p>
        </div>
        <DashboardDrawer
          description="Adds a document record. No file is sent to a server."
          footer={
            <>
              <DrawerCancelButton />
              <Button
                isDisabled={!name.trim()}
                slot="close"
                variant="primary"
                onPress={() => {
                  addDocument({
                    name: name.trim(),
                    residentName,
                    kind,
                  });
                  setName("");
                  showToast("Document record added");
                }}
              >
                Save record
              </Button>
            </>
          }
          title="Add document record"
          trigger={
            <Button className="h-11 font-bold" variant="primary">
              Add document
            </Button>
          }
        >
          <AuthTextField
            label="Document name"
            name="docName"
            placeholder="Signed CMR or care plan.pdf"
            value={name}
            onChange={setName}
          />
          <label className="flex flex-col gap-1.5 text-sm font-bold">
            Resident
            <select
              className="h-11 rounded-xl border border-border bg-surface px-3 font-semibold"
              value={residentName}
              onChange={(e) => setResidentName(e.target.value)}
            >
              {RESIDENTS_DATA.residents.map((resident) => {
                const label = `${resident.firstName} ${resident.lastName}`;
                return (
                  <option key={resident.id} value={label}>
                    {label}
                  </option>
                );
              })}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-bold">
            Document type
            <select
              className="h-11 rounded-xl border border-border bg-surface px-3 font-semibold"
              value={kind}
              onChange={(e) => setKind(e.target.value)}
            >
              {KINDS.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <InfoBanner tone="amber">
            This adds a document record only. No file is uploaded.
          </InfoBanner>
        </DashboardDrawer>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="type-card-title">CMR forms</Card.Title>
            <Card.Description className="type-meta text-muted">
              Generated from resident answers.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <p className="type-body">Monthly CMR</p>
            <p className="mt-1 type-meta text-muted">
              Complete the questionnaire, review it, then prepare submission.
            </p>
            <Link
              className="mt-3 inline-flex h-10 items-center rounded-xl border border-border px-3 type-body hover:bg-surface-secondary"
              href="/billing/cmr"
            >
              Open CMR workflow
            </Link>
          </Card.Content>
        </Card>
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="type-card-title">Invoices</Card.Title>
            <Card.Description className="type-meta text-muted">
              Attach records to the correct claim.
            </Card.Description>
          </Card.Header>
          <Card.Content>
            <Link
              className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-accent px-4 type-body text-accent-foreground"
              href="/invoices"
            >
              Upload invoice
            </Link>
          </Card.Content>
        </Card>
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="type-card-title">Forms & templates</Card.Title>
          </Card.Header>
          <Card.Content className="gap-2">
            <Link
              className="rounded-xl border border-border px-3 py-3 type-body hover:bg-surface-secondary"
              href="/billing/cmr"
            >
              Monthly CMR questionnaire
            </Link>
            <button
              className="rounded-xl border border-border px-3 py-3 text-left type-body hover:bg-surface-secondary"
              type="button"
              onClick={() => showToast("Submission checklist opened")}
            >
              Submission checklist
            </button>
          </Card.Content>
        </Card>
      </div>

      <Card className={dashboardCardClass}>
        <Card.Header>
          <Card.Title className="type-card-title">Document library</Card.Title>
          <Card.Description className="type-meta text-muted">
            {documents.length} document record{documents.length === 1 ? "" : "s"}
          </Card.Description>
        </Card.Header>
        <Card.Content>
          {documents.length === 0 ? (
            <div className="py-8 text-center">
              <p className="type-row">No uploaded documents yet</p>
              <p className="mx-auto mt-1 max-w-md type-meta text-muted">
                Use Add document or Upload invoice. This keeps a record only
                and does not store a file.
              </p>
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {documents.map((doc) => (
                <li
                  key={doc.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border px-3 py-3"
                >
                  <div>
                    <p className="type-body">{doc.name}</p>
                    <p className="type-meta text-muted">
                      {doc.residentName} · {doc.kind} · {doc.date}
                    </p>
                  </div>
                  <span className="type-badge text-signal-green-ink">Uploaded</span>
                </li>
              ))}
            </ul>
          )}
        </Card.Content>
      </Card>
    </div>
  );
}
