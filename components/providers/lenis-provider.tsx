"use client";

import { useEffect, type ReactNode } from "react";

/**
 * Native scroll, no Lenis. Lenis adds an easing/inertia curve to wheel
 * events that some users perceive as scroll lag ("delay then jump"). For a
 * portfolio that doesn't drive any scrub-style animations off scrollY,
 * native wheel scrolling feels far snappier and 1:1 with the input device.
 *
 * We still want smooth anchor jumps when clicking the nav, so we intercept
 * in-page hash links and call scrollIntoView with `behavior: 'smooth'`.
 * The browser handles the smooth interpolation natively and is GPU-friendly.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      const anchor = target?.closest("a[href^='#']") as HTMLAnchorElement | null;
      if (!anchor) return;
      const id = anchor.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id) as HTMLElement | null;
      if (!el) return;
      e.preventDefault();
      const y = el.getBoundingClientRect().top + window.scrollY - 60;
      window.scrollTo({ top: y, behavior: "smooth" });
      // Update the URL hash without re-triggering scroll.
      history.replaceState(null, "", id);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return <>{children}</>;
}
