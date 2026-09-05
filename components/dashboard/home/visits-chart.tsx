"use client";

import { CompactSelect } from "@/components/dashboard/home/compact-select";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { ChartTone, YearVisits } from "@/lib/dashboard/home-data";
import { Card, cn } from "@heroui/react";
import { useMemo, useState } from "react";

const WIDTH = 640;
const HEIGHT = 240;
const PAD = { top: 32, right: 12, bottom: 32, left: 36 };

const TONE_FILL: Record<ChartTone, string> = {
  accent: "fill-accent",
  warning: "fill-warning",
  success: "fill-success",
  danger: "fill-danger",
};

const TONE_STROKE: Record<ChartTone, string> = {
  accent: "stroke-accent",
  warning: "stroke-warning",
  success: "stroke-success",
  danger: "stroke-danger",
};

function pointsFor(values: number[], max: number) {
  return values.map((value, index) => ({
    x: PAD.left + (index / (values.length - 1)) * (WIDTH - PAD.left - PAD.right),
    y: PAD.top + (1 - value / max) * (HEIGHT - PAD.top - PAD.bottom),
    value,
  }));
}

function smoothPath(points: { x: number; y: number }[]) {
  if (points.length < 2) return "";

  let path = `M ${points[0].x} ${points[0].y}`;
  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index === 0 ? 0 : index - 1];
    const current = points[index];
    const next = points[index + 1];
    const after = points[index + 2] ?? next;
    path += ` C ${current.x + (next.x - previous.x) / 6} ${current.y + (next.y - previous.y) / 6}, ${next.x - (after.x - current.x) / 6} ${next.y - (after.y - current.y) / 6}, ${next.x} ${next.y}`;
  }
  return path;
}

export function VisitsChart({
  months,
  years,
  selectedYear,
  onYearChange,
}: {
  months: string[];
  years: YearVisits[];
  selectedYear: string;
  onYearChange: (year: string) => void;
}) {
  const yearData = years.find((item) => item.year === selectedYear) ?? years[0];
  const [activeIndex, setActiveIndex] = useState(7);
  const max = useMemo(
    () => Math.max(...yearData.series.flatMap((series) => series.values), 1),
    [yearData],
  );
  const activeX =
    PAD.left + (activeIndex / (months.length - 1)) * (WIDTH - PAD.left - PAD.right);
  const bandWidth = (WIDTH - PAD.left - PAD.right) / (months.length - 1);
  const maleValue = yearData.series[0]?.values[activeIndex] ?? 0;

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="flex flex-row items-center justify-between gap-3">
        <Card.Title className="text-sm font-medium">Claim outcomes</Card.Title>
        <CompactSelect
          label="Year"
          options={years.map((item) => ({ id: item.year, label: item.year }))}
          value={selectedYear}
          onChange={onYearChange}
        />
      </Card.Header>
      <Card.Content className="gap-4">
        <div className="flex flex-wrap gap-4 text-sm text-muted">
          {yearData.series.map((series) => (
            <span key={series.id} className="inline-flex items-center gap-2">
              <span className={cn("size-2 rounded-full", TONE_FILL[series.tone])} />
              {series.label}
            </span>
          ))}
        </div>

        <div className="relative w-full">
          <svg
            className="h-52 w-full"
            viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
            onMouseLeave={() => setActiveIndex(7)}
            onMouseMove={(event) => {
              const bounds = event.currentTarget.getBoundingClientRect();
              const ratio = (event.clientX - bounds.left) / bounds.width;
              const index = Math.round(ratio * (months.length - 1));
              setActiveIndex(Math.min(months.length - 1, Math.max(0, index)));
            }}
          >
            <defs>
              {yearData.series.map((series) => (
                <linearGradient
                  key={series.id}
                  id={`visit-${series.id}`}
                  x1="0"
                  x2="0"
                  y1="0"
                  y2="1"
                >
                  <stop className={TONE_FILL[series.tone]} offset="0%" stopOpacity="0.22" />
                  <stop className={TONE_FILL[series.tone]} offset="100%" stopOpacity="0" />
                </linearGradient>
              ))}
            </defs>

            {[0, 0.25, 0.5, 0.75, 1].map((tick) => {
              const y = PAD.top + (1 - tick) * (HEIGHT - PAD.top - PAD.bottom);
              return (
                <g key={tick}>
                  <line
                    className="stroke-border"
                    x1={PAD.left}
                    x2={WIDTH - PAD.right}
                    y1={y}
                    y2={y}
                  />
                  <text
                    className="fill-muted"
                    fontSize="11"
                    textAnchor="end"
                    x={PAD.left - 8}
                    y={y + 3}
                  >
                    {tick === 0 ? "0" : `${Math.round((max * tick) / 1000)}k`}
                  </text>
                </g>
              );
            })}

            <rect
              className="fill-accent/10"
              height={HEIGHT - PAD.top - PAD.bottom}
              width={bandWidth}
              x={activeX - bandWidth / 2}
              y={PAD.top}
            />

            {yearData.series.map((series) => {
              const points = pointsFor(series.values, max);
              const line = smoothPath(points);
              const area = `${line} L ${points[points.length - 1].x} ${HEIGHT - PAD.bottom} L ${points[0].x} ${HEIGHT - PAD.bottom} Z`;
              return (
                <g key={series.id}>
                  <path d={area} fill={`url(#visit-${series.id})`} />
                  <path
                    className={cn("fill-none", TONE_STROKE[series.tone])}
                    d={line}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2.5"
                  />
                </g>
              );
            })}

            <circle className="fill-accent" cx={activeX} cy={pointsFor(yearData.series[0].values, max)[activeIndex].y} r="4" />

            {months.map((month, index) => {
              const x =
                PAD.left +
                (index / (months.length - 1)) * (WIDTH - PAD.left - PAD.right);
              return (
                <text
                  key={month}
                  className={cn("fill-muted", index === activeIndex && "fill-foreground")}
                  fontSize="11"
                  textAnchor="middle"
                  x={x}
                  y={HEIGHT - 8}
                >
                  {month}
                </text>
              );
            })}
          </svg>

          <div
            className="pointer-events-none absolute top-0 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-surface px-2.5 py-1 text-xs font-medium shadow-sm"
            style={{ left: `${(activeX / WIDTH) * 100}%` }}
          >
            <span className="size-1.5 rounded-full bg-accent" />
            {maleValue}
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
