import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.document.deleteMany();
  await prisma.teamInvite.deleteMany();
  await prisma.invoice.deleteMany();
  await prisma.claim.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.resident.deleteMany();
  await prisma.user.deleteMany();
  await prisma.facility.deleteMany();

  const passwordHash = await bcrypt.hash("HelixDemo1", 10);

  const facility = await prisma.facility.create({
    data: {
      legalName: "Sunrise Assisted Living LLC",
      displayName: "Sunrise Assisted Living",
      type: "alf",
      licenseNumber: "TX-ALF-44821",
      country: "United States",
      city: "Austin",
      address: "1200 Wellness Blvd, Austin, TX 78701",
      plan: "Professional",
    },
  });

  const admin = await prisma.user.create({
    data: {
      email: "admin@sunriseal.com",
      passwordHash,
      firstName: "Janet",
      lastName: "Morrison",
      jobTitle: "Billing Manager",
      phone: "(512) 555-0100",
      role: "admin",
      facilityId: facility.id,
      image: "https://i.pravatar.cc/80?img=49",
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: "mthompson@sunriseal.com",
        passwordHash,
        firstName: "Marcus",
        lastName: "Thompson",
        jobTitle: "Claims Specialist",
        phone: "(512) 555-0101",
        role: "billing_manager",
        facilityId: facility.id,
        image: "https://i.pravatar.cc/80?img=68",
      },
      {
        email: "dreyes@sunriseal.com",
        passwordHash,
        firstName: "Diana",
        lastName: "Reyes",
        jobTitle: "Facility Admin",
        phone: "(512) 555-0102",
        role: "staff",
        facilityId: facility.id,
        image: "https://i.pravatar.cc/80?img=26",
      },
    ],
  });

  const residentsData = [
    {
      residentId: "RES-2048",
      firstName: "Mary",
      lastName: "Johnson",
      dob: new Date("1945-03-12"),
      phone: "(555) 234-5678",
      payer: "Genworth",
      status: "active" as const,
      admitDate: new Date("2023-01-15"),
      image: "https://i.pravatar.cc/80?img=47",
    },
    {
      residentId: "RES-1982",
      firstName: "Robert",
      lastName: "Williams",
      dob: new Date("1941-08-24"),
      phone: "(555) 345-6789",
      payer: "John Hancock",
      status: "active" as const,
      admitDate: new Date("2022-11-03"),
      image: "https://i.pravatar.cc/80?img=12",
    },
    {
      residentId: "RES-2101",
      firstName: "Gloria",
      lastName: "Chen",
      dob: new Date("1948-01-09"),
      phone: "(555) 456-7890",
      payer: "Illumifin",
      status: "active" as const,
      admitDate: new Date("2024-02-20"),
      image: "https://i.pravatar.cc/80?img=32",
    },
    {
      residentId: "RES-1877",
      firstName: "Harold",
      lastName: "Freeman",
      dob: new Date("1939-06-18"),
      phone: "(555) 567-8901",
      payer: "Mutual of Omaha",
      status: "active" as const,
      admitDate: new Date("2021-09-01"),
      image: "https://i.pravatar.cc/80?img=15",
    },
    {
      residentId: "RES-2205",
      firstName: "Ada",
      lastName: "Okoye",
      dob: new Date("1946-11-02"),
      phone: "(555) 678-9012",
      payer: "AIG / American General Life",
      status: "pending" as const,
      admitDate: new Date("2026-07-01"),
      image: "https://i.pravatar.cc/80?img=20",
    },
    {
      residentId: "RES-1755",
      firstName: "Amanda",
      lastName: "Brown",
      dob: new Date("1944-04-22"),
      phone: "(555) 789-0123",
      payer: "Genworth",
      status: "active" as const,
      admitDate: new Date("2020-05-12"),
      image: "https://i.pravatar.cc/80?img=47",
    },
  ];

  const residents = [];
  for (const r of residentsData) {
    residents.push(
      await prisma.resident.create({
        data: { ...r, facilityId: facility.id },
      }),
    );
  }

  const [mary, robert, gloria, harold, ada, amanda] = residents;

  const claimsSpec = [
    {
      residentId: amanda.id,
      policyId: "POL-GNW-0142",
      insurer: "Genworth",
      billingPeriod: "08/01/2026 – 08/31/2026",
      status: "ready_for_review" as const,
      missingItems: 0,
      notes: "Packet uploaded for Helix review.",
      amountCents: 485000,
      submittedAt: new Date("2026-08-18"),
    },
    {
      residentId: mary.id,
      policyId: "POL-GNW-0140",
      insurer: "Genworth",
      billingPeriod: "08/01/2026 – 08/31/2026",
      status: "submitted" as const,
      missingItems: 0,
      notes: "",
      amountCents: 485000,
      submittedAt: new Date("2026-08-16"),
    },
    {
      residentId: robert.id,
      policyId: "POL-JHN-0098",
      insurer: "John Hancock",
      billingPeriod: "08/01/2026 – 08/31/2026",
      status: "missing_docs" as const,
      missingItems: 2,
      notes: "Need physician statement and ADL worksheet.",
      amountCents: 322000,
    },
    {
      residentId: gloria.id,
      policyId: "POL-ILM-0221",
      insurer: "Illumifin",
      billingPeriod: "08/01/2026 – 08/31/2026",
      status: "in_progress" as const,
      missingItems: 1,
      notes: "",
      amountCents: 294000,
    },
    {
      residentId: harold.id,
      policyId: "POL-MOO-0077",
      insurer: "Mutual of Omaha",
      billingPeriod: "07/01/2026 – 07/31/2026",
      status: "paid" as const,
      missingItems: 0,
      notes: "Paid 08/10/2026",
      amountCents: 410000,
      submittedAt: new Date("2026-07-28"),
    },
    {
      residentId: ada.id,
      policyId: "POL-AIG-0310",
      insurer: "AIG / American General Life",
      billingPeriod: "08/01/2026 – 08/31/2026",
      status: "denied" as const,
      missingItems: 0,
      notes: "Returned — incomplete CMR.",
      amountCents: 260000,
      submittedAt: new Date("2026-08-05"),
    },
    {
      residentId: mary.id,
      policyId: "POL-GNW-0138",
      insurer: "Genworth",
      billingPeriod: "07/01/2026 – 07/31/2026",
      status: "paid" as const,
      missingItems: 0,
      notes: "",
      amountCents: 485000,
      submittedAt: new Date("2026-07-20"),
    },
    {
      residentId: robert.id,
      policyId: "POL-JHN-0095",
      insurer: "John Hancock",
      billingPeriod: "07/01/2026 – 07/31/2026",
      status: "submitted" as const,
      missingItems: 0,
      notes: "",
      amountCents: 322000,
      submittedAt: new Date("2026-07-25"),
    },
  ];

  const claims = [];
  for (const c of claimsSpec) {
    claims.push(
      await prisma.claim.create({
        data: {
          facilityId: facility.id,
          ...c,
          createdAt: c.submittedAt ?? new Date("2026-08-01"),
        },
      }),
    );
  }

  await prisma.invoice.createMany({
    data: [
      {
        facilityId: facility.id,
        residentId: mary.id,
        invoiceId: "INV-2026-064",
        invoiceDate: new Date("2026-08-18"),
        servicePeriod: "08/01/2026 – 08/31/2026",
        amountCents: 485000,
        status: "matched",
        matchedClaimId: claims[1].id,
      },
      {
        facilityId: facility.id,
        residentId: robert.id,
        invoiceId: "INV-2026-063",
        invoiceDate: new Date("2026-08-17"),
        servicePeriod: "08/01/2026 – 08/31/2026",
        amountCents: 322000,
        status: "pending_review",
      },
      {
        facilityId: facility.id,
        residentId: gloria.id,
        invoiceId: "INV-2026-062",
        invoiceDate: new Date("2026-08-16"),
        servicePeriod: "08/01/2026 – 08/31/2026",
        amountCents: 294000,
        status: "missing",
      },
      {
        facilityId: facility.id,
        residentId: harold.id,
        invoiceId: "INV-2026-061",
        invoiceDate: new Date("2026-08-15"),
        servicePeriod: "08/01/2026 – 08/31/2026",
        amountCents: 410000,
        status: "overdue",
      },
      {
        facilityId: facility.id,
        residentId: amanda.id,
        invoiceId: "INV-2026-060",
        invoiceDate: new Date("2026-08-14"),
        servicePeriod: "08/01/2026 – 08/31/2026",
        amountCents: 485000,
        status: "matched",
        matchedClaimId: claims[0].id,
      },
    ],
  });

  await prisma.contact.createMany({
    data: [
      {
        facilityId: facility.id,
        name: "Claims Desk — Illumifin",
        organization: "Illumifin",
        role: "Insurer claims",
        email: "claims@illumifin.example",
        phone: "(800) 555-2100",
        notes: "Primary LTC claims processor contact.",
        lastContacted: new Date("2026-09-12"),
      },
      {
        facilityId: facility.id,
        name: "Provider Relations — Genworth",
        organization: "Genworth",
        role: "Insurer claims",
        email: "providers@genworth.example",
        phone: "(800) 555-2201",
        notes: "Ask for LTC facility billing queue.",
        lastContacted: new Date("2026-09-08"),
      },
      {
        facilityId: facility.id,
        name: "Janet Morrison",
        organization: "Sunrise Assisted Living",
        role: "Facility referral",
        email: "jmorrison@sunriseal.com",
        phone: "(512) 555-0100",
        notes: "Facility billing lead.",
        lastContacted: new Date("2026-09-15"),
      },
      {
        facilityId: facility.id,
        name: "David Okoye (son)",
        organization: "Family — Ada Okoye",
        role: "Resident family",
        email: "dokoye@email.example",
        phone: "(512) 555-4411",
        notes: "Authorized for billing questions.",
        lastContacted: new Date("2026-08-30"),
      },
      {
        facilityId: facility.id,
        name: "John Hancock LTC Claims",
        organization: "John Hancock",
        role: "Insurer claims",
        email: "ltc.claims@johnhancock.example",
        phone: "(800) 555-3302",
        notes: "CMR packet submissions.",
        lastContacted: new Date("2026-09-01"),
      },
      {
        facilityId: facility.id,
        name: "Supply Desk — MediLine",
        organization: "MediLine Supplies",
        role: "Vendor",
        email: "orders@mediline.example",
        phone: "(800) 555-4400",
        notes: "",
        lastContacted: new Date("2026-08-20"),
      },
    ],
  });

  console.log("Seeded facility:", facility.displayName);
  console.log("Admin login: admin@sunriseal.com / HelixDemo1");
  console.log("Admin user id:", admin.id);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
