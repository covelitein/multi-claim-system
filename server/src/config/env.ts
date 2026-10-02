import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().min(1),
  DIRECT_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(16),
  PORT: z.coerce.number().default(8000),
  UPLOAD_DIR: z.string().default("uploads"),
  CLIENT_ORIGIN: z.string().default("http://localhost:3000"),
});

export const env = envSchema.parse(process.env);
