import { cn } from "@heroui/react";

const STEPS = [
  { id: 1, label: "Facility" },
  { id: 2, label: "Admin" },
  { id: 3, label: "Access" },
  { id: 4, label: "Review" },
] as const;

export function RegisterStepper({ step }: { step: number }) {
  return (
    <ol className="grid grid-cols-4">
      {STEPS.map((item, index) => {
        const complete = step > item.id;
        const current = step === item.id;

        return (
          <li key={item.id} className="relative flex flex-col items-center gap-2">
            {index > 0 ? (
              <span
                className={cn(
                  "absolute top-3.5 right-1/2 left-[-50%] h-0.5",
                  complete || current ? "bg-accent" : "bg-border",
                )}
              />
            ) : null}
            <span
              className={cn(
                "relative z-10 grid size-7 place-items-center rounded-full text-xs font-semibold",
                complete && "bg-success text-success-foreground",
                current && "bg-accent text-accent-foreground",
                !complete && !current && "bg-surface-secondary text-muted",
              )}
            >
              {item.id}
            </span>
            <span
              className={cn(
                "text-center text-xs font-medium",
                current ? "text-foreground" : "text-muted",
              )}
            >
              {item.label}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
