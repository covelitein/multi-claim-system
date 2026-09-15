import {
  ArrowRightFromSquare,
  Briefcase,
  Circles4Square,
  Clock,
  FileText,
  Gear,
  MapPin,
  Persons,
  Receipt,
  SquareChartColumn,
} from "@gravity-ui/icons";
import type { ComponentType, SVGProps } from "react";

export type DashboardNavItem = {
  href: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
};

export const HOSPITAL_DASHBOARD_NAV: DashboardNavItem[] = [
  { href: "/home", label: "Dashboard", icon: Circles4Square },
  { href: "/analytics", label: "Analytics", icon: SquareChartColumn },
  { href: "/patients", label: "Residents", icon: FileText },
  { href: "/appointments", label: "Deadlines", icon: Clock },
  { href: "/billing", label: "Claims", icon: Briefcase },
  { href: "/invoices", label: "Invoices", icon: Receipt },
  { href: "/locations", label: "Facilities", icon: MapPin },
  { href: "/staff", label: "Team", icon: Persons },
  { href: "/settings", label: "Settings", icon: Gear },
];

export const DASHBOARD_NAV = HOSPITAL_DASHBOARD_NAV;

export const DASHBOARD_LOGOUT = {
  href: "/login",
  label: "Logout",
  icon: ArrowRightFromSquare,
} as const;
