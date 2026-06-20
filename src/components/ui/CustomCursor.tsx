"use client";

import { useEffect, useRef, useState } from "react";

type CursorVariant = "default" | "button" | "link" | "video" | "card";

const EASE = 0.18; // dot follow speed
const GLOW_EASE = 0.1; // glow ring follows slightly looser, for a soft trailing feel
const SPOTLIGHT_EASE = 0.06; // spotlight is the laziest, for a slow ambient drift

/**
 * Premium custom cursor — desktop only.
 *
 * Three independently-eased layers driven by a single requestAnimationFrame loop
 * (never CSS transitions, which can stutter under scroll/animation load):
 *   1. A small lime dot, tightest follow.
 *   2. A soft glow ring around it, slightly looser follow, scales/morphs on hover state.
 *   3. A large, very low-opacity blurred spotlight that drifts behind everything.
 *
 * Hover state is read from the nearest ancestor's `data-cursor` attribute, set via
 * the cursor-button / cursor-link / cursor-video / cursor-card class helpers below.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hidden, setHidden] = useState(true);

  const dotRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const spotlightRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const variantRef = useRef<CursorVariant>("default");
  const [variant, setVariantState] = useState<CursorVariant>("default");

  // Mouse target position (actual pointer position)
  const target = useRef({ x: 0, y: 0 });
  // Current eased positions per layer
  const dotPos = useRef({ x: 0, y: 0 });
  const glowPos = useRef({ x: 0, y: 0 });
  const spotlightPos = useRef({ x: 0, y: 0 });
  const rafId = useRef<number | null>(null);
  const initialized = useRef(false);

  // Decide once whether this device qualifies for a custom cursor at all.
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const noTouch = window.matchMedia("(hover: hover)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    const shouldEnable = fine && noTouch && !reducedMotion && !isTouchDevice;
    setEnabled(shouldEnable);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    document.documentElement.classList.add("custom-cursor-active");

    function handleMove(e: MouseEvent) {
      target.current.x = e.clientX;
      target.current.y = e.clientY;

      if (!initialized.current) {
        // Snap all layers to the first known position instantly — avoids a
        // jarring fly-in from the top-left corner on first mouse move.
        dotPos.current = { ...target.current };
        glowPos.current = { ...target.current };
        spotlightPos.current = { ...target.current };
        initialized.current = true;
        setHidden(false);
      }

      // Walk up from the event target to find the nearest hover target.
      // Explicit data-cursor attributes always win (used for cards, video, and
      // any one-off special case). Failing that, infer a sensible variant from
      // the element itself so buttons/links work automatically without having
      // to hand-tag every instance across the codebase.
      const explicit = (e.target as HTMLElement)?.closest<HTMLElement>(
        "[data-cursor]"
      );
      let next: CursorVariant = "default";

      if (explicit) {
        next = (explicit.dataset.cursor as CursorVariant) || "default";
      } else {
        const buttonEl = (e.target as HTMLElement)?.closest<HTMLElement>(
          "button, .btn-primary, .btn-secondary, [role='button']"
        );
        const linkEl = (e.target as HTMLElement)?.closest<HTMLElement>("a");

        if (buttonEl) {
          next = "button";
        } else if (linkEl) {
          next = "link";
        }
      }

      if (next !== variantRef.current) {
        variantRef.current = next;
        setVariantState(next);
      }
    }

    function handleLeave() {
      setHidden(true);
    }

    function handleEnter() {
      if (initialized.current) setHidden(false);
    }

    window.addEventListener("mousemove", handleMove, { passive: true });
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    function tick() {
      // Dot: tight follow
      dotPos.current.x += (target.current.x - dotPos.current.x) * EASE;
      dotPos.current.y += (target.current.y - dotPos.current.y) * EASE;

      // Glow: looser follow, slight trailing lag
      glowPos.current.x += (target.current.x - glowPos.current.x) * GLOW_EASE;
      glowPos.current.y += (target.current.y - glowPos.current.y) * GLOW_EASE;

      // Spotlight: slow ambient drift
      spotlightPos.current.x +=
        (target.current.x - spotlightPos.current.x) * SPOTLIGHT_EASE;
      spotlightPos.current.y +=
        (target.current.y - spotlightPos.current.y) * SPOTLIGHT_EASE;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotPos.current.x}px, ${dotPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (spotlightRef.current) {
        spotlightRef.current.style.transform = `translate3d(${spotlightPos.current.x}px, ${spotlightPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      rafId.current = requestAnimationFrame(tick);
    }

    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      {/* Ambient spotlight — large, blurred, very low opacity, drifts slowest */}
      <div
        ref={spotlightRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[55] will-change-transform"
        style={{
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.4s ease",
        }}
      >
        <div className="h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-[120px]" />
      </div>

      {/* Glow ring — scales/morphs per hover variant */}
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[60] will-change-transform"
        style={{
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.25s ease",
        }}
      >
        <div
          className="cursor-glow rounded-full transition-[width,height,background,border,opacity] duration-300 ease-out"
          data-variant={variant}
        />
      </div>

      {/* Core dot — tightest follow, holds the "Play" label for video state */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[61] will-change-transform"
        style={{
          opacity: hidden ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        <div
          className="cursor-dot flex items-center justify-center rounded-full bg-accent transition-[width,height,opacity] duration-300 ease-out"
          data-variant={variant}
        >
          <span
            ref={labelRef}
            className="cursor-label select-none whitespace-nowrap font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-bg opacity-0"
          >
            Play
          </span>
        </div>
      </div>
    </>
  );
}
