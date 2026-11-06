"use client";

import { Button, Drawer, cn } from "@heroui/react";
import { isValidElement, type ReactNode } from "react";
import { Pressable } from "react-aria-components";

type DashboardDrawerProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  /** Applied to the drawer panel (Dialog), not the full-screen content wrapper. */
  sizeClassName?: string;
  onOpenChange?: (open: boolean) => void;
};

/** A plain button does not register with the drawer. Pressable does. */
function asDrawerTrigger(trigger: ReactNode) {
  if (
    isValidElement(trigger) &&
    (trigger.type === "button" || trigger.type === "a")
  ) {
    return <Pressable>{trigger}</Pressable>;
  }
  return trigger;
}

export function DashboardDrawer({
  trigger,
  title,
  description,
  children,
  footer,
  sizeClassName = "sm:max-w-md",
  onOpenChange,
}: DashboardDrawerProps) {
  return (
    <Drawer onOpenChange={onOpenChange}>
      {asDrawerTrigger(trigger)}
      <Drawer.Backdrop>
        <Drawer.Content placement="right">
          <Drawer.Dialog className={cn("w-full max-w-[85vw]", sizeClassName)}>
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
