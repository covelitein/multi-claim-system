"use client";

import { NavigationPreloader } from "@/components/ui/navigation-preloader";
import { NextThemeProvider } from "@/providers/next-theme-provider";
import { ReduxProvider } from "@/providers/redux-provider";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <NextThemeProvider>
        <NavigationPreloader />
        {children}
      </NextThemeProvider>
    </ReduxProvider>
  );
}
