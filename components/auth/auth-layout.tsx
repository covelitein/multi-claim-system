import { AuthSidebar } from "@/components/auth/auth-sidebar";
import { HelixLogo } from "@/components/brand/helix-logo";
import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <div className="hidden min-h-0 overflow-hidden bg-background lg:flex lg:h-full lg:w-1/2 xl:w-3/5">
        <AuthSidebar />
      </div>
      <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto lg:h-screen">
        <div className="flex w-full flex-col px-6 pt-8 pb-16 sm:px-10 lg:min-h-screen lg:justify-center lg:px-12 lg:pt-10 lg:pb-20 2xl:px-16">
          <HelixLogo
            className="mb-6 h-14 w-auto object-contain object-left lg:hidden"
            priority
            src="/brand/logo-colored-lg.png"
            variant="mark"
          />
          {children}
        </div>
      </div>
    </div>
  );
}
