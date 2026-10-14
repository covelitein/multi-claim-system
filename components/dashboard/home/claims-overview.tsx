"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { StatusDonut } from "@/components/dashboard/status-donut";
import type { ClaimsOverviewSlice } from "@/lib/dashboard/home-data";
import { Card } from "@heroui/react";

export function ClaimsOverview({
  slices,
  rangeLabel,
}: {
  slices: ClaimsOverviewSlice[];
  rangeLabel: string;
}) {
  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header className="shrink-0 flex-row items-center justify-between gap-3">
        <Card.Title className="type-card-title">Claims Overview</Card.Title>
        <span className="rounded-full bg-surface-secondary px-3 py-1 type-badge text-foreground">
          {rangeLabel}
        </span>
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col pt-1">
        <StatusDonut
          centerLabel="Active"
          slices={slices.filter((slice) => slice.id !== "submitted")}
        />
      </Card.Content>
    </Card>
  );
}
