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
import { LTC_INSURERS } from "@/lib/dashboard/claims-data";
import { Plus } from "@gravity-ui/icons";
import { Button, Label } from "@heroui/react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

type NewClaimDrawerProps = {
  trigger?: ReactNode;
  mode?: "new-resident" | "existing";
};

export function NewClaimDrawer({
  trigger,
  mode = "existing",
}: NewClaimDrawerProps) {
  const [files, setFiles] = useState<UploadedDocument[]>([]);
  const isNewResident = mode === "new-resident";

  return (
    <DashboardDrawer
      description={
        isNewResident
          ? "Add a new resident and upload their first LTC claim packet for Helix review."
          : "Upload a claim packet for an existing resident. Helix completes CMR forms during review."
      }
      footer={
        <>
          <DrawerCancelButton />
          <DrawerPrimaryCloseButton label="Submit for review" />
        </>
      }
      sizeClassName="sm:max-w-lg"
      title={
        isNewResident ? "Claim: New Resident" : "Claim for Existing Resident"
      }
      trigger={
        trigger ?? (
          <Button
            className="size-10 min-w-10 rounded-full px-0 sm:h-11 sm:w-auto sm:min-w-0 sm:px-4 [&>svg]:m-0"
            variant="primary"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">Claim: New Resident</span>
          </Button>
        )
      }
    >
      {isNewResident ? (
        <>
          <AuthTextField
            label="Resident first name"
            name="firstName"
            placeholder="Ada"
          />
          <AuthTextField
            label="Resident last name"
            name="lastName"
            placeholder="Okoye"
          />
          <AuthTextField
            label="Policy ID"
            name="policyId"
            placeholder="POL-GNW-0001"
          />
        </>
      ) : (
        <AuthTextField
          label="Resident"
          name="claimResident"
          placeholder="Ada Okoye"
        />
      )}

      <div className="flex flex-col gap-1.5">
        <Label className="text-sm font-semibold">Client / Insurer</Label>
        <select
          className="h-12 w-full rounded-xl border border-border bg-surface px-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          defaultValue=""
          name="insurer"
        >
          <option disabled value="">
            Select insurer / claims processor…
          </option>
          {LTC_INSURERS.map((insurer) => (
            <option key={insurer} value={insurer}>
              {insurer}
            </option>
          ))}
        </select>
      </div>

      <AuthTextField
        label="Claim period"
        name="claimPeriod"
        placeholder="September 2026"
      />

      <DocumentUploadZone
        files={files}
        hint="Upload invoices and supporting docs. CMR walkthrough forms will arrive once templates are loaded — for now, upload only."
        title="Upload claim documents"
        onAdd={(next) => setFiles((prev) => [...prev, ...next])}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />

      {!isNewResident ? (
        <p className="text-xs font-medium text-muted">
          Need more room?{" "}
          <Link
            className="font-bold text-accent hover:underline"
            href="/billing/new"
          >
            Open full upload flow
          </Link>
        </p>
      ) : null}
    </DashboardDrawer>
  );
}
