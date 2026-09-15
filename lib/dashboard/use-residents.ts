"use client";

import { fetchResidents, type ResidentsPageData } from "@/lib/dashboard/residents-data";
import { useEffect, useState } from "react";

/** Plug point: swap for residents list API later. */
export function useResidents() {
  const [data, setData] = useState<ResidentsPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchResidents()
      .then((result) => {
        if (!active) return;
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load residents");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
