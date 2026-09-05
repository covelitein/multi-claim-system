import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { ReactNode } from "react";

export default function HospitalsDashboardLayout({ children }: { children: ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
