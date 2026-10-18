"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";

// Page change = a visit to another Spider-Verse "universe": the same site glitches into that art style, holds while the route swaps, then glitches back to color.
// Styles run in this fixed order and keep cycling (position kept in sessionStorage); the look of each lives in motion-layer.css under html[data-ux].
const STYLES = ["gwen", "hobie", "peni", "ham", "noir"];
const OUT_MS = 800;
const nextStyle = () => {
  let i = 0;
  try { i = Number(sessionStorage.getItem("ux-i")) || 0; sessionStorage.setItem("ux-i", String(i + 1)); } catch {} // private mode: starts over each time, fine
  return STYLES[i % STYLES.length];
};

// Universes that re-letter the text: each character becomes its own span so CSS can cut it out (Hobie) or bounce it (Ham).
const LETTERS: Record<string, string> = { hobie: "h1, h2, h3, .font-display", ham: "h1, h2, h3" };
type Swap = [HTMLElement, Text];

// Wraps text in on-screen elements; returns pairs so the exact original Text nodes (the ones React owns) can be put back.
function letterize(kind: string | undefined): Swap[] {
  const sel = kind && LETTERS[kind];
  const main = document.querySelector("main");
  if (!sel || !main) return [];
  const swaps: Swap[] = [];
  for (const el of main.querySelectorAll<HTMLElement>(sel)) {
    const r = el.getBoundingClientRect();
    if (r.bottom < 0 || r.top > innerHeight) continue;
    const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const texts: Text[] = [];
    while (walk.nextNode()) if ((walk.currentNode as Text).data.trim()) texts.push(walk.currentNode as Text);
    for (const t of texts) {
      if (t.parentElement?.closest(".ux-w")) continue;
      const w = document.createElement("span");
      w.className = "ux-w";
      // Letters sit inside nowrap word boxes and spaces stay plain text, so lines only ever break between words.
      let word: HTMLElement | null = null;
      let i = 0;
      for (const ch of t.data) {
        if (/\s/.test(ch)) {
          word = null;
          w.append(ch);
        } else {
          if (!word) w.append((word = Object.assign(document.createElement("span"), { className: "ux-word" })));
          const s = document.createElement("span");
          s.className = `ux-l a${(i % 5) + 1} b${(i % 3) + 1}`;
          s.textContent = ch;
          word.append(s);
        }
        i++;
      }
      t.replaceWith(w);
      swaps.push([w, t]);
    }
  }
  return swaps;
}
const unletterize = (swaps: Swap[]) => swaps.splice(0).forEach(([w, t]) => w.isConnected && w.replaceWith(t));

export function PageGlitch() {
  const router = useRouter();
  const pathname = usePathname();
  const busy = useRef(false);
  const hash = useRef("");
  const swaps = useRef<Swap[]>([]);

  // Warm the universe fonts in idle time so the first transition isn't in a fallback face.
  useEffect(() => {
    const id = setTimeout(() => {
      const cs = getComputedStyle(document.documentElement);
      for (const v of ["--font-ransom", "--font-typewriter", "--font-anime", "--font-cartoon", "--font-brush"]) document.fonts.load(`48px ${cs.getPropertyValue(v)}`).catch(() => {});
    }, 1500);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onClick = (e: MouseEvent) => {
      if (reduce.matches || busy.current || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest("a");
      if (!a || a.target || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      const samePage = url.pathname === location.pathname && url.search === location.search;
      if (samePage && "glitchHome" in a.dataset) { // the home page's GD: glitch in place, land back at the top
        e.preventDefault();
        busy.current = true;
        const main = document.querySelector("main");
        const root = document.documentElement;
        root.dataset.gdClicked = "1"; // swaps the bubble to CLICK ME AGAIN?
        const ux = nextStyle();
        root.dataset.ux = ux;
        swaps.current = letterize(ux);
        main?.classList.add("pg-out");
        setTimeout(() => {
          main?.classList.remove("pg-out");
          root.style.scrollBehavior = "auto";
          window.scrollTo({ top: 0, behavior: "instant" });
          main?.classList.add("pg-in");
          unletterize(swaps.current);
          swaps.current = letterize(ux);
          setTimeout(() => { delete root.dataset.ux; unletterize(swaps.current); }, 300);
          setTimeout(() => { main?.classList.remove("pg-in"); root.style.scrollBehavior = ""; busy.current = false; }, 640);
        }, OUT_MS);
        return;
      }
      if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
      e.preventDefault();
      e.stopPropagation(); // keep the Link's own navigation from firing; we push after the glitch
      busy.current = true;
      hash.current = url.hash.slice(1);
      const main = document.querySelector("main");
      const ux = nextStyle();
      document.documentElement.dataset.ux = ux;
      swaps.current = letterize(ux);
      main?.classList.add("pg-out");
      setTimeout(() => router.push(url.pathname + url.search + url.hash), OUT_MS);
      setTimeout(() => { // shortcut: safety reset if navigation stalls, fine for a static site
        busy.current = false;
        main?.classList.remove("pg-out");
        delete document.documentElement.dataset.ux;
        unletterize(swaps.current);
      }, 3000);
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
    swaps.current = letterize(root.dataset.ux); // the old page's spans left with it
    timers.push(setTimeout(() => { delete root.dataset.ux; unletterize(swaps.current); }, 300)); // back to color halfway through the glitch-in
    timers.push(setTimeout(() => { main?.classList.remove("pg-in"); root.style.scrollBehavior = ""; busy.current = false; }, 640));
    return () => timers.forEach(clearTimeout);
  }, [pathname]);

  return (
    <div className="ux-fx" aria-hidden>
      <span className="ux-sfx s1">ドドド</span>
      <span className="ux-sfx s2">ゴゴゴ</span>
      <span className="ux-sfx s3">キラッ</span>
      <svg className="ux-prop puff" viewBox="0 0 220 120"><g fill="#fff" stroke="#111" strokeWidth="6"><circle cx="50" cy="70" r="38" /><circle cx="105" cy="52" r="46" /><circle cx="165" cy="72" r="36" /></g></svg>
      <span className="ux-prop bang">!</span>
      <svg className="ux-prop zip" viewBox="0 0 160 120"><g fill="none" stroke="#111" strokeWidth="8" strokeLinecap="round"><path d="M10 20 Q80 10 150 30" /><path d="M10 60 Q80 50 150 64" /><path d="M10 100 Q80 92 150 100" /></g></svg>
    </div>
  );
}
