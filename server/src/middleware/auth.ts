import type { UserRole } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AppError } from "./error.js";

export type AuthUser = {
  id: string;
  email: string;
  facilityId: string;
  role: UserRole;
};

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

type JwtPayload = {
  sub: string;
  email: string;
  facilityId: string;
  role: UserRole;
};

export function signAccessToken(user: AuthUser) {
  return jwt.sign(
    {
      sub: user.id,
      email: user.email,
      facilityId: user.facilityId,
      role: user.role,
    },
    env.JWT_SECRET,
    { expiresIn: "7d" },
  );
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    next(new AppError(401, "Unauthorized"));
    return;
  }

  try {
    const payload = jwt.verify(header.slice(7), env.JWT_SECRET) as JwtPayload;
    req.user = {
      id: payload.sub,
      email: payload.email,
      facilityId: payload.facilityId,
      role: payload.role,
    };
    next();
  } catch {
    next(new AppError(401, "Invalid or expired token"));
  }
}
