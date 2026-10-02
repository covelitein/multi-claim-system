import { Router } from "express";
import multer from "multer";
import path from "node:path";
import { z } from "zod";
import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { serializeInvoice, toInvoiceStatus } from "../lib/serialize.js";
import { requireAuth } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

const upload = multer({
  dest: path.resolve(process.cwd(), env.UPLOAD_DIR),
  limits: { fileSize: 15 * 1024 * 1024 },
});

export const invoicesRouter = Router();
invoicesRouter.use(requireAuth);

invoicesRouter.get("/", async (req, res, next) => {
  try {
    const facilityId = req.user!.facilityId;
    const invoices = await prisma.invoice.findMany({
      where: { facilityId },
      include: { resident: true, matchedClaim: true },
      orderBy: { invoiceDate: "desc" },
    });

    const serialized = invoices.map(serializeInvoice);
    const byStatus = (status: string) =>
      serialized.filter((i) => i.status === status).length;

    res.json({
      stats: [
        { id: "total", label: "Total Invoices", value: serialized.length, tone: "accent" },
        { id: "matched", label: "Matched to Claims", value: byStatus("matched"), tone: "success" },
        { id: "pending", label: "Pending Review", value: byStatus("pending-review"), tone: "warning" },
        { id: "missing", label: "Missing Invoices", value: byStatus("missing"), tone: "danger" },
        { id: "overdue", label: "Overdue Invoices", value: byStatus("overdue"), tone: "danger" },
      ],
      invoices: serialized,
    });
  } catch (err) {
    next(err);
  }
});

const createSchema = z.object({
  residentId: z.string().min(1),
  invoiceId: z.string().min(1).optional(),
  invoiceDate: z.string().min(1),
  servicePeriod: z.string().min(1),
  amountCents: z.number().int().min(0),
  status: z.string().optional(),
  matchedClaimId: z.string().optional().nullable(),
});

invoicesRouter.post("/", async (req, res, next) => {
  try {
    const body = createSchema.parse(req.body);
    const facilityId = req.user!.facilityId;

    const resident = await prisma.resident.findFirst({
      where: { id: body.residentId, facilityId },
    });
    if (!resident) throw new AppError(404, "Resident not found");

    const count = await prisma.invoice.count({ where: { facilityId } });
    const invoiceId =
      body.invoiceId ?? `INV-2026-${String(count + 1).padStart(3, "0")}`;

    let status = undefined as ReturnType<typeof toInvoiceStatus>;
    if (body.status) {
      status = toInvoiceStatus(body.status);
      if (!status) throw new AppError(400, "Invalid invoice status");
    }

    const invoice = await prisma.invoice.create({
      data: {
        facilityId,
        residentId: resident.id,
        invoiceId,
        invoiceDate: new Date(body.invoiceDate),
        servicePeriod: body.servicePeriod,
        amountCents: body.amountCents,
        status: status ?? "pending_review",
        matchedClaimId: body.matchedClaimId ?? null,
      },
      include: { resident: true, matchedClaim: true },
    });

    res.status(201).json(serializeInvoice(invoice));
  } catch (err) {
    next(err);
  }
});

invoicesRouter.patch("/:id", async (req, res, next) => {
  try {
    const body = createSchema.partial().parse(req.body);
    const existing = await prisma.invoice.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
    });
    if (!existing) throw new AppError(404, "Invoice not found");

    let status = existing.status;
    if (body.status) {
      const mapped = toInvoiceStatus(body.status);
      if (!mapped) throw new AppError(400, "Invalid invoice status");
      status = mapped;
    }

    const invoice = await prisma.invoice.update({
      where: { id: existing.id },
      data: {
        invoiceId: body.invoiceId,
        invoiceDate: body.invoiceDate ? new Date(body.invoiceDate) : undefined,
        servicePeriod: body.servicePeriod,
        amountCents: body.amountCents,
        status,
        matchedClaimId: body.matchedClaimId,
        residentId: body.residentId,
      },
      include: { resident: true, matchedClaim: true },
    });

    res.json(serializeInvoice(invoice));
  } catch (err) {
    next(err);
  }
});

invoicesRouter.post(
  "/:id/documents",
  upload.array("files", 10),
  async (req, res, next) => {
    try {
      const invoice = await prisma.invoice.findFirst({
        where: { id: req.params.id, facilityId: req.user!.facilityId },
      });
      if (!invoice) throw new AppError(404, "Invoice not found");

      const files = (req.files as Express.Multer.File[]) ?? [];
      if (files.length === 0) throw new AppError(400, "No files uploaded");

      const docs = await Promise.all(
        files.map((file) =>
          prisma.document.create({
            data: {
              facilityId: req.user!.facilityId,
              ownerType: "invoice",
              ownerId: invoice.id,
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

      if (invoice.status === "missing") {
        await prisma.invoice.update({
          where: { id: invoice.id },
          data: { status: "pending_review" },
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
