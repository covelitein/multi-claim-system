"use client";

import { sidebarControlClassName } from "@/components/dashboard/sidebar/sidebar-collapse-button";
import { Xmark } from "@gravity-ui/icons";
import { Button, cn } from "@heroui/react";

export function SidebarDrawerClose({ onPress }: { onPress: () => void }) {
  return (
    <Button
      isIconOnly
      aria-label="Close navigation"
      className={cn(sidebarControlClassName, "md:hidden")}
      variant="ghost"
      onPress={onPress}
    >
      <Xmark className="size-4" />
    </Button>
  );
}
