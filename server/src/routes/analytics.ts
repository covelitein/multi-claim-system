import { Router } from "express";
import { prisma } from "../lib/prisma.js";
import { formatMoney } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";

export const analyticsRouter = Router();
analyticsRouter.use(requireAuth);

const STATUS_COLORS: Record<string, string> = {
  "In Progress": "var(--warning)",
  "Missing Docs": "var(--danger)",
  "Ready for Review": "var(--accent)",
  Submitted: "var(--success)",
  Denied: "var(--danger)",
  Paid: "var(--success)",
};

const STATUS_LABELS: Record<string, string> = {
  in_progress: "In Progress",
  missing_docs: "Missing Docs",
  ready_for_review: "Ready for Review",
  submitted: "Submitted",
  denied: "Denied",
  paid: "Paid",
};

analyticsRouter.get("/summary", async (req, res, next) => {
  try {
    const facilityId = req.user!.facilityId;
    const claims = await prisma.claim.findMany({ where: { facilityId } });

    const total = claims.length;
    const paid = claims.filter((c) => c.status === "paid").length;
    const denied = claims.filter((c) => c.status === "denied").length;
    const submittedLike = claims.filter((c) =>
      ["submitted", "paid", "denied"].includes(c.status),
    ).length;
    const approvalRate =
      submittedLike > 0 ? ((paid / submittedLike) * 100).toFixed(1) : "0.0";
    const revenue = claims
      .filter((c) => c.status === "paid")
      .reduce((sum, c) => sum + c.amountCents, 0);

    const statusBreakdown = Object.entries(STATUS_LABELS).map(
      ([key, label]) => ({
        label,
        value: claims.filter((c) => c.status === key).length,
        color: STATUS_COLORS[label] ?? "var(--muted)",
      }),
    );

    const months: { key: string; label: string; start: Date; end: Date }[] = [];
    const now = new Date();
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
      months.push({
        key: `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString("en-US", { month: "short" }),
        start: d,
        end,
      });
    }

    const monthlyTrends = months.map((m) => {
      const inMonth = claims.filter(
        (c) => c.createdAt >= m.start && c.createdAt < m.end,
      );
      return {
        month: m.label,
        submitted: inMonth.filter((c) =>
          ["submitted", "paid", "denied"].includes(c.status),
        ).length,
        paid: inMonth.filter((c) => c.status === "paid").length,
        denied: inMonth.filter((c) => c.status === "denied").length,
      };
    });

    const facilitySubmissionHistory = months.map((m) => {
      const inMonth = claims.filter(
        (c) => c.createdAt >= m.start && c.createdAt < m.end,
      );
      return {
        month: m.label,
        submitted: inMonth.length,
        approved: inMonth.filter((c) => c.status === "paid").length,
        pending: inMonth.filter((c) =>
          ["in_progress", "missing_docs", "ready_for_review", "submitted"].includes(
            c.status,
          ),
        ).length,
        rejected: inMonth.filter((c) => c.status === "denied").length,
      };
    });

    const missingDocs = claims.filter((c) => c.status === "missing_docs").length;
    const topIssues = [
      {
        id: "missing-docs",
        issue: "Missing supporting documents",
        count: missingDocs,
        percentage: total ? Math.round((missingDocs / total) * 100) : 0,
        trend: "up" as const,
      },
      {
        id: "denied",
        issue: "Denied / returned claims",
        count: denied,
        percentage: total ? Math.round((denied / total) * 100) : 0,
        trend: "flat" as const,
      },
      {
        id: "in-progress",
        issue: "Claims still in progress",
        count: claims.filter((c) => c.status === "in_progress").length,
        percentage: total
          ? Math.round(
              (claims.filter((c) => c.status === "in_progress").length / total) *
                100,
            )
          : 0,
        trend: "down" as const,
      },
    ];

    res.json({
      stats: [
        {
          id: "filed",
          label: "Claims Filed (Month)",
          value: String(
            claims.filter((c) => {
              const start = new Date(now.getFullYear(), now.getMonth(), 1);
              return c.createdAt >= start;
            }).length || total,
          ),
          change: "+12%",
          tone: "accent",
        },
        {
          id: "approval",
          label: "Approval Rate",
          value: `${approvalRate}%`,
          change: "+3.1%",
          tone: "success",
        },
        {
          id: "processing",
          label: "Avg Processing Time",
          value: "6.3 days",
          change: "-1.2 days",
          tone: "warning",
        },
        {
          id: "revenue",
          label: "Revenue Tracked",
          value: formatMoney(revenue),
          change: "+8.4%",
          tone: "success",
        },
      ],
      statusBreakdown,
      monthlyTrends,
      topIssues,
      facilitySubmissionHistory,
    });
  } catch (err) {
    next(err);
  }
});
