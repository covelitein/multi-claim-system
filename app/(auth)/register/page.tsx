import { RegisterForm } from "@/components/auth/register-form";
import { Link } from "@heroui/react";

export default function RegisterPage() {
  return (
    <section className="flex w-full flex-col">
      <RegisterForm />

      <p className="mt-6 mb-2 text-center text-sm text-muted">
        Already have an account?{" "}
        <Link className="text-sm font-medium text-accent" href="/login">
          Sign in
        </Link>
      </p>
    </section>
  );
}
