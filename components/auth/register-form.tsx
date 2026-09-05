"use client";

import { AccessStep } from "@/components/auth/register/access-step";
import { AdminStep } from "@/components/auth/register/admin-step";
import { HospitalStep } from "@/components/auth/register/hospital-step";
import { RegisterStepper } from "@/components/auth/register/register-stepper";
import { ReviewStep } from "@/components/auth/register/review-step";
import { useRegisterForm } from "@/lib/auth/use-register-form";
import { Button, Form, Typography } from "@heroui/react";

export function RegisterForm() {
  const { step, values, errors, submitting, copy, update, goBack, onSubmit } =
    useRegisterForm();

  return (
    <Form className="flex w-full min-w-0 flex-col gap-6" onSubmit={onSubmit}>
      <RegisterStepper step={step} />

      <div>
        <Typography type="h4" className="font-bold">
          {copy.title}
        </Typography>
        <Typography type="body-sm" className="text-muted">
          {copy.subtitle}
        </Typography>
      </div>

      {step === 1 ? <HospitalStep errors={errors} update={update} values={values} /> : null}
      {step === 2 ? <AdminStep errors={errors} update={update} values={values} /> : null}
      {step === 3 ? <AccessStep errors={errors} update={update} values={values} /> : null}
      {step === 4 ? <ReviewStep values={values} /> : null}

      <div className="flex gap-3">
        {step > 1 ? (
          <Button className="h-12 flex-1" type="button" variant="outline" onPress={goBack}>
            Back
          </Button>
        ) : null}
        <Button
          className="h-12 flex-1"
          isDisabled={submitting}
          type="submit"
          variant="primary"
        >
          {step < 4 ? "Continue" : "Create workspace"}
        </Button>
      </div>
    </Form>
  );
}
