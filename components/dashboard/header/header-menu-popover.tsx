"use client";

import { useIsDesktop } from "@/lib/dashboard/use-media-query";
import { cn, Dropdown } from "@heroui/react";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
  type RefObject,
} from "react";

const HeaderAnchorContext = createContext<RefObject<HTMLElement | null> | null>(
  null,
);

export function HeaderAnchorProvider({
  value,
  children,
}: {
  value: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  return (
    <HeaderAnchorContext.Provider value={value}>
      {children}
    </HeaderAnchorContext.Provider>
  );
}

function useHeaderAnchor() {
  const ref = useContext(HeaderAnchorContext);
  if (!ref) {
    throw new Error("Header dropdowns must render inside the dashboard header");
  }
  return ref;
}

export function HeaderMenuPopover({
  children,
  className,
  desktopPlacement = "bottom start",
}: {
  children: ReactNode;
  className?: string;
  desktopPlacement?: "bottom start" | "bottom end";
}) {
  const headerRef = useHeaderAnchor();
  const isDesktop = useIsDesktop();
  const [headerWidth, setHeaderWidth] = useState<number>();

  useEffect(() => {
    const header = headerRef.current;
    if (!header || isDesktop) return;

    const syncWidth = () => {
      const styles = getComputedStyle(header);
      const inset =
        parseFloat(styles.paddingLeft) + parseFloat(styles.paddingRight);
      setHeaderWidth(header.getBoundingClientRect().width - inset);
    };
    syncWidth();

    const observer = new ResizeObserver(syncWidth);
    observer.observe(header);
    return () => observer.disconnect();
  }, [headerRef, isDesktop]);

  return (
    <Dropdown.Popover
      className={cn("max-w-none", isDesktop ? "w-64" : undefined, className)}
      containerPadding={0}
      offset={8}
      placement={isDesktop ? desktopPlacement : "bottom"}
      shouldFlip={isDesktop}
      style={
        isDesktop || !headerWidth
          ? undefined
          : { width: headerWidth, maxWidth: "none" }
      }
      triggerRef={isDesktop ? undefined : headerRef}
    >
      {children}
    </Dropdown.Popover>
  );
}
