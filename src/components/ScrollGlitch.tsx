"use client";

import { useEffect } from "react";

// Sections get one dimension-glitch cut as they enter (data-glitch). The hero is left out: it has its own load intro.
const SECTIONS = ["#about", "#work", "#work > header", "#work > div"];

// Small elements glitch (data-live, ~240ms) when they first scroll in, when hovered, and at random while visible.
const LIVE = [
  "#about h2", "#work h2", "#work h3", ".case-box", ".hero-name", ".hero-portrait", ".hero-bubble", ".hero-draw", ".hero-cta",
  "a.comic-link", ".rough.inline-block", "#about li", "#work li",
].join(",");

export function ScrollGlitch() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    let teardown = () => {};

    const start = () => {
      teardown();
      teardown = () => {};
      if (motion.matches || document.documentElement.hasAttribute("data-calm")) return;

      const timers = new Set<number>();
      const later = (fn: () => void, ms: number) => {
        const id = window.setTimeout(() => {
          timers.delete(id);
          fn();
        }, ms);
        timers.add(id);
      };

      const fire = (el: HTMLElement) => {
        if (el.dataset.live) return;
        el.dataset.live = "1";
        later(() => {
          delete el.dataset.live;
        }, 260);
      };

      // Section cuts, once each.
      const sectionIO = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (!e.isIntersecting) continue;
            (e.target as HTMLElement).dataset.glitch = "1";
            sectionIO.unobserve(e.target);
          }
        },
        // Fires when the section's top clears the bottom 25% of the viewport; tall sections never reach 25% visible.
        { rootMargin: "0px 0px -25% 0px" },
      );
      for (const el of document.querySelectorAll<HTMLElement>(SECTIONS.join(","))) {
        if (!el.dataset.glitch) sectionIO.observe(el);
      }

      // Live glitches start after the hero intro has played.
      const visible = new Set<HTMLElement>();
      const lastHover = new WeakMap<Element, number>();
      let liveIO: IntersectionObserver | undefined;
      let onOver: ((e: PointerEvent) => void) | undefined;

      later(() => {
        liveIO = new IntersectionObserver(
          (entries) => {
            for (const e of entries) {
              const el = e.target as HTMLElement;
              if (!e.isIntersecting) {
                visible.delete(el);
                continue;
              }
              visible.add(el);
              if (!el.dataset.liveSeen) {
                el.dataset.liveSeen = "1";
                later(() => fire(el), 60 + Math.random() * 250);
              }
            }
          },
          { threshold: 0.4 },
        );
        for (const el of document.querySelectorAll<HTMLElement>(LIVE)) liveIO.observe(el);

        const tick = () => {
          if (!document.hidden && visible.size) {
            const pool = [...visible];
            const n = Math.random() < 0.2 ? 3 : 1;
            for (let i = 0; i < n; i++) fire(pool[Math.floor(Math.random() * pool.length)]);
          }
          later(tick, 1200 + Math.random() * 2200);
        };
        later(tick, 800);

        if (finePointer.matches) {
          onOver = (e) => {
            const el = (e.target as Element).closest?.(LIVE) as HTMLElement | null;
            if (!el) return;
            const now = performance.now();
            if (now - (lastHover.get(el) ?? 0) < 900) return;
            lastHover.set(el, now);
            fire(el);
          };
          document.addEventListener("pointerover", onOver, { passive: true });
        }
      }, 3800);

      teardown = () => {
        for (const id of timers) window.clearTimeout(id);
        timers.clear();
        sectionIO.disconnect();
        liveIO?.disconnect();
        if (onOver) document.removeEventListener("pointerover", onOver);
        for (const el of document.querySelectorAll<HTMLElement>("[data-live]")) delete el.dataset.live;
      };
    };

    // Wait a beat so hydration has finished before any attribute is touched.
    const t = window.setTimeout(start, 300);
    motion.addEventListener("change", start);
    window.addEventListener("calmchange", start);
    return () => {
      window.clearTimeout(t);
      motion.removeEventListener("change", start);
      window.removeEventListener("calmchange", start);
      teardown();
    };
  }, []);
  return null;
}
