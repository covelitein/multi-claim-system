"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { ScheduleDay } from "@/lib/dashboard/home-data";
import { Button, Card, cn, ScrollShadow } from "@heroui/react";

function shiftDate(iso: string, days: number) {
  const date = new Date(`${iso}T12:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

function dayNumber(iso: string) {
  return Number(iso.slice(8, 10));
}

function monthLabel(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
}

function shortDate(iso: string) {
  return new Date(`${iso}T12:00:00`).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function MySchedule({
  selectedDate,
  days,
  range,
  onRangeChange,
  onSelectDate,
}: {
  selectedDate: string;
  days: ScheduleDay[];
  range: string;
  onRangeChange: (range: string) => void;
  onSelectDate: (date: string) => void;
}) {
  const selected =
    days.find((day) => day.date === selectedDate) ??
    days.find((day) => day.date > selectedDate) ??
    days[0];

  const weekDays = days.filter((day) => {
    const selectedTime = new Date(`${selectedDate}T12:00:00`);
    const start = new Date(selectedTime);
    start.setDate(selectedTime.getDate() - selectedTime.getDay());
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    const current = new Date(`${day.date}T12:00:00`);
    return current >= start && current <= end;
  });

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="flex flex-row items-center justify-between gap-3">
        <Card.Title className="text-sm font-medium">Claim queue</Card.Title>
        <div className="flex gap-4 text-sm">
          {["day", "week"].map((key) => (
            <button
              key={key}
              className={cn(
                "flex flex-col items-center capitalize",
                range === key ? "text-accent" : "text-muted",
              )}
              type="button"
              onClick={() => onRangeChange(key)}
            >
              {key}
              <span
                className={cn(
                  "mt-1 size-1 rounded-full",
                  range === key ? "bg-accent" : "bg-transparent",
                )}
              />
            </button>
          ))}
        </div>
      </Card.Header>
      <Card.Content className="gap-5">
        {range === "day" ? (
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 space-y-2">
              <div>
                <p className="text-sm text-muted">Review window</p>
                <p className="text-sm font-medium">
                  {selected?.hours ?? "No review window"}
                </p>
              </div>
              <p className="text-sm text-muted">
                Due claims: {selected?.totalPatients ?? 0}
              </p>
            </div>
            <div className="flex flex-col items-center gap-2 self-center">
              <div className="flex items-center justify-center gap-4">
                <button
                  className="text-lg text-muted"
                  type="button"
                  onClick={() => onSelectDate(shiftDate(selectedDate, -1))}
                >
                  {dayNumber(shiftDate(selectedDate, -1))}
                </button>
                <button
                  className="flex size-14 items-center justify-center rounded-full bg-accent text-xl font-semibold text-accent-foreground shadow-md sm:size-16"
                  type="button"
                  onClick={() => onSelectDate(selectedDate)}
                >
                  {dayNumber(selectedDate)}
                </button>
                <button
                  className="text-lg text-muted"
                  type="button"
                  onClick={() => onSelectDate(shiftDate(selectedDate, 1))}
                >
                  {dayNumber(shiftDate(selectedDate, 1))}
                </button>
              </div>
              <p className="text-xs text-muted">{monthLabel(selectedDate)}</p>
            </div>
          </div>
        ) : (
          <ScrollShadow
            className="max-h-40"
            isEnabled={false}
            orientation="vertical"
          >
            <div className="flex flex-col gap-2">
              {(weekDays.length ? weekDays : days.slice(0, 5)).map((day) => {
                const isSelected = day.date === selectedDate;

                return (
                  <Button
                    key={day.date}
                    className={cn(
                      "h-10 justify-between rounded-2xl px-3 text-sm",
                      !isSelected && "bg-surface-secondary",
                    )}
                    fullWidth
                    variant={isSelected ? "primary" : "tertiary"}
                    onPress={() => onSelectDate(day.date)}
                  >
                    <span>{shortDate(day.date)}</span>
                    <span>{day.totalPatients} claims</span>
                  </Button>
                );
              })}
            </div>
          </ScrollShadow>
        )}
      </Card.Content>
    </Card>
  );
}
