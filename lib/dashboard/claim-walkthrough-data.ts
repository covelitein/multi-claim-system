import type { SignalName } from "@/lib/dashboard/signal-colors";

export type WalkthroughPhase =
  | "form-questions"
  | "invoice-requirements"
  | "review"
  | "ready";

export type OptionIcon =
  | "lock"
  | "lock-open"
  | "shield-check"
  | "shield"
  | "house"
  | "stethoscope"
  | "persons";

export type TipCard = {
  id: string;
  title: string;
  /** Signal color — same color means the same kind of help everywhere. */
  tone: SignalName;
  bullets?: string[];
  body?: string;
  facts?: { label: string; value: string }[];
  ctaLabel?: string;
};

export type QuestionOption = {
  id: string;
  label: string;
  description?: string;
  icon?: OptionIcon;
};

export type FollowUpField = {
  id: string;
  label: string;
  type: "text" | "date" | "select";
  placeholder?: string;
  options?: string[];
  /** Not needed to mark the question complete. */
  optional?: boolean;
};

/** Extra fields revealed by an answer (and optionally by another field). */
export type FollowUp = {
  optionId: string;
  when?: { fieldId: string; value: string };
  heading: string;
  note?: string;
  /** Collected in the app but not part of the carrier's paper form. */
  offForm?: boolean;
  fields: FollowUpField[];
};

export type WalkthroughQuestion = {
  id: string;
  number: number;
  /** Short label for the sidebar and stepper. */
  shortLabel: string;
  title: string;
  helper?: string;
  notice?: string;
  options: QuestionOption[];
  followUps?: FollowUp[];
  tips: TipCard[];
};

export type InvoiceRequirement = {
  id: string;
  title: string;
  description: string;
  example: string;
};

/** Static copy printed on the carrier's paper form. */
export type CmrTemplate = {
  carrier: string;
  title: string;
  instructions: string[];
  returnFax: string;
  returnMail: string;
  declaration: string;
};

export type ClaimWalkthroughData = {
  formTitle: string;
  modeLabel: string;
  subtitle: string;
  phases: { id: WalkthroughPhase; label: string }[];
  claimPeriod: {
    title: string;
    helper: string;
    example: string;
    notice: string;
  };
  template: CmrTemplate;
  questions: WalkthroughQuestion[];
  invoiceRequirements: InvoiceRequirement[];
  invoiceTips: TipCard[];
  invoiceChecklist: string[];
  signatureTips: string[];
};

/** Mock account context until facility / user APIs exist. */
export const CMR_FACILITY = {
  name: "Sunrise Assisted Living",
  address: "1200 Wellness Blvd",
  city: "Austin",
  state: "TX",
  phone: "(512) 555-0100",
  fax: "(512) 555-0199",
};

export const CMR_SIGNER = {
  name: "Ada Okonkwo",
  title: "Billing Coordinator",
  phone: "(512) 555-0100",
};

const STILL_NOT_SURE: Omit<TipCard, "id" | "body"> = {
  title: "Still not sure?",
  tone: "rose",
  ctaLabel: "Contact Support",
};

export const CLAIM_WALKTHROUGH: ClaimWalkthroughData = {
  formTitle: "Continued Monthly Residence Form",
  modeLabel: "Walkthrough Mode",
  subtitle:
    "We'll walk you through each question so you can complete the form accurately.",
  phases: [
    { id: "form-questions", label: "Form Questions" },
    { id: "invoice-requirements", label: "Invoice Requirements" },
    { id: "review", label: "Review & Check" },
    { id: "ready", label: "Ready to Submit" },
  ],
  claimPeriod: {
    title: "Claim Period",
    helper: "The month of service this form covers.",
    example: "08/01/2026 – 08/31/2026",
    notice:
      "The dates on your invoice must match the claim period you choose here.",
  },
  template: {
    carrier: "Southern Farm Bureau Life Insurance Company",
    title: "Continued Monthly Residence Form",
    instructions: [
      "Complete this form every month for each resident receiving benefits.",
      "Answer all four questions. Incomplete forms will be returned.",
      "A freshly handwritten signature and date are required each month — stamped or copied signatures are not accepted.",
      "Attach the facility invoice for the month of service.",
      "Attach the Medicare EOMB or UB-04 if Medicare covered any part of the month.",
    ],
    returnFax: "1-888-441-5824",
    returnMail: "P.O. Box 64903, St. Paul, MN 55164",
    declaration:
      "I certify that the information provided on this form is true and complete to the best of my knowledge.",
  },
  questions: [
    {
      id: "same-room",
      number: 1,
      shortLabel: "Same Room / Apartment",
      title:
        "Did the resident stay in the same room/apartment for the entire month?",
      helper:
        "We use this to confirm the resident's living arrangement stayed consistent during the month of service.",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
      followUps: [
        {
          optionId: "no",
          heading: "If no, provide the prior room/apartment #:",
          fields: [
            {
              id: "prior-room",
              label: "Prior room/apartment #",
              type: "text",
              placeholder: "e.g., 112-A",
            },
          ],
        },
        {
          optionId: "no",
          heading: "Additional details (if applicable)",
          offForm: true,
          fields: [
            { id: "room-moved-on", label: "Date moved", type: "date", optional: true },
            {
              id: "room-move-reason",
              label: "Reason for move",
              type: "text",
              optional: true,
              placeholder: "e.g., Care needs changed",
            },
          ],
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Tips for this question",
          tone: "green",
          bullets: [
            "Answer Yes only if the resident never changed rooms during the month.",
            "If they moved, list the room they moved from — not the current one.",
            "Room numbers should match your invoice.",
          ],
        },
        {
          id: "t2",
          title: "Example",
          tone: "blue",
          facts: [
            { label: "Prior room", value: "112-A" },
            { label: "Date moved", value: "08/12/2026" },
            { label: "Reason", value: "Care needs changed" },
          ],
        },
        {
          id: "t3",
          title: "Common mistakes",
          tone: "amber",
          bullets: [
            "Entering the current room instead of the prior room.",
            "Leaving the date of the move blank.",
            "Marking Yes after a temporary room change.",
          ],
        },
        {
          ...STILL_NOT_SURE,
          id: "t4",
          body: "If a room change was brief (for example, maintenance), check with your administrator before answering.",
        },
      ],
    },
    {
      id: "care-level",
      number: 2,
      shortLabel: "Level of Care",
      title: "What level of care did the resident receive this month?",
      helper:
        "Select the one that best describes the care provided for most of the month.",
      options: [
        {
          id: "alz-secured",
          icon: "lock",
          label: "Alzheimer's / Dementia Care — Secured",
          description: "Specialized memory care in a secured unit",
        },
        {
          id: "alz-open",
          icon: "lock-open",
          label: "Alzheimer's / Dementia Care — Non-Secured",
          description: "Memory care in a non-secured setting",
        },
        {
          id: "al-secured",
          icon: "shield-check",
          label: "Assisted Living — Secured",
          description: "Assisted living in a secured unit",
        },
        {
          id: "al-open",
          icon: "shield",
          label: "Assisted Living — Non-Secured",
          description: "Assisted living in a non-secured setting",
        },
        {
          id: "independent",
          icon: "house",
          label: "Independent Living Apartment or Unit",
          description: "Resident lives independently with limited support",
        },
        {
          id: "snf",
          icon: "stethoscope",
          label: "Skilled Nursing Facility",
          description: "24-hour skilled nursing care",
        },
        {
          id: "icf",
          icon: "persons",
          label: "Intermediate Care Facility",
          description: "Ongoing nursing supervision and personal care",
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Tips for this question",
          tone: "green",
          bullets: [
            "Choose the single level of care that applies for most of the month.",
            "“Secured” means the unit has controlled exits for resident safety.",
            "Match the resident's current care plan and your invoice.",
          ],
        },
        {
          id: "t2",
          title: "Example",
          tone: "blue",
          body: "A resident living in a locked memory-care wing → Alzheimer's / Dementia Care — Secured.",
        },
        {
          id: "t3",
          title: "Common mistakes",
          tone: "amber",
          bullets: [
            "Choosing Assisted Living when the resident lives in memory care.",
            "Selecting more than one level of care.",
            "Using a level that differs from the invoice.",
          ],
        },
        {
          ...STILL_NOT_SURE,
          id: "t4",
          body: "Ask your care director to confirm the level of care on the current care plan.",
        },
      ],
    },
    {
      id: "away",
      number: 3,
      shortLabel: "Away From Facility Overnight",
      title: "Was the resident away from the facility overnight this month?",
      helper:
        "This helps us confirm days of care and avoid paying for days the resident wasn't in residence.",
      options: [
        { id: "yes", label: "Yes" },
        { id: "no", label: "No" },
      ],
      followUps: [
        {
          optionId: "yes",
          heading: "If yes, provide the following information:",
          fields: [
            { id: "away-departure", label: "Departure date", type: "date" },
            { id: "away-return", label: "Return date", type: "date" },
            {
              id: "away-reason",
              label: "Reason for absence",
              type: "select",
              placeholder: "Select reason",
              options: [
                "Hospitalization",
                "Family visit",
                "Medical appointment / procedure",
                "Other",
              ],
            },
          ],
        },
        {
          optionId: "yes",
          when: { fieldId: "away-reason", value: "Hospitalization" },
          heading: "Hospital stay — provide the admission and discharge dates:",
          fields: [
            { id: "away-admit", label: "Admission date", type: "date" },
            { id: "away-discharge", label: "Discharge date", type: "date" },
          ],
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Tips – Important!",
          tone: "green",
          bullets: [
            "Overnight means the resident was away past midnight.",
            "Include hospital stays, family visits, and any other overnight absence.",
            "Report the absence even if the bed was held.",
          ],
        },
        {
          id: "t2",
          title: "Example",
          tone: "blue",
          facts: [
            { label: "Departure", value: "08/03/2026" },
            { label: "Return", value: "08/07/2026" },
            { label: "Reason", value: "Hospitalization" },
          ],
        },
        {
          id: "t3",
          title: "Common mistakes",
          tone: "amber",
          bullets: [
            "Forgetting the admission and discharge dates for a hospital stay.",
            "A return date earlier than the departure date.",
            "Answering No when the resident had a hospital stay.",
          ],
        },
        {
          ...STILL_NOT_SURE,
          id: "t4",
          body: "Check the resident's sign-out log or nursing notes for exact dates.",
        },
      ],
    },
    {
      id: "insurance",
      number: 4,
      shortLabel: "Insurance Information",
      title: "Did Medicare, Medicaid, or other insurance pay for this care?",
      helper:
        "We need to know who else paid so benefits are coordinated correctly.",
      notice:
        "If other insurance is not paying this facility for this care, do not include it here.",
      options: [
        { id: "none", label: "No — no other insurance paid" },
        {
          id: "medicare",
          label: "Medicare",
          description: "Attach the EOMB or UB-04 for the month",
        },
        {
          id: "medicaid",
          label: "Medicaid / MediCal",
          description: "Provide the case worker's contact details",
        },
        {
          id: "other",
          label: "Other insurance",
          description: "Provide the insurer and policy details",
        },
      ],
      followUps: [
        {
          optionId: "medicare",
          heading: "Medicare — provide the coverage dates:",
          note: "Attach a copy of the Explanation of Medicare Benefits (EOMB) or UB-04.",
          fields: [
            {
              id: "medicare-dates",
              label: "Dates of 100% Medicare coverage",
              type: "text",
              placeholder: "e.g., 08/01/2026 – 08/14/2026",
            },
          ],
        },
        {
          optionId: "medicaid",
          heading: "Medicaid / MediCal — case worker information:",
          fields: [
            {
              id: "medicaid-worker",
              label: "Case worker name",
              type: "text",
              placeholder: "Full name",
            },
            {
              id: "medicaid-phone",
              label: "Phone",
              type: "text",
              placeholder: "(555) 555-5555",
            },
            {
              id: "medicaid-fax",
              label: "Fax",
              type: "text",
              optional: true,
              placeholder: "(555) 555-5555",
            },
            {
              id: "medicaid-office",
              label: "Office",
              type: "text",
              placeholder: "County / office name",
            },
          ],
        },
        {
          optionId: "other",
          heading: "Other insurance — provide the following:",
          fields: [
            {
              id: "other-insurer",
              label: "Insurance company",
              type: "text",
              placeholder: "Company name",
            },
            {
              id: "other-policy",
              label: "Policy number",
              type: "text",
              placeholder: "Policy #",
            },
            {
              id: "other-address",
              label: "Address",
              type: "text",
              placeholder: "Street, city, state, ZIP",
            },
            {
              id: "other-phone",
              label: "Phone",
              type: "text",
              placeholder: "(555) 555-5555",
            },
          ],
        },
      ],
      tips: [
        {
          id: "t1",
          title: "Tips for this question",
          tone: "green",
          bullets: [
            "Only list insurance that is actually paying this facility for this care.",
            "Medicare: attach the EOMB or UB-04 and list the 100% coverage dates.",
            "Medicaid / MediCal: give the case worker contact so we can verify.",
          ],
        },
        {
          id: "t2",
          title: "Example",
          tone: "blue",
          facts: [
            { label: "Insurer", value: "Aetna Senior Care" },
            { label: "Policy #", value: "AET-554821" },
            { label: "Phone", value: "(800) 555-0142" },
          ],
        },
        {
          id: "t3",
          title: "Common mistakes",
          tone: "amber",
          bullets: [
            "Listing insurance that isn't paying this facility.",
            "Missing the policy number or insurer phone.",
            "Forgetting to attach the EOMB / UB-04 for Medicare.",
          ],
        },
        {
          ...STILL_NOT_SURE,
          id: "t4",
          body: "Verify coverage with the billing office before selecting an insurer.",
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
      description: "Include the resident's full name and facility ID / MRN.",
      example: "Mary Johnson · RES-2048",
    },
    {
      id: "inv4",
      title: "4. Facility Details",
      description: "Show the facility name, address, and billing contact.",
      example: "Sunrise Assisted Living · Austin, TX",
    },
  ],
  invoiceTips: [
    {
      id: "t1",
      title: "Tip – Important!",
      tone: "green",
      bullets: [
        "Invoice dates must match the CMR dates exactly.",
        "One invoice per resident per month.",
      ],
    },
    {
      id: "t2",
      title: "Example",
      tone: "blue",
      facts: [
        { label: "Service dates", value: "08/01/2026 – 08/31/2026" },
        { label: "Charge", value: "Room & Board — $4,200.00" },
      ],
    },
    {
      id: "t3",
      title: "Common mistakes",
      tone: "amber",
      bullets: [
        "Invoice covers a different month than the CMR.",
        "Resident name spelled differently than on the policy.",
      ],
    },
    {
      ...STILL_NOT_SURE,
      id: "t4",
      body: "Not sure the invoice is right? Ask support to check it before you submit.",
    },
  ],
  invoiceChecklist: [
    "Date range matches claim period",
    "Room and board line item present",
    "Resident name and ID visible",
    "Facility name and address shown",
  ],
  signatureTips: [
    "Sign and date the form by hand every month — never reuse a previous signature.",
    "Print the form from “View Full Form”, sign it, then attach it to the invoice.",
    "The date must be the day you sign, not the first of the month.",
  ],
};

export async function fetchClaimWalkthrough(): Promise<ClaimWalkthroughData> {
  await new Promise((resolve) => setTimeout(resolve, 400));
  return CLAIM_WALKTHROUGH;
}
