"use client";
import { useEffect, useRef } from "react";

const FRAMES = 12;

// Server renders the final number. On mount (if motion is allowed) it resets to 0 and counts up once
// on twos when 40% visible. Screen readers get the final value from the sr-only span.
export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let timer: ReturnType<typeof setInterval> | undefined;
    el.textContent = "0";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        let f = 0;
        timer = setInterval(() => {
          el.textContent = String(Math.round((value * ++f) / FRAMES));
          if (f >= FRAMES) clearInterval(timer);
        }, 900 / FRAMES);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearInterval(timer);
    };
  }, [value]);
  return (
    <>
      <span className="sr-only">{value}</span>
      <span ref={ref} aria-hidden="true">
        {value}
      </span>
    </>
  );
}
