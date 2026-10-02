import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

const ROLE_LABEL: Record<string, string> = {
  admin: "Administrator",
  billing_manager: "Billing Manager",
  staff: "Claims Specialist",
};

function initials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export const teamRouter = Router();
teamRouter.use(requireAuth);

teamRouter.get("/", async (req, res, next) => {
  try {
    const facilityId = req.user!.facilityId;
    const [users, facility] = await Promise.all([
      prisma.user.findMany({
        where: { facilityId },
        orderBy: { lastName: "asc" },
      }),
      prisma.facility.findUnique({ where: { id: facilityId } }),
    ]);

    res.json({
      members: users.map((u) => ({
        id: u.id,
        firstName: u.firstName,
        lastName: u.lastName,
        initials: initials(u.firstName, u.lastName),
        image: u.image ?? `https://i.pravatar.cc/80?u=${u.id}`,
        role: ROLE_LABEL[u.role] ?? u.jobTitle,
        email: u.email,
        facility: facility?.displayName ?? "",
        status: u.status,
        lastActive: u.lastActiveAt.toISOString().slice(0, 10),
      })),
    });
  } catch (err) {
    next(err);
  }
});

const inviteSchema = z.object({
  email: z.string().email(),
  role: z.enum(["admin", "billing_manager", "staff"]).default("staff"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

teamRouter.post("/invite", async (req, res, next) => {
  try {
    const body = inviteSchema.parse(req.body);
    const email = body.email.toLowerCase();
    const facilityId = req.user!.facilityId;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) throw new AppError(409, "User already exists");

    const invite = await prisma.teamInvite.create({
      data: {
        facilityId,
        email,
        role: body.role,
        invitedById: req.user!.id,
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
    });

    res.status(201).json({
      id: invite.id,
      email: invite.email,
      role: invite.role,
      token: invite.token,
      expiresAt: invite.expiresAt,
    });
  } catch (err) {
    next(err);
  }
});
