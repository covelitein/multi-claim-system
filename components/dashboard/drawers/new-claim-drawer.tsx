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
import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useState, type ReactNode } from "react";

export function NewClaimDrawer({
  trigger,
}: {
  trigger?: ReactNode;
}) {
  const [files, setFiles] = useState<UploadedDocument[]>([]);

  return (
    <DashboardDrawer
      description="Upload the claim packet. Helix fills and reviews forms — you only provide documents."
      footer={
        <>
          <DrawerCancelButton />
          <DrawerPrimaryCloseButton label="Submit for review" />
        </>
      }
      sizeClassName="sm:max-w-lg"
      title="New claim"
      trigger={
        trigger ?? (
          <Button
            className="size-10 min-w-10 rounded-full px-0 sm:h-11 sm:w-auto sm:min-w-0 sm:px-4 [&>svg]:m-0"
            variant="primary"
          >
            <Plus className="size-4" />
            <span className="hidden sm:inline">New claim</span>
          </Button>
        )
      }
    >
      <AuthTextField
        label="Resident"
        name="claimResident"
        placeholder="Ada Okoye"
      />
      <AuthTextField
        label="Payer"
        name="claimPayer"
        placeholder="Medicare"
      />
      <AuthTextField
        label="Claim period"
        name="claimPeriod"
        placeholder="August 2026"
      />
      <AuthTextField
        label="Claim type"
        name="claimType"
        placeholder="CMR / Monthly residence"
      />
      <DocumentUploadZone
        files={files}
        hint="Upload invoices, 485s, and supporting docs. Do not fill claim forms in-app."
        title="Upload claim documents"
        onAdd={(next) => setFiles((prev) => [...prev, ...next])}
        onRemove={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />
      <p className="text-xs text-muted">
        Need more room?{" "}
        <Link className="font-medium text-accent hover:underline" href="/billing/new">
          Open full upload flow
        </Link>
      </p>
    </DashboardDrawer>
  );
}
