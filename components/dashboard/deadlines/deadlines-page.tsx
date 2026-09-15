"use client";

import { DeadlinesCards } from "@/components/dashboard/deadlines/deadlines-cards";
import { DeadlinesTimeline } from "@/components/dashboard/deadlines/deadlines-timeline";
import { fetchDeadlines, type DeadlinesPageData } from "@/lib/dashboard/deadlines-data";
import { useEffect, useState } from "react";

export function DeadlinesPage() {
  const [data, setData] = useState<DeadlinesPageData | null>(null);

  useEffect(() => {
    fetchDeadlines().then(setData);
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
      <div>
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
          Deadlines
        </h1>
        <p className="mt-1 text-sm text-muted">
          Track upcoming claim deadlines, required actions, and overdue items.
        </p>
      </div>

      <DeadlinesCards stats={data.stats} />
      <DeadlinesTimeline deadlines={data.deadlines} />
    </div>
  );
}
