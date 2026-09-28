export type ClaimUploadPhase = "basics" | "documents" | "review";

export type SuggestedDocument = {
  id: string;
  label: string;
  description: string;
  required: boolean;
};

export type ClaimUploadFlowData = {
  title: string;
  modeLabel: string;
  subtitle: string;
  phases: { id: ClaimUploadPhase; label: string }[];
  insurers: string[];
  residents: { id: string; name: string; facility: string; policyId: string }[];
  suggestedDocuments: SuggestedDocument[];
};

export const CLAIM_UPLOAD_FLOW: ClaimUploadFlowData = {
  title: "Claim for existing resident",
  modeLabel: "Upload for review",
  subtitle:
    "Long-term care packets only. Upload documents for Helix review — interactive CMR walkthrough forms will be available once insurer templates are loaded.",
  phases: [
    { id: "basics", label: "Claim basics" },
    { id: "documents", label: "Upload documents" },
    { id: "review", label: "Review & submit" },
  ],
  insurers: [
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
  ],
  residents: [
    {
      id: "r1",
      name: "Ada Okoye",
      facility: "Sunrise Assisted Living",
      policyId: "POL-ILM-2001",
    },
    {
      id: "r2",
      name: "Marcus Chen",
      facility: "Oak Ridge SNF",
      policyId: "POL-GNW-1988",
    },
    {
      id: "r3",
      name: "Helen Foster",
      facility: "Sunrise Assisted Living",
      policyId: "POL-JHN-2110",
    },
  ],
  suggestedDocuments: [
    {
      id: "invoice",
      label: "Signed monthly invoice",
      description: "Current period invoice with signature and dates.",
      required: true,
    },
    {
      id: "cmr",
      label: "CMR / monthly residence form",
      description: "Upload completed paper CMR until in-app walkthrough ships.",
      required: true,
    },
    {
      id: "census",
      label: "Census / room verification",
      description: "Facility census covering the claim period.",
      required: false,
    },
    {
      id: "other",
      label: "Other supporting docs",
      description: "Letters, prior returns, or notes for the reviewer.",
      required: false,
    },
  ],
};

/** Plug point: swap for claim draft API. */
export async function fetchClaimUploadFlow(): Promise<ClaimUploadFlowData> {
  await new Promise((r) => setTimeout(r, 200));
  return CLAIM_UPLOAD_FLOW;
}
