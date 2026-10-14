"use client";

import { StatTile } from "@/components/dashboard/stat-tile";
import type { AnalyticsStat } from "@/lib/dashboard/analytics-data";
import {
  ArrowUpFromSquare,
  CircleCheck,
  Clock,
  CreditCard,
} from "@gravity-ui/icons";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  filed: ArrowUpFromSquare,
  approval: CircleCheck,
  processing: Clock,
  revenue: CreditCard,
};

export function AnalyticsStatRow({ stats }: { stats: AnalyticsStat[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatTile
          key={stat.id}
          badge={stat.change}
          icon={ICON_MAP[stat.id] ?? ArrowUpFromSquare}
          label={stat.label}
          tone={stat.tone}
          value={stat.value}
        />
      ))}
    </div>
  );
}
