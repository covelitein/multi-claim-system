"use client";

import { AuthCheckbox } from "@/components/auth/fields/auth-checkbox";
import { AuthPasswordField } from "@/components/auth/fields/auth-password-field";
import { AuthTextField } from "@/components/auth/fields/auth-text-field";
import { SocialLogin } from "@/components/auth/social-login";
import { useNavigationLoader } from "@/lib/navigation/loader";
import { Button, Form } from "@heroui/react";
import { useRouter } from "next/navigation";
import type { FormEvent } from "react";

/** Gen-1: dummy sign-in (no API). */
export default function LoginForm() {
  const router = useRouter();
  const showLoader = useNavigationLoader((state) => state.show);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    showLoader("Signing you in...");
    window.setTimeout(() => {
      router.push("/home");
    }, 700);
  }

  return (
    <Form className="mt-4 flex w-full flex-col gap-5" onSubmit={onSubmit}>
      <AuthTextField
        autoFocus
        autoComplete="email"
        label="Email"
        name="email"
        placeholder="Enter your email"
        type="email"
      />
      <AuthPasswordField
        autoComplete="current-password"
        label="Password"
        name="password"
        placeholder="Enter your password"
      />
      <AuthCheckbox name="remember" value="on">
        Remember me
      </AuthCheckbox>
      <Button fullWidth className="h-12" type="submit" variant="primary">
        Sign in
      </Button>
      <SocialLogin />
    </Form>
  );
}
