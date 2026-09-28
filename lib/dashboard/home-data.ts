export type ChartTone = "accent" | "warning" | "success" | "danger";

export type HomeKpiIcon =
  | "submitted"
  | "approved"
  | "pending"
  | "rejected";

export type HomeKpiCard = {
  id: string;
  label: string;
  value: string;
  href?: string;
  tone: ChartTone;
  icon: HomeKpiIcon;
};

export type ClaimsOverviewSlice = {
  id: string;
  label: string;
  value: number;
  percent: number;
  color: string;
};

export type RecentSubmission = {
  id: string;
  residentName: string;
  residentId: string;
  submittedAt: string;
  status: "approved" | "pending" | "rejected" | "submitted";
  amount: string;
  image: string;
  initials: string;
};

export type QuickAction = {
  id: string;
  label: string;
  description: string;
  href: string;
  tone: ChartTone;
};

export type HomeReminder = {
  id: string;
  message: string;
  actionLabel: string;
  href: string;
};

export type SubmissionHistoryDay = {
  date: string;
  label: string;
  submitted: number;
  approved: number;
  pending: number;
  rejected: number;
};

export type FacilityPlan = {
  name: string;
  plan: string;
  nextBillingDate: string;
  claimsIncluded: string;
  manageHref: string;
};

export type DashboardHomeData = {
  greetingSubtitle: string;
  lastSubmissionDate: string;
  kpis: HomeKpiCard[];
  overview: ClaimsOverviewSlice[];
  overviewRangeLabel: string;
  recentSubmissions: RecentSubmission[];
  quickActions: QuickAction[];
  reminders: HomeReminder[];
  submissionHistory: SubmissionHistoryDay[];
  facilityPlan: FacilityPlan;
};

export const DASHBOARD_HOME: DashboardHomeData = {
  greetingSubtitle:
    "Long-term care claims overview — recent submissions first.",
  lastSubmissionDate: "08/18/2026",
  kpis: [
    {
      id: "submitted",
      label: "Submitted",
      value: "32",
      href: "/billing",
      tone: "accent",
      icon: "submitted",
    },
    {
      id: "approved",
      label: "Approved",
      value: "24",
      href: "/billing",
      tone: "success",
      icon: "approved",
    },
    {
      id: "pending",
      label: "Pending",
      value: "6",
      href: "/billing",
      tone: "warning",
      icon: "pending",
    },
    {
      id: "rejected",
      label: "Rejected",
      value: "2",
      href: "/billing",
      tone: "danger",
      icon: "rejected",
    },
  ],
  overview: [
    { id: "approved", label: "Approved", value: 24, percent: 65, color: "var(--success)" },
    { id: "pending", label: "Pending", value: 6, percent: 16, color: "var(--warning)" },
    { id: "rejected", label: "Rejected", value: 2, percent: 6, color: "var(--danger)" },
  ],
  overviewRangeLabel: "This Month",
  recentSubmissions: [
    {
      id: "rs1",
      residentName: "Mary Johnson",
      residentId: "RES-2048",
      submittedAt: "08/18/2026",
      status: "approved",
      amount: "$4,850.00",
      image: "https://i.pravatar.cc/80?img=47",
      initials: "MJ",
    },
    {
      id: "rs2",
      residentName: "Robert Williams",
      residentId: "RES-1982",
      submittedAt: "08/17/2026",
      status: "pending",
      amount: "$3,220.00",
      image: "https://i.pravatar.cc/80?img=12",
      initials: "RW",
    },
    {
      id: "rs3",
      residentName: "Gloria Chen",
      residentId: "RES-2110",
      submittedAt: "08/16/2026",
      status: "rejected",
      amount: "$2,940.00",
      image: "https://i.pravatar.cc/80?img=5",
      initials: "GC",
    },
    {
      id: "rs4",
      residentName: "Harold Freeman",
      residentId: "RES-1875",
      submittedAt: "08/15/2026",
      status: "submitted",
      amount: "$5,100.00",
      image: "https://i.pravatar.cc/80?img=57",
      initials: "HF",
    },
    {
      id: "rs5",
      residentName: "Lara Mensah",
      residentId: "RES-2201",
      submittedAt: "08/14/2026",
      status: "approved",
      amount: "$4,450.00",
      image: "https://i.pravatar.cc/80?img=32",
      initials: "LM",
    },
    {
      id: "rs6",
      residentName: "William Patterson",
      residentId: "RES-1933",
      submittedAt: "08/13/2026",
      status: "pending",
      amount: "$3,780.00",
      image: "https://i.pravatar.cc/80?img=61",
      initials: "WP",
    },
  ],
  quickActions: [
    {
      id: "new-claim",
      label: "Claim for existing resident",
      description: "Upload LTC claim packet for review",
      href: "/billing/new",
      tone: "accent",
    },
    {
      id: "upload-invoice",
      label: "Create / upload invoice",
      description: "Build or attach a facility invoice",
      href: "/invoices",
      tone: "success",
    },
    {
      id: "reports",
      label: "Facility analytics",
      description: "Submission history & trends",
      href: "/analytics",
      tone: "warning",
    },
  ],
  reminders: [
    {
      id: "rem1",
      message: "3 claims need additional information",
      actionLabel: "Review Now",
      href: "/billing",
    },
    {
      id: "rem2",
      message: "2 residents have incomplete forms",
      actionLabel: "Review Now",
      href: "/patients",
    },
    {
      id: "rem3",
      message: "Invoices for 5 claims are missing",
      actionLabel: "Upload Now",
      href: "/invoices",
    },
  ],
  submissionHistory: [
    { date: "2026-08-12", label: "Aug 12", submitted: 4, approved: 3, pending: 1, rejected: 0 },
    { date: "2026-08-13", label: "Aug 13", submitted: 5, approved: 4, pending: 1, rejected: 0 },
    { date: "2026-08-14", label: "Aug 14", submitted: 3, approved: 2, pending: 0, rejected: 1 },
    { date: "2026-08-15", label: "Aug 15", submitted: 6, approved: 4, pending: 2, rejected: 0 },
    { date: "2026-08-16", label: "Aug 16", submitted: 4, approved: 3, pending: 0, rejected: 1 },
    { date: "2026-08-17", label: "Aug 17", submitted: 5, approved: 3, pending: 2, rejected: 0 },
    { date: "2026-08-18", label: "Aug 18", submitted: 5, approved: 5, pending: 0, rejected: 0 },
  ],
  facilityPlan: {
    name: "Sunrise Assisted Living",
    plan: "Professional Plan",
    nextBillingDate: "09/01/2026",
    claimsIncluded: "Unlimited",
    manageHref: "/settings",
  },
};

export async function fetchDashboardHome(): Promise<DashboardHomeData> {
  await new Promise((resolve) => setTimeout(resolve, 700));
  return DASHBOARD_HOME;
}
