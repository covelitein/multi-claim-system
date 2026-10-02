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
          <p className="mt-0.5 text-sm font-medium text-muted">
            Upload LTC packets for Helix review. CMR walkthrough comes later.
          </p>
        </div>
        <div className="flex flex-wrap gap-2.5">
          <NewClaimDrawer
            mode="new-resident"
            trigger={
              <Button
                className="h-11 gap-2 px-4 text-sm font-bold border-2 border-accent/40 bg-accent-soft text-accent hover:bg-accent hover:text-accent-foreground"
                variant="outline"
              >
                <Plus className="size-4" />
                Claim: New Resident
              </Button>
            }
          />
          <Link
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-accent px-4 text-sm font-bold text-accent-foreground shadow-sm hover:opacity-95"
            href="/billing/new"
          >
            <Plus className="size-4" />
            Claim for Existing Resident
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
