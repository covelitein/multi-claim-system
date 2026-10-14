import { SIGNAL, type SignalName } from "@/lib/dashboard/signal-colors";
import type { ReactNode } from "react";

export function StatusBadge({
  signal,
  children,
}: {
  signal: SignalName;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-sm font-bold leading-none ${SIGNAL[signal].badge}`}
    >
      {children}
    </span>
  );
}
