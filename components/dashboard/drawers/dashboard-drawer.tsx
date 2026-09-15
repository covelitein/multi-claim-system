"use client";

import { Button, Drawer } from "@heroui/react";
import type { ReactNode } from "react";

type DashboardDrawerProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  sizeClassName?: string;
};

export function DashboardDrawer({
  trigger,
  title,
  description,
  children,
  footer,
  sizeClassName = "sm:max-w-md",
}: DashboardDrawerProps) {
  return (
    <Drawer>
      {trigger}
      <Drawer.Backdrop>
        <Drawer.Content className={sizeClassName} placement="right">
          <Drawer.Dialog>
            <Drawer.Header>
              <div className="min-w-0 pe-8">
                <Drawer.Heading>{title}</Drawer.Heading>
                {description ? (
                  <p className="mt-1 text-sm text-muted">{description}</p>
                ) : null}
              </div>
              <Drawer.CloseTrigger />
            </Drawer.Header>
            <Drawer.Body className="flex flex-col gap-4">{children}</Drawer.Body>
            {footer ? <Drawer.Footer>{footer}</Drawer.Footer> : null}
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}

export function DrawerCancelButton({ label = "Cancel" }: { label?: string }) {
  return (
    <Button slot="close" variant="outline">
      {label}
    </Button>
  );
}

export function DrawerPrimaryCloseButton({
  label,
}: {
  label: string;
}) {
  return (
    <Button slot="close" variant="primary">
      {label}
    </Button>
  );
}
