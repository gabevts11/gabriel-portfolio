import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { benDay, crackleRing } from "@/lib/comic-art";
import type { CaseStudy } from "@/lib/cases";
import { CountUp } from "./CountUp";
import { Art, Comic, Fit, Streams } from "./art";
import { Caption } from "./Caption";
import { ClipVideo } from "./ClipVideo";
import { CopyEmail } from "./CopyEmail";
import { ExperiencesMock, XpHero, type XpKind } from "./ExperiencesMock";
import { LookupMock, type MockKind } from "./LookupMock";
import { SpeedLines } from "./SpeedLines";
import { C, type Color } from "./CaseStudies";

const sideDots = { width: 360, height: 560, spacing: 16, maxR: 6, minR: 1 };
const cornerDots = { width: 520, height: 340, spacing: 16, maxR: 6, minR: 1, origin: { x: 520, y: 340 }, falloff: 440 };
const dots = { width: 600, height: 420, spacing: 14, maxR: 5.6, minR: 0.8 };
const cardDots = { width: 120, height: 90, spacing: 9, maxR: 3.4, minR: 0.6, origin: { x: 120, y: 0 }, falloff: 120 };
const streams: [string, Parameters<typeof Streams>[0]["streams"][number][1]][] = [
  [C.ink, { seed: 71, points: [[40, 40], [-20, -10], [-85, -55]], count: 9, sizeStart: 26, sizeEnd: 6, spread: 52 }],
  [C.magenta, { seed: 73, points: [[590, 400], [650, 440], [720, 470]], count: 7, sizeStart: 19, sizeEnd: 6, spread: 40 }],
];

function Hero({ c }: { c: CaseStudy }) {
  return (
    <section className="grid items-center gap-14 py-12 xl:grid-cols-[1fr_auto] xl:gap-16">
      <div className="relative z-10 flex flex-col items-start gap-5">
        <Comic bg="#fff" shadow={4} className="px-[14px] py-[6px] text-[22px]">{c.issue}</Comic>
        <div className="text-sm font-medium tracking-[.08em] text-[#4d4d4d]">{c.kicker}</div>
        <h1 className="rgb-split glitch-slice font-display text-[clamp(52px,13vw,132px)] xl:text-[clamp(64px,6.2vw,104px)] leading-[.86] tracking-[.01em]" style={{ "--ts-extra": "7px 7px 0 #111" } as CSSProperties}>
          {c.title}
        </h1>
        {(c.badge ?? (c.concept ? "CONCEPT · WIREFRAMES & MOCKUPS ONLY, NOT A LIVE PRODUCT" : null)) && (
          <Comic bg={C.magenta} shadow={6} className="max-w-full -rotate-1 px-4 py-2 text-lg leading-tight tracking-[.04em] text-white sm:text-2xl">
            {c.badge ?? "CONCEPT · WIREFRAMES & MOCKUPS ONLY, NOT A LIVE PRODUCT"}
          </Comic>
        )}
        <p className="max-w-[560px] text-xl font-medium leading-[1.5]">{c.summary}</p>
        {c.disclaimer && (
          <p className="rough max-w-[560px] border-[3px] border-ink bg-white px-4 py-3 text-sm font-medium leading-snug" style={{ boxShadow: `4px 4px 0 ${C.magenta}` }}>
            {c.disclaimer}
          </p>
        )}
        <ul className="grid w-full max-w-[560px] gap-4 sm:grid-cols-3">
          {c.meta.map(([k, v]) => (
            <li key={k} className="rough border-[3px] border-ink bg-white px-4 py-3" style={{ boxShadow: `4px 4px 0 ${C.purple}` }}>
              <div className="font-display text-lg tracking-[.04em] text-red">{k}</div>
              <div className="font-medium leading-snug">{v}</div>
            </li>
          ))}
        </ul>
      </div>
      <Fit w={630} h={450} className="case-fit mx-auto [--s:.4] min-[360px]:[--s:.5] sm:[--s:.75] lg:[--s:1]">
        <SpeedLines w={630} h={450} cx={315} cy={225} r={400} seed={31} count={40} />
        <Streams mode="load" w={630} h={450} streams={streams} />
        <div className="rough absolute border-4 border-ink" style={{ left: 24, top: 24, width: 600, height: 420, background: C.purple, transform: "rotate(-2deg)", transformOrigin: "top left" }} />
        <div className="rough absolute box-border overflow-hidden border-[6px] border-ink" style={{ left: 0, top: 0, width: 600, height: 420, background: C.yellow, transform: "rotate(-2deg)", transformOrigin: "top left" }}>
          <Art w={600} h={420} d={benDay({ ...dots, origin: { x: 600, y: 420 }, falloff: 480 })} fill={C.magenta} opacity={0.9} blend className="inset-0" />
          <Art w={600} h={420} d={benDay({ ...dots, origin: { x: 0, y: 0 }, falloff: 420 })} fill={C.cyan} opacity={0.9} blend dx={3} dy={2} className="inset-0" />
          <div className="rough absolute flex flex-col items-center justify-center overflow-hidden border-4 border-ink bg-paper" style={{ left: 36, top: 76, width: 528, height: 316, boxShadow: "8px 8px 0 #111" }}>
            {c.heroClip ? (
              <ClipVideo slug={c.heroClip} loop label={`${c.title}: motion design preview`} className="absolute inset-0 h-full w-full object-cover" />
            ) : c.hero ? (
              <Image src={c.hero} alt={`${c.title} screenshot`} fill sizes="528px" className="object-cover" priority />
            ) : c.heroMock === "xp" ? (
              <XpHero />
            ) : c.heroMock ? (
              <LookupMock kind="poster" slice className="absolute inset-0 h-full w-full" />
            ) : (
              <>
                <span className="font-display text-[30px] tracking-[.04em] text-placeholder">SCREENSHOT</span>
                <span className="text-sm font-medium tracking-[.06em] text-placeholder">PLACEHOLDER · image coming</span>
              </>
            )}
          </div>
        </div>
      </Fit>
    </section>
  );
}

const chapters: [string, string, Color][] = [
  ["PANEL 1", "THE PROBLEM", "cyan"],
  ["PANEL 2", "THE PROCESS", "yellow"],
  ["PANEL 3", "THE DECISIONS", "magenta"],
  ["PANEL 4", "THE OUTCOME", "red"],
];

function Chapter({ n, title, color, rot, children }: { n: string; title: string; color: Color; rot: number; children: React.ReactNode }) {
  const seed = 11 + 10 * Number(n.slice(-1));
  const ring = { width: 420, height: 300, radiusX: 150, radiusY: 108, thickness: 70, heavyAngle: seed % 6 };
  return (
    <section className="grid items-start gap-6 md:grid-cols-[240px_1fr] md:gap-10">
      <div className="relative">
        <Art w={420} h={300} d={crackleRing({ ...ring, seed, count: 14, minSize: 7, maxSize: 16 })} fill={C.ink} className="-left-[90px] -top-[100px] -z-10 hidden md:block" />
        <Art w={420} h={300} d={crackleRing({ ...ring, seed: seed + 5, count: 7, minSize: 5, maxSize: 11, thickness: 80 })} fill={C[color]} className="-left-[90px] -top-[100px] -z-10 hidden md:block" />
      <Comic bg={C[color]} shadow={6} className={`px-5 py-4 ${color === "red" || color === "magenta" ? "text-white" : ""}`} style={{ transform: `rotate(${-rot}deg)` }}>
        <div className="text-xl tracking-[.06em]">{n}</div>
        <h2 className="text-[clamp(32px,8vw,44px)] leading-[.95]">{title}</h2>
      </Comic>
      </div>
      <div className="rough max-w-[760px] border-4 border-ink bg-white p-6 text-lg leading-[1.6] md:p-8" style={{ boxShadow: `8px 8px 0 ${C[color]}`, transform: `rotate(${rot}deg)` }}>
        {children}
      </div>
    </section>
  );
}

function PageTiles({ title, items, heading, note, phone }: { title: string; items: NonNullable<CaseStudy["sitePages"]>; heading: string; note: string; phone?: boolean }) {
  return (
    <section className="flex flex-col items-start gap-6">
      <Caption rot={-1}>{heading}</Caption>
      <p className="max-w-[640px] text-base leading-[1.6]">{note}</p>
      <ul className="grid w-full grid-cols-2 gap-6 md:grid-cols-4">
        {items.map((pg, i) => (
          <li key={pg.label} className="flex flex-col gap-3">
            <a href={pg.src} target="_blank" rel="noopener noreferrer" className={`rough comic-link block overflow-hidden border-4 border-ink bg-paper ${phone ? "aspect-[375/812]" : "aspect-[4/5]"}`} style={{ boxShadow: `6px 6px 0 ${[C.cyan, C.magenta, C.yellow, C.purple][i % 4]}` }}>
              <Image src={pg.src} alt={`${title}: ${pg.label.toLowerCase()}`} width={pg.w} height={pg.h} sizes="(min-width:768px) 22vw, 45vw" className="h-full w-full object-cover object-top" />
            </a>
            <Comic bg={C.yellow} shadow={3} className="self-start px-3 py-1 text-lg">{pg.label}</Comic>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function CaseDetail({ c, next }: { c: CaseStudy; next: CaseStudy }) {
  return (
    <div className="relative isolate mx-auto flex max-w-[1440px] flex-col gap-16 px-6 pb-16 pt-6 xl:px-20">
      <Art w={360} h={560} d={benDay({ ...sideDots, origin: { x: 0, y: 280 }, falloff: 340 })} fill={C.cyan} opacity={0.5} className="-z-10 left-0 top-[26%] hidden md:block" />
      <Art w={360} h={560} d={benDay({ ...sideDots, origin: { x: 360, y: 280 }, falloff: 340 })} fill={C.magenta} opacity={0.5} className="-z-10 right-0 top-[52%] hidden md:block" />
      <Art w={520} h={340} d={benDay(cornerDots)} fill={C.magenta} opacity={0.85} blend className="-z-10 bottom-0 right-0" />
      <Art w={520} h={340} d={benDay(cornerDots)} fill={C.cyan} opacity={0.85} blend dx={6} dy={4} className="-z-10 bottom-0 right-0" />
      <Art w={420} h={420} d={crackleRing({ width: 420, height: 420, seed: 77, count: 16, minSize: 9, maxSize: 22, radiusX: 170, radiusY: 170, thickness: 90, heavyAngle: 2.2 })} fill={C.ink} className="-z-10 -right-24 top-[38%] hidden xl:block" />
      <nav className="flex flex-wrap items-center justify-between gap-4">
        <Comic as={Link} href="/#work" bg={C.yellow} shadow={5} className="comic-link px-4 py-2 text-xl">← BACK TO CASE FILES</Comic>
        <Comic as={Link} href="/" bg={C.yellow} shadow={4} className="comic-link px-3 py-1 text-xl">GD</Comic>
      </nav>
      <Hero c={c} />
      <ul className="flex flex-wrap gap-4">
        {c.stats.map(([n, label, color]) => (
          <li key={label} className="rough relative border-[3px] border-ink bg-white px-[18px] py-[14px]" style={{ boxShadow: `6px 6px 0 ${C[color]}` }}>
            <Art w={120} h={90} d={benDay(cardDots)} fill={C.yellow} className="right-0 top-0" />
            <div className="font-display relative text-[44px] leading-none">{/^\d+$/.test(n) ? <CountUp value={+n} /> : n}</div>
            <div className="max-w-[190px] text-[13px] font-medium leading-[1.35]">{label}</div>
          </li>
        ))}
      </ul>
      <section className="grid gap-8 md:grid-cols-2">
        {([["WHAT I DID", c.did, "cyan"], ["TOOLS", c.tools, "yellow"]] as const).map(([h, items, col]) => (
          <div key={h} className="rough border-4 border-ink bg-white p-6" style={{ boxShadow: `8px 8px 0 ${C[col]}` }}>
            <h2 className="font-display text-3xl tracking-[.04em] text-red">{h}</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {items.map((t) => <li key={t} className="border-[3px] border-ink bg-paper px-3 py-1 text-base font-medium">{t}</li>)}
            </ul>
          </div>
        ))}
      </section>
      <section className="rough max-w-[760px] border-4 border-ink bg-white p-6 text-lg leading-[1.6]" style={{ boxShadow: `8px 8px 0 ${C.magenta}` }}>
        <p><span className="font-display text-2xl tracking-[.04em] text-red">GOAL · </span>{c.goal}</p>
        <p className="mt-3"><span className="font-display text-2xl tracking-[.04em] text-magenta">HYPOTHESIS · </span>{c.hypothesis}</p>
      </section>
      <div className="flex flex-col gap-12">
        <Chapter n={chapters[0][0]} title={chapters[0][1]} color="cyan" rot={-0.6}><p>{c.problem}</p></Chapter>
        <Caption rot={1} className="self-start">MEANWHILE, IN THE STUDIO…</Caption>
        <Chapter n={chapters[1][0]} title={chapters[1][1]} color="yellow" rot={0.6}>
          <p>{c.process}</p>
          {c.flow && (
            <ol className="my-6 flex flex-wrap items-center gap-2" aria-label="How the lookup works">
              {c.flow.map((f, i) => (
                <li key={f} className="flex items-center gap-2">
                  <Comic bg={i % 2 ? C.cyan : C.yellow} shadow={3} className="px-3 py-1 text-base sm:text-lg">{f}</Comic>
                  {i < c.flow!.length - 1 && <span aria-hidden className="font-display text-2xl">→</span>}
                </li>
              ))}
            </ol>
          )}
          {c.hardParts && (
            <>
              <h3 className="font-display mt-4 text-3xl text-red">THE HARD PARTS · DISTRICT LOOKUP</h3>
              <ul className="mt-2 flex list-disc flex-col gap-2 pl-6">{c.hardParts.map((h) => <li key={h}>{h}</li>)}</ul>
            </>
          )}
        </Chapter>
        <Chapter n={chapters[2][0]} title={chapters[2][1]} color="magenta" rot={-0.5}>
          <ol className="flex flex-col gap-4">
            {c.decisions.map((d, i) => (
              <li key={i} className="flex gap-4">
                <span className="font-display text-[40px] leading-none text-magenta">{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ol>
        </Chapter>
        <Chapter n={chapters[3][0]} title={chapters[3][1]} color="red" rot={0.5}><p>{c.outcome}</p></Chapter>
      </div>
      {c.related && (
        <aside className="rough flex max-w-[760px] flex-col items-start gap-3 border-4 border-ink bg-white p-6" style={{ boxShadow: `8px 8px 0 ${C.cyan}` }}>
          <Comic bg={C.yellow} shadow={4} className="px-3 py-1 text-xl">{c.related.label}</Comic>
          <p className="text-base leading-[1.6]">{c.related.text}</p>
          {c.related.href && (
            <Comic as="a" href={c.related.href} target="_blank" rel="noopener noreferrer" bg={C.cyan} shadow={4} className="comic-link px-4 py-2 text-xl">{c.related.cta ?? "VISIT"}</Comic>
          )}
        </aside>
      )}
      {c.clips && (
        <section className="flex flex-col items-start gap-6">
          <Caption tone="white" rot={-1}>FROM THE STUDIO…</Caption>
          <p className="max-w-[640px] text-base leading-[1.6]">Animated exports from the studio, from the approved set of designs. Where a design has both formats, the 16:9 and 9:16 versions play side by side.</p>
          <ul className="grid w-full items-start gap-8 md:grid-cols-2">
            {c.clips.map((cl, i) => (
              <li key={cl.slug} className="flex flex-col gap-3">
                <div className="rough overflow-hidden border-4 border-ink bg-ink" style={{ boxShadow: `8px 8px 0 ${[C.purple, C.cyan, C.magenta, C.yellow, C.red][i % 5]}` }}>
                  <div className="flex items-end gap-2 p-2">
                    <ClipVideo slug={cl.slug} label={`${cl.label}, 16:9`} className="h-auto min-w-0 flex-[3.16] self-center" />
                    {cl.mobile && <ClipVideo slug={cl.slug} mobile label={`${cl.label}, 9:16`} className="h-auto min-w-0 flex-1" />}
                  </div>
                </div>
                <Comic bg={C.yellow} shadow={3} className="self-start px-3 py-1 text-lg">{cl.label}</Comic>
                <p className="text-sm leading-snug">{cl.caption}</p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {c.sitePages && <PageTiles title={c.title} items={c.sitePages} heading="THE SITE, PAGE BY PAGE" note="Every page, recreated in Figma. Text and photos are swapped for placeholders so no real names or people appear. Tap a page to see it in full." />}
      {c.screens && <PageTiles phone title={c.title} items={c.screens} heading="THE APP, SCREEN BY SCREEN" note="All 16 screens, designed in Figma. Trips use sample inventory and nothing is bookable. Tap a screen to see it in full." />}
      {c.guidePages && <PageTiles title={c.title} items={c.guidePages} heading="THE DESIGN SYSTEM" note="The guide that keeps all 16 screens consistent: brand and color, type, buttons and badges, navigation and forms, content patterns, media and layout. Tap a page to see it in full." />}
      {c.brandGuide && (
        <section className="flex flex-col items-start gap-6">
          <Caption tone="white" rot={1}>THE BRAND GUIDE</Caption>
          <p className="max-w-[640px] text-base leading-[1.6]">A one-page guide I wrote for the site: colors, type, logo use, buttons and cards, spacing, imagery and tone of voice. Names and wording are placeholders. Tap to see the whole guide.</p>
          <a href={c.brandGuide.src} target="_blank" rel="noopener noreferrer" className="rough comic-link block aspect-[4/3] w-full max-w-[560px] overflow-hidden border-4 border-ink bg-paper" style={{ boxShadow: `8px 8px 0 ${C.magenta}` }}>
            <Image src={c.brandGuide.src} alt={`${c.title}: brand guide`} width={c.brandGuide.w} height={c.brandGuide.h} sizes="(min-width:768px) 560px, 90vw" className="h-full w-full object-cover object-top" />
          </a>
        </section>
      )}
      {c.images ? (
        <section className="flex flex-col items-start gap-6">
          <Caption tone="white" rot={-1}>FROM THE ARCHIVE…</Caption>
          <ul className={`grid w-full items-start gap-8 md:grid-cols-2 ${c.images[0].mock?.startsWith("xp-") ? "xl:grid-cols-4" : ""}`}>
            {c.images.map((im, i) => (
              <li key={im.label} className="flex flex-col gap-3">
                <div className="rough overflow-hidden border-4 border-ink bg-paper" style={{ boxShadow: `8px 8px 0 ${[C.purple, C.cyan, C.magenta, C.yellow, C.red][i % 5]}` }}>
                  {im.src ? (
                    <div className="flex items-end gap-2 bg-ink p-2">
                      <Image src={im.src} alt={`${c.title}: ${im.label.toLowerCase()}, 16:9`} width={im.w!} height={im.h!} sizes="(min-width:768px) 45vw, 90vw" className="h-auto min-w-0 flex-[3.16] self-center" />
                      {im.src2 && <Image src={im.src2} alt={`${c.title}: ${im.label.toLowerCase()}, 9:16`} width={im.w2!} height={im.h2!} sizes="15vw" className="h-auto min-w-0 flex-1" />}
                    </div>
                  ) : (
                    im.mock!.startsWith("xp-") ? <ExperiencesMock kind={im.mock as XpKind} className="mx-auto block h-auto w-full max-w-[300px]" /> : <LookupMock kind={im.mock as MockKind} className="block h-auto w-full" />
                  )}
                </div>
                <Comic bg={im.staged ? C.magenta : C.yellow} shadow={3} className={`self-start px-3 py-1 text-lg ${im.staged ? "text-white" : ""}`}>{im.label}</Comic>
                <p className="text-sm leading-snug">{im.caption}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : c.shots.length > 0 && (
      <section className="flex flex-col items-start gap-6">
        <Caption tone="white" rot={-1}>FROM THE ARCHIVE…</Caption>
        <ul className="grid w-full gap-6 md:grid-cols-3">
          {c.shots.map((s) => (
            <li key={s} className="rough flex aspect-[4/3] flex-col items-center justify-center gap-2 border-4 border-ink bg-paper p-4 text-center" style={{ boxShadow: `8px 8px 0 ${C.purple}` }}>
              <span className="font-display text-3xl tracking-[.04em]">{s}</span>
              <span className="text-sm font-medium tracking-[.06em] text-placeholder">PLACEHOLDER · screenshot coming</span>
            </li>
          ))}
        </ul>
      </section>
      )}
      <section className="flex flex-col items-start gap-4">
        <Caption rot={-1}>OPEN TO NEW WORK</Caption>
        <CopyEmail />
      </section>
      <Link href={`/work/${next.slug}`} className="comic-link rough relative block border-4 border-ink bg-red p-6 text-white md:p-10" style={{ boxShadow: "8px 8px 0 #111", "--sh": "8px" } as CSSProperties}>
        <div className="font-display text-[clamp(32px,8vw,64px)] leading-none">NEXT CASE FILE →</div>
        <div className="font-display mt-2 text-[clamp(24px,6vw,44px)] leading-none">{next.title}</div>
        <Comic bg={C.yellow} className="mt-5 -rotate-2 px-3 py-1 text-xl text-ink">TO BE CONTINUED…</Comic>
      </Link>
      <Link href="/#work" className="nav-link self-start text-sm font-medium tracking-[.08em]">← BACK TO CASE FILES</Link>
    </div>
  );
}
