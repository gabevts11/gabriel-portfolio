import type { ReactNode } from "react";

const W = 250;
const H = 96;
const N = 14;

// Cloud outline: outward-bulging arcs between points on an ellipse. Deterministic, server-rendered.
const pts = Array.from({ length: N }, (_, i) => {
  const a = (i / N) * Math.PI * 2;
  return [W / 2 + 110 * Math.cos(a), 40 + 30 * Math.sin(a)];
});
const r = 22;
const cloud =
  `M${pts[0][0].toFixed(1)},${pts[0][1].toFixed(1)}` +
  pts
    .slice(1)
    .concat([pts[0]])
    .map(([x, y]) => `A${r},${r} 0 0 1 ${x.toFixed(1)},${y.toFixed(1)}`)
    .join("") +
  "Z";

export function ThoughtBubble({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: W, height: H }}>
      <svg aria-hidden="true" width={W} height={H} viewBox={`0 0 ${W} ${H}`} overflow="visible" className="pointer-events-none absolute left-0 top-0">
        <g fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round">
          <path d={cloud} />
          <circle cx="196" cy="76" r="7" />
          <circle cx="212" cy="90" r="4.5" />
          <circle cx="222" cy="100" r="2.8" />
        </g>
      </svg>
      <p
        className="absolute left-0 right-0 top-0 flex items-center justify-center px-9 text-center text-[13px] font-medium leading-[1.2]"
        style={{ height: 80 }}
      >
        {children}
      </p>
    </div>
  );
}
