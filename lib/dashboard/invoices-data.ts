export type InvoiceStatus = "matched" | "pending-review" | "missing" | "overdue";

export type Invoice = {
  id: string;
  invoiceId: string;
  residentName: string;
  invoiceDate: string;
  servicePeriod: string;
  amount: string;
  status: InvoiceStatus;
  matchedClaim: string | null;
};

export type InvoiceStat = {
  id: string;
  label: string;
  value: number;
  tone: "accent" | "success" | "warning" | "danger" | "default";
};

export type InvoicesPageData = {
  stats: InvoiceStat[];
  invoices: Invoice[];
};

export const INVOICE_STATUS_CONFIG: Record<
  InvoiceStatus,
  { label: string; color: "success" | "warning" | "danger" | "accent" }
> = {
  matched: { label: "Matched", color: "success" },
  "pending-review": { label: "Pending Review", color: "warning" },
  missing: { label: "Missing", color: "danger" },
  overdue: { label: "Overdue", color: "danger" },
};

export const INVOICES_DATA: InvoicesPageData = {
  stats: [
    { id: "total", label: "Total Invoices", value: 64, tone: "accent" },
    { id: "matched", label: "Matched to Claims", value: 42, tone: "success" },
    { id: "pending", label: "Pending Review", value: 12, tone: "warning" },
    { id: "missing", label: "Missing Invoices", value: 10, tone: "danger" },
    { id: "overdue", label: "Overdue Invoices", value: 3, tone: "danger" },
  ],
  invoices: [
    {
      id: "i1",
      invoiceId: "INV-2026-064",
      residentName: "Mary Johnson",
      invoiceDate: "08/18/2026",
      servicePeriod: "08/01/2026 – 08/31/2026",
      amount: "$4,850.00",
      status: "matched",
      matchedClaim: "CLM-2026-046",
    },
    {
      id: "i2",
      invoiceId: "INV-2026-063",
      residentName: "Robert Williams",
      invoiceDate: "08/17/2026",
      servicePeriod: "08/01/2026 – 08/31/2026",
      amount: "$3,220.00",
      status: "pending-review",
      matchedClaim: null,
    },
    {
      id: "i3",
      invoiceId: "INV-2026-062",
      residentName: "Gloria Chen",
      invoiceDate: "08/16/2026",
      servicePeriod: "08/01/2026 – 08/31/2026",
      amount: "$2,940.00",
      status: "missing",
      matchedClaim: null,
    },
    {
      id: "i4",
      invoiceId: "INV-2026-061",
      residentName: "Harold Freeman",
      invoiceDate: "08/15/2026",
      servicePeriod: "08/01/2026 – 08/31/2026",
      amount: "$5,100.00",
      status: "matched",
      matchedClaim: "CLM-2026-041",
    },
    {
      id: "i5",
      invoiceId: "INV-2026-060",
      residentName: "Lara Mensah",
      invoiceDate: "08/14/2026",
      servicePeriod: "07/01/2026 – 07/31/2026",
      amount: "$4,100.00",
      status: "overdue",
      matchedClaim: "CLM-2026-038",
    },
    {
      id: "i6",
      invoiceId: "INV-2026-059",
      residentName: "Amanda Brown",
      invoiceDate: "08/13/2026",
      servicePeriod: "08/01/2026 – 08/31/2026",
      amount: "$3,780.00",
      status: "matched",
      matchedClaim: "CLM-2026-040",
    },
    {
      id: "i7",
      invoiceId: "INV-2026-058",
      residentName: "Chidi Okonkwo",
      invoiceDate: "08/12/2026",
      servicePeriod: "08/01/2026 – 08/31/2026",
      amount: "$4,450.00",
      status: "pending-review",
      matchedClaim: null,
    },
    {
      id: "i8",
      invoiceId: "INV-2026-057",
      residentName: "Sofia Alvarez",
      invoiceDate: "08/11/2026",
      servicePeriod: "07/01/2026 – 07/31/2026",
      amount: "$3,960.00",
      status: "matched",
      matchedClaim: "CLM-2026-035",
    },
  ],
};

export async function fetchInvoices(): Promise<InvoicesPageData> {
  await new Promise((resolve) => setTimeout(resolve, 550));
  return INVOICES_DATA;
}
