"use client";

import { DashboardHeader } from "@/components/protected_dashboard/header";
import { DashboardSidebar } from "@/components/protected_dashboard/sidebar";
import { ScrollShadow } from "@heroui/react";
import type { ReactNode } from "react";

export function DashboardShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background py-4 pr-4 max-lg:pl-4">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-3xl bg-surface-secondary shadow-lg">
        <DashboardHeader />
        <main className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <ScrollShadow
            className="min-h-0 min-w-0 flex-1 overflow-x-hidden px-5 pt-5 pb-6 lg:px-8"
            isEnabled={false}
            orientation="vertical"
          >
            {children}
          </ScrollShadow>
        </main>
      </div>
    </div>
  );
}
