"use client";

import { AuthCheckbox } from "@/components/auth/fields/auth-checkbox";
import { AuthPasswordField } from "@/components/auth/fields/auth-password-field";
import type { RegisterDraft, RegisterFieldErrors, RegisterUpdate } from "@/lib/auth/register-schema";

type AccessStepProps = {
  values: RegisterDraft;
  errors: RegisterFieldErrors;
  update: RegisterUpdate;
};

export function AccessStep({ values, errors, update }: AccessStepProps) {
  return (
    <div className="grid gap-4">
      <AuthPasswordField
        autoFocus
        autoComplete="new-password"
        error={errors.password}
        label="Password"
        name="password"
        placeholder="At least 8 characters"
        value={values.password}
        onChange={(value) => update("password", value)}
      />
      <AuthPasswordField
        autoComplete="new-password"
        error={errors.confirmPassword}
        label="Confirm password"
        name="confirmPassword"
        placeholder="Re-enter your password"
        value={values.confirmPassword}
        onChange={(value) => update("confirmPassword", value)}
      />
      <AuthCheckbox
        error={errors.acceptTerms}
        isSelected={values.acceptTerms}
        name="acceptTerms"
        onChange={(selected) => update("acceptTerms", selected)}
      >
        I agree to the Terms and Conditions and Privacy Policy
      </AuthCheckbox>
    </div>
  );
}
