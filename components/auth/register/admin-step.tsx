"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import type { RegisterDraft, RegisterFieldErrors, RegisterUpdate } from "@/lib/auth/register-schema";

type AdminStepProps = {
  values: RegisterDraft;
  errors: RegisterFieldErrors;
  update: RegisterUpdate;
};

export function AdminStep({ values, errors, update }: AdminStepProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthTextField
          autoFocus
          error={errors.firstName}
          label="First name"
          name="firstName"
          placeholder="Ada"
          value={values.firstName}
          onChange={(value) => update("firstName", value)}
        />
        <AuthTextField
          error={errors.lastName}
          label="Last name"
          name="lastName"
          placeholder="Okoye"
          value={values.lastName}
          onChange={(value) => update("lastName", value)}
        />
      </div>

      <AuthTextField
        error={errors.jobTitle}
        label="Job title"
        name="jobTitle"
        placeholder="Billing coordinator"
        value={values.jobTitle}
        onChange={(value) => update("jobTitle", value)}
      />
      <AuthTextField
        error={errors.workEmail}
        label="Work email"
        name="workEmail"
        placeholder="ada@sunrisevilla.com"
        type="email"
        value={values.workEmail}
        onChange={(value) => update("workEmail", value)}
      />
      <AuthTextField
        error={errors.phone}
        label="Phone number"
        name="phone"
        placeholder="+234 801 000 0000"
        type="tel"
        value={values.phone}
        onChange={(value) => update("phone", value)}
      />
    </div>
  );
}
