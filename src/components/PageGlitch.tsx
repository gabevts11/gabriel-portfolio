"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// Page change = the same dimension glitch the page uses on its own elements: the old page glitches out, the new one glitches in.
const OUT_MS = 230;

export function PageGlitch() {
  const router = useRouter();
  const pathname = usePathname();
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
      e.stopPropagation(); // keep the Link's own navigation from firing; we push after the glitch
      busy.current = true;
      hash.current = url.hash.slice(1);
      const main = document.querySelector("main");
      main?.classList.add("pg-out");
      setTimeout(() => router.push(url.pathname + url.search + url.hash), OUT_MS);
      setTimeout(() => { // shortcut: safety reset if navigation stalls, fine for a static site
        busy.current = false;
        main?.classList.remove("pg-out");
      }, 2500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  // Land on the new page instantly (no smooth scroll-up) while the old page is hidden.
  useLayoutEffect(() => {
    if (!busy.current) return;
    const root = document.documentElement;
    const id = hash.current;
    hash.current = "";
    root.style.scrollBehavior = "auto";
    const jump = () => (id ? document.getElementById(id)?.scrollIntoView({ behavior: "instant" }) : window.scrollTo({ top: 0, behavior: "instant" }));
    jump();
    const timers = [60, 250].map((ms) => setTimeout(jump, ms)); // Next also scrolls after commit
    const main = document.querySelector("main");
    main?.classList.add("pg-in");
    timers.push(setTimeout(() => { main?.classList.remove("pg-in"); root.style.scrollBehavior = ""; busy.current = false; }, 400));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return null;
}
