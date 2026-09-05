import LoginForm from "@/components/auth/login-form";
import { Link, Typography } from "@heroui/react";

export default function LoginPage() {
    return (
        <section className="w-full">
            <Typography type="h3" className="font-bold">
                Welcome back
            </Typography>

            <LoginForm />

            <p className="mt-6 text-center text-sm text-muted">
                Don&apos;t have an account?{" "}
                <Link className="text-sm font-medium text-accent" href="/register">
                    Create an account
                </Link>
            </p>
        </section>
    );
}
