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

/** Gen-1: dummy claim drawer (no API). */
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
          {isNewResident ? (
            <DrawerPrimaryCloseButton label="Submit for review" />
          ) : (
            <Button variant="primary">
              <Link href="/billing/new">Open upload flow</Link>
            </Button>
          )}
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
          <AuthTextField label="First name" name="firstName" placeholder="Ada" />
          <AuthTextField label="Last name" name="lastName" placeholder="Okoye" />
          <AuthTextField
            label="Phone"
            name="phone"
            placeholder="(555) 234-5678"
          />
          <div className="flex flex-col gap-1.5">
            <Label className="text-sm font-bold">Client / Insurer</Label>
            <select
              className="h-11 rounded-xl border border-border bg-surface px-3 text-sm font-semibold"
              defaultValue={LTC_INSURERS[0]}
              name="insurer"
            >
              {LTC_INSURERS.map((insurer) => (
                <option key={insurer} value={insurer}>
                  {insurer}
                </option>
              ))}
            </select>
          </div>
          <AuthTextField
            label="Billing period"
            name="billingPeriod"
            placeholder="08/01/2026 – 08/31/2026"
          />
          <DocumentUploadZone
            files={files}
            hint="Upload invoices and supporting docs. CMR walkthrough forms will arrive once templates are loaded — for now, upload only."
            title="Claim documents"
            onAdd={(next) => setFiles((prev) => [...prev, ...next])}
            onRemove={(id) =>
              setFiles((prev) => prev.filter((f) => f.id !== id))
            }
          />
        </>
      ) : (
        <div className="flex flex-col gap-3 text-sm font-medium text-muted">
          <p>
            Use the full upload flow to pick an existing resident, attach the
            packet, and submit for Helix review.
          </p>
          <Link
            className="font-bold text-accent underline-offset-2 hover:underline"
            href="/billing/new"
          >
            Open full upload flow
          </Link>
        </div>
      )}
    </DashboardDrawer>
  );
}
