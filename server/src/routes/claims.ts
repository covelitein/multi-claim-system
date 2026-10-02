import { Router } from "express";
import multer from "multer";
import path from "node:path";
import { z } from "zod";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { serializeClaim, toClaimStatus } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

const upload = multer({
  dest: path.resolve(process.cwd(), env.UPLOAD_DIR),
  limits: { fileSize: 15 * 1024 * 1024 },
});

export const claimsRouter = Router();
claimsRouter.use(requireAuth);

claimsRouter.get("/", async (req, res, next) => {
  try {
    const facilityId = req.user!.facilityId;
    const claims = await prisma.claim.findMany({
      where: { facilityId },
      include: { resident: true, facility: true },
      orderBy: { updatedAt: "desc" },
    });

    const serialized = claims.map(serializeClaim);
    const byStatus = (status: string) =>
      serialized.filter((c) => c.status === status).length;

    res.json({
      stats: [
        { id: "all", label: "All Claims", value: serialized.length, tone: "default" },
        { id: "in-progress", label: "In Progress", value: byStatus("in-progress"), tone: "warning" },
        { id: "missing-docs", label: "Missing Docs", value: byStatus("missing-docs"), tone: "danger" },
        {
          id: "ready-for-review",
          label: "Ready for Review",
          value: byStatus("ready-for-review"),
          tone: "accent",
        },
        { id: "submitted", label: "Submitted", value: byStatus("submitted"), tone: "success" },
        { id: "denied", label: "Denied / Returned", value: byStatus("denied"), tone: "danger" },
      ],
      claims: serialized,
    });
  } catch (err) {
    next(err);
  }
});

const createSchema = z.object({
  residentId: z.string().min(1),
  policyId: z.string().min(1).optional(),
  insurer: z.string().min(1),
  billingPeriod: z.string().min(1),
  status: z.string().optional(),
  missingItems: z.number().int().min(0).optional(),
  notes: z.string().optional(),
  amountCents: z.number().int().min(0).optional(),
});

claimsRouter.post("/", async (req, res, next) => {
  try {
    const body = createSchema.parse(req.body);
    const facilityId = req.user!.facilityId;

    const resident = await prisma.resident.findFirst({
      where: { id: body.residentId, facilityId },
    });
    if (!resident) throw new AppError(404, "Resident not found");

    const count = await prisma.claim.count({ where: { facilityId } });
    const policyId = body.policyId ?? `POL-${String(count + 1).padStart(4, "0")}`;

    let status = undefined as ReturnType<typeof toClaimStatus>;
    if (body.status) {
      status = toClaimStatus(body.status);
      if (!status) throw new AppError(400, "Invalid claim status");
    }

    const claim = await prisma.claim.create({
      data: {
        facilityId,
        residentId: resident.id,
        policyId,
        insurer: body.insurer,
        billingPeriod: body.billingPeriod,
        status: status ?? "in_progress",
        missingItems: body.missingItems ?? 0,
        notes: body.notes ?? "",
        amountCents: body.amountCents ?? 0,
      },
      include: { resident: true, facility: true },
    });

    res.status(201).json(serializeClaim(claim));
  } catch (err) {
    next(err);
  }
});

claimsRouter.get("/:id", async (req, res, next) => {
  try {
    const claim = await prisma.claim.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
      include: { resident: true, facility: true },
    });
    if (!claim) throw new AppError(404, "Claim not found");
    res.json(serializeClaim(claim));
  } catch (err) {
    next(err);
  }
});

const patchSchema = createSchema.partial().extend({
  residentId: z.string().min(1).optional(),
});

claimsRouter.patch("/:id", async (req, res, next) => {
  try {
    const body = patchSchema.parse(req.body);
    const existing = await prisma.claim.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
    });
    if (!existing) throw new AppError(404, "Claim not found");

    let status = existing.status;
    if (body.status) {
      const mapped = toClaimStatus(body.status);
      if (!mapped) throw new AppError(400, "Invalid claim status");
      status = mapped;
    }

    const claim = await prisma.claim.update({
      where: { id: existing.id },
      data: {
        policyId: body.policyId,
        insurer: body.insurer,
        billingPeriod: body.billingPeriod,
        status,
        missingItems: body.missingItems,
        notes: body.notes,
        amountCents: body.amountCents,
        residentId: body.residentId,
        submittedAt:
          status === "submitted" && !existing.submittedAt
            ? new Date()
            : undefined,
      },
      include: { resident: true, facility: true },
    });

    res.json(serializeClaim(claim));
  } catch (err) {
    next(err);
  }
});

claimsRouter.post(
  "/:id/documents",
  upload.array("files", 10),
  async (req, res, next) => {
    try {
      const claim = await prisma.claim.findFirst({
        where: { id: req.params.id, facilityId: req.user!.facilityId },
      });
      if (!claim) throw new AppError(404, "Claim not found");

      const files = (req.files as Express.Multer.File[]) ?? [];
      if (files.length === 0) throw new AppError(400, "No files uploaded");

      const docs = await Promise.all(
        files.map((file) =>
          prisma.document.create({
            data: {
              facilityId: req.user!.facilityId,
              ownerType: "claim",
              ownerId: claim.id,
              filename: file.filename,
              originalName: file.originalname,
              mime: file.mimetype,
              size: file.size,
              path: file.path,
              uploadedById: req.user!.id,
            },
          }),
        ),
      );

      if (claim.status === "missing_docs" || claim.status === "in_progress") {
        await prisma.claim.update({
          where: { id: claim.id },
          data: {
            status: "ready_for_review",
            missingItems: Math.max(0, claim.missingItems - files.length),
          },
        });
      }

      res.status(201).json({
        documents: docs.map((d) => ({
          id: d.id,
          originalName: d.originalName,
          mime: d.mime,
          size: d.size,
          createdAt: d.createdAt,
        })),
      });
    } catch (err) {
      next(err);
    }
  },
);
