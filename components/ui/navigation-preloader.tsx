"use client";

import { PlatformPreloader } from "@/components/ui/platform-preloader";
import { useNavigationLoader } from "@/lib/navigation/loader";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const MIN_VISIBLE_MS = 450;

function isInternalNavigation(anchor: HTMLAnchorElement, event: MouseEvent) {
  if (event.defaultPrevented) return false;
  if (event.button !== 0) return false;
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return false;
  if (anchor.target && anchor.target !== "_self") return false;
  if (anchor.hasAttribute("download")) return false;

  const href = anchor.getAttribute("href");
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }

  const next = new URL(href, window.location.href);
  if (next.origin !== window.location.origin) return false;

  return (
    next.pathname !== window.location.pathname ||
    next.search !== window.location.search
  );
}

export function NavigationPreloader() {
  const pathname = usePathname();
  const visible = useNavigationLoader((state) => state.visible);
  const message = useNavigationLoader((state) => state.message);
  const show = useNavigationLoader((state) => state.show);
  const hide = useNavigationLoader((state) => state.hide);
  const shownAt = useRef(0);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (!isInternalNavigation(anchor, event)) return;

      shownAt.current = Date.now();
      show("Loading...");
    }

    function onPopState() {
      shownAt.current = Date.now();
      show("Loading...");
    }

    document.addEventListener("click", onClick, true);
    window.addEventListener("popstate", onPopState);
    return () => {
      document.removeEventListener("click", onClick, true);
      window.removeEventListener("popstate", onPopState);
    };
  }, [show]);

  useEffect(() => {
    if (!useNavigationLoader.getState().visible) return;

    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - shownAt.current));
    const timer = window.setTimeout(() => hide(), remaining);
    return () => window.clearTimeout(timer);
  }, [hide, pathname]);

  if (!visible) return null;

  return <PlatformPreloader message={message} />;
}
