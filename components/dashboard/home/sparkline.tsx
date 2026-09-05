import { cn } from "@heroui/react";

export function Sparkline({
  values,
  tone,
}: {
  values: number[];
  tone: "success" | "danger";
}) {
  const max = Math.max(...values);
  const min = Math.min(...values);
  const span = Math.max(max - min, 1);
  const points = values
    .map((value, index) => {
      const x = (index / (values.length - 1)) * 48;
      const y = 16 - ((value - min) / span) * 12;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg className="h-4 w-12" viewBox="0 0 48 16">
      <polyline
        className={cn(
          "fill-none stroke-2",
          tone === "success" ? "stroke-success" : "stroke-danger",
        )}
        points={points}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
