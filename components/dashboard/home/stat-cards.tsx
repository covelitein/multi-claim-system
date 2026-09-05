"use client";

import { AvatarStack } from "@/components/dashboard/home/avatar-stack";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Sparkline } from "@/components/dashboard/home/sparkline";
import type { Intern, StatCard } from "@/lib/dashboard/home-data";
import { Card, Chip } from "@heroui/react";

export function StatCards({
  stats,
  interns,
  internExtra,
}: {
  stats: StatCard[];
  interns: Intern[];
  internExtra: number;
}) {
  return (
    <div className="grid min-w-0 gap-6 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => (
        <Card key={stat.id} className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="text-sm font-medium text-muted">
              {stat.label}
            </Card.Title>
          </Card.Header>
          <Card.Content className="flex items-end justify-between gap-2">
            <p className="text-xl font-semibold tracking-tight">{stat.value}</p>
            {stat.trend ? (
              <div className="flex items-center gap-1.5">
                <Sparkline tone={stat.trend.tone} values={stat.trend.spark} />
                <Chip color={stat.trend.tone} size="sm" variant="soft">
                  <Chip.Label>{stat.trend.label}</Chip.Label>
                </Chip>
              </div>
            ) : null}
          </Card.Content>
        </Card>
      ))}

      <Card className={dashboardCardClass}>
        <Card.Header>
          <Card.Title className="text-sm font-medium text-muted">Assigned billers</Card.Title>
        </Card.Header>
        <Card.Content>
          <AvatarStack extra={internExtra} people={interns} />
        </Card.Content>
      </Card>
    </div>
  );
}
