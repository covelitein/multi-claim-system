"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import { Plus } from "@gravity-ui/icons";
import { Button, Drawer } from "@heroui/react";

export function HeaderNewPatient() {
  return (
    <Drawer>
      <Button className="size-10 min-w-10 rounded-full px-0 sm:h-11 sm:w-auto sm:min-w-0 sm:px-4 [&>svg]:m-0" variant="primary">
        <Plus className="size-4" />
        <span className="hidden sm:inline">New claim</span>
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <Drawer.Heading>New claim</Drawer.Heading>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body className="flex flex-col gap-4">
              <AuthTextField label="Resident name" name="residentName" placeholder="Ada Okoye" />
              <AuthTextField
                label="Payer"
                name="claimPayer"
                placeholder="Medicare"
              />
              <AuthTextField
                label="Missing document"
                name="claimGap"
                placeholder="Signed 485"
              />
            </Drawer.Body>
            <Drawer.Footer>
              <Button slot="close" variant="outline">
                Cancel
              </Button>
              <Button slot="close" variant="primary">
                Create claim
              </Button>
            </Drawer.Footer>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}
