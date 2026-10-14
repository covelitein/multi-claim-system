"use client";

import { StatTile } from "@/components/dashboard/stat-tile";
import type { HomeKpiCard, HomeKpiIcon } from "@/lib/dashboard/home-data";
import {
  ArrowUpFromSquare,
  CircleCheck,
  CircleXmark,
  Clock,
} from "@gravity-ui/icons";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<HomeKpiIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  submitted: ArrowUpFromSquare,
  approved: CircleCheck,
  pending: Clock,
  rejected: CircleXmark,
};

export function KpiStatCards({ kpis }: { kpis: HomeKpiCard[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => (
        <StatTile
          key={kpi.id}
          href={kpi.href}
          icon={ICON_MAP[kpi.icon]}
          label={kpi.label}
          tone={kpi.tone}
          value={kpi.value}
        />
      ))}
    </div>
  );
}
