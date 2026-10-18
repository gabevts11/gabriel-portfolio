"use client";

import { useEffect, useState } from "react";

const KEY = "calm-mode";

// Switches the glitch effects off site-wide: page transitions, hover glitches, cursor trail and looping animation.
export function CalmToggle() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setOn(document.documentElement.hasAttribute("data-calm")), 0);
    return () => clearTimeout(id);
  }, []);
  const flip = () => {
    const next = !on;
    setOn(next);
    if (next) document.documentElement.setAttribute("data-calm", "");
    else document.documentElement.removeAttribute("data-calm");
    try { localStorage.setItem(KEY, next ? "1" : "0"); } catch {}
    window.dispatchEvent(new Event("calmchange"));
  };
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={flip}
      className="font-display fixed bottom-4 right-4 z-[60] flex items-center gap-2 border-[3px] border-ink bg-white px-3 py-1 text-base tracking-[.06em] shadow-[3px_3px_0_#111]"
    >
      <span>{on ? "CALM MODE: ON" : "CALM MODE: OFF"}</span>
      <span aria-hidden className={`relative inline-block h-4 w-8 border-2 border-ink ${on ? "bg-[#2EBD59]" : "bg-[#ddd]"}`}>
        <span className={`absolute top-0 h-full w-3 bg-ink ${on ? "right-0" : "left-0"}`} />
      </span>
    </button>
  );
}
