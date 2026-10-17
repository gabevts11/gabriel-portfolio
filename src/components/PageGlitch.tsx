"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// Horizontal bands slam across the screen, the route swaps underneath, then they clear: a glitch cut between pages.
const BANDS: [number, string][] = [
  [9, "#111"], [6, "#00B7EB"], [11, "#FF2D87"], [7, "#111"], [10, "#F4EEDC"], [8, "#00B7EB"],
  [12, "#111"], [6, "#FF2D87"], [9, "#111"], [8, "#00B7EB"], [7, "#FF2D87"], [7, "#111"],
];
const TOPS = BANDS.map((_, i) => BANDS.slice(0, i).reduce((n, [h]) => n + h, 0));
const COVER_MS = 320;

export function PageGlitch() {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");
  const busy = useRef(false);
  const hash = useRef("");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e: MouseEvent) => {
      if (reduce.matches || busy.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
      e.preventDefault();
      e.stopPropagation(); // keep the Link's own navigation from firing; we push after the cover
      busy.current = true;
      hash.current = url.hash.slice(1);
      setPhase("in");
      setTimeout(() => router.push(url.pathname + url.search + url.hash), COVER_MS);
      setTimeout(() => { busy.current = false; setPhase("idle"); }, 2500); // shortcut: safety reset if navigation stalls, fine for a static site
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  useEffect(() => {
    // Next lands on top for a hash link from another page, so jump to the section ourselves (hidden under the bands).
    const id = hash.current || location.hash.slice(1);
    hash.current = "";
    if (id) [60, 250].forEach((ms) => setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "instant" }), ms)); // twice: Next also scrolls to top after commit
    if (!busy.current) return;
    setPhase("out");
    const t = setTimeout(() => { busy.current = false; setPhase("idle"); }, 420);
    return () => clearTimeout(t);
  }, [pathname]);

  if (phase === "idle") return null;
  return (
    <div className="gt-layer" aria-hidden>
      {BANDS.map(([h, c], i) => {
        return <i key={i} className={`gt-band gt-${phase}`} style={{ top: `${TOPS[i]}%`, height: `${h + 0.4}%`, background: c, animationDelay: `${(i % 6) * 28}ms`, ["--dir" as string]: i % 2 ? "1" : "-1" }} />;
      })}
    </div>
  );
}
