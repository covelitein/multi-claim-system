"use client";

import { AddFacilityDrawer } from "@/components/dashboard/drawers/add-facility-drawer";
import { FacilityCard } from "@/components/dashboard/facilities/facility-card";
import {
  fetchFacilities,
  type FacilitiesPageData,
} from "@/lib/dashboard/facilities-data";
import { Magnifier } from "@gravity-ui/icons";
import { useEffect, useMemo, useState } from "react";

export function FacilitiesPage() {
  const [data, setData] = useState<FacilitiesPageData | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchFacilities().then(setData);
  }, []);

  const facilities = useMemo(() => {
    if (!data) return [];
    if (!query.trim()) return data.facilities;
    const lower = query.toLowerCase();
    return data.facilities.filter(
      (facility) =>
        facility.name.toLowerCase().includes(lower) ||
        facility.city.toLowerCase().includes(lower) ||
        facility.type.toLowerCase().includes(lower) ||
        facility.contactEmail.toLowerCase().includes(lower),
    );
  }, [data, query]);

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
            Facilities
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage assisted living, skilled nursing, and agency locations.
          </p>
        </div>
        <AddFacilityDrawer />
      </div>

      <div className="flex w-full max-w-md items-center gap-2 rounded-xl border border-border bg-surface px-3 py-2 focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20">
        <Magnifier className="size-4 shrink-0 text-muted" />
        <input
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          placeholder="Search facilities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid min-w-0 gap-5 sm:grid-cols-2">
        {facilities.map((facility) => (
          <FacilityCard key={facility.id} facility={facility} />
        ))}
      </div>

      {facilities.length === 0 ? (
        <p className="py-10 text-center text-sm text-muted">
          No facilities match your search.
        </p>
      ) : null}
    </div>
  );
}
