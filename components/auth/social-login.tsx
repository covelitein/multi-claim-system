"use client";

import { Button, Separator } from "@heroui/react";
import type { SVGProps } from "react";

export function SocialLogin() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted">or</span>
        <Separator className="flex-1" />
      </div>

      <Button
        fullWidth
        className="h-12 [&>svg]:m-0"
        type="button"
        variant="outline"
      >
        <GoogleMark className="size-5" />
        Continue with Google
      </Button>

      <Button
        fullWidth
        className="h-12 [&>svg]:m-0"
        type="button"
        variant="outline"
      >
        <AppleMark className="size-5" />
        Continue with Apple
      </Button>
    </div>
  );
}

function GoogleMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...props}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23Z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09A6.97 6.97 0 0 1 5.48 12c0-.72.12-1.43.36-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.43 3.45 1.18 4.93l3.66-2.84Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53Z"
      />
    </svg>
  );
}

function AppleMark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M16.37 12.64c0-2.3 1.88-3.41 1.96-3.46-1.07-1.57-2.74-1.78-3.33-1.8-1.41-.15-2.77.83-3.49.83-.72 0-1.84-.81-3.03-.79-1.56.02-3 0.91-3.8 2.3-1.63 2.83-.42 7.01 1.17 9.31.78 1.12 1.7 2.38 2.92 2.34 1.17-.05 1.61-.76 3.02-.76 1.41 0 1.8.76 3.04.73 1.26-.02 2.05-1.14 2.82-2.27.89-1.3 1.25-2.56 1.27-2.63-.03-.01-2.43-.93-2.45-3.8ZM14.8 6.4c.64-.78 1.08-1.86.96-2.94-0.93.04-2.05.62-2.72 1.4-.6.69-1.12 1.8-.98 2.86 1.04.08 2.1-.53 2.74-1.32Z" />
    </svg>
  );
}
