"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
  DrawerPrimaryCloseButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import type { TeamMember } from "@/lib/dashboard/team-data";
import { Pencil, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import type { ReactNode } from "react";

type InviteMemberDrawerProps = {
  trigger?: ReactNode;
  member?: TeamMember;
};

/** Gen-1: dummy invite UI (no API). */
export function InviteMemberDrawer({
  trigger,
  member,
}: InviteMemberDrawerProps) {
  const isEdit = Boolean(member);

  return (
    <DashboardDrawer
      description={
        isEdit
          ? "Update role and facility access for this team member."
          : "Send an invite with a role. Access is limited to your facilities."
      }
      footer={
        <>
          <DrawerCancelButton />
          <DrawerPrimaryCloseButton
            label={isEdit ? "Save changes" : "Send invite"}
          />
        </>
      }
      title={isEdit ? "Edit team member" : "Invite team member"}
      trigger={
        trigger ?? (
          <Button className="w-fit font-bold" size="sm" variant="primary">
            <Plus className="size-4" />
            Invite Member
          </Button>
        )
      }
    >
      <AuthTextField
        defaultValue={
          member ? `${member.firstName} ${member.lastName}` : undefined
        }
        label="Full name"
        name="memberName"
        placeholder="Jordan Lee"
      />
      <AuthTextField
        defaultValue={member?.email}
        label="Email"
        name="memberEmail"
        placeholder="jordan@facility.com"
        type="email"
      />
      <AuthTextField
        defaultValue={member?.role}
        label="Role"
        name="memberRole"
        placeholder="Billing coordinator"
      />
      <AuthTextField
        defaultValue={member?.facility}
        label="Facility access"
        name="memberFacility"
        placeholder="All facilities"
      />
    </DashboardDrawer>
  );
}

export function EditMemberDrawer({ member }: { member: TeamMember }) {
  return (
    <InviteMemberDrawer
      member={member}
      trigger={
        <button
          aria-label="Edit member"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
          type="button"
        >
          <Pencil className="size-4" />
        </button>
      }
    />
  );
}
