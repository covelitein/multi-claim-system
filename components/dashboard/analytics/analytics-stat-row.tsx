"use client";

import type { AnalyticsStat } from "@/lib/dashboard/analytics-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Card, Chip } from "@heroui/react";

export function AnalyticsStatRow({ stats }: { stats: AnalyticsStat[] }) {
  return (
    <div className="grid min-w-0 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.id} className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="text-sm font-medium text-muted">
              {stat.label}
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex items-end justify-between gap-2">
            <p className="text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>
            <Chip color={stat.tone} size="sm" variant="soft">
              <Chip.Label>{stat.change}</Chip.Label>
            </Chip>
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
