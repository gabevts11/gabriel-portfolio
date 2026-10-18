"use client";

import { useEffect } from "react";
import { crackleRing } from "@/lib/comic-art";

const COLORS = ["#00B7EB", "#FF2D87", "#F7DF02"];
const MAX_DOTS = 24;
const TILT = 3; // deg / px
const TILT_SEL = ".case-box, a.comic-link";
const SPLAT = crackleRing({ width: 120, height: 120, seed: 7, count: 12, minSize: 10, maxSize: 18, radiusX: 26, radiusY: 26, thickness: 22, heavyAngle: 0.8 });

export function CursorTrail() {
  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let teardown: (() => void) | undefined;

    const setup = () => {
      teardown?.();
      teardown = undefined;
      if (!fine.matches || calm.matches || document.documentElement.hasAttribute("data-calm")) return;

      const layer = document.createElement("div");
      layer.className = "cur-layer";
      layer.setAttribute("aria-hidden", "true");
      const dots = Array.from({ length: MAX_DOTS }, (_, i) => {
        const d = document.createElement("div");
        d.className = "cur-dot";
        d.style.background = COLORS[i % 3];
        layer.appendChild(d);
        return d;
      });
      const NS = "http://www.w3.org/2000/svg";
      const splat = document.createElementNS(NS, "svg");
      splat.setAttribute("width", "120");
      splat.setAttribute("height", "120");
      splat.setAttribute("viewBox", "0 0 120 120");
      splat.setAttribute("overflow", "visible");
      const p = document.createElementNS(NS, "path");
      p.setAttribute("d", SPLAT);
      p.setAttribute("fill", "#111");
      splat.appendChild(p);
      layer.appendChild(splat);
      document.body.appendChild(layer);

      let next = 0;
      let last = 0;
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        const now = performance.now();
        if (now - last >= 16) {
          last = now;
          const d = dots[next++ % MAX_DOTS]; // ring buffer: oldest dot is recycled
          d.style.background = COLORS[(Math.random() * 3) | 0];
          const t = `translate(${e.clientX - 5 + (Math.random() - 0.5) * 8}px, ${e.clientY - 5 + (Math.random() - 0.5) * 8}px)`;
          d.animate(
            [{ opacity: 1, transform: `${t} scale(1)` }, { opacity: 0, transform: `${t} scale(.2)` }],
            { duration: 500, easing: "steps(6, end)", fill: "forwards" },
          );
        }
        track(e);
      };
      const onDown = (e: PointerEvent) => {
        if (e.pointerType !== "mouse" || e.button !== 0) return;
        const t = `translate(${e.clientX - 60}px, ${e.clientY - 60}px)`;
        splat.animate(
          [
            { opacity: 1, transform: `${t} scale(.3) rotate(0deg)` },
            { opacity: 1, transform: `${t} scale(1.1) rotate(6deg)`, offset: 0.25 },
            { opacity: 0, transform: `${t} scale(1.2) rotate(6deg)` },
          ],
          { duration: 400, easing: "steps(4, end)", fill: "none" },
        );
      };

      // Magnetic tilt: CSS variables on the hovered panel/button, written at most once per frame.
      let cur: HTMLElement | null = null;
      let ev: PointerEvent | null = null;
      let raf = 0;
      const clear = (el: HTMLElement | null) => ["--tx-r", "--tx-x", "--tx-y"].forEach((v) => el?.style.removeProperty(v));
      const frame = () => {
        raf = 0;
        if (!ev) return;
        const el = (ev.target as Element | null)?.closest<HTMLElement>(TILT_SEL) ?? null;
        if (el !== cur) {
          clear(cur);
          cur = el;
        }
        if (!el) return;
        const r = el.getBoundingClientRect();
        const nx = Math.max(-1, Math.min(1, (ev.clientX - r.left - r.width / 2) / (r.width / 2)));
        const ny = Math.max(-1, Math.min(1, (ev.clientY - r.top - r.height / 2) / (r.height / 2)));
        el.style.setProperty("--tx-r", `${nx * TILT}deg`);
        el.style.setProperty("--tx-x", `${nx * TILT}px`);
        el.style.setProperty("--tx-y", `${ny * TILT}px`);
      };
      const track = (e: PointerEvent) => {
        ev = e;
        raf ||= requestAnimationFrame(frame);
      };
      const onLeave = () => {
        ev = null;
        clear(cur);
        cur = null;
      };

      document.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerdown", onDown, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
      teardown = () => {
        document.removeEventListener("pointermove", onMove);
        document.removeEventListener("pointerdown", onDown);
        document.documentElement.removeEventListener("pointerleave", onLeave);
        cancelAnimationFrame(raf);
        clear(cur);
        layer.remove();
      };
    };

    setup();
    fine.addEventListener("change", setup);
    calm.addEventListener("change", setup);
    window.addEventListener("calmchange", setup);
    return () => {
      fine.removeEventListener("change", setup);
      calm.removeEventListener("change", setup);
      window.removeEventListener("calmchange", setup);
      teardown?.();
    };
  }, []);
  return null;
}
