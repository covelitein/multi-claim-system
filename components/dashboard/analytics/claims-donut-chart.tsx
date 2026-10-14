"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { StatusDonut } from "@/components/dashboard/status-donut";
import type { StatusBreakdown } from "@/lib/dashboard/analytics-data";
import { Card } from "@heroui/react";

export function ClaimsDonutChart({
  breakdown,
}: {
  breakdown: StatusBreakdown[];
}) {
  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header>
        <Card.Title className="type-card-title">Claims by Status</Card.Title>
        <p className="mt-0.5 type-meta text-muted">
          Facility-wide long-term care packet status
        </p>
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col pt-1">
        <StatusDonut
          centerLabel="Total"
          slices={breakdown.map((item) => ({ ...item, id: item.label }))}
        />
      </Card.Content>
    </Card>
  );
}
