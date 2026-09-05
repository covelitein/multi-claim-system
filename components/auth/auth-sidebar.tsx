"use client";

import { HelixLogo } from "@/components/brand/helix-logo";
import { SidebarPreviewCard } from "@/components/auth/sidebar-preview-card";
import { AUTH_SIDEBAR_SLIDES } from "@/lib/auth/sidebar-slides";
import { cn } from "@heroui/react";
import { useCallback, useEffect, useRef, useState, type PointerEvent } from "react";

const INTERVAL_MS = 5500;

export function AuthSidebar() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduceMotion = usePrefersReducedMotion();
  const stageRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback((index: number) => {
    setActive((index + AUTH_SIDEBAR_SLIDES.length) % AUTH_SIDEBAR_SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused || reduceMotion) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % AUTH_SIDEBAR_SLIDES.length);
    }, INTERVAL_MS);

    return () => window.clearInterval(timer);
  }, [paused, reduceMotion]);

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion) return;
    const bounds = stageRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    setTilt({ x: x * 18, y: y * 12 });
  }

  function onPointerLeave() {
    setTilt({ x: 0, y: 0 });
  }

  const slide = AUTH_SIDEBAR_SLIDES[active];

  return (
    <aside className="relative flex h-full w-full flex-col overflow-hidden px-10 py-8 xl:px-14">
      <HelixLogo
        className="relative z-10 h-16 w-auto object-contain object-left"
        priority
        src="/brand/logo-colored-lg.png"
        variant="mark"
      />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col items-center justify-center">
        <div
          ref={stageRef}
          className="group relative w-full max-w-lg"
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={() => {
            setPaused(false);
            onPointerLeave();
          }}
          onPointerMove={onPointerMove}
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              aria-hidden
              className="auth-orb animate-auth-orb absolute top-1/2 left-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full"
            />
          </div>

          <div
            className="relative z-10 w-full pt-4 transition-transform duration-300 ease-out"
            style={{
              transform: `translate3d(${tilt.x}px, ${tilt.y}px, 0)`,
            }}
          >
            <div
              aria-hidden
              className="auth-glass-soft absolute inset-x-10 top-12 bottom-1 scale-95 rounded-3xl rotate-6 transition-transform duration-500 group-hover:rotate-12"
            />
            <div
              aria-hidden
              className="auth-glass-soft absolute inset-x-6 top-8 bottom-0 scale-95 rounded-3xl -rotate-3 transition-transform duration-500 group-hover:-rotate-6"
            />

            <div className={cn("relative", !reduceMotion && "animate-auth-float")}>
              <div key={slide.id} className={cn(!reduceMotion && "animate-auth-blow")}>
                <SidebarPreviewCard
                  badge={slide.badge}
                  slide={slide}
                  onAdvance={() => goTo(active + 1)}
                />
              </div>
            </div>
          </div>
        </div>

        <p
          aria-live="polite"
          className="relative z-10 mt-8 max-w-md bg-background text-center text-sm leading-6 text-muted"
        >
          {slide.copy}
        </p>
      </div>

      <div className="relative z-10 flex items-center justify-center gap-2">
        {AUTH_SIDEBAR_SLIDES.map((item, index) => {
          const isActive = index === active;

          return (
            <button
              key={item.id}
              aria-current={isActive ? "true" : undefined}
              aria-label={`Show ${item.title}`}
              className={cn(
                "h-1 rounded-full transition-all duration-300",
                isActive ? "w-8 bg-accent" : "w-4 bg-border hover:bg-muted",
              )}
              type="button"
              onClick={() => goTo(index)}
            />
          );
        })}
      </div>
    </aside>
  );
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(media.matches);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  return reduced;
}
