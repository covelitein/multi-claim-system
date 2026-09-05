"use client";

import { Button, cn } from "@heroui/react";
import type { ReactNode } from "react";

type IconButtonProps = {
  label: string;
  children: ReactNode;
  className?: string;
  onPress?: () => void;
};

export function IconButton({ label, children, className, onPress }: IconButtonProps) {
  return (
    <Button
      isIconOnly
      aria-label={label}
      className={cn("size-10 shrink-0 rounded-full [&>svg]:m-0", className)}
      variant="ghost"
      onPress={onPress}
    >
      {children}
    </Button>
  );
}
