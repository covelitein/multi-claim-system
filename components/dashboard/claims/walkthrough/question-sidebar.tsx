"use client";

import type { WalkthroughStep } from "@/lib/dashboard/use-claim-walkthrough";
import { Check } from "@gravity-ui/icons";
import { Card, cn } from "@heroui/react";

export function QuestionSidebar({
  steps,
  stepIndex,
  maxReached,
  done,
  onSelect,
}: {
  steps: WalkthroughStep[];
  stepIndex: number;
  maxReached: number;
  done: boolean[];
  onSelect: (index: number) => void;
}) {
  const questions = steps.flatMap((step, index) =>
    step.kind === "question" ? [{ step, index }] : [],
  );

  return (
    <Card className="p-4 shadow-sm">
      <div className="flex items-baseline justify-between">
        <h2 className="type-row">Form Questions</h2>
        <span className="type-meta text-muted">{questions.length} total</span>
      </div>
      <ul className="mt-3 flex flex-col gap-1">
        {questions.map(({ step, index }) => {
          if (step.kind !== "question") return null;
          const current = index === stepIndex;
          return (
            <li key={step.id}>
              <button
                aria-current={current ? "step" : undefined}
                className={cn(
                  "flex w-full items-start gap-3 rounded-lg px-2.5 py-2.5 text-left transition-colors disabled:cursor-default",
                  current ? "bg-accent-soft" : "hover:bg-surface-secondary",
                )}
                disabled={index > maxReached}
                type="button"
                onClick={() => onSelect(index)}
              >
                <span
                  className={cn(
                    "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full type-badge",
                    done[index] && "bg-signal-green text-white",
                    current && "bg-accent text-accent-foreground",
                    !done[index] &&
                      !current &&
                      "border-2 border-border text-muted",
                  )}
                >
                  {done[index] ? <Check className="size-3.5" /> : step.question.number}
                </span>
                <span className="min-w-0">
                  <span className="block type-body leading-snug">
                    {step.question.shortLabel}
                  </span>
                  <span
                    className={cn(
                      "block type-badge",
                      done[index] ? "text-signal-green-ink" : "text-muted",
                    )}
                  >
                    {current
                      ? "In Progress"
                      : done[index]
                        ? "Completed"
                        : "Not started"}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
