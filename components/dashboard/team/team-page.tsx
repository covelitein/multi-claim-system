"use client";

import { InviteMemberDrawer } from "@/components/dashboard/drawers/invite-member-drawer";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { TeamTable } from "@/components/dashboard/team/team-table";
import { fetchTeam, type TeamPageData } from "@/lib/dashboard/team-data";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";

export function TeamPage() {
  const [data, setData] = useState<TeamPageData | null>(null);

  useEffect(() => {
    fetchTeam().then(setData);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-accent border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-w-0 flex-col gap-6 pb-4 sm:gap-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Team
          </h1>
          <p className="mt-1 max-w-2xl text-base font-semibold text-muted">
            Billing colleagues at {data.facility}. Invite and manage people who
            work at this facility.
          </p>
        </div>
        <InviteMemberDrawer />
      </div>

      {data.relevant ? (
        <TeamTable facility={data.facility} members={data.members} />
      ) : (
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="text-lg font-bold">
              You are the only person at {data.facility}
            </Card.Title>
            <Card.Description className="text-base font-medium text-muted">
              Team appears in the menu when another billing colleague joins this
              facility. Invites stay limited to {data.facility}.
            </Card.Description>
          </Card.Header>
        </Card>
      )}
    </div>
  );
}
