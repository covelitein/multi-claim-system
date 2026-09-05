"use client";

import { CompactSelect } from "@/components/dashboard/home/compact-select";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { CalendarEvent } from "@/lib/dashboard/home-data";
import { Button, Card, cn, Tooltip } from "@heroui/react";

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_OPTIONS = [
  { id: "0", label: "January" },
  { id: "1", label: "February" },
  { id: "2", label: "March" },
  { id: "3", label: "April" },
  { id: "4", label: "May" },
  { id: "5", label: "June" },
  { id: "6", label: "July" },
  { id: "7", label: "August" },
  { id: "8", label: "September" },
  { id: "9", label: "October" },
  { id: "10", label: "November" },
  { id: "11", label: "December" },
];

function toIso(year: number, month: number, day: number) {
  return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

function monthCells(year: number, month: number) {
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1),
  ];
}

export function HomeCalendar({
  year,
  month,
  selectedDate,
  events,
  onMonthChange,
  onSelectDate,
}: {
  year: number;
  month: number;
  selectedDate: string;
  events: CalendarEvent[];
  onMonthChange: (month: number) => void;
  onSelectDate: (date: string) => void;
}) {
  const cells = monthCells(year, month);
  const eventsByDate = new Map(events.map((event) => [event.date, event]));

  return (
    <Card className={`${dashboardCardClass} min-w-0`}>
      <Card.Header className="flex flex-row items-center justify-between gap-3">
        <Card.Title className="text-sm font-medium">Calendar</Card.Title>
        <CompactSelect
          label="Month"
          options={MONTH_OPTIONS}
          value={String(month)}
          onChange={(value) => onMonthChange(Number(value))}
        />
      </Card.Header>
      <Card.Content>
        <div className="grid grid-cols-7 gap-y-1 text-center text-sm text-muted">
          {WEEKDAYS.map((day) => (
            <span key={day} className="py-1 text-xs font-medium">
              {day}
            </span>
          ))}
          {cells.map((day, index) => {
            if (!day) return <span key={`empty-${index}`} />;

            const iso = toIso(year, month, day);
            const event = eventsByDate.get(iso);
            const selected = iso === selectedDate;

            const cell = (
              <Button
                isIconOnly
                aria-label={event ? `${day}, ${event.label}` : `Select ${day}`}
                className={cn(
                  "relative size-9 rounded-full text-sm [&>svg]:m-0",
                  selected
                    ? "bg-accent text-accent-foreground"
                    : "bg-transparent text-foreground hover:bg-surface-secondary",
                )}
                variant="ghost"
                onPress={() => onSelectDate(iso)}
              >
                {day}
                {event ? (
                  <span className="absolute inset-x-0 -bottom-0.5 flex justify-center gap-0.5">
                    <span
                      className={cn(
                        "size-1 rounded-full",
                        selected ? "bg-accent-foreground" : "bg-muted",
                      )}
                    />
                    <span
                      className={cn(
                        "size-1 rounded-full",
                        selected ? "bg-accent-foreground" : "bg-muted",
                      )}
                    />
                  </span>
                ) : null}
              </Button>
            );

            if (!event) return <div key={iso}>{cell}</div>;

            return (
              <Tooltip key={iso} delay={80}>
                <Tooltip.Trigger className="flex justify-center">{cell}</Tooltip.Trigger>
                <Tooltip.Content>{event.label}</Tooltip.Content>
              </Tooltip>
            );
          })}
        </div>
      </Card.Content>
    </Card>
  );
}
