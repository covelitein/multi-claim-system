"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { Appointment } from "@/lib/dashboard/home-data";
import { ChevronDown, ChevronUp } from "@gravity-ui/icons";
import { Avatar, Button, Card } from "@heroui/react";
import { useEffect, useState } from "react";

export function UpcomingAppointments({
  appointments,
}: {
  appointments: Appointment[];
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(0);
  }, [appointments]);

  const current = appointments[index];

  return (
    <Card className={dashboardCardClass}>
      <Card.Header className="flex flex-row items-start justify-between gap-3 sm:items-center">
        <div className="flex min-w-0 flex-1 items-start gap-2 sm:items-center">
          <Card.Title className="text-sm font-medium">
            Claims needing action
          </Card.Title>
          <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-surface-secondary text-xs font-medium sm:mt-0">
            {appointments.length}
          </span>
        </div>
        <div className="hidden -space-x-2 sm:flex">
          {appointments.slice(0, 2).map((item) => (
            <Avatar key={item.id} className="size-7 ring-2 ring-surface">
              <Avatar.Image alt={item.patient.name} src={item.patient.image} />
              <Avatar.Fallback>{item.patient.initials}</Avatar.Fallback>
            </Avatar>
          ))}
        </div>
      </Card.Header>
      <Card.Content className="gap-3">
        {current ? (
          <>
            <p className="text-sm text-muted">{current.time}</p>
            <p className="text-sm leading-5 font-medium">{current.diagnosis}</p>
            <div className="flex items-center gap-3 rounded-2xl bg-surface-secondary p-2">
              <Avatar className="size-9">
                <Avatar.Image alt={current.patient.name} src={current.patient.image} />
                <Avatar.Fallback>{current.patient.initials}</Avatar.Fallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{current.patient.name}</p>
                <p className="text-sm text-muted">{current.patient.age} y.o.</p>
              </div>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">No claims due on this date.</p>
        )}
      </Card.Content>
      <Card.Footer className="justify-end gap-1">
        <Button
          isIconOnly
          aria-label="Previous claim"
          className="size-8 rounded-full [&>svg]:m-0"
          isDisabled={!appointments.length || index === 0}
          variant="ghost"
          onPress={() => setIndex((value) => Math.max(0, value - 1))}
        >
          <ChevronUp className="size-4" />
        </Button>
        <Button
          isIconOnly
          aria-label="Next claim"
          className="size-8 rounded-full [&>svg]:m-0"
          isDisabled={!appointments.length || index === appointments.length - 1}
          variant="ghost"
          onPress={() =>
            setIndex((value) => Math.min(appointments.length - 1, value + 1))
          }
        >
          <ChevronDown className="size-4" />
        </Button>
      </Card.Footer>
    </Card>
  );
}
