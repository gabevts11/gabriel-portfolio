import type { CSSProperties, ReactNode } from "react";

// Narrator caption box, as in the movies' on-screen text. Real, readable text.
export function Caption({
  tone = "yellow",
  rot = -1.5,
  className = "",
  children,
}: {
  tone?: "yellow" | "white";
  rot?: number;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`rough inline-block border-[3px] border-ink px-3 py-[6px] text-[13px] font-medium uppercase tracking-[.06em] ${className}`}
      style={{
        background: tone === "yellow" ? "#F7DF02" : "#fff",
        boxShadow: "4px 4px 0 #111",
        transform: `rotate(${rot}deg)`,
        fontFamily: "var(--font-space-grotesk), system-ui, sans-serif",
      } as CSSProperties}
    >
      {children}
    </div>
  );
}
