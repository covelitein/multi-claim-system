"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { HomeReminder } from "@/lib/dashboard/home-data";
import { TriangleExclamation } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Link from "next/link";

export function ImportantReminders({ reminders }: { reminders: HomeReminder[] }) {
  return (
    <Card className={`${dashboardCardClass} h-full`}>
      <Card.Header>
        <Card.Title className="text-base font-semibold">Important Reminders</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        {reminders.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-2xl bg-surface-secondary/80 px-3.5 py-3"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-warning-soft text-warning">
              <TriangleExclamation className="size-4" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm">{item.message}</p>
              <Link className="mt-1 inline-block text-xs font-medium text-accent" href={item.href}>
                {item.actionLabel}
              </Link>
            </div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
