import type { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, "Not found"));
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
    return;
  }

  if (err && typeof err === "object" && "name" in err && err.name === "ZodError") {
    res.status(400).json({
      error: "Validation failed",
      details: "issues" in err ? err.issues : undefined,
    });
    return;
  }

  console.error(err);
  res.status(500).json({ error: "Internal server error" });
}
