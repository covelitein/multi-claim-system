"use client";

import { ClaimsStatusTabs } from "@/components/dashboard/claims/claims-status-tabs";
import { ClaimsTable } from "@/components/dashboard/claims/claims-table";
import { RequestsPanel } from "@/components/dashboard/claims/requests-panel";
import { CreateClaimDrawer } from "@/components/dashboard/drawers/create-claim-drawer";
import { NewClaimDrawer } from "@/components/dashboard/drawers/new-claim-drawer";
import { fetchClaims, type ClaimsPageData } from "@/lib/dashboard/claims-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { FileText, Plus } from "@gravity-ui/icons";
import { Button, cn } from "@heroui/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export function ClaimsPage() {
  const [data, setData] = useState<ClaimsPageData | null>(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [view, setView] = useState<"claims" | "requests">("claims");
  const addedClaims = useWorkspace((s) => s.addedClaims);

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get("view") === "requests") {
      setView("requests");
    }
  }, []);

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
            Upload LTC packets for Helix review, or answer the monthly CMR questions in the app.
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
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border-2 border-signal-purple/40 bg-signal-purple-soft px-4 text-sm font-bold text-signal-purple-ink hover:bg-signal-purple hover:text-white"
            href="/billing/cmr"
          >
            <FileText className="size-4" />
            Monthly form (CMR)
          </Link>
          <CreateClaimDrawer />
        </div>
      </div>

      <div className="flex gap-2">
        {(
          [
            ["claims", "Claims"],
            ["requests", "Request tracker"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            className={cn(
              "h-10 rounded-xl border px-4 text-sm font-bold",
              view === id
                ? "border-foreground bg-foreground text-background"
                : "border-border bg-surface text-foreground hover:bg-surface-secondary",
            )}
            type="button"
            onClick={() => setView(id)}
          >
            {label}
          </button>
        ))}
      </div>

      {view === "claims" ? (
        <>
          <ClaimsStatusTabs
            active={statusFilter}
            stats={data.stats}
            onSelect={setStatusFilter}
          />
          <ClaimsTable
            claims={[...addedClaims, ...data.claims]}
            statusFilter={statusFilter}
          />
        </>
      ) : (
        <RequestsPanel />
      )}
    </div>
  );
}
