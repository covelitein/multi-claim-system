"use client";

import type { TipCard } from "@/lib/dashboard/claim-walkthrough-data";
import { cn } from "@heroui/react";

const TONE: Record<
  TipCard["tone"],
  { border: string; title: string; bg: string }
> = {
  success: {
    border: "border-success/30",
    title: "text-success",
    bg: "bg-success-soft/40",
  },
  accent: {
    border: "border-accent/30",
    title: "text-accent",
    bg: "bg-accent-soft/40",
  },
  warning: {
    border: "border-warning/30",
    title: "text-warning",
    bg: "bg-warning-soft/40",
  },
  danger: {
    border: "border-danger/30",
    title: "text-danger",
    bg: "bg-danger-soft/40",
  },
};

export function TipsColumn({ tips }: { tips: TipCard[] }) {
  return (
    <aside className="flex flex-col gap-3">
      {tips.map((tip) => {
        const tone = TONE[tip.tone];
        return (
          <div
            key={tip.id}
            className={cn(
              "rounded-2xl border px-4 py-3.5",
              tone.border,
              tone.bg,
            )}
          >
            <p className={cn("text-sm font-semibold", tone.title)}>{tip.title}</p>
            {tip.body ? (
              <p className="mt-2 text-sm leading-6 text-foreground/90">{tip.body}</p>
            ) : null}
            {tip.bullets?.length ? (
              <ul className="mt-2 list-disc space-y-1 ps-4 text-sm leading-6 text-foreground/90">
                {tip.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            ) : null}
            {tip.ctaLabel ? (
              <button
                className="mt-3 text-sm font-medium text-accent"
                type="button"
              >
                {tip.ctaLabel}
              </button>
            ) : null}
          </div>
        );
      })}
    </aside>
  );
}
