import { AuthSidebar } from "@/components/auth/auth-sidebar";
import { HelixLogo } from "@/components/brand/helix-logo";
import { ScrollShadow } from "@heroui/react";
import type { ReactNode } from "react";

export function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col lg:h-screen lg:flex-row lg:overflow-hidden">
      <div className="hidden min-h-0 overflow-hidden bg-background lg:flex lg:h-full lg:w-1/2 xl:w-3/5">
        <AuthSidebar />
      </div>
      <ScrollShadow
        className="flex flex-1 justify-center overflow-x-hidden px-6 pt-8 pb-16 sm:px-10 lg:px-12 lg:pt-10 lg:pb-20"
        isEnabled={false}
        orientation="vertical"
      >
        <div className="flex w-full max-w-md flex-col pb-10">
          <HelixLogo
            className="mb-6 h-14 w-auto object-contain object-left lg:hidden"
            priority
            src="/brand/logo-colored-lg.png"
            variant="mark"
          />
          {children}
        </div>
      </ScrollShadow>
    </div>
  );
}
