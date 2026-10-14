export function ChartLegend({
  items,
}: {
  items: { key: string; label: string; color: string }[];
}) {
  return (
    <ul className="flex flex-wrap items-center gap-x-4 gap-y-1">
      {items.map((item) => (
        <li key={item.key} className="flex items-center gap-1.5">
          <span
            className="size-2.5 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span className="type-meta font-semibold text-foreground">
            {item.label}
          </span>
        </li>
      ))}
    </ul>
  );
}
