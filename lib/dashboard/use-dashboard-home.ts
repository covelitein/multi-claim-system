"use client";

import { fetchDashboardHome, type DashboardHomeData } from "@/lib/dashboard/home-data";
import { useEffect, useState } from "react";

/** Plug point: swap `fetchDashboardHome` for an RTK Query / API client later. */
export function useDashboardHome() {
  const [data, setData] = useState<DashboardHomeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError(null);
    fetchDashboardHome()
      .then((result) => {
        if (!active) return;
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load dashboard");
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
