"use client";

import { SIGNAL } from "@/lib/dashboard/signal-colors";
import { ChevronDown, ChevronUp, Pencil } from "@gravity-ui/icons";
import { Button } from "@heroui/react";
import { useState } from "react";

/** Always-visible reminder that signatures must be handwritten each month. */
export function SignatureNotice({ tips }: { tips: string[] }) {
  const [open, setOpen] = useState(false);
  const styles = SIGNAL.amber;

  return (
    <div className={`rounded-xl p-4 ${styles.tile}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <span
          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
        >
          <Pencil className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className={`type-row ${styles.ink}`}>
            Fresh signatures & dates required
          </h3>
          <p className="mt-0.5 type-body font-medium text-foreground">
            The signature at the bottom of the form must be freshly handwritten
            each month.
          </p>
        </div>
        <Button
          aria-expanded={open}
          className="h-10 gap-2 px-3.5 type-body"
          size="sm"
          variant="outline"
          onPress={() => setOpen((v) => !v)}
        >
          {open ? "Hide tips" : "See more tips"}
          {open ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </Button>
      </div>
      {open ? (
        <ul className="mt-3 flex list-disc flex-col gap-1.5 pl-[3.25rem] type-body font-medium text-foreground marker:text-muted">
          {tips.map((tip) => (
            <li key={tip}>{tip}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
