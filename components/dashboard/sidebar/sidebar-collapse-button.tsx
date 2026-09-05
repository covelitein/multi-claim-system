"use client";

import { ChevronsLeft, ChevronsRight } from "@gravity-ui/icons";
import { Button, cn } from "@heroui/react";

export const sidebarControlClassName = cn(
  "size-9 shrink-0 rounded-full border border-border bg-surface text-muted shadow-sm [&>svg]:m-0",
  "hover:border-accent hover:bg-accent hover:text-accent-foreground",
);

export function SidebarCollapseButton({
  expanded,
  onPress,
}: {
  expanded: boolean;
  onPress: () => void;
}) {
  return (
    <Button
      isIconOnly
      aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
      className={cn(sidebarControlClassName, "hidden md:inline-flex")}
      variant="ghost"
      onPress={onPress}
    >
      {expanded ? (
        <ChevronsLeft className="size-4" />
      ) : (
        <ChevronsRight className="size-4" />
      )}
    </Button>
  );
}
