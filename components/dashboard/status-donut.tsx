export type DonutSlice = {
  id: string;
  label: string;
  value: number;
  color: string;
};

/**
 * Donut with a stacked legend. Used by Dashboard "Claims Overview" and
 * Analytics "Claims by Status" so both read the same way.
 */
export function StatusDonut({
  slices,
  centerLabel,
  size = 160,
  strokeWidth = 22,
}: {
  slices: DonutSlice[];
  centerLabel: string;
  size?: number;
  strokeWidth?: number;
}) {
  const total = slices.reduce((sum, item) => sum + item.value, 0);
  const safeTotal = total || 1;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let consumed = 0;
  const arcs = slices.map((item) => {
    const length = (item.value / safeTotal) * circumference;
    const arc = {
      ...item,
      dashArray: `${length} ${circumference - length}`,
      dashOffset: -consumed,
    };
    consumed += length;
    return arc;
  });

  return (
    <div className="flex min-w-0 flex-1 flex-col items-center gap-5">
      <div className="relative shrink-0">
        <svg height={size} viewBox={`0 0 ${size} ${size}`} width={size}>
          {arcs.map((arc) => (
            <circle
              key={arc.id}
              cx={size / 2}
              cy={size / 2}
              fill="none"
              r={radius}
              stroke={arc.color}
              strokeDasharray={arc.dashArray}
              strokeDashoffset={arc.dashOffset}
              strokeWidth={strokeWidth}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="type-stat">{total}</span>
          <span className="type-meta text-muted">{centerLabel}</span>
        </div>
      </div>

      <ul className="mt-auto w-full divide-y divide-separator">
        {slices.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-2.5">
            <span
              className="size-3 shrink-0 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="min-w-0 flex-1 truncate type-body">
              {item.label}
            </span>
            <span className="type-row tabular-nums">{item.value}</span>
            <span className="w-10 text-right type-meta tabular-nums text-muted">
              {Math.round((item.value / safeTotal) * 100)}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
