import type { CSSProperties } from "react";

function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

// Radiating ink wedges from (cx, cy); thin at the inner end, wider outward. Seeded, so build-time deterministic.
export function SpeedLines({
  w,
  h,
  cx,
  cy,
  r,
  seed,
  count = 44,
  inner = 0.2,
  className = "",
  style,
  preserve,
}: {
  w: number;
  h: number;
  cx: number;
  cy: number;
  r: number;
  seed: number;
  count?: number;
  inner?: number;
  className?: string;
  style?: CSSProperties;
  preserve?: string;
}) {
  const rnd = rng(seed);
  const p = (rad: number, a: number) => `${(cx + rad * Math.cos(a)).toFixed(1)},${(cy + rad * Math.sin(a)).toFixed(1)}`;
  const wedges = Array.from({ length: count }, (_, i) => {
    const a = ((i + rnd() * 0.8) / count) * Math.PI * 2;
    if (rnd() < 0.3) return null; // gaps
    const len = r * (0.6 + rnd() * 0.4);
    const half = 0.004 + rnd() * 0.014;
    return <polygon key={i} points={`${p(r * inner * (0.8 + rnd() * 0.4), a)} ${p(len, a - half)} ${p(len, a + half)}`} fillOpacity={(0.12 + rnd() * 0.08).toFixed(2)} />;
  });
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      preserveAspectRatio={preserve}
      overflow="visible"
      className={`pointer-events-none absolute ${className}`}
      style={style}
    >
      <g fill="#111">{wedges}</g>
    </svg>
  );
}
