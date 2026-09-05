export type ChartTone = "accent" | "warning" | "success" | "danger";

export type StatCard = {
  id: string;
  label: string;
  value: string;
  trend?: {
    label: string;
    tone: "success" | "danger";
    spark: number[];
  };
};

export type Intern = {
  id: string;
  name: string;
  initials: string;
  image: string;
};

export type VisitSeries = {
  id: string;
  label: string;
  tone: ChartTone;
  values: number[];
};

export type YearVisits = {
  year: string;
  series: VisitSeries[];
};

export type CalendarEvent = {
  date: string;
  label: string;
};

export type ScheduleDay = {
  date: string;
  hours: string;
  totalPatients: number;
};

export type Appointment = {
  id: string;
  date: string;
  time: string;
  diagnosis: string;
  patient: {
    name: string;
    age: number;
    initials: string;
    image: string;
  };
};

export type VisitStat = {
  day: string;
  value: number;
  percent: number;
  tone: ChartTone;
  pinned?: boolean;
};

export type DashboardHomeData = {
  defaultDate: string;
  defaultYear: string;
  months: string[];
  stats: StatCard[];
  interns: Intern[];
  internExtra: number;
  visits: YearVisits[];
  calendarEvents: CalendarEvent[];
  schedule: ScheduleDay[];
  appointments: Appointment[];
  visitStats: VisitStat[];
  visitStatsRange: string;
};

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DASHBOARD_HOME: DashboardHomeData = {
  defaultDate: "2023-08-09",
  defaultYear: "2023",
  months: MONTHS,
  stats: [
    { id: "open", label: "Open Claims", value: "142" },
    {
      id: "missing",
      label: "Missing Documents",
      value: "+38",
      trend: { label: "+4.11%", tone: "danger", spark: [12, 14, 13, 16, 18, 17, 21] },
    },
    {
      id: "ready",
      label: "Ready to Submit",
      value: "+64",
      trend: { label: "+2.34%", tone: "success", spark: [8, 9, 7, 10, 9, 11, 12] },
    },
    {
      id: "denied",
      label: "Denied / Returned",
      value: "+12",
      trend: { label: "+8.24%", tone: "danger", spark: [10, 11, 13, 12, 15, 16, 18] },
    },
  ],
  interns: [
    { id: "i1", name: "Maya Chen", initials: "MC", image: "https://i.pravatar.cc/80?img=5" },
    { id: "i2", name: "Ibrahim Bello", initials: "IB", image: "https://i.pravatar.cc/80?img=12" },
    { id: "i3", name: "Sofia Alvarez", initials: "SA", image: "https://i.pravatar.cc/80?img=32" },
  ],
  internExtra: 18,
  visits: [
    {
      year: "2023",
      series: [
        { id: "submitted", label: "Submitted", tone: "accent", values: [980, 1180, 1420, 1680, 1960, 2280, 2640, 3024, 2760, 2400, 2100, 1880] },
        { id: "paid", label: "Paid", tone: "success", values: [860, 1020, 1240, 1480, 1720, 1980, 2260, 2580, 2360, 2080, 1840, 1660] },
        { id: "denied", label: "Denied", tone: "danger", values: [420, 500, 580, 680, 760, 860, 980, 1120, 1020, 900, 800, 720] },
      ],
    },
    {
      year: "2024",
      series: [
        { id: "submitted", label: "Submitted", tone: "accent", values: [1100, 1280, 1520, 1760, 2040, 2320, 2680, 2960, 2700, 2440, 2140, 1960] },
        { id: "paid", label: "Paid", tone: "success", values: [940, 1100, 1320, 1560, 1800, 2040, 2320, 2600, 2380, 2120, 1880, 1700] },
        { id: "denied", label: "Denied", tone: "danger", values: [480, 560, 640, 740, 820, 920, 1040, 1180, 1080, 960, 860, 780] },
      ],
    },
    {
      year: "2025",
      series: [
        { id: "submitted", label: "Submitted", tone: "accent", values: [1240, 1460, 1680, 1880, 2140, 2380, 2680, 2980, 2720, 2460, 2180, 1980] },
        { id: "paid", label: "Paid", tone: "success", values: [1080, 1260, 1440, 1660, 1880, 2060, 2280, 2560, 2340, 2100, 1880, 1700] },
        { id: "denied", label: "Denied", tone: "danger", values: [560, 620, 700, 780, 860, 940, 1040, 1180, 1080, 980, 880, 800] },
      ],
    },
  ],
  calendarEvents: [
    { date: "2023-08-09", label: "MDS packet due" },
    { date: "2023-08-15", label: "Prior auth expires" },
    { date: "2023-08-16", label: "Appeal deadline" },
    { date: "2023-08-22", label: "Recert packet due" },
  ],
  schedule: [
    { date: "2023-08-07", hours: "10:00 am - 06:00 pm", totalPatients: 4 },
    { date: "2023-08-08", hours: "08:30 am - 04:30 pm", totalPatients: 5 },
    { date: "2023-08-09", hours: "09:30 am - 08:30 pm", totalPatients: 6 },
    { date: "2023-08-10", hours: "09:00 am - 05:00 pm", totalPatients: 7 },
    { date: "2023-08-11", hours: "11:00 am - 07:00 pm", totalPatients: 3 },
    { date: "2023-08-12", hours: "09:30 am - 04:00 pm", totalPatients: 4 },
    { date: "2023-08-13", hours: "10:00 am - 03:00 pm", totalPatients: 2 },
  ],
  appointments: [
    {
      id: "a1",
      date: "2023-08-09",
      time: "Due 09 Aug. at 11:30 am",
      diagnosis: "Missing signed 485 and face sheet before submit.",
      patient: {
        name: "Amanda Brown",
        age: 78,
        initials: "AB",
        image: "https://i.pravatar.cc/80?img=47",
      },
    },
    {
      id: "a2",
      date: "2023-08-09",
      time: "Due 09 Aug. at 02:15 pm",
      diagnosis: "Denied for incomplete prior authorization. Resubmit.",
      patient: {
        name: "Chidi Okonkwo",
        age: 82,
        initials: "CO",
        image: "https://i.pravatar.cc/80?img=12",
      },
    },
    {
      id: "a3",
      date: "2023-08-10",
      time: "Due 10 Aug. at 09:00 am",
      diagnosis: "Recert packet missing physician signature.",
      patient: {
        name: "Lara Mensah",
        age: 74,
        initials: "LM",
        image: "https://i.pravatar.cc/80?img=32",
      },
    },
  ],
  visitStats: [
    { day: "Mon", value: 68, percent: 68, tone: "warning" },
    { day: "Wed", value: 22, percent: 22, tone: "danger", pinned: true },
    { day: "Fri", value: 86, percent: 86, tone: "success", pinned: true },
    { day: "Sat", value: 48, percent: 48, tone: "accent" },
  ],
  visitStatsRange: "Packet complete · Mar - Aug. 2023",
};

export async function fetchDashboardHome(): Promise<DashboardHomeData> {
  await new Promise((resolve) => setTimeout(resolve, 900));
  return DASHBOARD_HOME;
}
