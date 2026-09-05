"use client";

import {
  REGISTER_DEFAULTS,
  REGISTER_STEP_COPY,
  REGISTER_STEP_SCHEMAS,
  schemaFieldErrors,
  type RegisterDraft,
  type RegisterFieldErrors,
} from "@/lib/auth/register-schema";
import { useNavigationLoader } from "@/lib/navigation/loader";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

const LAST_STEP = 4;

export function useRegisterForm() {
  const router = useRouter();
  const showLoader = useNavigationLoader((state) => state.show);
  const [step, setStep] = useState(1);
  const [values, setValues] = useState<RegisterDraft>(REGISTER_DEFAULTS);
  const [errors, setErrors] = useState<RegisterFieldErrors>({});
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof RegisterDraft>(key: K, value: RegisterDraft[K]) {
    setValues((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function validateStep(current: number) {
    const schema = REGISTER_STEP_SCHEMAS[current as keyof typeof REGISTER_STEP_SCHEMAS];
    if (!schema) return true;

    const result = schema.safeParse(values);
    if (!result.success) {
      setErrors(schemaFieldErrors(result.error));
      return false;
    }

    setErrors({});
    return true;
  }

  function goNext() {
    if (!validateStep(step)) return;
    setStep((current) => Math.min(LAST_STEP, current + 1));
  }

  function goBack() {
    setErrors({});
    setStep((current) => Math.max(1, current - 1));
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < LAST_STEP) {
      goNext();
      return;
    }

    for (const pending of [1, 2, 3] as const) {
      if (!validateStep(pending)) {
        setStep(pending);
        return;
      }
    }

    setSubmitting(true);
    showLoader("Creating your facility workspace...");
    window.setTimeout(() => {
      router.push("/login");
    }, 900);
  }

  return {
    step,
    values,
    errors,
    submitting,
    copy: REGISTER_STEP_COPY[step - 1],
    update,
    goBack,
    onSubmit,
  };
}
