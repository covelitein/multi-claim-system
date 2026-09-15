export type WalkthroughPhase =
  | "form-questions"
  | "invoice-requirements"
  | "review"
  | "ready";

export type TipCardTone = "success" | "accent" | "warning" | "danger";

export type TipCard = {
  id: string;
  title: string;
  tone: TipCardTone;
  bullets?: string[];
  body?: string;
  ctaLabel?: string;
};

export type QuestionOption = {
  id: string;
  label: string;
  description?: string;
};

export type ConditionalField = {
  id: string;
  label: string;
  type: "text" | "date" | "select";
  placeholder?: string;
  options?: string[];
  showWhenOptionId: string;
};

export type WalkthroughQuestion = {
  id: string;
  number: number;
  title: string;
  helper?: string;
  options: QuestionOption[];
  conditionalFields?: ConditionalField[];
  tips: TipCard[];
};

export type InvoiceRequirement = {
  id: string;
  title: string;
  description: string;
  example: string;
};

export type ClaimWalkthroughData = {
  formTitle: string;
  modeLabel: string;
  phases: { id: WalkthroughPhase; label: string }[];
  questions: WalkthroughQuestion[];
  invoiceRequirements: InvoiceRequirement[];
  invoiceChecklist: string[];
};

export const CLAIM_WALKTHROUGH: ClaimWalkthroughData = {
  formTitle: "Continued Monthly Residence Form",
  modeLabel: "Walkthrough Mode",
  phases: [
    { id: "form-questions", label: "Form Questions" },
    { id: "invoice-requirements", label: "Invoice Requirements" },
    { id: "review", label: "Review & Check" },
    { id: "ready", label: "Ready to Submit" },
  ],
  questions: [
    {
      id: "q1",
      number: 1,
      title:
        "Has the resident remained in the same room/apartment for the entire month?",
      helper: "Why we ask this? Room changes affect billing codes and invoices.",
      options: [
        {
          id: "same-room-yes",
          label: "Yes, remained in the same room/apartment",
        },
        {
          id: "same-room-no",
          label: "No, did not remain in the same room/apartment",
        },
      ],
      conditionalFields: [
        {
          id: "prior-room",
          label: "Enter prior room or apartment number",
          type: "text",
          placeholder: "e.g. 214-B",
          showWhenOptionId: "same-room-no",
        },
        {
          id: "move-date",
          label: "Date moved to new room/apartment",
          type: "date",
          showWhenOptionId: "same-room-no",
        },
        {
          id: "move-reason",
          label: "Reason for move",
          type: "select",
          options: [
            "Clinical need",
            "Roommate change",
            "Facility request",
            "Other",
          ],
          showWhenOptionId: "same-room-no",
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Tip - Important!",
          tone: "success",
          bullets: [
            "Match invoice dates to the claim period exactly.",
            "Room changes mid-month usually need a note on the invoice.",
          ],
        },
        {
          id: "t2",
          title: "Examples",
          tone: "accent",
          bullets: [
            "Resident stayed in 118-A all month → Yes",
            "Moved from 118-A to 220-B on Aug 12 → No",
          ],
        },
        {
          id: "t3",
          title: "Common Mistakes",
          tone: "warning",
          bullets: [
            "Leaving prior room blank after selecting No",
            "Using move date outside the service period",
          ],
        },
        {
          id: "t4",
          title: "Still not sure?",
          tone: "danger",
          body: "Contact support if the chart and invoice disagree on room history.",
          ctaLabel: "Contact Support",
        },
      ],
    },
    {
      id: "q2",
      number: 2,
      title:
        "Select the level of care that describes the resident's current room, unit or apartment:",
      helper: "Choose the option that matches the census / MDS level of care.",
      options: [
        {
          id: "alz",
          label: "Alzheimer’s/Dementia unit (secured)",
          description: "Memory care with secured egress",
        },
        {
          id: "assisted",
          label: "Assisted living / residential care",
          description: "Standard ALF room and board",
        },
        {
          id: "skilled",
          label: "Skilled nursing / rehab",
          description: "SNF level clinical support",
        },
        {
          id: "independent",
          label: "Independent living",
          description: "Minimal assistance with ADLs",
        },
        {
          id: "respite",
          label: "Respite / short-term stay",
          description: "Temporary placement this period",
        },
        {
          id: "hospice",
          label: "Hospice in facility",
          description: "Hospice concurrent with residence",
        },
        {
          id: "other-care",
          label: "Other / not listed",
          description: "Document level of care in notes",
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Tips for this question",
          tone: "success",
          bullets: [
            "Use the same level of care shown on the census report.",
            "Secured memory care is not the same as standard ALF.",
          ],
        },
        {
          id: "t2",
          title: "Examples",
          tone: "accent",
          body: "If the resident is on a locked dementia wing, select Alzheimer’s/Dementia unit even if billed under ALF.",
        },
        {
          id: "t3",
          title: "Common Mistakes",
          tone: "warning",
          bullets: [
            "Selecting Independent when ADLs require daily help",
            "Mixing respite with long-term residential coding",
          ],
        },
        {
          id: "t4",
          title: "Still not sure?",
          tone: "danger",
          body: "Ask clinical leadership before submitting if LOC changed mid-month.",
          ctaLabel: "Contact Support",
        },
      ],
    },
    {
      id: "q3",
      number: 3,
      title:
        "At any time during this service period, was the resident away from the facility overnight for any reason?",
      options: [
        {
          id: "away-yes",
          label: "Yes, the resident was away overnight",
        },
        {
          id: "away-no",
          label: "No, the resident was not away overnight",
        },
      ],
      conditionalFields: [
        {
          id: "departure-date",
          label: "Departure Date",
          type: "date",
          showWhenOptionId: "away-yes",
        },
        {
          id: "return-date",
          label: "Return Date",
          type: "date",
          showWhenOptionId: "away-yes",
        },
        {
          id: "absence-reason",
          label: "Reason for absence",
          type: "select",
          options: [
            "Hospitalization",
            "Skilled Nursing Stay",
            "Vacation",
            "Other",
          ],
          showWhenOptionId: "away-yes",
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Why we ask this",
          tone: "success",
          body: "Overnight absences can change bed-hold and room-and-board eligibility.",
        },
        {
          id: "t2",
          title: "Good to Know",
          tone: "accent",
          bullets: [
            "Even one overnight counts as Yes.",
            "Leave dates blank only when answering No.",
          ],
        },
        {
          id: "t3",
          title: "Common Mistakes",
          tone: "warning",
          bullets: [
            "Leaving departure/return dates blank after Yes",
            "Using dates outside the claim period",
          ],
        },
        {
          id: "t4",
          title: "Still not sure?",
          tone: "danger",
          body: "Check nursing notes and hospital discharge papers before answering.",
          ctaLabel: "Contact Support",
        },
      ],
    },
    {
      id: "q4",
      number: 4,
      title:
        "Is Medicare, Medicaid/Medical or any other insurance providing benefits for expenses incurred during this service period?",
      options: [
        { id: "ins-no", label: "No" },
        { id: "ins-medicare", label: "Yes, Medicare" },
        { id: "ins-medicaid", label: "Yes, Medicaid/Medical" },
        { id: "ins-other", label: "Yes, other insurance coverage" },
      ],
      conditionalFields: [
        {
          id: "insurer-name",
          label: "Insurer Name",
          type: "text",
          placeholder: "Insurer name",
          showWhenOptionId: "ins-other",
        },
        {
          id: "policy-number",
          label: "Policy Number",
          type: "text",
          placeholder: "Policy / member ID",
          showWhenOptionId: "ins-other",
        },
        {
          id: "insurer-address",
          label: "Insurer Address",
          type: "text",
          placeholder: "Street, city, state",
          showWhenOptionId: "ins-other",
        },
        {
          id: "insurer-phone",
          label: "Phone Number",
          type: "text",
          placeholder: "(555) 000-0000",
          showWhenOptionId: "ins-other",
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Tip - Important!",
          tone: "success",
          bullets: [
            "Primary payer must match the face sheet.",
            "Other insurance details are required when selected.",
          ],
        },
        {
          id: "t2",
          title: "Examples",
          tone: "accent",
          body: "Private LTC policy with member ID LTC123456 → Yes, other insurance coverage.",
        },
        {
          id: "t3",
          title: "Common Mistakes",
          tone: "warning",
          bullets: ["Selecting Other without policy number"],
        },
        {
          id: "t4",
          title: "Still not sure?",
          tone: "danger",
          body: "Verify with the billing office before changing payer type.",
          ctaLabel: "Contact Support",
        },
      ],
    },
    {
      id: "q5",
      number: 5,
      title: "Were all required physician orders current for this service period?",
      options: [
        { id: "orders-yes", label: "Yes, orders are current" },
        { id: "orders-no", label: "No, orders need update" },
      ],
      tips: [
        {
          id: "t1",
          title: "Tip - Important!",
          tone: "success",
          bullets: ["Expired orders are a top denial reason."],
        },
        {
          id: "t2",
          title: "Examples",
          tone: "accent",
          body: "Order signed within the last 30 days for ALF services → Yes.",
        },
        {
          id: "t3",
          title: "Common Mistakes",
          tone: "warning",
          bullets: ["Assuming an old order still covers this month"],
        },
        {
          id: "t4",
          title: "Still not sure?",
          tone: "danger",
          ctaLabel: "Contact Support",
          body: "Ask nursing for the latest signed order packet.",
        },
      ],
    },
  ],
  invoiceRequirements: [
    {
      id: "inv1",
      title: "1. Invoice Date Range",
      description: "Service dates on the invoice must match the claim period.",
      example: "08/01/2026 – 08/31/2026",
    },
    {
      id: "inv2",
      title: "2. Room and Board",
      description: "Show daily or monthly room and board charges clearly.",
      example: "Room & Board — $4,200.00",
    },
    {
      id: "inv3",
      title: "3. Resident Identifiers",
      description: "Include resident full name and facility ID / MRN.",
      example: "Mary Johnson · RES-2048",
    },
    {
      id: "inv4",
      title: "4. Fresh Signatures & Dates",
      description: "Signature and date lines must be completed for this period.",
      example: "Signed 08/18/2026",
    },
  ],
  invoiceChecklist: [
    "Date range matches claim period",
    "Room and board line item present",
    "Resident name and ID visible",
    "Signature and date completed",
  ],
};

export async function fetchClaimWalkthrough(): Promise<ClaimWalkthroughData> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return CLAIM_WALKTHROUGH;
}
