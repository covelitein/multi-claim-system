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
  claimTypes: string[];
  payers: string[];
  residents: { id: string; name: string; facility: string }[];
  suggestedDocuments: SuggestedDocument[];
};

export const CLAIM_UPLOAD_FLOW: ClaimUploadFlowData = {
  title: "New claim submission",
  modeLabel: "Upload for review",
  subtitle:
    "Provide basics and upload the document packet. Helix completes claim forms during review — you do not fill them here.",
  phases: [
    { id: "basics", label: "Claim basics" },
    { id: "documents", label: "Upload documents" },
    { id: "review", label: "Review & submit" },
  ],
  claimTypes: [
    "Continued Monthly Residence (CMR)",
    "Initial claim",
    "Resubmission",
    "Other / supporting packet",
  ],
  payers: ["Medicare", "Medicaid", "Private pay", "Other"],
  residents: [
    {
      id: "r1",
      name: "Ada Okoye",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "r2",
      name: "Marcus Chen",
      facility: "Oak Ridge SNF",
    },
    {
      id: "r3",
      name: "Helen Foster",
      facility: "Sunrise Assisted Living",
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
      id: "485",
      label: "Plan of care / 485",
      description: "Upload if available; Helix will flag gaps during review.",
      required: false,
    },
    {
      id: "census",
      label: "Census / room verification",
      description: "Any facility census sheet covering the claim period.",
      required: false,
    },
    {
      id: "other",
      label: "Other supporting docs",
      description: "Letters, prior denials, or notes for the reviewer.",
      required: false,
    },
  ],
};

/** Plug point: swap for claim draft API. */
export async function fetchClaimUploadFlow(): Promise<ClaimUploadFlowData> {
  await new Promise((r) => setTimeout(r, 200));
  return CLAIM_UPLOAD_FLOW;
}
