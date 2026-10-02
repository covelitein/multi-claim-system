export type ContactRole =
  | "Insurer claims"
  | "Facility referral"
  | "Resident family"
  | "Vendor"
  | "Other";

export type ClientContact = {
  id: string;
  name: string;
  organization: string;
  role: ContactRole | string;
  email: string;
  phone: string;
  notes: string;
  lastContacted: string;
};

export type ContactsPageData = {
  contacts: ClientContact[];
};

export const CONTACTS_DATA: ContactsPageData = {
  contacts: [
    {
      id: "ct1",
      name: "Claims Desk — Illumifin",
      organization: "Illumifin",
      role: "Insurer claims",
      email: "claims@illumifin.example",
      phone: "(800) 555-2100",
      notes: "Primary LTC claims processor contact.",
      lastContacted: "2026-09-12",
    },
    {
      id: "ct2",
      name: "Provider Relations — Genworth",
      organization: "Genworth",
      role: "Insurer claims",
      email: "providers@genworth.example",
      phone: "(800) 555-2201",
      notes: "Ask for LTC facility billing queue.",
      lastContacted: "2026-09-08",
    },
    {
      id: "ct3",
      name: "Janet Morrison",
      organization: "Sunrise Assisted Living",
      role: "Facility referral",
      email: "jmorrison@sunriseal.com",
      phone: "(512) 555-0100",
      notes: "Facility billing lead.",
      lastContacted: "2026-09-15",
    },
    {
      id: "ct4",
      name: "David Okoye (son)",
      organization: "Family — Ada Okoye",
      role: "Resident family",
      email: "dokoye@email.example",
      phone: "(512) 555-4411",
      notes: "Authorized for billing questions.",
      lastContacted: "2026-08-30",
    },
    {
      id: "ct5",
      name: "John Hancock LTC Claims",
      organization: "John Hancock",
      role: "Insurer claims",
      email: "ltc.claims@johnhancock.example",
      phone: "(800) 555-3302",
      notes: "CMR packet submissions.",
      lastContacted: "2026-09-01",
    },
    {
      id: "ct6",
      name: "Supply Desk — MediLine",
      organization: "MediLine Supplies",
      role: "Vendor",
      email: "orders@mediline.example",
      phone: "(512) 555-7788",
      notes: "Ostomy and incontinence supplies.",
      lastContacted: "2026-07-22",
    },
  ],
};

export async function fetchContacts(): Promise<ContactsPageData> {
  await new Promise((r) => setTimeout(r, 300));
  return CONTACTS_DATA;
}
