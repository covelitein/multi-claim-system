"use client";

import { fetchDashboardHome, type DashboardHomeData } from "@/lib/dashboard/home-data";
import { useEffect, useState } from "react";

export function useDashboardHome() {
  const [data, setData] = useState<DashboardHomeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    setLoading(true);
    fetchDashboardHome().then((result) => {
      if (!active) return;
      setData(result);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  return { data, loading };
}
