"use client";

import type { WalkthroughStep } from "@/lib/dashboard/use-claim-walkthrough";
import { Check } from "@gravity-ui/icons";
import { cn } from "@heroui/react";

/** Step row plus overall progress. `done[i]` is computed by the page. */
export function WalkthroughStepper({
  steps,
  stepIndex,
  maxReached,
  done,
  progress,
  onSelect,
}: {
  steps: WalkthroughStep[];
  stepIndex: number;
  maxReached: number;
  done: boolean[];
  progress: number;
  onSelect: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
      <ol className="flex min-w-0 flex-1 gap-1 overflow-x-auto pb-1">
        {steps.map((step, index) => {
          const current = index === stepIndex;
          const reachable = index <= maxReached;

          return (
            <li key={step.id} className="relative min-w-[84px] flex-1">
              {index > 0 ? (
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-4 right-[calc(50%+1.25rem)] h-0.5 w-[calc(100%-2.5rem)]",
                    done[index - 1] ? "bg-signal-green" : "bg-border",
                  )}
                />
              ) : null}
              <button
                aria-current={current ? "step" : undefined}
                className="relative flex w-full flex-col items-center gap-1.5 rounded-lg px-1 pb-1 text-center disabled:cursor-default"
                disabled={!reachable}
                type="button"
                onClick={() => onSelect(index)}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full type-badge",
                    done[index] && "bg-signal-green text-white",
                    current && "bg-accent text-accent-foreground ring-4 ring-accent/20",
                    !done[index] &&
                      !current &&
                      "border-2 border-border bg-surface text-muted",
                  )}
                >
                  {done[index] ? <Check className="size-4" /> : index + 1}
                </span>
                <span
                  className={cn(
                    "type-meta font-bold leading-tight",
                    current ? "text-foreground" : "text-muted",
                  )}
                >
                  {step.label}
                </span>
                <span
                  className={cn(
                    "type-badge",
                    done[index] && "text-signal-green-ink",
                    current && "text-accent",
                  )}
                >
                  {current ? "In Progress" : done[index] ? "Completed" : "\u00A0"}
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <div className="shrink-0 rounded-xl border border-border bg-surface-secondary px-4 py-2.5 lg:w-44">
        <div className="flex items-baseline justify-between">
          <span className="type-label text-muted">Overall progress</span>
          <span className="type-row">{progress}%</span>
        </div>
        <div
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={progress}
          className="mt-2 h-2 overflow-hidden rounded-full bg-border"
          role="progressbar"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
