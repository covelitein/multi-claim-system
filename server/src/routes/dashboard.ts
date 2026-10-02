import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { formatDate, formatMoney } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";

export const dashboardRouter = Router();
dashboardRouter.use(requireAuth);

dashboardRouter.get("/home", async (req, res, next) => {
  try {
    const facilityId = req.user!.facilityId;
    const [facility, claims, user] = await Promise.all([
      prisma.facility.findUnique({ where: { id: facilityId } }),
      prisma.claim.findMany({
        where: { facilityId },
        include: { resident: true },
        orderBy: { updatedAt: "desc" },
      }),
      prisma.user.findUnique({ where: { id: req.user!.id } }),
    ]);

    const submitted = claims.filter((c) =>
      ["submitted", "paid", "denied"].includes(c.status),
    ).length;
    const approved = claims.filter((c) => c.status === "paid").length;
    const pending = claims.filter((c) =>
      ["in_progress", "missing_docs", "ready_for_review", "submitted"].includes(
        c.status,
      ),
    ).length;
    const rejected = claims.filter((c) => c.status === "denied").length;

    const overviewTotal = Math.max(claims.length, 1);
    const overview = [
      {
        id: "approved",
        label: "Approved",
        value: approved,
        percent: Math.round((approved / overviewTotal) * 100),
        color: "var(--success)",
      },
      {
        id: "pending",
        label: "Pending",
        value: pending,
        percent: Math.round((pending / overviewTotal) * 100),
        color: "var(--warning)",
      },
      {
        id: "rejected",
        label: "Rejected",
        value: rejected,
        percent: Math.round((rejected / overviewTotal) * 100),
        color: "var(--danger)",
      },
    ];

    const recentSubmissions = claims.slice(0, 6).map((c) => {
      const r = c.resident;
      const statusMap = {
        paid: "approved",
        submitted: "submitted",
        denied: "rejected",
        in_progress: "pending",
        missing_docs: "pending",
        ready_for_review: "pending",
      } as const;

      return {
        id: c.id,
        residentName: `${r.firstName} ${r.lastName}`,
        residentId: r.residentId,
        submittedAt: formatDate(c.submittedAt ?? c.updatedAt),
        status: statusMap[c.status],
        amount: formatMoney(c.amountCents),
        image: r.image ?? `https://i.pravatar.cc/80?u=${r.id}`,
        initials: `${r.firstName.charAt(0)}${r.lastName.charAt(0)}`.toUpperCase(),
      };
    });

    const months: { label: string; start: Date; end: Date }[] = [];
    const now = new Date();
    for (let i = 6; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const start = new Date(d.getFullYear(), d.getMonth(), d.getDate());
      const end = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
      months.push({
        label: d.toLocaleDateString("en-US", { weekday: "short" }),
        start,
        end,
      });
    }

    const submissionHistory = months.map((m) => {
      const dayClaims = claims.filter(
        (c) => c.createdAt >= m.start && c.createdAt < m.end,
      );
      return {
        date: m.start.toISOString().slice(0, 10),
        label: m.label,
        submitted: dayClaims.length,
        approved: dayClaims.filter((c) => c.status === "paid").length,
        pending: dayClaims.filter((c) =>
          ["in_progress", "missing_docs", "ready_for_review", "submitted"].includes(
            c.status,
          ),
        ).length,
        rejected: dayClaims.filter((c) => c.status === "denied").length,
      };
    });

    const last = claims[0];

    res.json({
      greetingSubtitle: `Welcome back${user ? `, ${user.firstName}` : ""} — long-term care claims overview.`,
      lastSubmissionDate: last
        ? formatDate(last.submittedAt ?? last.updatedAt)
        : formatDate(new Date()),
      kpis: [
        {
          id: "submitted",
          label: "Submitted",
          value: String(submitted),
          href: "/billing",
          tone: "accent",
          icon: "submitted",
        },
        {
          id: "approved",
          label: "Approved",
          value: String(approved),
          href: "/billing",
          tone: "success",
          icon: "approved",
        },
        {
          id: "pending",
          label: "Pending",
          value: String(pending),
          href: "/billing",
          tone: "warning",
          icon: "pending",
        },
        {
          id: "rejected",
          label: "Rejected",
          value: String(rejected),
          href: "/billing",
          tone: "danger",
          icon: "rejected",
        },
      ],
      overview,
      overviewRangeLabel: "Last 30 days",
      recentSubmissions,
      quickActions: [
        {
          id: "new-claim",
          label: "Upload claim",
          description: "Send an LTC packet for Helix review",
          href: "/billing/new",
          tone: "accent",
        },
        {
          id: "residents",
          label: "Residents",
          description: "Manage resident roster",
          href: "/patients",
          tone: "success",
        },
        {
          id: "invoices",
          label: "Invoices",
          description: "Match invoices to claims",
          href: "/invoices",
          tone: "warning",
        },
      ],
      reminders: [
        {
          id: "missing",
          message: `${claims.filter((c) => c.status === "missing_docs").length} claims need documents`,
          actionLabel: "Review",
          href: "/billing",
        },
      ],
      submissionHistory,
      facilityPlan: {
        name: facility?.displayName ?? "Facility",
        plan: facility?.plan ?? "Professional",
        nextBillingDate: "10/01/2026",
        claimsIncluded: "Unlimited",
        manageHref: "/settings",
      },
    });
  } catch (err) {
    next(err);
  }
});
