"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
  DrawerPrimaryCloseButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import type { Resident } from "@/lib/dashboard/residents-data";
import { Pencil, Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import type { ReactNode } from "react";

type AddResidentDrawerProps = {
  trigger?: ReactNode;
  resident?: Resident;
};

export function AddResidentDrawer({
  trigger,
  resident,
}: AddResidentDrawerProps) {
  const isEdit = Boolean(resident);

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
          <DrawerPrimaryCloseButton
            label={isEdit ? "Save changes" : "Add resident"}
          />
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
      <AuthTextField
        defaultValue={resident?.firstName}
        label="First name"
        name="firstName"
        placeholder="Ada"
      />
      <AuthTextField
        defaultValue={resident?.lastName}
        label="Last name"
        name="lastName"
        placeholder="Okoye"
      />
      <AuthTextField
        defaultValue={resident?.dob}
        label="Date of birth"
        name="dob"
        placeholder="MM/DD/YYYY"
      />
      <AuthTextField
        defaultValue={resident?.facility}
        label="Facility"
        name="facility"
        placeholder="Sunrise Assisted Living"
      />
      <AuthTextField
        defaultValue={resident?.payer}
        label="Primary payer"
        name="payer"
        placeholder="Genworth / Illumifin"
      />
      <AuthTextField
        defaultValue={resident?.phone}
        label="Phone"
        name="phone"
        placeholder="(512) 555-0100"
        type="tel"
      />
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
