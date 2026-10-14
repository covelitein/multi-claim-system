"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { FacilityPlan } from "@/lib/dashboard/home-data";
import { SIGNAL } from "@/lib/dashboard/signal-colors";
import { StarFill } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Link from "next/link";

export function FacilityPlanCard({ plan }: { plan: FacilityPlan }) {
  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header>
        <Card.Title className="type-card-title">Facility Plan</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col gap-4">
        <div className="flex items-center gap-3">
          <span
            className={`flex size-10 shrink-0 items-center justify-center rounded-full ${SIGNAL.purple.icon}`}
          >
            <StarFill className="size-6" />
          </span>
          <div className="min-w-0">
            <p className="type-card-title">{plan.plan}</p>
            <p className="truncate type-meta text-muted">
              {plan.name}
            </p>
          </div>
        </div>
        <dl className="w-full space-y-2 type-body">
          <div className="flex justify-between gap-3">
            <dt className="font-medium text-muted">Next billing</dt>
            <dd className="font-bold">{plan.nextBillingDate}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="font-medium text-muted">Claims included</dt>
            <dd className="font-bold">{plan.claimsIncluded}</dd>
          </div>
        </dl>
        <Link
          className="mt-auto inline-flex h-11 w-full items-center justify-center rounded-xl border border-border bg-surface type-body font-bold hover:bg-surface-secondary"
          href={plan.manageHref}
        >
          Manage Plan
        </Link>
      </Card.Content>
    </Card>
  );
}
