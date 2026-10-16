"use client";

import { useEffect } from "react";

// Marks each section once (data-glitch="1") as it enters; motion-layer.css does the rest.
// The hero is left out: it has its own load intro. data-flip is set in the server markup, so nothing here edits attributes before hydration.
const SELECTORS = ["#about", "#work", "#work > header", "#work > div"];

export function ScrollGlitch() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let io: IntersectionObserver | undefined;
    const stop = () => io?.disconnect();
    const start = () => {
      stop();
      if (mq.matches) return;
      io = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            (e.target as HTMLElement).dataset.glitch = "1";
            io?.unobserve(e.target);
          }
        },
        // Fires when the section's top clears the bottom 25% of the viewport; tall sections never reach 25% visible.
        { rootMargin: "0px 0px -25% 0px" },
      );
      for (const el of document.querySelectorAll<HTMLElement>(SELECTORS.join(","))) {
        if (!el.dataset.glitch) io.observe(el);
      }
    };
    // Wait a beat so hydration has finished before any attribute is touched.
    const t = window.setTimeout(start, 300);
    mq.addEventListener("change", start);
    return () => {
      window.clearTimeout(t);
      mq.removeEventListener("change", start);
      stop();
    };
  }, []);
  return null;
}
