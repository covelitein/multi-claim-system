"use client";

import {
  Clock,
  HeartPulse,
  Layers,
  Persons,
  Pill,
  Pulse,
} from "@gravity-ui/icons";
import { Chip, cn } from "@heroui/react";
import type { ComponentType, SVGProps } from "react";
import { SidebarDonut } from "@/components/auth/sidebar-donut";
import type { SidebarSlide, SlideIcon, SlideTone } from "@/lib/auth/sidebar-slides";

const ICONS: Record<SlideIcon, ComponentType<SVGProps<SVGSVGElement>>> = {
  clock: Clock,
  pulse: Pulse,
  persons: Persons,
  heart: HeartPulse,
  pill: Pill,
  layers: Layers,
};

const ICON_TONE: Record<SlideTone, string> = {
  accent: "bg-accent text-accent-foreground",
  success: "bg-success text-success-foreground",
  danger: "bg-danger text-danger-foreground",
  warning: "bg-warning text-warning-foreground",
};

export function SidebarPreviewCard({
  badge,
  slide,
  onAdvance,
}: {
  badge?: string;
  slide: SidebarSlide;
  onAdvance: () => void;
}) {
  return (
    <article className="auth-glass relative rounded-3xl p-5 xl:p-6">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="font-inter text-lg font-semibold text-foreground">
            {slide.title}
          </h2>
          {badge ? <p className="mt-1 text-xs text-muted">{badge}</p> : null}
        </div>
        <button
          className="shrink-0 text-sm font-medium text-accent"
          type="button"
          onClick={onAdvance}
        >
          {slide.actionLabel}
        </button>
      </header>

      <div className="flex items-center gap-5">
        <div className="flex flex-col items-center gap-3">
          <SidebarDonut center={slide.center} segments={slide.segments} />
          <div className="flex flex-wrap justify-center gap-1.5">
            {slide.segments.map((segment) => (
              <Chip key={segment.label} color={segment.color} size="sm" variant="soft">
                {segment.label}
              </Chip>
            ))}
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {slide.metrics.map((metric) => {
            const Icon = ICONS[metric.icon];

            return (
              <div
                key={metric.label}
                className="auth-glass-tile flex items-center justify-between gap-3 rounded-2xl px-4 py-3"
              >
                <div className="min-w-0">
                  <p className="text-xs text-muted">{metric.label}</p>
                  <p className="font-inter text-xl font-semibold text-foreground">
                    {metric.value}
                  </p>
                  {metric.delta ? (
                    <p className="text-xs font-medium text-success">{metric.delta}</p>
                  ) : null}
                </div>
                <span
                  className={cn(
                    "grid size-10 shrink-0 place-items-center rounded-full",
                    ICON_TONE[metric.tone],
                  )}
                >
                  <Icon className="size-4" />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </article>
  );
}
