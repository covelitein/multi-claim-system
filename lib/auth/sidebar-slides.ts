export type SlideTone = "accent" | "success" | "danger" | "warning";

export type SlideIcon =
  | "clock"
  | "pulse"
  | "persons"
  | "heart"
  | "pill"
  | "layers"
  | "upload"
  | "receipt"
  | "shield";

export type SidebarSlide = {
  id: string;
  title: string;
  actionLabel: string;
  badge: string;
  /** Short label shown in the visual center — feature name, not live data. */
  center: string;
  copy: string;
  highlights: {
    label: string;
    color: SlideTone;
  }[];
  points: {
    label: string;
    detail: string;
    icon: SlideIcon;
    tone: SlideTone;
  }[];
};

/** Marketing feature slides for auth — not live operational data. */
export const AUTH_SIDEBAR_SLIDES: SidebarSlide[] = [
  {
    id: "claims",
    title: "Long-term care claims",
    actionLabel: "Next",
    badge: "Product feature",
    center: "Claims",
    copy: "Helix is built for LTC claim packets — upload documents for review, track status, and keep Policy ID and insurer details organized. Nothing on this screen is live facility data.",
    highlights: [
      { label: "Upload packets", color: "accent" },
      { label: "Status tracking", color: "success" },
      { label: "LTC insurers", color: "warning" },
    ],
    points: [
      {
        label: "New or existing resident",
        detail: "Clear actions for each claim path",
        icon: "upload",
        tone: "accent",
      },
      {
        label: "Helix review workflow",
        detail: "Staff complete forms after upload",
        icon: "shield",
        tone: "success",
      },
    ],
  },
  {
    id: "billing",
    title: "Invoices & residents",
    actionLabel: "Next",
    badge: "Product feature",
    center: "Billing",
    copy: "Create or upload facility invoices, look up residents, and keep monthly submission history easy to find — designed for billing managers, not a live account preview.",
    highlights: [
      { label: "Invoice builder", color: "accent" },
      { label: "Resident profiles", color: "success" },
      { label: "Monthly history", color: "warning" },
    ],
    points: [
      {
        label: "Guided invoice create",
        detail: "Line items, periods, and totals",
        icon: "receipt",
        tone: "accent",
      },
      {
        label: "Resident workspace",
        detail: "Profiles with claim history at a glance",
        icon: "persons",
        tone: "success",
      },
    ],
  },
  {
    id: "team",
    title: "Team, contacts & insights",
    actionLabel: "Next",
    badge: "Product feature",
    center: "Workspace",
    copy: "Invite facility teammates, keep a searchable client contact list, and review analytics for your submissions. These cards only describe Helix features.",
    highlights: [
      { label: "Team invites", color: "accent" },
      { label: "Contacts", color: "success" },
      { label: "Analytics", color: "warning" },
    ],
    points: [
      {
        label: "Facility-scoped access",
        detail: "Invite and manage billing colleagues",
        icon: "layers",
        tone: "accent",
      },
      {
        label: "Submission analytics",
        detail: "Trends and status overview for your site",
        icon: "pulse",
        tone: "warning",
      },
    ],
  },
];
