export type SlideTone = "accent" | "success" | "danger" | "warning";

export type SlideIcon = "clock" | "pulse" | "persons" | "heart" | "pill" | "layers";

export type SidebarSlide = {
  id: string;
  title: string;
  actionLabel: string;
  badge: string;
  center: string;
  copy: string;
  segments: {
    label: string;
    value: number;
    color: SlideTone;
  }[];
  metrics: {
    label: string;
    value: string;
    delta?: string;
    icon: SlideIcon;
    tone: SlideTone;
  }[];
};

export const AUTH_SIDEBAR_SLIDES: SidebarSlide[] = [
  {
    id: "packets",
    title: "Packet check",
    actionLabel: "View live",
    badge: "12 facilities reporting",
    center: "86",
    copy: "See which claim packets are complete before staff submit. Gaps stay flagged until the file is ready.",
    segments: [
      { label: "Ready", value: 28, color: "accent" },
      { label: "Review", value: 46, color: "success" },
      { label: "Gaps", value: 12, color: "danger" },
    ],
    metrics: [
      {
        label: "Open claims",
        value: "1,248",
        icon: "clock",
        tone: "accent",
      },
      {
        label: "Missing docs",
        value: "214",
        delta: "+6% today",
        icon: "pulse",
        tone: "danger",
      },
    ],
  },
  {
    id: "status",
    title: "Claim status",
    actionLabel: "View live",
    badge: "Fewer returns",
    center: "142",
    copy: "Track each claim from intake to paid. Every facility keeps its own filing queue.",
    segments: [
      { label: "Draft", value: 64, color: "accent" },
      { label: "Paid", value: 51, color: "success" },
      { label: "Denied", value: 27, color: "danger" },
    ],
    metrics: [
      {
        label: "Submitted",
        value: "118",
        icon: "persons",
        tone: "accent",
      },
      {
        label: "Avg cycle",
        value: "12d",
        delta: "−8% today",
        icon: "heart",
        tone: "success",
      },
    ],
  },
  {
    id: "network",
    title: "Facilities",
    actionLabel: "View live",
    badge: "Roles stay local",
    center: "24",
    copy: "Run ALF, SNF, and agency workspaces from one login. Access follows the facility, not the other way around.",
    segments: [
      { label: "ALF", value: 8, color: "accent" },
      { label: "SNF", value: 11, color: "success" },
      { label: "Agency", value: 5, color: "danger" },
    ],
    metrics: [
      {
        label: "Team online",
        value: "86",
        icon: "layers",
        tone: "accent",
      },
      {
        label: "Live alerts",
        value: "4",
        delta: "2 resolved",
        icon: "pill",
        tone: "danger",
      },
    ],
  },
];
