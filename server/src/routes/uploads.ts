import { Router } from "express";
import fs from "node:fs";
import path from "node:path";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";
import { AppError } from "../middleware/error.js";

export const uploadsRouter = Router();
uploadsRouter.use(requireAuth);

uploadsRouter.get("/:id", async (req, res, next) => {
  try {
    const doc = await prisma.document.findFirst({
      where: { id: req.params.id, facilityId: req.user!.facilityId },
    });
    if (!doc) throw new AppError(404, "Document not found");

    const absolute = path.isAbsolute(doc.path)
      ? doc.path
      : path.resolve(process.cwd(), doc.path);

    if (!fs.existsSync(absolute)) {
      throw new AppError(404, "File missing on disk");
    }

    res.setHeader("Content-Type", doc.mime);
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${doc.originalName.replace(/"/g, "")}"`,
    );
    fs.createReadStream(absolute).pipe(res);
  } catch (err) {
    next(err);
  }
});
