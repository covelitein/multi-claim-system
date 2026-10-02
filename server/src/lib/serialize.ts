import type {
  Claim,
  ClaimStatus,
  Facility,
  Invoice,
  InvoiceStatus,
  Resident,
  ResidentStatus,
  User,
} from "@prisma/client";

const CLAIM_STATUS_API: Record<ClaimStatus, string> = {
  in_progress: "in-progress",
  missing_docs: "missing-docs",
  ready_for_review: "ready-for-review",
  submitted: "submitted",
  denied: "denied",
  paid: "paid",
};

const CLAIM_STATUS_DB: Record<string, ClaimStatus> = {
  "in-progress": "in_progress",
  "missing-docs": "missing_docs",
  "ready-for-review": "ready_for_review",
  submitted: "submitted",
  denied: "denied",
  paid: "paid",
};

const INVOICE_STATUS_API: Record<InvoiceStatus, string> = {
  matched: "matched",
  pending_review: "pending-review",
  missing: "missing",
  overdue: "overdue",
};

const INVOICE_STATUS_DB: Record<string, InvoiceStatus> = {
  matched: "matched",
  "pending-review": "pending_review",
  missing: "missing",
  overdue: "overdue",
};

const RESIDENT_STATUS_API: Record<ResidentStatus, string> = {
  active: "active",
  inactive: "inactive",
  pending: "pending",
  on_hold: "on-hold",
};

const RESIDENT_STATUS_DB: Record<string, ResidentStatus> = {
  active: "active",
  inactive: "inactive",
  pending: "pending",
  "on-hold": "on_hold",
};

export function toClaimStatus(value: string): ClaimStatus | undefined {
  return CLAIM_STATUS_DB[value];
}

export function toInvoiceStatus(value: string): InvoiceStatus | undefined {
  return INVOICE_STATUS_DB[value];
}

export function toResidentStatus(value: string): ResidentStatus | undefined {
  return RESIDENT_STATUS_DB[value];
}

function ageFromDob(dob: Date) {
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age -= 1;
  return age;
}

function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

function formatMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(cents / 100);
}

function formatDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}

export function serializeFacility(facility: Facility) {
  return {
    id: facility.id,
    legalName: facility.legalName,
    displayName: facility.displayName,
    type: facility.type,
    licenseNumber: facility.licenseNumber,
    country: facility.country,
    city: facility.city,
    address: facility.address,
    plan: facility.plan,
  };
}

export function serializeUser(
  user: User,
  facility?: Facility | null,
) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    name: `${user.firstName} ${user.lastName}`,
    jobTitle: user.jobTitle,
    phone: user.phone,
    role: user.role,
    status: user.status,
    facilityId: user.facilityId,
    image: user.image,
    facility: facility ? serializeFacility(facility) : undefined,
  };
}

export function serializeResident(
  resident: Resident & {
    facility?: Facility;
    claims?: Claim[];
  },
) {
  const claims = resident.claims ?? [];
  const open = claims.filter(
    (c) => !["paid", "denied"].includes(c.status),
  );
  const last = [...claims].sort(
    (a, b) => b.updatedAt.getTime() - a.updatedAt.getTime(),
  )[0];

  return {
    id: resident.id,
    residentId: resident.residentId,
    firstName: resident.firstName,
    lastName: resident.lastName,
    dob: resident.dob.toISOString().slice(0, 10),
    age: ageFromDob(resident.dob),
    phone: resident.phone,
    payer: resident.payer,
    facility: resident.facility?.displayName ?? "",
    room: resident.room,
    status: RESIDENT_STATUS_API[resident.status],
    admitDate: resident.admitDate.toISOString().slice(0, 10),
    activeClaims: open.length,
    pendingRequests: claims.filter((c) => c.status === "missing_docs").length,
    lastClaim: last?.policyId ?? null,
    image: resident.image ?? `https://i.pravatar.cc/80?u=${resident.id}`,
    initials: initials(resident.firstName, resident.lastName),
  };
}

export function serializeClaim(
  claim: Claim & {
    resident?: Resident;
    facility?: Facility;
  },
) {
  const r = claim.resident;
  return {
    id: claim.id,
    policyId: claim.policyId,
    residentName: r ? `${r.firstName} ${r.lastName}` : "",
    residentImage: r?.image ?? `https://i.pravatar.cc/80?u=${claim.residentId}`,
    residentInitials: r ? initials(r.firstName, r.lastName) : "??",
    insurer: claim.insurer,
    billingPeriod: claim.billingPeriod,
    status: CLAIM_STATUS_API[claim.status],
    missingItems: claim.missingItems,
    lastUpdated: formatDate(claim.updatedAt),
    facility: claim.facility?.displayName ?? "",
    notes: claim.notes,
    amount: formatMoney(claim.amountCents),
    amountCents: claim.amountCents,
  };
}

export function serializeInvoice(
  invoice: Invoice & {
    resident?: Resident;
    matchedClaim?: Claim | null;
  },
) {
  const r = invoice.resident;
  return {
    id: invoice.id,
    invoiceId: invoice.invoiceId,
    residentName: r ? `${r.firstName} ${r.lastName}` : "",
    invoiceDate: formatDate(invoice.invoiceDate),
    servicePeriod: invoice.servicePeriod,
    amount: formatMoney(invoice.amountCents),
    status: INVOICE_STATUS_API[invoice.status],
    matchedClaim: invoice.matchedClaim?.policyId ?? null,
  };
}

export { formatMoney, formatDate, CLAIM_STATUS_API };
