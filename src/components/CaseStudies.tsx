import type { CSSProperties } from "react";
import Image from "next/image";
import { benDay, type StreamOpts } from "@/lib/comic-art";
import { CountUp } from "./CountUp";
import { Art, Comic, Fit, Streams } from "./art";

const C = {
  ink: "#111111",
  yellow: "#F7DF02",
  red: "#E8202A",
  magenta: "#FF2D87",
  cyan: "#00B7EB",
  purple: "#5B2BC2",
};
type Color = keyof typeof C;

type Case = {
  issue: string;
  kicker: string;
  title: string;
  desc: string;
  stats: [string, string, Color][];
  panel: Color;
  offset: Color;
  dotsA: Color;
  dotsB: Color;
  rot: number;
  flip: boolean;
  streams: [Color, StreamOpts][];
  src?: string;
};

const cases: Case[] = [
  {
    issue: "ISSUE #02", kicker: "MOTION DESIGN · DESIGN SYSTEM · BRAND", title: "SNAPBACK STUDIO",
    desc: "A browser-based motion design studio for Snapback Sports: stream graphics, jumbotron loops, sponsor packages and intros for every sub-brand, built to their brand guide and exportable to CapCut.",
    stats: [["125", "Editable motion designs", "magenta"], ["19", "Design groups, in 16:9 and 9:16", "cyan"]],
    panel: "yellow", offset: "purple", dotsA: "magenta", dotsB: "cyan", rot: -2, flip: false,
    streams: [
      ["ink", { seed: 71, points: [[40, 40], [-20, -10], [-85, -55]], count: 9, sizeStart: 26, sizeEnd: 6, spread: 52 }],
      ["magenta", { seed: 72, points: [[20, 90], [-40, 50], [-100, 20]], count: 6, sizeStart: 16, sizeEnd: 5, spread: 46 }],
      ["ink", { seed: 73, points: [[590, 400], [650, 440], [720, 470]], count: 7, sizeStart: 19, sizeEnd: 6, spread: 40 }],
    ],
  },
  {
    issue: "ISSUE #03", kicker: "WEB DESIGN · FREELANCE · WIX", title: "CAMPAIGN WEBSITE",
    desc: "A responsive campaign site for a local school board candidate, with supporter forms and a custom district lookup tool that maps a voter's address to their seat.",
    stats: [["661", "Sessions in the first period", "cyan"], ["21", "Form submissions", "red"]],
    panel: "cyan", offset: "red", dotsA: "purple", dotsB: "magenta", rot: 2, flip: true,
    streams: [
      ["ink", { seed: 81, points: [[590, 30], [650, -10], [720, -50]], count: 9, sizeStart: 26, sizeEnd: 6, spread: 52 }],
      ["purple", { seed: 82, points: [[600, 90], [660, 60], [715, 30]], count: 6, sizeStart: 16, sizeEnd: 5, spread: 44 }],
      ["ink", { seed: 83, points: [[40, 410], [-20, 440], [-90, 470]], count: 7, sizeStart: 19, sizeEnd: 6, spread: 40 }],
    ],
  },
  {
    issue: "ISSUE #04", kicker: "PRODUCT DESIGN · MOBILE APP · CONCEPT", title: "SNAPBACK EXPERIENCES",
    desc: "A concept app for Snapback's sports-experience community, part Letterboxd and part Yelp: log the games you go to, rate them, rank them, and see what fans recommend doing at each one.",
    stats: [["CONCEPT", "Wireframes in progress", "purple"]],
    panel: "magenta", offset: "cyan", dotsA: "yellow", dotsB: "cyan", rot: -2, flip: false,
    streams: [
      ["ink", { seed: 91, points: [[40, 410], [-20, 450], [-85, 490]], count: 9, sizeStart: 26, sizeEnd: 6, spread: 52 }],
      ["cyan", { seed: 92, points: [[20, 360], [-40, 390], [-100, 410]], count: 6, sizeStart: 16, sizeEnd: 5, spread: 46 }],
      ["ink", { seed: 93, points: [[560, 30], [575, -30], [590, -95]], count: 7, sizeStart: 19, sizeEnd: 6, spread: 40 }],
    ],
  },
];

function CasePanel({ c }: { c: Case }) {
  const dots = { width: 600, height: 420, spacing: 14, maxR: 5.6, minR: 0.8 };
  const rot = { transform: `rotate(${c.rot}deg)`, transformOrigin: "top left", "--rot": `${c.rot}deg` } as CSSProperties;
  return (
    <Fit w={630} h={450} className="case-fit [--s:.5] sm:[--s:.75] lg:[--s:1]">
      <Streams mode="scroll" w={630} h={450} streams={c.streams.map(([k, o]) => [C[k], o])} />
      <div
        className="case-offset absolute border-4 border-ink"
        style={{ left: 24, top: 24, width: 600, height: 420, background: C[c.offset], ...rot }}
      />
      <div
        className="case-box absolute box-border overflow-hidden border-[6px] border-ink"
        style={{ left: 0, top: 0, width: 600, height: 420, background: C[c.panel], ...rot }}
      >
        <Art w={600} h={420} d={benDay({ ...dots, origin: { x: 600, y: 420 }, falloff: 480 })} fill={C[c.dotsA]} opacity={0.9} blend className="dots-print inset-0" />
        <Art w={600} h={420} d={benDay({ ...dots, origin: { x: 0, y: 0 }, falloff: 420 })} fill={C[c.dotsB]} opacity={0.9} blend dx={3} dy={2} className="dots-print inset-0" />
        <div
          className="absolute overflow-hidden border-4 border-ink bg-paper"
          style={{ left: 80, top: 95, width: 440, height: 270, boxShadow: "8px 8px 0 #111" }}
        >
          {c.src ? (
            <Image src={c.src} alt={`${c.title} screenshot`} fill sizes="440px" className="object-cover" />
          ) : (
            <span className="font-display absolute inset-0 flex items-center justify-center text-[30px] tracking-[.04em] text-placeholder">
              SCREENSHOT
            </span>
          )}
        </div>
        <Comic bg="#fff" className="absolute px-[14px] py-[6px] text-[22px]" style={{ left: 22, top: 22 }}>
          {c.issue}
        </Comic>
      </div>
    </Fit>
  );
}

function CaseRow({ c }: { c: Case }) {
  return (
    <div className={`flex flex-col items-center gap-14 xl:items-center xl:gap-24 ${c.flip ? "xl:flex-row-reverse" : "xl:flex-row"}`}>
      <CasePanel c={c} />
      <div className="flex w-full max-w-[470px] flex-col items-start gap-[22px] xl:w-auto">
        <div className="text-sm font-medium tracking-[.08em] text-[#4d4d4d]">{c.kicker}</div>
        <h3 className="font-display text-[clamp(40px,12vw,64px)] leading-[.9] tracking-[.01em]">{c.title}</h3>
        <p className="text-lg leading-normal">{c.desc}</p>
        <ul className="flex flex-wrap gap-4">
          {c.stats.map(([n, label, color]) => (
            <li key={label} className="border-[3px] border-ink bg-white px-[18px] py-[14px]" style={{ boxShadow: `6px 6px 0 ${C[color]}` }}>
              <div className="font-display text-[44px] leading-none">{/^\d+$/.test(n) ? <CountUp value={+n} /> : n}</div>
              <div className="max-w-[150px] text-[13px] font-medium leading-[1.35]">{label}</div>
            </li>
          ))}
        </ul>
        <Comic as="span" bg="#E8202A" shadow={6} className="px-6 py-3 text-2xl text-white">
          FULL CASE FILE SOON!
        </Comic>
      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section id="work" className="mx-auto flex max-w-[1440px] flex-col gap-[100px] px-6 pb-24 pt-20 xl:gap-[140px] xl:px-[120px] xl:pb-40 xl:pt-[120px]">
      <header className="flex flex-col items-start gap-[22px]">
        <Comic bg="#F7DF02" shadow={5} className="px-[18px] py-2 text-[26px]">
          SELECTED WORK
        </Comic>
        <h2
          className="font-display text-[clamp(52px,14vw,110px)] leading-[.88] tracking-[.01em]"
          style={{ textShadow: "7px 7px 0 #FF2D87, -4px 3px 0 #00B7EB" }}
        >
          THE CASE FILES
        </h2>
        <p className="max-w-[620px] text-xl leading-normal">
          Three projects, told panel by panel: the problem, the process, the decisions, and how it turned out.
        </p>
      </header>
      {cases.map((c) => (
        <CaseRow key={c.title} c={c} />
      ))}
    </section>
  );
}
