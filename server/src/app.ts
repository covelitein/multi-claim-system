import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fs from "node:fs";
import path from "node:path";
import helmet from "helmet";
import { env } from "./config/env.js";
import { errorHandler, notFound } from "./middleware/error.js";
import { analyticsRouter } from "./routes/analytics.js";
import { authRouter } from "./routes/auth.js";
import { claimsRouter } from "./routes/claims.js";
import { contactsRouter } from "./routes/contacts.js";
import { dashboardRouter } from "./routes/dashboard.js";
import { invoicesRouter } from "./routes/invoices.js";
import { residentsRouter } from "./routes/residents.js";
import { teamRouter } from "./routes/team.js";
import { uploadsRouter } from "./routes/uploads.js";

export function createApp() {
  const uploadDir = path.resolve(process.cwd(), env.UPLOAD_DIR);
  fs.mkdirSync(uploadDir, { recursive: true });

  const app = express();

  app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
  app.use(
    cors({
      origin: env.CLIENT_ORIGIN,
      credentials: true,
    }),
  );
  app.use(express.json({ limit: "2mb" }));
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.get("/health", (_req, res) => {
    res.json({ ok: true });
  });

  app.use("/api/auth", authRouter);
  app.use("/api/residents", residentsRouter);
  app.use("/api/claims", claimsRouter);
  app.use("/api/invoices", invoicesRouter);
  app.use("/api/contacts", contactsRouter);
  app.use("/api/team", teamRouter);
  app.use("/api/analytics", analyticsRouter);
  app.use("/api/dashboard", dashboardRouter);
  app.use("/api/uploads", uploadsRouter);

  app.use(notFound);
  app.use(errorHandler);

  return app;
}
