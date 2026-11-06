"use client";

import type { Claim, ClaimStatus } from "@/lib/dashboard/claims-data";
import type { Invoice } from "@/lib/dashboard/invoices-data";
import type { Resident } from "@/lib/dashboard/residents-data";
import { create } from "zustand";

/** Status of one piece of work tied to a resident and claim. From the Gen 1 demo. */
export type RequestStatus =
  | "In Progress"
  | "Missing Docs"
  | "Ready for Review"
  | "Submitted"
  | "Completed";

export type WorkRequest = {
  id: string;
  residentId: string;
  residentName: string;
  type: string;
  status: RequestStatus;
  next: string;
  created: string;
  policyId: string;
  /** Claim this request belongs to. Absent only for requests created before a claim id existed. */
  claimId?: string;
};

export type EliminationPeriod = {
  type: "Service Days" | "Calendar Days";
  required: number;
  accrued: number;
};

export const NEXT_ACTIONS = [
  "Answer CMR questions",
  "Complete CMR review",
  "Upload invoice",
  "Review supporting documents",
  "Review claim and documents",
  "Prepare submission checklist",
  "Await carrier response",
  "Complete",
] as const;

const SEED_REQUESTS: WorkRequest[] = [
  {
    id: "REQ-10048",
    residentId: "RES-2048",
    residentName: "Mary Johnson",
    type: "CMR",
    status: "In Progress",
    next: "Complete CMR review",
    created: "2026-08-18",
    policyId: "POL-GNW-2048",
    claimId: "CLM-2026-046",
  },
  {
    id: "REQ-10044",
    residentId: "RES-1982",
    residentName: "Robert Williams",
    type: "CMR",
    status: "Missing Docs",
    next: "Upload invoice",
    created: "2026-08-17",
    policyId: "POL-JHN-1982",
    claimId: "CLM-2026-044",
  },
];

export function defaultElimination(residentId: string): EliminationPeriod {
  if (residentId === "RES-2048") {
    return { type: "Service Days", required: 90, accrued: 42 };
  }
  if (residentId === "RES-1982") {
    return { type: "Calendar Days", required: 90, accrued: 90 };
  }
  return { type: "Service Days", required: 90, accrued: 30 };
}

export type WorkspaceDocument = {
  id: string;
  name: string;
  residentName: string;
  kind: string;
  date: string;
};

export type WorkspaceMessage = {
  id: string;
  to: string;
  text: string;
  date: string;
};

export type WorkspaceInvite = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export type WorkspaceToast = { id: number; text: string };

const emptyExtras = () => ({
  claimStatusByResident: {} as Record<string, ClaimStatus>,
  elimination: {} as Record<string, EliminationPeriod>,
  reviewedResidents: {} as Record<string, boolean>,
  documents: [] as WorkspaceDocument[],
  messages: [] as WorkspaceMessage[],
  invites: [] as WorkspaceInvite[],
  addedResidents: [] as Resident[],
  addedInvoices: [] as Invoice[],
  addedClaims: [] as Claim[],
  submissionStatus: {} as Record<string, string>,
  /** Date written when a claim-details status is saved. */
  submissionUpdated: {} as Record<string, string>,
});

type WorkspaceState = {
  requests: WorkRequest[];
  /** Claim status changes made in this session, keyed by resident name. */
  claimStatusByResident: Record<string, ClaimStatus>;
  elimination: Record<string, EliminationPeriod>;
  reviewedResidents: Record<string, boolean>;
  documents: WorkspaceDocument[];
  messages: WorkspaceMessage[];
  invites: WorkspaceInvite[];
  addedResidents: Resident[];
  addedInvoices: Invoice[];
  addedClaims: Claim[];
  /** Status saved from a claim-details window, keyed by claim number. */
  submissionStatus: Record<string, string>;
  submissionUpdated: Record<string, string>;
  toast: WorkspaceToast | null;
  showToast: (text: string) => void;
  clearToast: () => void;
  addRequest: (request: Omit<WorkRequest, "id" | "created">) => string;
  updateRequest: (
    id: string,
    patch: Partial<Pick<WorkRequest, "status" | "next">>,
  ) => void;
  setClaimStatus: (residentName: string, status: ClaimStatus) => void;
  saveElimination: (residentId: string, period: EliminationPeriod) => void;
  /** Finishing the CMR moves that resident's open request to review. */
  markCmrReviewed: (residentId: string, residentName: string) => void;
  addDocument: (doc: Omit<WorkspaceDocument, "id" | "date">) => void;
  addMessage: (message: Omit<WorkspaceMessage, "id" | "date">) => void;
  inviteMember: (invite: Omit<WorkspaceInvite, "id">) => void;
  addResident: (resident: Resident) => void;
  addInvoice: (invoice: Invoice) => void;
  addClaim: (claim: Claim) => void;
  setSubmissionStatus: (claimId: string, status: string) => void;
  resetDemo: () => void;
};

function today() {
  return new Date().toISOString().slice(0, 10);
}

export const useWorkspace = create<WorkspaceState>((set) => ({
  requests: SEED_REQUESTS.map((request) => ({ ...request })),
  ...emptyExtras(),
  toast: null,
  showToast: (text) => set({ toast: { id: Date.now(), text } }),
  clearToast: () => set({ toast: null }),
  addRequest: (request) => {
    const id = `REQ-${10049 + Math.floor(Math.random() * 800)}`;
    set((state) => ({
      requests: [
        {
          ...request,
          id,
          created: new Date().toISOString().slice(0, 10),
        },
        ...state.requests,
      ],
    }));
    return id;
  },
  updateRequest: (id, patch) =>
    set((state) => ({
      requests: state.requests.map((request) =>
        request.id === id ? { ...request, ...patch } : request,
      ),
    })),
  setClaimStatus: (residentName, status) =>
    set((state) => ({
      claimStatusByResident: {
        ...state.claimStatusByResident,
        [residentName]: status,
      },
    })),
  saveElimination: (residentId, period) =>
    set((state) => ({
      elimination: { ...state.elimination, [residentId]: period },
    })),
  markCmrReviewed: (residentId, residentName) =>
    set((state) => ({
      reviewedResidents: { ...state.reviewedResidents, [residentId]: true },
      claimStatusByResident: {
        ...state.claimStatusByResident,
        [residentName]: "ready-for-review",
      },
      requests: state.requests.map((request) =>
        request.residentId === residentId && request.status !== "Completed"
          ? {
              ...request,
              status: "Ready for Review",
              next: "Review claim and documents",
            }
          : request,
      ),
    })),
  addDocument: (doc) =>
    set((state) => ({
      documents: [
        { ...doc, id: `doc-${Date.now()}`, date: today() },
        ...state.documents,
      ],
    })),
  addMessage: (message) =>
    set((state) => ({
      messages: [
        { ...message, id: `msg-${Date.now()}`, date: today() },
        ...state.messages,
      ],
    })),
  inviteMember: (invite) =>
    set((state) => ({
      invites: [{ ...invite, id: `inv-${Date.now()}` }, ...state.invites],
    })),
  addResident: (resident) =>
    set((state) => ({ addedResidents: [resident, ...state.addedResidents] })),
  addInvoice: (invoice) =>
    set((state) => ({ addedInvoices: [invoice, ...state.addedInvoices] })),
  addClaim: (claim) =>
    set((state) => ({ addedClaims: [claim, ...state.addedClaims] })),
  setSubmissionStatus: (claimId, status) =>
    set((state) => ({
      submissionStatus: { ...state.submissionStatus, [claimId]: status },
      submissionUpdated: { ...state.submissionUpdated, [claimId]: today() },
    })),
  resetDemo: () =>
    set({
      requests: SEED_REQUESTS.map((request) => ({ ...request })),
      ...emptyExtras(),
      toast: { id: Date.now(), text: "Demo reset. Sample data restored." },
    }),
}));
