import Image from "next/image";
import { benDay, crackleRing } from "@/lib/comic-art";
import { Art, Comic, Fit, Streams } from "./art";
import { SpeedLines } from "./SpeedLines";

const nav = [
  ["WORK", "#work"],
  ["ABOUT", "#about"],
];

function Portrait({ src }: { src?: string }) {
  const d = benDay({ width: 370, height: 500, spacing: 12, maxR: 4.6, minR: 0.8, origin: { x: 370, y: 500 }, falloff: 430 });
  return (
    <div
      className="hero-portrait rough absolute overflow-hidden border-[6px] border-ink bg-paper"
      style={{ left: 135, top: 62, width: 370, height: 500, boxShadow: "10px 10px 0 #111", transform: "rotate(2.5deg)", transformOrigin: "top left" }}
    >
      <Art w={370} h={500} d={d} fill="#FF2D87" opacity={0.45} blend className="inset-0" />
      {src ? (
        <Image src={src} alt="Portrait of Gabe Dougherty" fill sizes="370px" className="object-cover" />
      ) : (
        <span className="font-display absolute inset-0 flex items-center justify-center text-[36px] tracking-[.04em] text-placeholder">
          PORTRAIT
        </span>
      )}
    </div>
  );
}

function HeroPanel({ portraitSrc }: { portraitSrc?: string }) {
  const dots = { width: 500, height: 600, spacing: 14, maxR: 5.6, minR: 0.8, falloff: 520 };
  const ghost = (left: number, bg: string) => (
    <div
      className="hero-ghost absolute"
      style={{ left, top: 62, width: 370, height: 500, background: bg, mixBlendMode: "multiply", transform: "rotate(2.5deg)", transformOrigin: "top left" }}
    />
  );
  return (
    <div className="relative">
    <Fit w={640} h={760} className="[--s:.5] sm:[--s:.75] lg:[--s:1]">
      <Streams
        mode="load"
        w={640}
        h={760}
        streams={[
          ["#111", { seed: 51, points: [[520, 170], [590, 100], [650, 45], [710, 0]], count: 9, sizeStart: 22, sizeEnd: 6, spread: 50 }],
          ["#FF2D87", { seed: 52, points: [[540, 200], [620, 140], [700, 90]], count: 6, sizeStart: 13, sizeEnd: 4, spread: 60 }],
          ["#111", { seed: 53, points: [[585, 260], [600, 420], [590, 600]], count: 7, sizeStart: 11, sizeEnd: 7, spread: 26 }],
          ["#00B7EB", { seed: 54, points: [[600, 320], [615, 520]], count: 4, sizeStart: 9, sizeEnd: 5, spread: 30 }],
          ["#111", { seed: 55, points: [[120, 700], [40, 745], [-60, 775], [-170, 790]], count: 10, sizeStart: 20, sizeEnd: 5, spread: 44 }],
          ["#00B7EB", { seed: 56, points: [[90, 720], [0, 765], [-100, 800]], count: 6, sizeStart: 12, sizeEnd: 4, spread: 50 }],
          ["#5B2BC2", { seed: 57, points: [[70, 230], [55, 420], [70, 560]], count: 5, sizeStart: 10, sizeEnd: 6, spread: 24 }],
        ]}
      />
      <div
        className="hero-frame absolute border-4 border-ink bg-cyan"
        style={{ left: 90, top: 150, width: 500, height: 600, transform: "rotate(-3deg)", transformOrigin: "top left" }}
      />
      <div
        className="hero-frame rough absolute box-border overflow-hidden border-[6px] border-ink bg-purple"
        style={{ left: 70, top: 130, width: 500, height: 600, transform: "rotate(-3deg)", transformOrigin: "top left" }}
      >
        <Art w={500} h={600} d={benDay({ ...dots, origin: { x: 0, y: 0 } })} fill="#00B7EB" opacity={0.95} className="inset-0" />
        <Art w={500} h={600} d={benDay({ ...dots, origin: { x: 500, y: 600 } })} fill="#FF2D87" opacity={0.95} dx={3} dy={2} className="inset-0" />
        <Art w={500} h={600} d={crackleRing({ width: 500, height: 600, seed: 11, count: 18, minSize: 8, maxSize: 17, radiusX: 205, radiusY: 240, thickness: 60, heavyAngle: -0.6 })} fill="#111" className="inset-0" />
        <Art w={500} h={600} d={crackleRing({ width: 500, height: 600, seed: 31, count: 9, minSize: 5, maxSize: 11, radiusX: 190, radiusY: 230, thickness: 70, heavyAngle: 2.4 })} fill="#F7DF02" className="inset-0" />
      </div>
      {ghost(126, "#00B7EB")}
      {ghost(144, "#E8202A")}
      <Portrait src={portraitSrc} />
    </Fit>
    </div>
  );
}

export function Hero() {
  const bg = { width: 620, height: 460, spacing: 16, maxR: 6, minR: 1, origin: { x: 0, y: 0 }, falloff: 540 };
  return (
    <header className="relative mx-auto flex max-w-[1440px] flex-col gap-14 px-6 pb-24 pt-9 xl:px-20">
      <Art w={620} h={460} d={benDay(bg)} fill="#00B7EB" opacity={0.9} blend className="hero-print left-0 top-0" />
      <Art w={620} h={460} d={benDay(bg)} fill="#FF2D87" opacity={0.9} blend dx={6} dy={4} className="hero-print hero-print-m left-0 top-0" />

      <nav className="relative z-30 flex items-center justify-between">
        <div className="relative">
          <Comic as="a" href="/" data-glitch-home bg="#F7DF02" shadow={4} className="comic-link px-[14px] py-[6px] text-[30px]" aria-label="Gabe Dougherty, back to top">
            GD
          </Comic>
          <span aria-hidden className="gd-nudge">
            <svg viewBox="0 0 220 96" width="220" height="96">
              <g transform="translate(4 4)" fill="#111" stroke="#111" strokeWidth="10" strokeLinejoin="round"><circle cx="205.4" cy="36.0" r="16.6" /><circle cx="190.5" cy="49.1" r="16.6" /><circle cx="153.0" cy="56.0" r="16.6" /><circle cx="110.3" cy="53.6" r="16.6" /><circle cx="82.5" cy="43.0" r="16.6" /><circle cx="82.5" cy="29.0" r="16.6" /><circle cx="110.3" cy="18.4" r="16.6" /><circle cx="153.0" cy="16.0" r="16.6" /><circle cx="190.5" cy="22.9" r="16.6" /><ellipse cx="142" cy="36" rx="69.0" ry="26.0" /><circle cx="58" cy="40" r="8" /><circle cx="38" cy="46" r="5" /></g>
              <g fill="#111" stroke="#111" strokeWidth="9" strokeLinejoin="round"><circle cx="205.4" cy="36.0" r="16.6" /><circle cx="190.5" cy="49.1" r="16.6" /><circle cx="153.0" cy="56.0" r="16.6" /><circle cx="110.3" cy="53.6" r="16.6" /><circle cx="82.5" cy="43.0" r="16.6" /><circle cx="82.5" cy="29.0" r="16.6" /><circle cx="110.3" cy="18.4" r="16.6" /><circle cx="153.0" cy="16.0" r="16.6" /><circle cx="190.5" cy="22.9" r="16.6" /><ellipse cx="142" cy="36" rx="69.0" ry="26.0" /><circle cx="58" cy="40" r="8" /><circle cx="38" cy="46" r="5" /></g>
              <g fill="#fff" stroke="#fff" strokeWidth="1"><circle cx="205.4" cy="36.0" r="16.6" /><circle cx="190.5" cy="49.1" r="16.6" /><circle cx="153.0" cy="56.0" r="16.6" /><circle cx="110.3" cy="53.6" r="16.6" /><circle cx="82.5" cy="43.0" r="16.6" /><circle cx="82.5" cy="29.0" r="16.6" /><circle cx="110.3" cy="18.4" r="16.6" /><circle cx="153.0" cy="16.0" r="16.6" /><circle cx="190.5" cy="22.9" r="16.6" /><ellipse cx="142" cy="36" rx="69.0" ry="26.0" /><circle cx="58" cy="40" r="8" /><circle cx="38" cy="46" r="5" /></g>
            </svg>
            <span>CLICK ME?</span>
          </span>
        </div>
        <div className="flex items-center gap-10">
          <ul className="font-display hidden gap-10 text-2xl tracking-[.04em] md:flex">
            {nav.map(([t, h]) => (
              <li key={t}>
                <a href={h} className="nav-link">{t}</a>
              </li>
            ))}
          </ul>
          <Comic as="a" href="#contact" bg="#2EBD59" shadow={4} className="comic-link px-[18px] py-2 text-2xl">
            CONTACT
          </Comic>
        </div>
      </nav>

      <div className="relative flex flex-col items-center gap-12 xl:flex-row xl:pl-10">
        <div className="relative isolate flex min-w-0 flex-1 flex-col items-start gap-7 self-stretch xl:self-auto">
          <SpeedLines w={600} h={500} cx={190} cy={250} r={620} seed={5} count={52} preserve="xMidYMid slice" className="-inset-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)]" />
          <div className="hero-bubble font-display relative mb-1 rounded-[28px] border-[3px] border-ink bg-white px-[22px] py-[10px] text-[26px] tracking-[.03em]">
            HEY THERE! I&apos;M
            <svg aria-hidden="true" width="34" height="26" viewBox="0 0 34 26" className="absolute left-[34px] top-full">
              <path d="M2 1 L32 1 L6 25 Z" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
              <rect x="5" y="0" width="24" height="3.5" fill="#fff" />
            </svg>
          </div>
          <h1
            className="hero-name font-display text-[clamp(52px,17vw,130px)] leading-[.86] tracking-[.01em] xl:text-[clamp(60px,8.4vw,130px)] min-[1440px]:text-[130px]"
            style={{ textShadow: "8px 8px 0 #FF2D87, -4px 3px 0 #00B7EB" }}
          >
            GABE
            <br />
            DOUGHERTY
          </h1>
          <Comic bg="#F7DF02" shadow={6} className="hero-draw px-[18px] py-2 text-[clamp(20px,6vw,32px)]">
            SOFTWARE PRODUCT DESIGNER
          </Comic>
          <p className="max-w-[540px] text-[22px] leading-[1.4]">
            I design web apps and products, and direct AI-assisted builds from Figma to App Store.
          </p>
          <div className="font-display flex flex-wrap items-center gap-x-8 gap-y-5">
            <Comic as="a" href="#work" bg="#E8202A" shadow={7} className="hero-cta comic-link px-7 py-[14px] text-[28px] text-white">
              VIEW MY WORK!
            </Comic>
            <a href="#about" className="text-[26px] underline">
              ABOUT ME
            </a>
          </div>
        </div>
        <HeroPanel />
      </div>
    </header>
  );
}
