"use client";

import { StatTile } from "@/components/dashboard/stat-tile";
import type { InvoiceStat } from "@/lib/dashboard/invoices-data";
import {
  CircleCheck,
  CircleXmark,
  Clock,
  Receipt,
  TriangleExclamation,
} from "@gravity-ui/icons";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  total: Receipt,
  matched: CircleCheck,
  pending: Clock,
  missing: TriangleExclamation,
  overdue: CircleXmark,
};

const SHORT_LABEL: Record<string, string> = {
  total: "Total",
  matched: "Matched",
  pending: "Pending",
  missing: "Missing",
  overdue: "Overdue",
};

export function InvoicesStatCards({ stats }: { stats: InvoiceStat[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {stats.map((stat) => (
        <StatTile
          key={stat.id}
          icon={ICON_MAP[stat.id] ?? Receipt}
          label={SHORT_LABEL[stat.id] ?? stat.label}
          tone={stat.tone}
          value={stat.value}
        />
      ))}
    </div>
  );
}
