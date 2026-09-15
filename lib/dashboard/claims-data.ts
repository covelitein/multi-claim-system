export type ClaimStatus =
  | "in-progress"
  | "missing-docs"
  | "ready-for-review"
  | "submitted"
  | "denied"
  | "paid";

export type Claim = {
  id: string;
  claimId: string;
  residentName: string;
  residentImage: string;
  residentInitials: string;
  claimType: string;
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
};

export type ClaimsPageData = {
  stats: ClaimStat[];
  claims: Claim[];
};

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
    { id: "all", label: "All Claims", value: 142 },
    { id: "in-progress", label: "In Progress", value: 38 },
    { id: "missing-docs", label: "Missing Docs", value: 24 },
    { id: "ready-for-review", label: "Ready for Review", value: 31 },
    { id: "submitted", label: "Submitted", value: 37 },
    { id: "denied", label: "Denied / Returned", value: 12 },
  ],
  claims: [
    {
      id: "c1",
      claimId: "CLM-2024-0142",
      residentName: "Amanda Brown",
      residentImage: "https://i.pravatar.cc/80?img=47",
      residentInitials: "AB",
      claimType: "Medicaid Monthly",
      billingPeriod: "Jun 1 – Jun 30, 2024",
      status: "missing-docs",
      missingItems: 2,
      lastUpdated: "2024-07-02",
      facility: "Sunrise Assisted Living",
      notes: "Missing signed 485 and face sheet.",
    },
    {
      id: "c2",
      claimId: "CLM-2024-0141",
      residentName: "Chidi Okonkwo",
      residentImage: "https://i.pravatar.cc/80?img=12",
      residentInitials: "CO",
      claimType: "Medicare Part A",
      billingPeriod: "Jun 1 – Jun 30, 2024",
      status: "denied",
      missingItems: 0,
      lastUpdated: "2024-07-01",
      facility: "Sunrise Assisted Living",
      notes: "Denied for incomplete prior authorization.",
    },
    {
      id: "c3",
      claimId: "CLM-2024-0140",
      residentName: "Lara Mensah",
      residentImage: "https://i.pravatar.cc/80?img=32",
      residentInitials: "LM",
      claimType: "Medicaid Monthly",
      billingPeriod: "Jun 1 – Jun 30, 2024",
      status: "ready-for-review",
      missingItems: 0,
      lastUpdated: "2024-06-29",
      facility: "Oakview SNF",
      notes: "All documents attached. Awaiting billing manager review.",
    },
    {
      id: "c4",
      claimId: "CLM-2024-0139",
      residentName: "Robert Jackson",
      residentImage: "https://i.pravatar.cc/80?img=60",
      residentInitials: "RJ",
      claimType: "Medicare Part B",
      billingPeriod: "May 15 – Jun 14, 2024",
      status: "submitted",
      missingItems: 0,
      lastUpdated: "2024-06-28",
      facility: "Sunrise Assisted Living",
      notes: "Submitted to clearinghouse.",
    },
    {
      id: "c5",
      claimId: "CLM-2024-0138",
      residentName: "Gloria Chen",
      residentImage: "https://i.pravatar.cc/80?img=5",
      residentInitials: "GC",
      claimType: "Private Pay Invoice",
      billingPeriod: "Jun 1 – Jun 30, 2024",
      status: "in-progress",
      missingItems: 1,
      lastUpdated: "2024-06-27",
      facility: "Oakview SNF",
      notes: "Invoice generated, pending signature.",
    },
    {
      id: "c6",
      claimId: "CLM-2024-0137",
      residentName: "Ibrahim Bello",
      residentImage: "https://i.pravatar.cc/80?img=53",
      residentInitials: "IB",
      claimType: "Medicaid Recertification",
      billingPeriod: "Q2 2024",
      status: "missing-docs",
      missingItems: 3,
      lastUpdated: "2024-06-26",
      facility: "Sunrise Assisted Living",
      notes: "Missing physician signature, care plan, and level-of-care assessment.",
    },
    {
      id: "c7",
      claimId: "CLM-2024-0136",
      residentName: "Mary Torres",
      residentImage: "https://i.pravatar.cc/80?img=44",
      residentInitials: "MT",
      claimType: "Medicare Part A",
      billingPeriod: "Jun 1 – Jun 30, 2024",
      status: "paid",
      missingItems: 0,
      lastUpdated: "2024-06-25",
      facility: "Maple Ridge Care",
      notes: "Payment received.",
    },
    {
      id: "c8",
      claimId: "CLM-2024-0135",
      residentName: "William Patterson",
      residentImage: "https://i.pravatar.cc/80?img=61",
      residentInitials: "WP",
      claimType: "Medicaid Monthly",
      billingPeriod: "May 1 – May 31, 2024",
      status: "ready-for-review",
      missingItems: 0,
      lastUpdated: "2024-06-24",
      facility: "Oakview SNF",
      notes: "Packet complete. Ready for billing manager sign-off.",
    },
    {
      id: "c9",
      claimId: "CLM-2024-0134",
      residentName: "Sofia Alvarez",
      residentImage: "https://i.pravatar.cc/80?img=23",
      residentInitials: "SA",
      claimType: "Private Pay Invoice",
      billingPeriod: "Jun 1 – Jun 30, 2024",
      status: "in-progress",
      missingItems: 0,
      lastUpdated: "2024-06-23",
      facility: "Maple Ridge Care",
      notes: "Assembling invoice details.",
    },
    {
      id: "c10",
      claimId: "CLM-2024-0133",
      residentName: "Harold Freeman",
      residentImage: "https://i.pravatar.cc/80?img=57",
      residentInitials: "HF",
      claimType: "Medicare Part A",
      billingPeriod: "May 1 – May 31, 2024",
      status: "submitted",
      missingItems: 0,
      lastUpdated: "2024-06-22",
      facility: "Sunrise Assisted Living",
      notes: "Awaiting payer response.",
    },
  ],
};

export async function fetchClaims(): Promise<ClaimsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return CLAIMS_DATA;
}
