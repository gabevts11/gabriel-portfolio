import { benDay } from "@/lib/comic-art";
import { Art, Comic, Streams } from "./art";
import { SpeedLines } from "./SpeedLines";

const cornerDots = { width: 560, height: 380, spacing: 16, maxR: 6, minR: 1, origin: { x: 560, y: 380 }, falloff: 460 };
const seamR = { width: 560, height: 640, spacing: 16, maxR: 6, minR: 1, origin: { x: 560, y: 320 }, falloff: 318 };
const seamL = { width: 560, height: 640, spacing: 16, maxR: 6, minR: 1, origin: { x: 0, y: 320 }, falloff: 318 };
const nav = [
  ["WORK", "#work"],
  ["ABOUT", "#about"],
];

export function Hero() {
  const bg = { width: 620, height: 460, spacing: 16, maxR: 6, minR: 1, origin: { x: 0, y: 0 }, falloff: 540 };
  return (
    <header className="relative mx-auto flex max-w-[1440px] flex-col gap-14 px-6 pb-16 pt-9 xl:px-20">
      <Art w={620} h={460} d={benDay(bg)} fill="#00B7EB" opacity={0.9} blend className="hero-print left-0 top-0" />
      <Art w={620} h={460} d={benDay(bg)} fill="#FF2D87" opacity={0.9} blend dx={6} dy={4} className="hero-print hero-print-m left-0 top-0" />

      <Art w={560} h={380} d={benDay({ ...cornerDots, origin: { x: 560, y: 0 }, falloff: 460 })} fill="#00B7EB" opacity={0.9} blend className="hero-print right-0 top-0 hidden lg:block" />
      <Art w={560} h={380} d={benDay({ ...cornerDots, origin: { x: 560, y: 0 }, falloff: 460 })} fill="#FF2D87" opacity={0.9} blend dx={6} dy={4} className="hero-print right-0 top-0 hidden lg:block" />
      {/* Bottom dots straddle the Hero / About seam: biggest on the boundary, fading both ways, so the halftone flows into About */}
      <Art w={560} h={640} d={benDay(seamR)} fill="#FF2D87" opacity={0.85} blend className="-bottom-[320px] right-0 hidden origin-right scale-[.7] md:block lg:scale-100" />
      <Art w={560} h={640} d={benDay(seamR)} fill="#00B7EB" opacity={0.85} blend dx={6} dy={4} className="-bottom-[320px] right-0 hidden origin-right scale-[.7] md:block lg:scale-100" />
      <Art w={560} h={640} d={benDay(seamL)} fill="#00B7EB" opacity={0.85} blend className="-bottom-[320px] left-0 origin-left scale-[.5] md:scale-[.7] lg:scale-100" />
      <Art w={560} h={640} d={benDay(seamL)} fill="#FF2D87" opacity={0.85} blend dx={6} dy={4} className="-bottom-[320px] left-0 origin-left scale-[.5] md:scale-[.7] lg:scale-100" />

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
            <span className="gd-a">CLICK ME?</span>
            <span className="gd-b">CLICK ME<br />AGAIN?</span>
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

      {/* Comic cover: free-form on lg+ (sized in container units so it scales as one picture), a simple stack below */}
      <section className="relative isolate [container-type:inline-size]">
        <SpeedLines w={600} h={500} cx={300} cy={260} r={700} seed={5} count={60} preserve="xMidYMid slice" className="-inset-10 -z-10 h-[calc(100%+5rem)] w-[calc(100%+5rem)]" />
        <div className="pointer-events-none absolute bottom-0 right-0 hidden lg:block">
          <div className="relative h-[280px] w-[360px]">
            <Streams mode="load" w={360} h={280} streams={[["#111", { seed: 91, points: [[330, 250], [270, 215], [210, 190], [150, 170]], count: 9, sizeStart: 22, sizeEnd: 6, spread: 40 }]]} />
          </div>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 hidden lg:block">
          <div className="relative h-[240px] w-[300px]">
            <Streams mode="load" w={300} h={240} streams={[["#111", { seed: 92, points: [[20, 215], [75, 185], [130, 165]], count: 7, sizeStart: 18, sizeEnd: 5, spread: 34 }]]} />
          </div>
        </div>

        <div className="relative flex flex-col items-start gap-6 lg:block lg:aspect-[16/10]">
          <span className="hero-draw font-display border-[3px] border-ink bg-red px-4 py-1 text-[clamp(16px,4.4vw,24px)] tracking-[.03em] text-white shadow-[4px_4px_0_#111] lg:absolute lg:left-[4cqw] lg:top-[3.4cqw] lg:text-[2.4cqw]">
            NOW INTRODUCING&hellip;
          </span>

          <h1
            className="hero-name font-display text-[clamp(52px,15vw,120px)] leading-[.86] tracking-[.01em] lg:absolute lg:left-[4cqw] lg:top-[11cqw] lg:whitespace-nowrap lg:text-[11.5cqw]"
          >
            GABE
            <br className="lg:hidden" />
            <span className="lg:ml-[2.4cqw]">DOUGHERTY</span>
          </h1>

          <div className="hero-draw font-display border-[3px] border-ink bg-white px-4 py-2 text-[clamp(18px,5vw,28px)] leading-tight tracking-[.03em] shadow-[6px_6px_0_#FF2D87] lg:absolute lg:left-[4cqw] lg:top-[26cqw] lg:text-[3cqw]">
            &ldquo;THE WONDROUS WORLD OF A SOFTWARE PRODUCT DESIGNER!&rdquo;
          </div>

          <p className="max-w-[540px] font-medium [text-shadow:0_0_3px_#f4eedc,0_0_8px_#f4eedc,0_0_14px_#f4eedc] text-[clamp(17px,4.6vw,22px)] leading-[1.4] lg:absolute lg:left-[4cqw] lg:top-[38cqw] lg:w-[44cqw] lg:max-w-none lg:text-[clamp(16px,2cqw,24px)]">
            I take apps and websites from wireframes to prototypes to production, designed for people who actually use them.
          </p>

          <div className="font-display flex flex-wrap items-center gap-x-8 gap-y-4 lg:absolute lg:left-[4cqw] lg:top-[53cqw]">
            <Comic as="a" href="#work" bg="#E8202A" shadow={7} className="hero-cta comic-link px-7 py-[12px] text-[clamp(22px,6vw,28px)] text-white">
              VIEW MY WORK!
            </Comic>
            <a href="#about" className="text-[clamp(20px,5vw,26px)] underline">
              ABOUT ME
            </a>
          </div>

          <div className="font-display flex flex-wrap items-start gap-6 lg:contents">
            <div className="hero-draw border-[3px] border-ink bg-yellow px-5 py-2 text-center text-[clamp(20px,5.4vw,30px)] leading-[1.05] shadow-[6px_6px_0_#111] lg:absolute lg:right-[4cqw] lg:top-[4cqw] lg:rotate-2 lg:px-[2cqw] lg:py-[1cqw] lg:text-[3cqw]">
              3 BIG
              <br />
              PROJECTS
              <br />
              <span className="text-red text-[.72em]">ALL NEW!</span>
            </div>
            <div className="-rotate-1 border-[3px] border-ink bg-white p-4 shadow-[8px_8px_0_#5B2BC2] sm:max-w-[360px] lg:absolute lg:bottom-[4cqw] lg:right-[4cqw] lg:w-[36cqw] lg:-rotate-2 lg:p-[1.5cqw]">
              <b className="font-display block text-[clamp(22px,5vw,28px)] leading-none text-red lg:text-[3cqw]">PLUS&hellip;</b>
              <span className="mt-1 block text-[clamp(13px,3.4vw,16px)] font-bold leading-[1.3] tracking-[.02em] lg:text-[2.1cqw]">
                WIREFRAMES! PROTOTYPES! COMPONENTS! ALL IN ONE ISSUE!
              </span>
            </div>
          </div>
        </div>
      </section>
    </header>
  );
}
