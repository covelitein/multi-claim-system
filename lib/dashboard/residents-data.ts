export type ResidentStatus = "active" | "inactive" | "pending" | "on-hold";

export type Resident = {
  id: string;
  residentId: string;
  firstName: string;
  lastName: string;
  dob: string;
  age: number;
  phone: string;
  payer: string;
  facility: string;
  status: ResidentStatus;
  admitDate: string;
  activeClaims: number;
  pendingRequests: number;
  lastClaim: string | null;
  image: string;
  initials: string;
};

export type ResidentStat = {
  id: string;
  label: string;
  value: number;
  tone: "accent" | "success" | "warning" | "danger";
};

export type ResidentsPageData = {
  stats: ResidentStat[];
  residents: Resident[];
};

export const RESIDENTS_DATA: ResidentsPageData = {
  stats: [
    { id: "total", label: "Total Residents", value: 86, tone: "accent" },
    { id: "active", label: "Active Residents", value: 72, tone: "success" },
    { id: "inactive", label: "Inactive Residents", value: 14, tone: "danger" },
    {
      id: "pending-claims",
      label: "Residents with Pending Claims",
      value: 18,
      tone: "warning",
    },
  ],
  residents: [
    {
      id: "r1",
      residentId: "RES-2048",
      firstName: "Mary",
      lastName: "Johnson",
      dob: "1945-03-12",
      age: 81,
      phone: "(555) 234-5678",
      payer: "Genworth",
      facility: "Sunrise Assisted Living",
      status: "active",
      admitDate: "2023-01-15",
      activeClaims: 2,
      pendingRequests: 1,
      lastClaim: "CLM-2026-046",
      image: "https://i.pravatar.cc/80?img=47",
      initials: "MJ",
    },
    {
      id: "r2",
      residentId: "RES-1982",
      firstName: "Robert",
      lastName: "Williams",
      dob: "1941-08-24",
      age: 84,
      phone: "(555) 345-6789",
      payer: "John Hancock",
      facility: "Sunrise Assisted Living",
      status: "active",
      admitDate: "2022-11-03",
      activeClaims: 1,
      pendingRequests: 0,
      lastClaim: "CLM-2026-044",
      image: "https://i.pravatar.cc/80?img=12",
      initials: "RW",
    },
    {
      id: "r3",
      residentId: "RES-2110",
      firstName: "Gloria",
      lastName: "Chen",
      dob: "1944-02-28",
      age: 82,
      phone: "(555) 678-9012",
      payer: "Illumifin",
      facility: "Oakview SNF",
      status: "active",
      admitDate: "2023-02-18",
      activeClaims: 3,
      pendingRequests: 2,
      lastClaim: "CLM-2026-042",
      image: "https://i.pravatar.cc/80?img=5",
      initials: "GC",
    },
    {
      id: "r4",
      residentId: "RES-1875",
      firstName: "Harold",
      lastName: "Freeman",
      dob: "1942-01-07",
      age: 84,
      phone: "(555) 123-4567",
      payer: "John Hancock",
      facility: "Sunrise Assisted Living",
      status: "active",
      admitDate: "2022-12-20",
      activeClaims: 1,
      pendingRequests: 0,
      lastClaim: "CLM-2026-041",
      image: "https://i.pravatar.cc/80?img=57",
      initials: "HF",
    },
    {
      id: "r5",
      residentId: "RES-1760",
      firstName: "Lara",
      lastName: "Mensah",
      dob: "1949-06-30",
      age: 77,
      phone: "(555) 456-7890",
      payer: "Genworth",
      facility: "Oakview SNF",
      status: "active",
      admitDate: "2023-04-22",
      activeClaims: 2,
      pendingRequests: 1,
      lastClaim: "CLM-2026-038",
      image: "https://i.pravatar.cc/80?img=32",
      initials: "LM",
    },
    {
      id: "r6",
      residentId: "RES-1654",
      firstName: "Amanda",
      lastName: "Brown",
      dob: "1945-03-12",
      age: 81,
      phone: "(555) 234-5678",
      payer: "Genworth",
      facility: "Sunrise Assisted Living",
      status: "active",
      admitDate: "2023-01-15",
      activeClaims: 1,
      pendingRequests: 0,
      lastClaim: "CLM-2026-040",
      image: "https://i.pravatar.cc/80?img=44",
      initials: "AB",
    },
    {
      id: "r7",
      residentId: "RES-1540",
      firstName: "Chidi",
      lastName: "Okonkwo",
      dob: "1941-08-24",
      age: 84,
      phone: "(555) 345-6789",
      payer: "John Hancock",
      facility: "Sunrise Assisted Living",
      status: "inactive",
      admitDate: "2022-11-03",
      activeClaims: 0,
      pendingRequests: 1,
      lastClaim: "CLM-2026-030",
      image: "https://i.pravatar.cc/80?img=53",
      initials: "CO",
    },
    {
      id: "r8",
      residentId: "RES-1422",
      firstName: "Sofia",
      lastName: "Alvarez",
      dob: "1950-09-22",
      age: 75,
      phone: "(555) 012-3456",
      payer: "Illumifin",
      facility: "Maple Ridge Care",
      status: "active",
      admitDate: "2023-06-14",
      activeClaims: 1,
      pendingRequests: 0,
      lastClaim: "CLM-2026-035",
      image: "https://i.pravatar.cc/80?img=23",
      initials: "SA",
    },
  ],
};

export async function fetchResidents(): Promise<ResidentsPageData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return RESIDENTS_DATA;
}
