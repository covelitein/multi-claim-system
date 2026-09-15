"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { ClaimUploadPhase } from "@/lib/dashboard/claim-upload-data";
import { Card } from "@heroui/react";
import type { ReactNode } from "react";

export function UploadPhaseStepper({
  phases,
  activeIndex,
}: {
  phases: { id: ClaimUploadPhase; label: string }[];
  activeIndex: number;
}) {
  return (
    <ol className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
      {phases.map((phase, index) => {
        const done = index < activeIndex;
        const active = index === activeIndex;
        return (
          <li
            key={phase.id}
            className="flex min-w-0 flex-1 items-center gap-2"
          >
            <span
              className={[
                "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                active
                  ? "bg-accent text-accent-foreground"
                  : done
                    ? "bg-success-soft text-success"
                    : "bg-surface-secondary text-muted",
              ].join(" ")}
            >
              {index + 1}
            </span>
            <span
              className={[
                "truncate text-sm",
                active ? "font-semibold text-foreground" : "text-muted",
              ].join(" ")}
            >
              {phase.label}
            </span>
            {index < phases.length - 1 ? (
              <span className="mx-1 hidden h-px flex-1 bg-border sm:block" />
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function UploadPhaseCard({ children }: { children: ReactNode }) {
  return (
    <Card className={dashboardCardClass}>
      <Card.Content>{children}</Card.Content>
    </Card>
  );
}
