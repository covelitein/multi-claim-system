"use client";

import { StatTile } from "@/components/dashboard/stat-tile";
import type { ResidentStat } from "@/lib/dashboard/residents-data";
import {
  CircleCheck,
  CircleXmark,
  Persons,
  TriangleExclamation,
} from "@gravity-ui/icons";
import type { ComponentType, SVGProps } from "react";

const ICON_MAP: Record<string, ComponentType<SVGProps<SVGSVGElement>>> = {
  total: Persons,
  active: CircleCheck,
  inactive: CircleXmark,
  "pending-claims": TriangleExclamation,
};

export function ResidentsStatCards({ stats }: { stats: ResidentStat[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatTile
          key={stat.id}
          icon={ICON_MAP[stat.id] ?? Persons}
          label={stat.label}
          tone={stat.tone}
          value={stat.value}
        />
      ))}
    </div>
  );
}
