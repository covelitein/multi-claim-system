"use client";

import { cn } from "@heroui/react";
import { useEffect, useMemo, useState } from "react";
import type { SlideTone } from "@/lib/auth/sidebar-slides";

const STROKE: Record<SlideTone, string> = {
  accent: "stroke-accent",
  success: "stroke-success",
  danger: "stroke-danger",
  warning: "stroke-warning",
};

const RADIUS = 36;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const GAP = 8;

type Segment = {
  value: number;
  color: SlideTone;
};

export function SidebarDonut({
  center,
  segments,
}: {
  center: string;
  segments: Segment[];
}) {
  const [drawn, setDrawn] = useState(false);
  const total = segments.reduce((sum, segment) => sum + segment.value, 0);

  const arcs = useMemo(() => {
    let cursor = 0;

    return segments.map((segment) => {
      const usable = CIRCUMFERENCE - GAP * segments.length;
      const length = (segment.value / total) * usable;
      const offset = -(cursor + GAP / 2);
      cursor += length + GAP;
      return { ...segment, length, offset };
    });
  }, [segments, total]);

  useEffect(() => {
    setDrawn(false);
    const frame = requestAnimationFrame(() => setDrawn(true));
    return () => cancelAnimationFrame(frame);
  }, [center, segments]);

  return (
    <div className="relative isolate size-40 shrink-0">
      <span className="absolute inset-3 rounded-full bg-surface" />
      <svg viewBox="0 0 100 100" className="relative size-full -rotate-90" aria-hidden>
        <circle
          cx="50"
          cy="50"
          r={RADIUS}
          fill="none"
          className="stroke-border"
          strokeWidth="11"
        />
        {arcs.map((arc) => (
          <circle
            key={`${arc.color}-${arc.offset}`}
            cx="50"
            cy="50"
            r={RADIUS}
            fill="none"
            className={cn("auth-donut-arc origin-center", STROKE[arc.color])}
            strokeWidth="11"
            strokeLinecap="round"
            strokeDasharray={
              drawn ? `${arc.length} ${CIRCUMFERENCE}` : `0 ${CIRCUMFERENCE}`
            }
            strokeDashoffset={arc.offset}
          />
        ))}
      </svg>
      <span className="absolute inset-0 grid place-items-center px-2 text-center font-inter text-sm font-semibold leading-tight text-foreground sm:text-base">
        {center}
      </span>
    </div>
  );
}
