"use client";

import { InviteMemberDrawer } from "@/components/dashboard/drawers/invite-member-drawer";
import { dashboardCardClass } from "@/components/dashboard/home/dashboard-card";
import { TeamTable } from "@/components/dashboard/team/team-table";
import { fetchTeam, type TeamPageData } from "@/lib/dashboard/team-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Card } from "@heroui/react";
import { useEffect, useState } from "react";

export function TeamPage() {
  const [data, setData] = useState<TeamPageData | null>(null);
  const invites = useWorkspace((s) => s.invites);

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
          <h1 className="type-page">
            Team
          </h1>
          <p className="mt-1 max-w-2xl type-meta text-muted">
            Billing colleagues at {data.facility}. Invite and manage people who
            work at this facility.
          </p>
        </div>
        <InviteMemberDrawer />
      </div>

      {invites.length > 0 ? (
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="type-card-title">Prepared invites</Card.Title>
            <Card.Description className="type-meta text-muted">
              Email is not sent. These invites exist for this session only.
            </Card.Description>
          </Card.Header>
          <Card.Content className="gap-2">
            {invites.map((invite) => (
              <div key={invite.id} className="rounded-xl border border-border px-3 py-3">
                <p className="type-body">{invite.name}</p>
                <p className="type-meta text-muted">
                  {invite.email} · {invite.role}
                </p>
              </div>
            ))}
          </Card.Content>
        </Card>
      ) : null}

      {data.relevant ? (
        <TeamTable facility={data.facility} members={data.members} />
      ) : (
        <Card className={dashboardCardClass}>
          <Card.Header>
            <Card.Title className="type-card-title">
              You are the only person at {data.facility}
            </Card.Title>
            <Card.Description className="type-meta text-muted">
              Team appears in the menu when another billing colleague joins this
              facility. Invites stay limited to {data.facility}.
            </Card.Description>
          </Card.Header>
        </Card>
      )}
    </div>
  );
}
