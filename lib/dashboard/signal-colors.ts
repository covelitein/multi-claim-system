/** Shared status colors for dashboard, invoices, and analytics. */

export const SIGNAL = {
  blue: {
    card: "border-2 border-signal-blue bg-signal-blue-soft",
    icon: "bg-signal-blue text-white",
    value: "text-signal-blue-ink",
    ink: "text-signal-blue-ink",
    badge: "border border-signal-blue bg-signal-blue-soft text-signal-blue-ink",
    swatch: "var(--signal-blue)",
  },
  green: {
    card: "border-2 border-signal-green bg-signal-green-soft",
    icon: "bg-signal-green text-white",
    value: "text-signal-green-ink",
    ink: "text-signal-green-ink",
    badge: "border border-signal-green bg-signal-green-soft text-signal-green-ink",
    swatch: "var(--signal-green)",
  },
  amber: {
    card: "border-2 border-signal-amber bg-signal-amber-soft",
    icon: "bg-signal-amber text-signal-amber-ink",
    value: "text-signal-amber-ink",
    ink: "text-signal-amber-ink",
    badge: "border border-signal-amber bg-signal-amber-soft text-signal-amber-ink",
    swatch: "var(--signal-amber)",
  },
  orange: {
    card: "border-2 border-signal-orange bg-signal-orange-soft",
    icon: "bg-signal-orange text-signal-orange-ink",
    value: "text-signal-orange-ink",
    ink: "text-signal-orange-ink",
    badge:
      "border border-signal-orange bg-signal-orange-soft text-signal-orange-ink",
    swatch: "var(--signal-orange)",
  },
  red: {
    card: "border-2 border-signal-red bg-signal-red-soft",
    icon: "bg-signal-red text-white",
    value: "text-signal-red-ink",
    ink: "text-signal-red-ink",
    badge: "border border-signal-red bg-signal-red-soft text-signal-red-ink",
    swatch: "var(--signal-red)",
  },
  rose: {
    card: "border-2 border-signal-rose bg-signal-rose-soft",
    icon: "bg-signal-rose text-white",
    value: "text-signal-rose-ink",
    ink: "text-signal-rose-ink",
    badge: "border border-signal-rose bg-signal-rose-soft text-signal-rose-ink",
    swatch: "var(--signal-rose)",
  },
  purple: {
    card: "border-2 border-signal-purple bg-signal-purple-soft",
    icon: "bg-signal-purple text-white",
    value: "text-signal-purple-ink",
    ink: "text-signal-purple-ink",
    badge:
      "border border-signal-purple bg-signal-purple-soft text-signal-purple-ink",
    swatch: "var(--signal-purple)",
  },
} as const;

export type SignalName = keyof typeof SIGNAL;

const SEMANTIC = {
  accent: "blue",
  success: "green",
  warning: "amber",
  danger: "red",
  orange: "orange",
  purple: "purple",
  blue: "blue",
  green: "green",
  amber: "amber",
  red: "red",
  rose: "rose",
} as const;

export function signalFor(tone: string): SignalName {
  return SEMANTIC[tone as keyof typeof SEMANTIC] ?? "blue";
}

export function signalStyles(tone: string) {
  return SIGNAL[signalFor(tone)];
}

/** Chart series. Each hue is used once so bars stay easy to tell apart. */
export const CHART = {
  submitted: "var(--signal-blue)",
  paid: "var(--signal-green)",
  approved: "var(--signal-green)",
  pending: "var(--signal-amber)",
  missing: "var(--signal-red)",
  ready: "var(--signal-blue)",
  progress: "var(--signal-amber)",
  denied: "var(--signal-rose)",
  rejected: "var(--signal-rose)",
  revenue: "var(--signal-purple)",
} as const;
