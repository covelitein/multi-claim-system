/**
 * Shared status colors for dashboard, invoices, and analytics.
 *
 * Design rule: color encodes meaning, not decoration.
 * - Surfaces (section cards, tables) stay neutral.
 * - `tile`  : soft tint + hairline border. Only for KPI / action tiles.
 * - `edge`  : neutral row with a colored left stripe. For list rows.
 * - `badge` : status pill. Same color = same meaning everywhere.
 */

export const SIGNAL = {
  blue: {
    tile: "border border-signal-blue/30 bg-signal-blue-soft",
    edge: "border-l-4 border-l-signal-blue",
    icon: "bg-signal-blue text-white",
    ink: "text-signal-blue-ink",
    badge: "bg-signal-blue-soft text-signal-blue-ink ring-1 ring-signal-blue/40",
    swatch: "var(--signal-blue)",
  },
  green: {
    tile: "border border-signal-green/30 bg-signal-green-soft",
    edge: "border-l-4 border-l-signal-green",
    icon: "bg-signal-green text-white",
    ink: "text-signal-green-ink",
    badge:
      "bg-signal-green-soft text-signal-green-ink ring-1 ring-signal-green/40",
    swatch: "var(--signal-green)",
  },
  amber: {
    tile: "border border-signal-amber/40 bg-signal-amber-soft",
    edge: "border-l-4 border-l-signal-amber",
    icon: "bg-signal-amber text-signal-amber-ink",
    ink: "text-signal-amber-ink",
    badge:
      "bg-signal-amber-soft text-signal-amber-ink ring-1 ring-signal-amber/50",
    swatch: "var(--signal-amber)",
  },
  orange: {
    tile: "border border-signal-orange/35 bg-signal-orange-soft",
    edge: "border-l-4 border-l-signal-orange",
    icon: "bg-signal-orange text-white",
    ink: "text-signal-orange-ink",
    badge:
      "bg-signal-orange-soft text-signal-orange-ink ring-1 ring-signal-orange/50",
    swatch: "var(--signal-orange)",
  },
  red: {
    tile: "border border-signal-red/30 bg-signal-red-soft",
    edge: "border-l-4 border-l-signal-red",
    icon: "bg-signal-red text-white",
    ink: "text-signal-red-ink",
    badge: "bg-signal-red-soft text-signal-red-ink ring-1 ring-signal-red/40",
    swatch: "var(--signal-red)",
  },
  rose: {
    tile: "border border-signal-rose/30 bg-signal-rose-soft",
    edge: "border-l-4 border-l-signal-rose",
    icon: "bg-signal-rose text-white",
    ink: "text-signal-rose-ink",
    badge:
      "bg-signal-rose-soft text-signal-rose-ink ring-1 ring-signal-rose/40",
    swatch: "var(--signal-rose)",
  },
  purple: {
    tile: "border border-signal-purple/30 bg-signal-purple-soft",
    edge: "border-l-4 border-l-signal-purple",
    icon: "bg-signal-purple text-white",
    ink: "text-signal-purple-ink",
    badge:
      "bg-signal-purple-soft text-signal-purple-ink ring-1 ring-signal-purple/40",
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
