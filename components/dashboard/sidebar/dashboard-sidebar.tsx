"use client";

import { HelixLogo } from "@/components/brand/helix-logo";
import { SidebarCollapseButton } from "@/components/dashboard/sidebar/sidebar-collapse-button";
import { SidebarDrawerClose } from "@/components/dashboard/sidebar/sidebar-drawer-close";
import { SidebarNavItem } from "@/components/dashboard/sidebar/sidebar-nav-item";
import { DASHBOARD_LOGOUT, DASHBOARD_NAV } from "@/lib/dashboard/nav";
import { useSidebarStore } from "@/lib/dashboard/sidebar-store";
import { cn } from "@heroui/react";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function DashboardSidebar() {
  const pathname = usePathname();
  const expanded = useSidebarStore((state) => state.expanded);
  const mobileOpen = useSidebarStore((state) => state.mobileOpen);
  const toggle = useSidebarStore((state) => state.toggle);
  const closeMobile = useSidebarStore((state) => state.closeMobile);
  const showLabels = expanded || mobileOpen;

  useEffect(() => {
    closeMobile();
  }, [closeMobile, pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileOpen]);

  return (
    <>
      <button
        aria-hidden={!mobileOpen}
        aria-label="Close navigation"
        className={cn(
          "fixed inset-0 z-30 bg-backdrop md:hidden",
          "transition-opacity duration-300 ease-out",
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        tabIndex={mobileOpen ? 0 : -1}
        type="button"
        onClick={closeMobile}
      />

      <aside
        className={cn(
          "flex h-full shrink-0 justify-center py-6",
          expanded ? "md:w-64" : "md:w-24",
          "md:transition-[width] md:duration-300 md:ease-out",
          "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-40 max-md:w-56 max-md:bg-background max-md:px-4 max-md:shadow-lg",
          "max-md:transition-transform max-md:duration-300 max-md:ease-out",
          mobileOpen ? "max-md:translate-x-0" : "max-md:-translate-x-full",
        )}
      >
        <div
          className={cn(
            "flex h-full flex-col items-center",
            showLabels ? "w-52 max-md:w-full" : "w-12",
          )}
        >
          <div
            className={cn(
              "mb-8 flex w-full items-center",
              showLabels ? "justify-between" : "flex-col gap-4",
            )}
          >
            <HelixLogo
              className={
                showLabels
                  ? "h-14 w-auto max-w-36 object-contain object-left max-md:h-10 max-md:max-w-28"
                  : "size-12 object-contain"
              }
              priority
              src={showLabels ? "/brand/logo-colored-lg.png" : undefined}
              variant={showLabels ? "lockup" : "mark"}
            />
            <SidebarCollapseButton expanded={expanded} onPress={toggle} />
            <SidebarDrawerClose onPress={closeMobile} />
          </div>

          <nav className="flex w-full flex-1 flex-col items-center gap-1">
            {DASHBOARD_NAV.map((item) => (
              <SidebarNavItem
                key={item.href}
                active={isActivePath(pathname, item.href)}
                collapsed={!showLabels}
                href={item.href}
                icon={item.icon}
                label={item.label}
              />
            ))}
          </nav>

          <div className="w-full">
            <SidebarNavItem
              collapsed={!showLabels}
              href={DASHBOARD_LOGOUT.href}
              icon={DASHBOARD_LOGOUT.icon}
              label={DASHBOARD_LOGOUT.label}
            />
          </div>
        </div>
      </aside>
    </>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/home") return pathname === href;
  return pathname === href || pathname.startsWith(`${href}/`);
}
