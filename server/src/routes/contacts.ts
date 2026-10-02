import { Router } from "express";
import { z } from "zod";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

function serializeContact(c: {
  id: string;
  name: string;
  organization: string;
  role: string;
  email: string;
  phone: string;
  notes: string;
  lastContacted: Date;
}) {
  return {
    id: c.id,
    name: c.name,
    organization: c.organization,
    role: c.role,
    email: c.email,
    phone: c.phone,
    notes: c.notes,
    lastContacted: c.lastContacted.toISOString().slice(0, 10),
  };
}

export const contactsRouter = Router();
contactsRouter.use(requireAuth);

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await prisma.contact.findMany({
      where: { facilityId: req.user!.facilityId },
      orderBy: { name: "asc" },
    });
    res.json({ contacts: contacts.map(serializeContact) });
  } catch (err) {
    next(err);
  }
});

const contactSchema = z.object({
  name: z.string().min(1),
  organization: z.string().min(1),
  role: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  notes: z.string().optional(),
});

contactsRouter.post("/", async (req, res, next) => {
  try {
    const body = contactSchema.parse(req.body);
    const contact = await prisma.contact.create({
      data: {
        facilityId: req.user!.facilityId,
        name: body.name,
        organization: body.organization,
        role: body.role,
        email: body.email,
        phone: body.phone,
        notes: body.notes ?? "",
      },
    });
    res.status(201).json(serializeContact(contact));
  } catch (err) {
    next(err);
  }
});

contactsRouter.patch("/:id", async (req, res, next) => {
  try {
    const body = contactSchema.partial().parse(req.body);
    const existing = await prisma.contact.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
    });
    if (!existing) throw new AppError(404, "Contact not found");

    const contact = await prisma.contact.update({
      where: { id: existing.id },
      data: body,
    });
    res.json(serializeContact(contact));
  } catch (err) {
    next(err);
  }
});

contactsRouter.delete("/:id", async (req, res, next) => {
  try {
    const existing = await prisma.contact.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
    });
    if (!existing) throw new AppError(404, "Contact not found");
    await prisma.contact.delete({ where: { id: existing.id } });
    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});
