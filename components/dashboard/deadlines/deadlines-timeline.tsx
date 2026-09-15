"use client";

import type { Deadline, DeadlinePriority } from "@/lib/dashboard/deadlines-data";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { Avatar, Card, Chip } from "@heroui/react";
import { useMemo } from "react";

const PRIORITY_CONFIG: Record<
  DeadlinePriority,
  { label: string; color: "danger" | "warning" | "accent" | "success" }
> = {
  overdue: { label: "Overdue", color: "danger" },
  today: { label: "Due Today", color: "warning" },
  "this-week": { label: "This Week", color: "accent" },
  upcoming: { label: "Upcoming", color: "success" },
};

const GROUP_ORDER: DeadlinePriority[] = [
  "overdue",
  "today",
  "this-week",
  "upcoming",
];

export function DeadlinesTimeline({ deadlines }: { deadlines: Deadline[] }) {
  const grouped = useMemo(() => {
    const groups = new Map<DeadlinePriority, Deadline[]>();
    for (const d of deadlines) {
      const list = groups.get(d.priority) ?? [];
      list.push(d);
      groups.set(d.priority, list);
    }
    return GROUP_ORDER.filter((p) => groups.has(p)).map((p) => ({
      priority: p,
      config: PRIORITY_CONFIG[p],
      items: groups.get(p)!,
    }));
  }, [deadlines]);

  return (
    <div className="flex flex-col gap-6">
      {grouped.map((group) => (
        <Card key={group.priority} className={dashboardCardClass}>
          <Card.Header className="flex-row items-center gap-3">
            <Chip color={group.config.color} size="sm" variant="soft">
              <Chip.Label>{group.config.label}</Chip.Label>
            </Chip>
            <span className="text-sm text-muted">
              {group.items.length} item{group.items.length !== 1 ? "s" : ""}
            </span>
          </Card.Header>
          <Card.Content className="gap-0 divide-y divide-separator/50">
            {group.items.map((d) => (
              <div
                key={d.id}
                className="flex items-start gap-4 py-4 first:pt-0 last:pb-0"
              >
                <Avatar className="mt-0.5 size-9 shrink-0">
                  <Avatar.Image alt={d.residentName} src={d.residentImage} />
                  <Avatar.Fallback>{d.residentInitials}</Avatar.Fallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium leading-snug">{d.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                    <span>{d.residentName}</span>
                    <span className="hidden sm:inline">·</span>
                    <span className="font-mono">{d.claimId}</span>
                    <span className="hidden sm:inline">·</span>
                    <span>{d.facility}</span>
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-sm font-medium">{d.dueDate}</p>
                  <Chip
                    className="mt-1"
                    color="default"
                    size="sm"
                    variant="soft"
                  >
                    <Chip.Label>{d.type}</Chip.Label>
                  </Chip>
                </div>
              </div>
            ))}
          </Card.Content>
        </Card>
      ))}
    </div>
  );
}
