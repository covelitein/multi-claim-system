"use client";

import { HeaderExportItems } from "@/components/dashboard/header/header-export";
import { HeaderMenuPopover } from "@/components/dashboard/header/header-menu-popover";
import { useIsDesktop } from "@/lib/dashboard/use-media-query";
import { ArrowRightFromSquare, Gear, Person } from "@gravity-ui/icons";
import { Avatar, Dropdown } from "@heroui/react";
import { useRouter } from "next/navigation";

export function HeaderUser() {
  const router = useRouter();
  const isDesktop = useIsDesktop();

  return (
    <Dropdown>
      <Dropdown.Trigger
        aria-label="Account menu"
        className="inline-flex size-10 items-center justify-center rounded-full bg-surface p-0 sm:h-10 sm:w-auto sm:gap-2 sm:py-1 sm:pe-3 sm:ps-1 [&>svg]:m-0"
      >
        <Avatar className="size-8">
          <Avatar.Fallback>AO</Avatar.Fallback>
        </Avatar>
        <span className="hidden text-sm font-medium sm:inline">A. Okonkwo</span>
      </Dropdown.Trigger>
      <HeaderMenuPopover>
        <div className="px-3.5 pt-3 pb-2">
          <p className="text-sm font-medium">Ada Okonkwo</p>
          <p className="text-xs text-muted">Billing coordinator</p>
        </div>
        <Dropdown.Menu
          onAction={(key) => {
            if (key === "settings") router.push("/settings");
            if (key === "logout") router.push("/login");
          }}
        >
          <Dropdown.Item id="profile" textValue="Profile">
            <Person className="size-4" />
            Profile
          </Dropdown.Item>
          <Dropdown.Item id="settings" textValue="Settings">
            <Gear className="size-4" />
            Settings
          </Dropdown.Item>
          {isDesktop ? null : <HeaderExportItems />}
          <Dropdown.Item id="logout" textValue="Logout">
            <ArrowRightFromSquare className="size-4" />
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </HeaderMenuPopover>
    </Dropdown>
  );
}
