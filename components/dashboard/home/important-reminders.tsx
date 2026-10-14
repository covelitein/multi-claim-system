"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { HomeReminder } from "@/lib/dashboard/home-data";
import { SIGNAL } from "@/lib/dashboard/signal-colors";
import { TriangleExclamation } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Link from "next/link";

export function ImportantReminders({ reminders }: { reminders: HomeReminder[] }) {
  return (
    <Card className={`${dashboardCardClass} h-full`}>
      <Card.Header>
        <Card.Title className="type-card-title">Important Reminders</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        {reminders.map((item) => (
          <div
            key={item.id}
            className={`flex items-start gap-3 rounded-xl border border-border bg-surface px-3.5 py-3 ${SIGNAL.orange.edge}`}
          >
            <span
              className={`mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full ${SIGNAL.orange.icon}`}
            >
              <TriangleExclamation className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="type-body leading-snug">
                {item.message}
              </p>
              <Link
                className="mt-1 inline-block type-body font-bold text-accent underline-offset-2 hover:underline"
                href={item.href}
              >
                {item.actionLabel}
              </Link>
            </div>
          </div>
        ))}
      </Card.Content>
    </Card>
  );
}
