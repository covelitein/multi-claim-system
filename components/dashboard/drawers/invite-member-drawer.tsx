"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { CURRENT_FACILITY, type TeamMember } from "@/lib/dashboard/team-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Pencil, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useState, type ReactNode } from "react";

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
  const inviteMember = useWorkspace((s) => s.inviteMember);
  const showToast = useWorkspace((s) => s.showToast);
  const [name, setName] = useState(
    member ? `${member.firstName} ${member.lastName}` : "",
  );
  const [email, setEmail] = useState(member?.email ?? "");
  const [role, setRole] = useState(member?.role ?? "Billing Manager");

  return (
    <DashboardDrawer
      description={
        isEdit
          ? `Update this colleague's role at ${CURRENT_FACILITY}.`
          : `Invite a billing colleague to ${CURRENT_FACILITY}. They will not see other facilities.`
      }
      footer={
        <>
          <DrawerCancelButton />
          <Button
            slot="close"
            variant="primary"
            onPress={() => {
              if (!email.includes("@")) {
                showToast("Enter a valid email address");
                return;
              }
              if (!isEdit) {
                inviteMember({ name: name.trim() || email, email, role });
              }
              showToast(
                isEdit ? "Member updated for this demo" : "Invitation prepared",
              );
            }}
          >
            {isEdit ? "Save changes" : "Prepare invite"}
          </Button>
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
        label="Full name"
        name="memberName"
        placeholder="Jordan Lee"
        value={name}
        onChange={setName}
      />
      <AuthTextField
        label="Email"
        name="memberEmail"
        placeholder="jordan@facility.com"
        type="email"
        value={email}
        onChange={setEmail}
      />
      <label className="flex flex-col gap-1.5 text-sm font-bold">
        Role
        <select
          className="h-11 rounded-xl border border-border bg-surface px-3 font-semibold"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option>Billing Manager</option>
          <option>Claims Specialist</option>
          <option>Read-only</option>
        </select>
      </label>
      <p className="rounded-xl border border-border bg-surface-secondary px-3 py-3 text-sm font-semibold text-muted">
        Facility: {CURRENT_FACILITY}. Invitation email is not sent. This confirms
        the invite in the workspace only.
      </p>
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
