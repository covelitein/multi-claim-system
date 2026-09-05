"use client";

import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import { HOSPITAL_TYPES, type RegisterDraft, type RegisterFieldErrors, type RegisterUpdate } from "@/lib/auth/register-schema";
import { FieldError, Label, Radio, RadioGroup } from "@heroui/react";

type HospitalStepProps = {
  values: RegisterDraft;
  errors: RegisterFieldErrors;
  update: RegisterUpdate;
};

export function HospitalStep({ values, errors, update }: HospitalStepProps) {
  return (
    <div className="grid gap-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <AuthTextField
          autoFocus
          error={errors.legalName}
          label="Legal facility name"
          name="legalName"
          placeholder="Sunrise Villa Assisted Living"
          value={values.legalName}
          onChange={(value) => update("legalName", value)}
        />
        <AuthTextField
          error={errors.displayName}
          label="Workspace name"
          name="displayName"
          placeholder="Sunrise Villa"
          value={values.displayName}
          onChange={(value) => update("displayName", value)}
        />
      </div>

      <RadioGroup
        className="gap-2"
        isInvalid={Boolean(errors.hospitalType)}
        name="hospitalType"
        value={values.hospitalType || undefined}
        onChange={(value) => update("hospitalType", value as RegisterDraft["hospitalType"])}
      >
        <Label>Facility type</Label>
        <div className="grid grid-cols-2 gap-2">
          {HOSPITAL_TYPES.map((type) => (
            <Radio key={type.id} value={type.id}>
              <Radio.Content className="h-12 rounded-xl border border-border px-3">
                <Radio.Control>
                  <Radio.Indicator />
                </Radio.Control>
                {type.label}
              </Radio.Content>
            </Radio>
          ))}
        </div>
        {errors.hospitalType ? <FieldError>{errors.hospitalType}</FieldError> : null}
      </RadioGroup>

      <AuthTextField
        error={errors.licenseNumber}
        label="Facility license number"
        name="licenseNumber"
        placeholder="MOH-2026-00418"
        value={values.licenseNumber}
        onChange={(value) => update("licenseNumber", value)}
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <AuthTextField
          error={errors.country}
          label="Country"
          name="country"
          placeholder="Nigeria"
          value={values.country}
          onChange={(value) => update("country", value)}
        />
        <AuthTextField
          error={errors.city}
          label="City"
          name="city"
          placeholder="Lagos"
          value={values.city}
          onChange={(value) => update("city", value)}
        />
      </div>

      <AuthTextField
        error={errors.address}
        label="Street address"
        name="address"
        placeholder="12 Marina Road, Lagos Island"
        value={values.address}
        onChange={(value) => update("address", value)}
      />
    </div>
  );
}
