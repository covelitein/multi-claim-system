import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { serializeResident, toResidentStatus } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

export const residentsRouter = Router();
residentsRouter.use(requireAuth);

residentsRouter.get("/", async (req, res, next) => {
  try {
    const facilityId = req.user!.facilityId;
    const residents = await prisma.resident.findMany({
      where: { facilityId },
      include: { facility: true, claims: true },
      orderBy: { lastName: "asc" },
    });

    const serialized = residents.map(serializeResident);
    const active = serialized.filter((r) => r.status === "active").length;
    const inactive = serialized.filter((r) => r.status === "inactive").length;
    const pendingClaims = serialized.filter((r) => r.activeClaims > 0).length;

    res.json({
      stats: [
        { id: "total", label: "Total Residents", value: serialized.length, tone: "accent" },
        { id: "active", label: "Active Residents", value: active, tone: "success" },
        { id: "inactive", label: "Inactive Residents", value: inactive, tone: "danger" },
        {
          id: "pending-claims",
          label: "Residents with Pending Claims",
          value: pendingClaims,
          tone: "warning",
        },
      ],
      residents: serialized,
    });
  } catch (err) {
    next(err);
  }
});

const createSchema = z.object({
  residentId: z.string().min(1).optional(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dob: z.string().min(1),
  phone: z.string().min(1),
  payer: z.string().min(1),
  room: z.string().optional(),
  status: z.string().optional(),
  admitDate: z.string().min(1),
});

residentsRouter.post("/", async (req, res, next) => {
  try {
    const body = createSchema.parse(req.body);
    const facilityId = req.user!.facilityId;
    const count = await prisma.resident.count({ where: { facilityId } });
    const residentId =
      body.residentId ?? `RES-${2000 + count + 1}`;

    const status = body.status
      ? toResidentStatus(body.status)
      : "active";
    if (body.status && !status) {
      throw new AppError(400, "Invalid resident status");
    }

    const resident = await prisma.resident.create({
      data: {
        facilityId,
        residentId,
        firstName: body.firstName,
        lastName: body.lastName,
        dob: new Date(body.dob),
        phone: body.phone,
        payer: body.payer,
        room: body.room,
        status: status ?? "active",
        admitDate: new Date(body.admitDate),
      },
      include: { facility: true, claims: true },
    });

    res.status(201).json(serializeResident(resident));
  } catch (err) {
    next(err);
  }
});

residentsRouter.get("/:id", async (req, res, next) => {
  try {
    const resident = await prisma.resident.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
      include: { facility: true, claims: true },
    });
    if (!resident) throw new AppError(404, "Resident not found");
    res.json(serializeResident(resident));
  } catch (err) {
    next(err);
  }
});

const patchSchema = createSchema.partial();

residentsRouter.patch("/:id", async (req, res, next) => {
  try {
    const body = patchSchema.parse(req.body);
    const existing = await prisma.resident.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
    });
    if (!existing) throw new AppError(404, "Resident not found");

    let status = existing.status;
    if (body.status) {
      const mapped = toResidentStatus(body.status);
      if (!mapped) throw new AppError(400, "Invalid resident status");
      status = mapped;
    }

    const resident = await prisma.resident.update({
      where: { id: existing.id },
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        phone: body.phone,
        payer: body.payer,
        room: body.room,
        status,
        dob: body.dob ? new Date(body.dob) : undefined,
        admitDate: body.admitDate ? new Date(body.admitDate) : undefined,
        residentId: body.residentId,
      },
      include: { facility: true, claims: true },
    });

    res.json(serializeResident(resident));
  } catch (err) {
    next(err);
  }
});
