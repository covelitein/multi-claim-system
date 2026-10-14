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
        <Card.Title className="text-lg font-bold">Important Reminders</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-col gap-3">
        {reminders.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 rounded-2xl border-2 border-signal-amber bg-signal-amber-soft px-3.5 py-3"
          >
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-signal-amber text-signal-amber-ink">
              <TriangleExclamation className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold">{item.message}</p>
              <Link
                className="mt-1 inline-block text-base font-bold text-signal-blue-ink underline-offset-2 hover:underline"
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
