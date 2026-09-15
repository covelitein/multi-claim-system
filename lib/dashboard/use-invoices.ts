"use client";

import { fetchInvoices, type InvoicesPageData } from "@/lib/dashboard/invoices-data";
import { useEffect, useState } from "react";

/** Plug point: swap for invoices list API later. */
export function useInvoices() {
  const [data, setData] = useState<InvoicesPageData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setError(null);
    fetchInvoices()
      .then((result) => {
        if (!active) return;
        setData(result);
        setLoading(false);
      })
      .catch((err: unknown) => {
        if (!active) return;
        setError(err instanceof Error ? err.message : "Failed to load invoices");
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return { data, loading, error };
}
