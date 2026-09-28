export type ClaimStatus =
  | "in-progress"
  | "missing-docs"
  | "ready-for-review"
  | "submitted"
  | "denied"
  | "paid";

export type Claim = {
  id: string;
  /** Long-term care policy identifier (formerly Claim ID). */
  policyId: string;
  residentName: string;
  residentImage: string;
  residentInitials: string;
  /** Client / insurer / claims processor. */
  insurer: string;
  billingPeriod: string;
  status: ClaimStatus;
  missingItems: number;
  lastUpdated: string;
  facility: string;
  notes: string;
};

export type ClaimStat = {
  id: string;
  label: string;
  value: number;
  tone?: "accent" | "success" | "warning" | "danger" | "default";
};

export type ClaimsPageData = {
  stats: ClaimStat[];
  claims: Claim[];
};

export const LTC_INSURERS = [
  "Illumifin",
  "Genworth",
  "John Hancock",
  "Mutual of Omaha",
  "New York Life",
  "Northwestern Mutual",
  "AIG / American General Life",
  "Bankers Life / CNO Financial",
  "Lincoln Financial Group",
  "Transamerica",
  "MassMutual",
  "Nationwide",
] as const;

export const STATUS_CONFIG: Record<
  ClaimStatus,
  { label: string; color: "warning" | "danger" | "accent" | "success" | "default" }
> = {
  "in-progress": { label: "In Progress", color: "warning" },
  "missing-docs": { label: "Missing Docs", color: "danger" },
  "ready-for-review": { label: "Ready for Review", color: "accent" },
  submitted: { label: "Submitted", color: "success" },
  denied: { label: "Denied", color: "danger" },
  paid: { label: "Paid", color: "success" },
};

export const CLAIMS_DATA: ClaimsPageData = {
  stats: [
    { id: "all", label: "All Claims", value: 142, tone: "default" },
    { id: "in-progress", label: "In Progress", value: 38, tone: "warning" },
    { id: "missing-docs", label: "Missing Docs", value: 24, tone: "danger" },
    { id: "ready-for-review", label: "Ready for Review", value: 31, tone: "accent" },
    { id: "submitted", label: "Submitted", value: 37, tone: "success" },
    { id: "denied", label: "Denied / Returned", value: 12, tone: "danger" },
  ],
  claims: [
    {
      id: "c1",
      policyId: "POL-GNW-0142",
      residentName: "Amanda Brown",
      residentImage: "https://i.pravatar.cc/80?img=47",
      residentInitials: "AB",
      insurer: "Genworth",
      billingPeriod: "Jun 1 – Jun 30, 2026",
      status: "missing-docs",
      missingItems: 2,
      lastUpdated: "2026-09-02",
      facility: "Sunrise Assisted Living",
      notes: "Missing signed CMR and invoice packet.",
    },
    {
      id: "c2",
      policyId: "POL-JHN-0141",
      residentName: "Chidi Okonkwo",
      residentImage: "https://i.pravatar.cc/80?img=12",
      residentInitials: "CO",
      insurer: "John Hancock",
      billingPeriod: "Jun 1 – Jun 30, 2026",
      status: "denied",
      missingItems: 0,
      lastUpdated: "2026-09-01",
      facility: "Sunrise Assisted Living",
      notes: "Returned for incomplete monthly residence form.",
    },
    {
      id: "c3",
      policyId: "POL-ILM-0140",
      residentName: "Lara Mensah",
      residentImage: "https://i.pravatar.cc/80?img=32",
      residentInitials: "LM",
      insurer: "Illumifin",
      billingPeriod: "Jun 1 – Jun 30, 2026",
      status: "ready-for-review",
      missingItems: 0,
      lastUpdated: "2026-08-29",
      facility: "Oakview SNF",
      notes: "All documents attached. Awaiting billing manager review.",
    },
    {
      id: "c4",
      policyId: "POL-MOO-0139",
      residentName: "Robert Jackson",
      residentImage: "https://i.pravatar.cc/80?img=60",
      residentInitials: "RJ",
      insurer: "Mutual of Omaha",
      billingPeriod: "May 15 – Jun 14, 2026",
      status: "submitted",
      missingItems: 0,
      lastUpdated: "2026-08-28",
      facility: "Sunrise Assisted Living",
      notes: "Submitted to insurer claims desk.",
    },
    {
      id: "c5",
      policyId: "POL-NYL-0138",
      residentName: "Gloria Chen",
      residentImage: "https://i.pravatar.cc/80?img=5",
      residentInitials: "GC",
      insurer: "New York Life",
      billingPeriod: "Jun 1 – Jun 30, 2026",
      status: "in-progress",
      missingItems: 1,
      lastUpdated: "2026-08-27",
      facility: "Oakview SNF",
      notes: "Invoice generated, pending signature.",
    },
    {
      id: "c6",
      policyId: "POL-NWM-0137",
      residentName: "Ibrahim Bello",
      residentImage: "https://i.pravatar.cc/80?img=53",
      residentInitials: "IB",
      insurer: "Northwestern Mutual",
      billingPeriod: "Q2 2026",
      status: "missing-docs",
      missingItems: 3,
      lastUpdated: "2026-08-26",
      facility: "Sunrise Assisted Living",
      notes: "Missing physician signature, care plan, and reassessment.",
    },
    {
      id: "c7",
      policyId: "POL-AIG-0136",
      residentName: "Mary Torres",
      residentImage: "https://i.pravatar.cc/80?img=44",
      residentInitials: "MT",
      insurer: "AIG / American General Life",
      billingPeriod: "Jun 1 – Jun 30, 2026",
      status: "paid",
      missingItems: 0,
      lastUpdated: "2026-08-25",
      facility: "Maple Ridge Care",
      notes: "Payment received.",
    },
    {
      id: "c8",
      policyId: "POL-BNK-0135",
      residentName: "William Patterson",
      residentImage: "https://i.pravatar.cc/80?img=61",
      residentInitials: "WP",
      insurer: "Bankers Life / CNO Financial",
      billingPeriod: "May 1 – May 31, 2026",
      status: "ready-for-review",
      missingItems: 0,
      lastUpdated: "2026-08-24",
      facility: "Oakview SNF",
      notes: "Packet complete. Ready for billing manager sign-off.",
    },
    {
      id: "c9",
      policyId: "POL-LNG-0134",
      residentName: "Sofia Alvarez",
      residentImage: "https://i.pravatar.cc/80?img=23",
      residentInitials: "SA",
      insurer: "Lincoln Financial Group",
      billingPeriod: "Jun 1 – Jun 30, 2026",
      status: "in-progress",
      missingItems: 0,
      lastUpdated: "2026-08-23",
      facility: "Maple Ridge Care",
      notes: "Assembling invoice details.",
    },
    {
      id: "c10",
      policyId: "POL-TRA-0133",
      residentName: "Harold Freeman",
      residentImage: "https://i.pravatar.cc/80?img=57",
      residentInitials: "HF",
      insurer: "Transamerica",
      billingPeriod: "May 1 – May 31, 2026",
      status: "submitted",
      missingItems: 0,
      lastUpdated: "2026-08-22",
      facility: "Sunrise Assisted Living",
      notes: "Awaiting insurer response.",
    },
  ],
};

export async function fetchClaims(): Promise<ClaimsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return CLAIMS_DATA;
}
