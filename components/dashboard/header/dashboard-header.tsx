"use client";

import { IconButton } from "@/components/dashboard/icon-button";
import { HeaderAnchorProvider } from "@/components/dashboard/header/header-menu-popover";
import { HeaderExport } from "@/components/dashboard/header/header-export";
import { HeaderNewPatient } from "@/components/dashboard/header/header-new-patient";
import { HeaderNotifications } from "@/components/dashboard/header/header-notifications";
import { HeaderSearch } from "@/components/dashboard/header/header-search";
import { HeaderUser } from "@/components/dashboard/header/header-user";
import { useSidebarStore } from "@/lib/dashboard/sidebar-store";
import { Bars } from "@gravity-ui/icons";
import { useRef } from "react";

export function DashboardHeader() {
  const openMobile = useSidebarStore((state) => state.openMobile);
  const headerRef = useRef<HTMLElement>(null);

  return (
    <HeaderAnchorProvider value={headerRef}>
      <header
        ref={headerRef}
        className="flex items-center gap-2 px-5 pt-3 pb-2 sm:gap-3 lg:px-8"
      >
        <IconButton className="md:hidden" label="Open navigation" onPress={openMobile}>
          <Bars className="size-5" />
        </IconButton>

        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <HeaderNotifications />
          <HeaderUser />
        </div>

        <div className="hidden min-w-0 flex-1 justify-center md:flex">
          <HeaderSearch variant="field" />
        </div>

        <div className="ms-auto flex items-center gap-2 sm:gap-3 md:ms-0">
          <div className="md:hidden">
            <HeaderSearch variant="dialog" />
          </div>
          <div className="hidden md:block">
            <HeaderExport />
          </div>
          <HeaderNewPatient />
        </div>
      </header>
    </HeaderAnchorProvider>
  );
}
