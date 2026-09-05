import Image from "next/image";

type HelixLogoProps = {
  variant?: "lockup" | "mark";
  tone?: "color" | "light";
  src?: string;
  className?: string;
  priority?: boolean;
};

const SRC = {
  lockup: {
    color: "/brand/helix-lockup-color.png",
    light: "/brand/helix-lockup-light.png",
  },
  mark: {
    color: "/brand/helix-mark-color.png",
    light: "/brand/helix-mark-light.png",
  },
} as const;

export function HelixLogo({
  variant = "lockup",
  tone = "color",
  src,
  className,
  priority = false,
}: HelixLogoProps) {
  const isMark = variant === "mark";

  return (
    <Image
      src={src ?? SRC[variant][tone]}
      alt="Helix Claims"
      width={isMark ? 128 : 640}
      height={isMark ? 128 : 360}
      className={className}
      priority={priority}
    />
  );
}
