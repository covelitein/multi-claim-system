"use client";

import { AddResidentDrawer } from "@/components/dashboard/drawers/add-resident-drawer";
import { ResidentsStatCards } from "@/components/dashboard/residents/residents-stat-cards";
import { ResidentsTable } from "@/components/dashboard/residents/residents-table";
import { useResidents } from "@/lib/dashboard/use-residents";

export function ResidentsPage() {
  const { data, loading } = useResidents();

  if (loading || !data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-4 pb-2">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
            Residents
          </h1>
          <p className="mt-0.5 text-sm text-muted">
            Resident profiles with monthly claim submission history.
          </p>
        </div>
        <AddResidentDrawer />
      </div>

      <ResidentsStatCards stats={data.stats} />
      <ResidentsTable residents={data.residents} />
    </div>
  );
}
