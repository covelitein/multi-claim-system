"use client";

import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import type { FacilityPlan } from "@/lib/dashboard/home-data";
import { StarFill } from "@gravity-ui/icons";
import { Card } from "@heroui/react";
import Link from "next/link";

export function FacilityPlanCard({ plan }: { plan: FacilityPlan }) {
  return (
    <Card className={`${dashboardCardClass} flex h-full flex-col`}>
      <Card.Header>
        <Card.Title className="text-base font-semibold">Facility Plan</Card.Title>
      </Card.Header>
      <Card.Content className="flex flex-1 flex-col items-start gap-4">
        <span className="flex size-14 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-md">
          <StarFill className="size-6" />
        </span>
        <div>
          <p className="text-lg font-semibold">{plan.plan}</p>
          <p className="mt-1 text-sm text-muted">{plan.name}</p>
        </div>
        <dl className="w-full space-y-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Next billing</dt>
            <dd className="font-medium">{plan.nextBillingDate}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Claims included</dt>
            <dd className="font-medium">{plan.claimsIncluded}</dd>
          </div>
        </dl>
        <Link
          className="mt-auto inline-flex h-10 w-full items-center justify-center rounded-xl border border-border text-sm font-medium hover:bg-surface-secondary"
          href={plan.manageHref}
        >
          Manage Plan
        </Link>
      </Card.Content>
    </Card>
  );
}
