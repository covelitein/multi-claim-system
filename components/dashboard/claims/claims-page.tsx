"use client";

import { ClaimsStatusTabs } from "@/components/dashboard/claims/claims-status-tabs";
import { ClaimsTable } from "@/components/dashboard/claims/claims-table";
import { NewClaimDrawer } from "@/components/dashboard/drawers/new-claim-drawer";
import { fetchClaims, type ClaimsPageData } from "@/lib/dashboard/claims-data";
import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ClaimsPage() {
  const [data, setData] = useState<ClaimsPageData | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    fetchClaims().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[240px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 pb-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Claims
          </h1>
          <p className="mt-0.5 text-sm text-muted">
            Upload LTC packets for Helix review. CMR walkthrough comes later.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <NewClaimDrawer
            mode="new-resident"
            trigger={
              <Button className="h-9 px-3 text-sm font-semibold" variant="outline">
                <Plus className="size-4" />
                New Resident
              </Button>
            }
          />
          <Link
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-accent px-3 text-sm font-semibold text-accent-foreground"
            href="/billing/new"
          >
            <Plus className="size-4" />
            Existing Resident
          </Link>
        </div>
      </div>

      <ClaimsStatusTabs
        active={statusFilter}
        stats={data.stats}
        onSelect={setStatusFilter}
      />
      <ClaimsTable claims={data.claims} statusFilter={statusFilter} />
    </div>
  );
}
