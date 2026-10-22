import { SIGNAL, type SignalName } from "@/lib/dashboard/signal-colors";
import { CircleInfo, TriangleExclamation } from "@gravity-ui/icons";
import type { ReactNode } from "react";

/** One-line heads-up. Same color = same meaning as the rest of the app. */
export function InfoBanner({
  children,
  tone = "blue",
}: {
  children: ReactNode;
  tone?: SignalName;
}) {
  const Icon = tone === "amber" || tone === "orange" ? TriangleExclamation : CircleInfo;
  const styles = SIGNAL[tone];

  return (
    <div
      className={`flex items-start gap-3 rounded-xl px-4 py-3 ${styles.tile}`}
      role="note"
    >
      <Icon className={`mt-0.5 size-5 shrink-0 ${styles.ink}`} />
      <p className="type-body text-foreground">{children}</p>
    </div>
  );
}
