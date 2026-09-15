"use client";

import type { WalkthroughPhase } from "@/lib/dashboard/claim-walkthrough-data";
import { cn } from "@heroui/react";

export function WalkthroughPhaseStepper({
  phases,
  activeIndex,
}: {
  phases: { id: WalkthroughPhase; label: string }[];
  activeIndex: number;
}) {
  return (
    <ol className="grid gap-3 sm:grid-cols-4">
      {phases.map((phase, index) => {
        const complete = index < activeIndex;
        const current = index === activeIndex;

        return (
          <li key={phase.id} className="flex items-center gap-3">
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                complete && "bg-success text-success-foreground",
                current && "bg-accent text-accent-foreground",
                !complete && !current && "bg-surface-secondary text-muted",
              )}
            >
              {complete ? "✓" : index + 1}
            </span>
            <span
              className={cn(
                "text-sm font-medium",
                current ? "text-foreground underline decoration-accent decoration-2 underline-offset-4" : "text-muted",
              )}
            >
              {phase.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
