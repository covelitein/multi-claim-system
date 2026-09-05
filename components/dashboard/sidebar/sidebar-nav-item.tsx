"use client";

import { cn, Tooltip } from "@heroui/react";
import Link from "next/link";
import type { ComponentType, SVGProps } from "react";

type SidebarNavItemProps = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  active?: boolean;
  collapsed?: boolean;
};

export function SidebarNavItem({
  href,
  label,
  icon: Icon,
  active = false,
  collapsed = false,
}: SidebarNavItemProps) {
  const item = (
    <Link
      aria-current={active ? "page" : undefined}
      aria-label={collapsed ? label : undefined}
      className={cn(
        "flex w-full items-center rounded-2xl text-[15px] font-medium transition-colors",
        collapsed ? "size-11 justify-center" : "h-10 justify-start gap-3 px-3",
        active
          ? "bg-accent text-accent-foreground"
          : "text-muted hover:bg-surface-secondary hover:text-foreground",
      )}
      href={href}
    >
      <Icon className="size-5 shrink-0" />
      {collapsed ? null : <span className="truncate">{label}</span>}
    </Link>
  );

  if (!collapsed) return item;

  return (
    <Tooltip delay={150}>
      <Tooltip.Trigger className="flex w-full justify-center">
        {item}
      </Tooltip.Trigger>
      <Tooltip.Content placement="right">{label}</Tooltip.Content>
    </Tooltip>
  );
}
