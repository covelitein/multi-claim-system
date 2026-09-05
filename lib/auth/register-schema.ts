import { z } from "zod";

const required = z.string().trim().min(1, "This field is required");

export const HOSPITAL_TYPES = [
  { id: "alf", label: "Assisted living" },
  { id: "snf", label: "Skilled nursing" },
  { id: "home_health", label: "Home health" },
  { id: "agency", label: "Agency" },
] as const;

export const hospitalStepSchema = z.object({
  legalName: required.min(2, "Enter the facility legal name"),
  displayName: required.min(2, "Enter a workspace name"),
  hospitalType: z.enum(["alf", "snf", "home_health", "agency"], {
    error: "Select a facility type",
  }),
  licenseNumber: required.min(3, "Enter the facility license number"),
  country: required.min(2, "Enter a country"),
  city: required.min(2, "Enter a city"),
  address: required.min(8, "Enter a full street address"),
});

export const adminStepSchema = z.object({
  firstName: required.min(2, "Enter a first name"),
  lastName: required.min(2, "Enter a last name"),
  jobTitle: required.min(2, "Enter a job title"),
  workEmail: z.email("Enter a valid work email"),
  phone: required.min(8, "Enter a valid phone number"),
});

export const accessStepSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Za-z]/, "Include at least one letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirmPassword: z.string().min(1, "Confirm your password"),
    acceptTerms: z.boolean().refine((value) => value, {
      message: "Accept the terms to continue",
    }),
  })
  .refine((value) => value.password === value.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const registerSchema = hospitalStepSchema
  .and(adminStepSchema)
  .and(accessStepSchema);

export type HospitalStepValues = z.infer<typeof hospitalStepSchema>;
export type AdminStepValues = z.infer<typeof adminStepSchema>;
export type AccessStepValues = z.infer<typeof accessStepSchema>;
export type RegisterValues = z.infer<typeof registerSchema>;

export type RegisterDraft = Omit<RegisterValues, "hospitalType" | "acceptTerms"> & {
  hospitalType: RegisterValues["hospitalType"] | "";
  acceptTerms: boolean;
};

export const REGISTER_DEFAULTS: RegisterDraft = {
  legalName: "",
  displayName: "",
  hospitalType: "",
  licenseNumber: "",
  country: "",
  city: "",
  address: "",
  firstName: "",
  lastName: "",
  jobTitle: "",
  workEmail: "",
  phone: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

export type RegisterFieldErrors = Partial<Record<keyof RegisterValues, string>>;

export type RegisterUpdate = <K extends keyof RegisterDraft>(
  key: K,
  value: RegisterDraft[K],
) => void;

export const REGISTER_STEP_COPY = [
  {
    title: "Register your facility",
    subtitle: "Create an isolated workspace for this ALF, SNF, or agency.",
  },
  {
    title: "Workspace administrator",
    subtitle: "This person will own sign-in and staff access.",
  },
  {
    title: "Secure the workspace",
    subtitle: "Set a password before the facility can sign in.",
  },
  {
    title: "Review and create",
    subtitle: "Confirm the details. Required fields must be complete.",
  },
] as const;

export const REGISTER_STEP_SCHEMAS = {
  1: hospitalStepSchema,
  2: adminStepSchema,
  3: accessStepSchema,
} as const;

export function schemaFieldErrors(error: z.ZodError): RegisterFieldErrors {
  const next: RegisterFieldErrors = {};

  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !next[key as keyof RegisterValues]) {
      next[key as keyof RegisterValues] = issue.message;
    }
  }

  return next;
}
