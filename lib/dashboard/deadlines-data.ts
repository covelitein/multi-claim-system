export type DeadlinePriority = "overdue" | "today" | "this-week" | "upcoming";

export type Deadline = {
  id: string;
  title: string;
  residentName: string;
  residentImage: string;
  residentInitials: string;
  claimId: string;
  dueDate: string;
  priority: DeadlinePriority;
  type: string;
  facility: string;
};

export type DeadlineStat = {
  id: string;
  label: string;
  value: number;
  tone: "danger" | "warning" | "accent" | "success";
};

export type DeadlinesPageData = {
  stats: DeadlineStat[];
  deadlines: Deadline[];
};

export const DEADLINES_DATA: DeadlinesPageData = {
  stats: [
    { id: "overdue", label: "Overdue", value: 5, tone: "danger" },
    { id: "today", label: "Due Today", value: 3, tone: "warning" },
    { id: "this-week", label: "Due This Week", value: 12, tone: "accent" },
    { id: "upcoming", label: "Upcoming (30 days)", value: 28, tone: "success" },
  ],
  deadlines: [
    {
      id: "d1",
      title: "Signed 485 required for Medicaid submission",
      residentName: "Amanda Brown",
      residentImage: "https://i.pravatar.cc/80?img=47",
      residentInitials: "AB",
      claimId: "CLM-2024-0142",
      dueDate: "2024-07-01",
      priority: "overdue",
      type: "Document Signature",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "d2",
      title: "Prior authorization renewal",
      residentName: "Chidi Okonkwo",
      residentImage: "https://i.pravatar.cc/80?img=12",
      residentInitials: "CO",
      claimId: "CLM-2024-0141",
      dueDate: "2024-07-02",
      priority: "overdue",
      type: "Authorization",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "d3",
      title: "Face sheet upload required",
      residentName: "Amanda Brown",
      residentImage: "https://i.pravatar.cc/80?img=47",
      residentInitials: "AB",
      claimId: "CLM-2024-0142",
      dueDate: "2024-07-03",
      priority: "today",
      type: "Missing Document",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "d4",
      title: "MDS packet due for quarterly review",
      residentName: "Lara Mensah",
      residentImage: "https://i.pravatar.cc/80?img=32",
      residentInitials: "LM",
      claimId: "CLM-2024-0140",
      dueDate: "2024-07-03",
      priority: "today",
      type: "Recertification",
      facility: "Oakview SNF",
    },
    {
      id: "d5",
      title: "Physician signature needed on care plan",
      residentName: "Ibrahim Bello",
      residentImage: "https://i.pravatar.cc/80?img=53",
      residentInitials: "IB",
      claimId: "CLM-2024-0137",
      dueDate: "2024-07-03",
      priority: "today",
      type: "Document Signature",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "d6",
      title: "Level-of-care assessment due",
      residentName: "Ibrahim Bello",
      residentImage: "https://i.pravatar.cc/80?img=53",
      residentInitials: "IB",
      claimId: "CLM-2024-0137",
      dueDate: "2024-07-05",
      priority: "this-week",
      type: "Assessment",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "d7",
      title: "Invoice finalization pending",
      residentName: "Gloria Chen",
      residentImage: "https://i.pravatar.cc/80?img=5",
      residentInitials: "GC",
      claimId: "CLM-2024-0138",
      dueDate: "2024-07-06",
      priority: "this-week",
      type: "Billing",
      facility: "Oakview SNF",
    },
    {
      id: "d8",
      title: "Appeal deadline for denied claim",
      residentName: "Chidi Okonkwo",
      residentImage: "https://i.pravatar.cc/80?img=12",
      residentInitials: "CO",
      claimId: "CLM-2024-0141",
      dueDate: "2024-07-08",
      priority: "this-week",
      type: "Appeal",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "d9",
      title: "Recertification packet due",
      residentName: "Robert Jackson",
      residentImage: "https://i.pravatar.cc/80?img=60",
      residentInitials: "RJ",
      claimId: "CLM-2024-0139",
      dueDate: "2024-07-15",
      priority: "upcoming",
      type: "Recertification",
      facility: "Sunrise Assisted Living",
    },
    {
      id: "d10",
      title: "Monthly Medicaid claim submission window",
      residentName: "Mary Torres",
      residentImage: "https://i.pravatar.cc/80?img=44",
      residentInitials: "MT",
      claimId: "CLM-2024-0136",
      dueDate: "2024-07-20",
      priority: "upcoming",
      type: "Submission Window",
      facility: "Maple Ridge Care",
    },
    {
      id: "d11",
      title: "Care plan review meeting",
      residentName: "Sofia Alvarez",
      residentImage: "https://i.pravatar.cc/80?img=23",
      residentInitials: "SA",
      claimId: "CLM-2024-0134",
      dueDate: "2024-07-22",
      priority: "upcoming",
      type: "Review",
      facility: "Maple Ridge Care",
    },
  ],
};

export async function fetchDeadlines(): Promise<DeadlinesPageData> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  return DEADLINES_DATA;
}
