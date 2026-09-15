"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import {
  DashboardDrawer,
  DrawerCancelButton,
  DrawerPrimaryCloseButton,
} from "@/components/dashboard/drawers/dashboard-drawer";
import { Plus } from "@gravity-ui/icons";
import { Button } from "@heroui/react";

export function AddFacilityDrawer() {
  return (
    <DashboardDrawer
      description="Register a location so residents and claims can be linked to it."
      footer={
        <>
          <DrawerCancelButton />
          <DrawerPrimaryCloseButton label="Add facility" />
        </>
      }
      sizeClassName="sm:max-w-lg"
      title="Add facility"
      trigger={
        <Button className="w-fit" size="sm" variant="primary">
          <Plus className="size-4" />
          Add Facility
        </Button>
      }
    >
      <AuthTextField
        label="Facility name"
        name="facilityName"
        placeholder="Sunrise Assisted Living"
      />
      <AuthTextField
        label="Type"
        name="facilityType"
        placeholder="ALF, SNF, or Agency"
      />
      <AuthTextField
        label="Street address"
        name="facilityAddress"
        placeholder="1200 Wellness Blvd"
      />
      <div className="grid grid-cols-2 gap-3">
        <AuthTextField label="City" name="facilityCity" placeholder="Austin" />
        <AuthTextField label="State" name="facilityState" placeholder="TX" />
      </div>
      <AuthTextField label="ZIP" name="facilityZip" placeholder="78701" />
      <AuthTextField
        label="Phone"
        name="facilityPhone"
        placeholder="(512) 555-0100"
        type="tel"
      />
      <AuthTextField
        label="Primary contact"
        name="facilityContact"
        placeholder="Janet Morrison"
      />
      <AuthTextField
        label="Contact email"
        name="facilityEmail"
        placeholder="contact@facility.com"
        type="email"
      />
    </DashboardDrawer>
  );
}
