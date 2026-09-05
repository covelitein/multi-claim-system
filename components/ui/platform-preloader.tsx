"use client";

import { HelixLogo } from "@/components/brand/helix-logo";
import { Spinner } from '@heroui/react';

interface PlatformPreloaderProps {
  message?: string;
}

export function PlatformPreloader({ message = "Initializing platform..." }: PlatformPreloaderProps) {
  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen w-full flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative flex flex-col items-center justify-center gap-8">
        {/* Logo Container with animations */}
        <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl border border-border/50 bg-background shadow-2xl shadow-accent/20">
          <div className="absolute inset-0 -z-10 animate-pulse rounded-3xl bg-accent/10 blur-xl" />
          <HelixLogo
            variant="mark"
            className="h-12 w-12 animate-pulse object-contain"
            priority
          />
        </div>

        {/* Loading Indicator & Text */}
        <div className="flex flex-col items-center gap-4">
          <Spinner
            aria-label="Loading..."
            size="sm"
          />
          <p className="animate-pulse text-sm font-medium tracking-wide text-muted">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}
