import type { CSSProperties, ElementType, ReactNode } from "react";
import { crackleStreamClusters, type StreamOpts } from "@/lib/comic-art";

// Server-rendered decorative SVG with a single path.
export function Art({
  w,
  h,
  d,
  fill,
  opacity,
  blend,
  dx = 0,
  dy = 0,
  className = "",
  style,
}: {
  w: number;
  h: number;
  d: string;
  fill: string;
  opacity?: number;
  blend?: boolean;
  dx?: number;
  dy?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      overflow="visible"
      className={`pointer-events-none absolute ${className}`}
      style={{
        opacity,
        mixBlendMode: blend ? "multiply" : undefined,
        transform: dx || dy ? `translate(${dx}px, ${dy}px)` : undefined,
        ...style,
      }}
    >
      <path d={d} fill={fill} />
    </svg>
  );
}

export function Streams({
  w,
  h,
  streams,
  mode,
}: {
  w: number;
  h: number;
  streams: [string, StreamOpts][];
  mode: "load" | "scroll";
}) {
  return (
    <svg
      aria-hidden="true"
      width={w}
      height={h}
      viewBox={`0 0 ${w} ${h}`}
      overflow="visible"
      className={`crk-${mode} pointer-events-none absolute left-0 top-0`}
    >
      {streams.map(([fill, o]) => (
        <g key={o.seed} fill={fill}>
          {crackleStreamClusters(o).map(({ d, t }, i) => (
            <path key={i} d={d} style={{ "--t": t } as CSSProperties} />
          ))}
        </g>
      ))}
    </svg>
  );
}

// Comic box: solid fill, 3px ink border, hard offset shadow, Bangers text.
export function Comic({
  as: Tag = "div",
  bg,
  shadow = 0,
  shadowColor = "#111111",
  className = "",
  style,
  children,
  ...rest
}: {
  as?: ElementType;
  bg: string;
  shadow?: number;
  shadowColor?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
  href?: string;
  "data-glitch-home"?: boolean;
  "aria-label"?: string;
  target?: string;
  rel?: string;
}) {
  return (
    <Tag
      {...rest}
      className={`font-display rough inline-block border-[3px] border-ink ${className}`}
      style={{
        background: bg,
        boxShadow: shadow ? `${shadow}px ${shadow}px 0 ${shadowColor}` : undefined,
        ...(shadow ? ({ "--sh": `${shadow}px` } as CSSProperties) : null),
        ...style,
      }}
    >
      {children}
    </Tag>
  );
}

// Keeps the layout box at the scaled size; set --s on the className per breakpoint.
export function Fit({ w, h, children, className = "" }: { w: number; h: number; children: ReactNode; className?: string }) {
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: `calc(${w}px * var(--s))`, height: `calc(${h}px * var(--s))` }}
    >
      <div
        className="absolute left-0 top-0"
        style={{ width: w, height: h, transform: "scale(var(--s))", transformOrigin: "top left" }}
      >
        {children}
      </div>
    </div>
  );
}
