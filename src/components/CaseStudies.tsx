import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { benDay, type StreamOpts } from "@/lib/comic-art";
import { CountUp } from "./CountUp";
import { Art, Comic, Fit, Streams } from "./art";
import { Caption } from "./Caption";
import { XpHero } from "./ExperiencesMock";
import { LookupMock } from "./LookupMock";
import { SpeedLines } from "./SpeedLines";

export const C = {
  ink: "#111111",
  yellow: "#F7DF02",
  red: "#E8202A",
  magenta: "#FF2D87",
  cyan: "#00B7EB",
  purple: "#5B2BC2",
};
export type Color = keyof typeof C;

type Case = {
  slug: string;
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
  mock?: string;
};

const cases: Case[] = [
  {
    issue: "ISSUE #01", kicker: "MOTION DESIGN SYSTEM · BROWSER TOOL · PROTOTYPE", slug: "snapback-studio", title: "SNAPBACK MOTION STUDIO",
    desc: "A quick personal prototype: a motion design system for Snapback Sports, and the browser-based studio that runs it: stream graphics, jumbotron loops, sponsor packages and intros for each sub-brand, built to their brand guide and exportable to CapCut.",
    stats: [["125", "Editable motion designs", "magenta"], ["19", "Scene transitions", "cyan"]],
    src: "/work/studio/studio-wordwall.jpg",
    panel: "yellow", offset: "purple", dotsA: "magenta", dotsB: "cyan", rot: -2, flip: false,
    streams: [
      ["ink", { seed: 71, points: [[40, 40], [-20, -10], [-85, -55]], count: 9, sizeStart: 26, sizeEnd: 6, spread: 52 }],
      ["magenta", { seed: 72, points: [[20, 90], [-40, 50], [-100, 20]], count: 6, sizeStart: 16, sizeEnd: 5, spread: 46 }],
      ["ink", { seed: 73, points: [[590, 400], [650, 440], [720, 470]], count: 7, sizeStart: 19, sizeEnd: 6, spread: 40 }],
    ],
  },
  {
    issue: "ISSUE #02", kicker: "WEB DESIGN · FREELANCE · WIX", slug: "campaign-website", title: "CAMPAIGN WEBSITE",
    desc: "A full campaign website for a local school board candidate: bio, platform, events, voter info, supporter forms and a custom district lookup tool that maps a voter's address to their seat.",
    stats: [["661", "Sessions in the first period", "cyan"], ["21", "Form submissions", "red"]],
    mock: "poster",
    panel: "cyan", offset: "red", dotsA: "purple", dotsB: "magenta", rot: 2, flip: true,
    streams: [
      ["ink", { seed: 81, points: [[590, 30], [650, -10], [720, -50]], count: 9, sizeStart: 26, sizeEnd: 6, spread: 52 }],
      ["purple", { seed: 82, points: [[600, 90], [660, 60], [715, 30]], count: 6, sizeStart: 16, sizeEnd: 5, spread: 44 }],
      ["ink", { seed: 83, points: [[40, 410], [-20, 440], [-90, 470]], count: 7, sizeStart: 19, sizeEnd: 6, spread: 40 }],
    ],
  },
  {
    issue: "ISSUE #03", kicker: "PRODUCT DESIGN · MOBILE APP · PROTOTYPE", slug: "snapback-experiences", title: "SNAPBACK EXPERIENCES",
    desc: "A quick personal concept: an app for Snapback's sports-experience community, part Letterboxd and part Yelp: log the games you go to, rate them, rank them, and see what fans recommend doing at each one.",
    stats: [["CONCEPT", "Wireframes and mockups, not built", "purple"], ["7", "Screens designed", "magenta"]],
    mock: "xp",
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
      <SpeedLines w={630} h={450} cx={315} cy={225} r={400} seed={c.rot > 0 ? 17 : 23} count={40} />
      <Streams mode="scroll" w={630} h={450} streams={c.streams.map(([k, o]) => [C[k], o])} />
      <div
        className="case-offset rough absolute border-4 border-ink"
        style={{ left: 24, top: 24, width: 600, height: 420, background: C[c.offset], ...rot }}
      />
      <div
        className="case-box rough absolute box-border overflow-hidden border-[6px] border-ink"
        style={{ left: 0, top: 0, width: 600, height: 420, background: C[c.panel], ...rot }}
      >
        <Art w={600} h={420} d={benDay({ ...dots, origin: { x: 600, y: 420 }, falloff: 480 })} fill={C[c.dotsA]} opacity={0.9} blend className="dots-print inset-0" />
        <Art w={600} h={420} d={benDay({ ...dots, origin: { x: 0, y: 0 }, falloff: 420 })} fill={C[c.dotsB]} opacity={0.9} blend dx={3} dy={2} className="dots-print inset-0" />
        <div
          className="rough absolute overflow-hidden border-4 border-ink bg-paper"
          style={{ left: 36, top: 76, width: 528, height: 316, boxShadow: "8px 8px 0 #111" }}
        >
          {c.mock === "xp" ? (
            <XpHero />
          ) : c.mock ? (
            <LookupMock kind="poster" slice className="absolute inset-0 h-full w-full" />
          ) : c.src ? (
            <Image src={c.src} alt={`${c.title} screenshot`} fill sizes="528px" className="object-cover" />
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

const dotBase = { spacing: 16, maxR: 6, minR: 1 };
const dotsBL = { ...dotBase, width: 560, height: 560, origin: { x: 0, y: 280 }, falloff: 270 };
const dotsBR = { ...dotBase, width: 440, height: 480, origin: { x: 440, y: 240 }, falloff: 230 };
const dotsLeft = { ...dotBase, width: 360, height: 520, origin: { x: 0, y: 260 }, falloff: 330 };
const dotsRight = { ...dotBase, width: 360, height: 520, origin: { x: 360, y: 260 }, falloff: 330 };
const cardDots = { width: 120, height: 90, spacing: 9, maxR: 3.4, minR: 0.6, origin: { x: 120, y: 0 }, falloff: 120 };

function CaseRow({ c }: { c: Case }) {
  return (
    <div className={`flex flex-col items-center gap-14 xl:items-center xl:gap-24 ${c.flip ? "xl:flex-row-reverse" : "xl:flex-row"}`}>
      <CasePanel c={c} />
      <div className="relative z-10 flex w-full max-w-[470px] flex-col items-start gap-[22px] xl:w-auto">
        <div className="text-sm font-medium tracking-[.08em] text-[#4d4d4d]">{c.kicker}</div>
        <h3 className="font-display text-[clamp(40px,12vw,64px)] leading-[.9] tracking-[.01em]">{c.title}</h3>
        <p className="text-lg leading-normal">{c.desc}</p>
        <ul className="flex flex-wrap gap-4">
          {c.stats.map(([n, label, color]) => (
            <li key={label} className="rough relative border-[3px] border-ink bg-white px-[18px] py-[14px]" style={{ boxShadow: `6px 6px 0 ${C[color]}` }}>
              <Art w={120} h={90} d={benDay(cardDots)} fill="#F7DF02" className="right-0 top-0" />
              <div className="font-display relative text-[44px] leading-none">{/^\d+$/.test(n) ? <CountUp value={+n} /> : n}</div>
              <div className="max-w-[150px] text-[13px] font-medium leading-[1.35]">{label}</div>
            </li>
          ))}
        </ul>
        <Comic as={Link} href={`/work/${c.slug}`} bg="#E8202A" shadow={6} className="comic-link px-6 py-3 text-2xl text-white">
          READ THE CASE FILE!
        </Comic>
      </div>
    </div>
  );
}

export function CaseStudies() {
  return (
    <section id="work" data-flip="1" className="relative mx-auto flex max-w-[1440px] flex-col gap-[100px] px-6 pb-24 pt-20 xl:gap-[140px] xl:px-[120px] xl:pb-40 xl:pt-[120px]">
      <Art w={560} h={560} d={benDay(dotsBL)} fill="#00B7EB" opacity={0.85} blend className="-bottom-[280px] left-0" />
      <Art w={560} h={560} d={benDay({ ...dotsBL, falloff: 230 })} fill="#FF2D87" opacity={0.85} blend dx={6} dy={4} className="-bottom-[280px] left-0" />
      <Art w={440} h={480} d={benDay(dotsBR)} fill="#F7DF02" opacity={0.9} blend className="-bottom-[240px] right-0" />
      <Art w={440} h={480} d={benDay(dotsBR)} fill="#FF2D87" opacity={0.9} blend dx={6} dy={4} className="-bottom-[240px] right-0" />
      <Art w={360} h={520} d={benDay(dotsLeft)} fill="#FF2D87" opacity={0.55} className="left-0 top-[36%] hidden md:block" />
      <Art w={360} h={520} d={benDay(dotsRight)} fill="#00B7EB" opacity={0.55} className="right-0 top-[62%] hidden md:block" />
      <header className="flex flex-col items-start gap-[22px]">
        <Comic bg="#F7DF02" shadow={5} className="px-[18px] py-2 text-[26px]">
          SELECTED WORK
        </Comic>
        <Caption rot={-1}>SELECTED FROM THE MULTIVERSE OF WORK…</Caption>
        <h2
          className="rgb-split glitch-slice font-display text-[clamp(52px,14vw,110px)] leading-[.88] tracking-[.01em]"
          style={{ "--ts-extra": "7px 7px 0 #111" } as CSSProperties}
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
