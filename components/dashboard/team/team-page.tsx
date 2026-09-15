"use client";

import { InviteMemberDrawer } from "@/components/dashboard/drawers/invite-member-drawer";
import { TeamTable } from "@/components/dashboard/team/team-table";
import { fetchTeam, type TeamPageData } from "@/lib/dashboard/team-data";
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
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Team
          </h1>
          <p className="mt-1 text-sm text-muted">
            Manage staff access and roles across your facilities.
          </p>
        </div>
        <InviteMemberDrawer />
      </div>

      <TeamTable members={data.members} />
    </div>
  );
}
