export type AnalyticsStat = {
  id: string;
  label: string;
  value: string;
  change: string;
  tone: "success" | "danger" | "accent" | "warning";
};

export type StatusBreakdown = {
  label: string;
  value: number;
  color: string;
};

export type MonthlyTrend = {
  month: string;
  submitted: number;
  paid: number;
  denied: number;
};

export type TopIssue = {
  id: string;
  issue: string;
  count: number;
  percentage: number;
  trend: "up" | "down" | "flat";
};

export type FacilitySubmissionMonth = {
  month: string;
  submitted: number;
  approved: number;
  pending: number;
  rejected: number;
};

export type AnalyticsPageData = {
  stats: AnalyticsStat[];
  statusBreakdown: StatusBreakdown[];
  monthlyTrends: MonthlyTrend[];
  topIssues: TopIssue[];
  facilitySubmissionHistory: FacilitySubmissionMonth[];
};

export const ANALYTICS_DATA: AnalyticsPageData = {
  stats: [
    {
      id: "filed",
      label: "Claims Filed (Month)",
      value: "142",
      change: "+12%",
      tone: "accent",
    },
    {
      id: "approval",
      label: "Approval Rate",
      value: "84.2%",
      change: "+3.1%",
      tone: "success",
    },
    {
      id: "processing",
      label: "Avg Processing Time",
      value: "6.3 days",
      change: "-1.2 days",
      tone: "warning",
    },
    {
      id: "revenue",
      label: "Revenue Tracked",
      value: "$284,500",
      change: "+8.4%",
      tone: "success",
    },
  ],
  statusBreakdown: [
    { label: "In Progress", value: 38, color: "var(--warning)" },
    { label: "Missing Docs", value: 24, color: "var(--danger)" },
    { label: "Ready for Review", value: 31, color: "var(--accent)" },
    { label: "Submitted", value: 37, color: "var(--success)" },
    { label: "Denied", value: 12, color: "oklch(0.55 0.15 350)" },
  ],
  monthlyTrends: [
    { month: "Jan", submitted: 98, paid: 82, denied: 12 },
    { month: "Feb", submitted: 110, paid: 94, denied: 10 },
    { month: "Mar", submitted: 124, paid: 108, denied: 14 },
    { month: "Apr", submitted: 118, paid: 100, denied: 11 },
    { month: "May", submitted: 132, paid: 114, denied: 15 },
    { month: "Jun", submitted: 142, paid: 120, denied: 12 },
    { month: "Jul", submitted: 138, paid: 118, denied: 9 },
    { month: "Aug", submitted: 151, paid: 129, denied: 11 },
    { month: "Sep", submitted: 146, paid: 121, denied: 10 },
  ],
  facilitySubmissionHistory: [
    { month: "Apr", submitted: 118, approved: 100, pending: 11, rejected: 7 },
    { month: "May", submitted: 132, approved: 114, pending: 12, rejected: 6 },
    { month: "Jun", submitted: 142, approved: 120, pending: 14, rejected: 8 },
    { month: "Jul", submitted: 138, approved: 118, pending: 13, rejected: 7 },
    { month: "Aug", submitted: 151, approved: 129, pending: 15, rejected: 7 },
    { month: "Sep", submitted: 146, approved: 121, pending: 16, rejected: 9 },
  ],
  topIssues: [
    {
      id: "i1",
      issue: "Missing signed monthly invoice",
      count: 18,
      percentage: 28,
      trend: "up",
    },
    {
      id: "i2",
      issue: "Incomplete CMR / monthly residence form",
      count: 14,
      percentage: 22,
      trend: "down",
    },
    {
      id: "i3",
      issue: "Date mismatch on billing period",
      count: 11,
      percentage: 17,
      trend: "flat",
    },
    {
      id: "i4",
      issue: "Missing census / room verification",
      count: 9,
      percentage: 14,
      trend: "up",
    },
    {
      id: "i5",
      issue: "Expired level-of-care assessment",
      count: 7,
      percentage: 11,
      trend: "down",
    },
    {
      id: "i6",
      issue: "Missing care plan document",
      count: 5,
      percentage: 8,
      trend: "flat",
    },
  ],
};

export async function fetchAnalytics(): Promise<AnalyticsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return ANALYTICS_DATA;
}
