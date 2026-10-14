import { StatusBadge } from "@/components/dashboard/status-badge";
import { signalFor, signalStyles } from "@/lib/dashboard/signal-colors";
import Link from "next/link";
import type { ComponentType, ReactNode, SVGProps } from "react";

export type StatTileProps = {
  label: string;
  value: ReactNode;
  tone: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /** Optional trend / delta shown next to the value. */
  badge?: string;
  href?: string;
};

/** One KPI tile used by Dashboard, Invoices, and Analytics. */
export function StatTile({
  label,
  value,
  tone,
  icon: Icon,
  badge,
  href,
}: StatTileProps) {
  const styles = signalStyles(tone);

  const body = (
    <div
      className={`flex h-full min-w-0 items-center justify-between gap-3 rounded-2xl px-4 py-3.5 transition-shadow ${styles.tile} ${
        href ? "hover:shadow-md" : ""
      }`}
    >
      <div className="min-w-0">
        <p className="type-label text-foreground/70">{label}</p>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1">
          <p className={`type-stat ${styles.ink}`}>
            {value}
          </p>
          {badge ? (
            <StatusBadge signal={signalFor(tone)}>{badge}</StatusBadge>
          ) : null}
        </div>
      </div>
      <span
        className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${styles.icon}`}
      >
        <Icon className="size-5" />
      </span>
    </div>
  );

  return href ? (
    <Link className="block min-w-0" href={href}>
      {body}
    </Link>
  ) : (
    body
  );
}
