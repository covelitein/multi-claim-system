"use client";

import { ClaimsStatusTabs } from "@/components/dashboard/claims/claims-status-tabs";
import { ClaimsTable } from "@/components/dashboard/claims/claims-table";
import { fetchClaims, type ClaimsPageData } from "@/lib/dashboard/claims-data";
import { Plus } from "@gravity-ui/icons";
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
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-4 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Claims
          </h1>
          <p className="mt-1 text-sm text-muted">
            Upload claim packets for review — Helix prepares and submits forms.
          </p>
        </div>
        <Link
          className="inline-flex h-9 w-fit items-center justify-center gap-2 rounded-xl bg-accent px-3 text-sm font-medium text-accent-foreground"
          href="/billing/new"
        >
          <Plus className="size-4" />
          Create New Claim
        </Link>
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
