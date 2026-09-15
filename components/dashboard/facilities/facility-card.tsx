"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { Facility } from "@/lib/dashboard/facilities-data";
import {
  Briefcase,
  Envelope,
  MapPin,
  Persons,
  Smartphone,
} from "@gravity-ui/icons";
import { Card, Chip } from "@heroui/react";

const TYPE_COLOR: Record<string, "accent" | "success" | "warning" | "default"> =
  {
    ALF: "accent",
    SNF: "success",
    Agency: "warning",
    Other: "default",
  };

export function FacilityCard({ facility }: { facility: Facility }) {
  return (
    <Card
      className={`${dashboardCardClass} h-full transition-shadow hover:shadow-md`}
    >
      <Card.Header className="flex-row items-start justify-between gap-3">
        <div className="min-w-0">
          <Card.Title className="text-base font-semibold leading-snug">
            {facility.name}
          </Card.Title>
          <p className="mt-1 text-sm text-muted">{facility.contactName}</p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <Chip
            color={TYPE_COLOR[facility.type] ?? "default"}
            size="sm"
            variant="soft"
          >
            <Chip.Label>{facility.type}</Chip.Label>
          </Chip>
          <Chip
            color={facility.status === "active" ? "success" : "default"}
            size="sm"
            variant="soft"
          >
            <Chip.Label>
              {facility.status === "active" ? "Active" : "Inactive"}
            </Chip.Label>
          </Chip>
        </div>
      </Card.Header>

      <Card.Content className="gap-3">
        <div className="flex items-start gap-2.5 text-sm text-muted">
          <MapPin className="mt-0.5 size-4 shrink-0" />
          <span>
            {facility.address}, {facility.city}, {facility.state} {facility.zip}
          </span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted">
          <Smartphone className="size-4 shrink-0" />
          <span>{facility.phone}</span>
        </div>
        <div className="flex items-center gap-2.5 text-sm text-muted">
          <Envelope className="size-4 shrink-0" />
          <span className="truncate">{facility.contactEmail}</span>
        </div>

        <div className="mt-1 grid grid-cols-2 gap-3 rounded-2xl bg-surface-secondary/80 p-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-accent-soft text-accent">
              <Persons className="size-4" />
            </span>
            <div>
              <p className="text-lg font-semibold leading-none">
                {facility.activeResidents}
              </p>
              <p className="mt-1 text-xs text-muted">Residents</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-warning-soft text-warning">
              <Briefcase className="size-4" />
            </span>
            <div>
              <p className="text-lg font-semibold leading-none">
                {facility.openClaims}
              </p>
              <p className="mt-1 text-xs text-muted">Open claims</p>
            </div>
          </div>
        </div>
      </Card.Content>
    </Card>
  );
}
