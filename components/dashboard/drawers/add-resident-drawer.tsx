"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import type { Resident } from "@/lib/dashboard/residents-data";
import { useWorkspace } from "@/lib/dashboard/workspace-store";
import { Pencil, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useState, type ReactNode } from "react";

type AddResidentDrawerProps = {
  trigger?: ReactNode;
  resident?: Resident;
};

export function AddResidentDrawer({
  trigger,
  resident,
}: AddResidentDrawerProps) {
  const isEdit = Boolean(resident);
  const addResident = useWorkspace((s) => s.addResident);
  const showToast = useWorkspace((s) => s.showToast);
  const [firstName, setFirstName] = useState(resident?.firstName ?? "");
  const [lastName, setLastName] = useState(resident?.lastName ?? "");
  const [dob, setDob] = useState(resident?.dob ?? "");
  const [facility, setFacility] = useState(
    resident?.facility ?? "Sunrise Assisted Living",
  );
  const [payer, setPayer] = useState(resident?.payer ?? "Genworth");
  const [phone, setPhone] = useState(resident?.phone ?? "");
  const [policyId, setPolicyId] = useState(resident?.policyId ?? "");
  const [room, setRoom] = useState(resident?.room ?? "");

  return (
    <DashboardDrawer
      description={
        isEdit
          ? "Update resident profile details."
          : "Add a resident profile. Claim forms are filled during review — not here."
      }
      footer={
        <>
          <DrawerCancelButton />
          <Button
            isDisabled={!firstName.trim() || !lastName.trim() || !facility.trim()}
            slot="close"
            variant="primary"
            onPress={() => {
              if (isEdit) {
                showToast("Resident details saved for this demo");
                return;
              }
              const id = `r-${Date.now()}`;
              addResident({
                id,
                residentId: `RES-${String(Date.now()).slice(-4)}`,
                policyId: policyId.trim() || "POL-PENDING",
                room: room.trim() || "—",
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                dob: dob.trim() || "1940-01-01",
                age: 80,
                phone: phone.trim(),
                payer: payer.trim() || "Genworth",
                facility: facility.trim(),
                status: "active",
                admitDate: new Date().toISOString().slice(0, 10),
                activeClaims: 0,
                pendingRequests: 0,
                lastClaim: null,
                image: "",
                initials: `${firstName.trim()[0] ?? ""}${lastName.trim()[0] ?? ""}`.toUpperCase(),
              });
              showToast("Resident added");
            }}
          >
            {isEdit ? "Save changes" : "Add resident"}
          </Button>
        </>
      }
      title={isEdit ? "Edit resident" : "Add resident"}
      trigger={
        trigger ?? (
          <Button className="w-fit" size="sm" variant="primary">
            <Plus className="size-4" />
            Add Resident
          </Button>
        )
      }
    >
      <AuthTextField label="First name" name="firstName" placeholder="Ada" value={firstName} onChange={setFirstName} />
      <AuthTextField label="Last name" name="lastName" placeholder="Okoye" value={lastName} onChange={setLastName} />
      <AuthTextField label="Date of birth" name="dob" placeholder="MM/DD/YYYY" value={dob} onChange={setDob} />
      <AuthTextField label="Facility" name="facility" placeholder="Sunrise Assisted Living" value={facility} onChange={setFacility} />
      <AuthTextField label="Room" name="room" placeholder="214-B" value={room} onChange={setRoom} />
      <AuthTextField label="Policy ID" name="policyId" placeholder="POL-GNW-2048" value={policyId} onChange={setPolicyId} />
      <AuthTextField label="Primary payer" name="payer" placeholder="Genworth / Illumifin" value={payer} onChange={setPayer} />
      <AuthTextField label="Phone" name="phone" placeholder="(512) 555-0100" type="tel" value={phone} onChange={setPhone} />
    </DashboardDrawer>
  );
}

export function EditResidentDrawer({ resident }: { resident: Resident }) {
  return (
    <AddResidentDrawer
      resident={resident}
      trigger={
        <button
          aria-label="Edit resident"
          className="rounded-lg p-2 text-muted transition-colors hover:bg-surface-secondary hover:text-foreground"
          type="button"
        >
          <Pencil className="size-4" />
        </button>
      }
    />
  );
}
