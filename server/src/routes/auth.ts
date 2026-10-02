import { Router } from "express";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { serializeFacility, serializeUser } from "../lib/serialize.js";
import { requireAuth, signAccessToken } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

const required = z.string().trim().min(1);

const registerSchema = z
  .object({
    legalName: required.min(2),
    displayName: required.min(2),
    hospitalType: z.enum(["alf", "snf", "home_health", "agency"]),
    licenseNumber: required.min(3),
    country: required.min(2),
    city: required.min(2),
    address: required.min(8),
    firstName: required.min(2),
    lastName: required.min(2),
    jobTitle: required.min(2),
    workEmail: z.string().email(),
    phone: required.min(8),
    password: z
      .string()
      .min(8)
      .regex(/[A-Za-z]/)
      .regex(/[0-9]/),
    confirmPassword: z.string().min(1),
    acceptTerms: z.boolean().refine((v) => v),
  })
  .refine((v) => v.password === v.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const authRouter = Router();

authRouter.post("/register", async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body);
    const email = body.workEmail.toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      throw new AppError(409, "An account with this email already exists");
    }

    const passwordHash = await bcrypt.hash(body.password, 10);

    const result = await prisma.$transaction(async (tx) => {
      const facility = await tx.facility.create({
        data: {
          legalName: body.legalName,
          displayName: body.displayName,
          type: body.hospitalType,
          licenseNumber: body.licenseNumber,
          country: body.country,
          city: body.city,
          address: body.address,
        },
      });

      const user = await tx.user.create({
        data: {
          email,
          passwordHash,
          firstName: body.firstName,
          lastName: body.lastName,
          jobTitle: body.jobTitle,
          phone: body.phone,
          role: "admin",
          facilityId: facility.id,
        },
      });

      return { facility, user };
    });

    const accessToken = signAccessToken({
      id: result.user.id,
      email: result.user.email,
      facilityId: result.facility.id,
      role: result.user.role,
    });

    res.status(201).json({
      accessToken,
      user: serializeUser(result.user, result.facility),
      facility: serializeFacility(result.facility),
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body);
    const email = body.email.toLowerCase();

    const user = await prisma.user.findUnique({
      where: { email },
      include: { facility: true },
    });

    if (!user || user.status !== "active") {
      throw new AppError(401, "Invalid email or password");
    }

    const ok = await bcrypt.compare(body.password, user.passwordHash);
    if (!ok) {
      throw new AppError(401, "Invalid email or password");
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastActiveAt: new Date() },
    });

    const accessToken = signAccessToken({
      id: user.id,
      email: user.email,
      facilityId: user.facilityId,
      role: user.role,
    });

    res.json({
      accessToken,
      user: serializeUser(user, user.facility),
      facility: serializeFacility(user.facility),
    });
  } catch (err) {
    next(err);
  }
});

authRouter.get("/me", requireAuth, async (req, res, next) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.id },
      include: { facility: true },
    });
    if (!user) throw new AppError(401, "Unauthorized");

    res.json({
      user: serializeUser(user, user.facility),
      facility: serializeFacility(user.facility),
    });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/logout", (_req, res) => {
  res.json({ ok: true });
});
