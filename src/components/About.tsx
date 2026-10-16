import Image from "next/image";
import { benDay } from "@/lib/comic-art";
import { CountUp } from "./CountUp";
import { Art, Comic, Fit, Streams } from "./art";

const stats = [
  ["125", "Motion designs shipped in Snapback Studio", "#00B7EB"],
  ["661", "Sessions on a campaign site in its first period", "#FF2D87"],
  ["1 YR", "Building sites, apps & graphics for real users", "#5B2BC2"],
];

function Photo({ src }: { src?: string }) {
  const dots = { width: 420, height: 520, spacing: 12, maxR: 4.8, minR: 0.8, falloff: 560 };
  return (
    <Fit w={444} h={544} className="[--s:.7] md:[--s:1]">
      <Streams
        mode="scroll"
        w={444}
        h={544}
        streams={[
          ["#111", { seed: 61, points: [[40, 40], [-10, -10], [-60, -60], [-100, -115]], count: 8, sizeStart: 18, sizeEnd: 5, spread: 44 }],
          ["#5B2BC2", { seed: 62, points: [[20, 80], [-40, 30], [-95, -20]], count: 6, sizeStart: 13, sizeEnd: 5, spread: 50 }],
          ["#111", { seed: 63, points: [[400, 500], [470, 545], [560, 570], [660, 580]], count: 8, sizeStart: 16, sizeEnd: 6, spread: 36 }],
          ["#E8202A", { seed: 64, points: [[420, 520], [500, 560], [600, 585]], count: 5, sizeStart: 9, sizeEnd: 4, spread: 40 }],
        ]}
      />
      <div className="absolute border-4 border-ink bg-cyan" style={{ left: 24, top: 24, width: 420, height: 520 }} />
      <div className="absolute left-0 top-0 box-border overflow-hidden border-[6px] border-ink bg-paper" style={{ width: 420, height: 520 }}>
        <Art w={420} h={520} d={benDay({ ...dots, origin: { x: 0, y: 0 } })} fill="#00B7EB" opacity={0.9} blend className="inset-0" />
        <Art w={420} h={520} d={benDay({ ...dots, origin: { x: 420, y: 520 } })} fill="#FF2D87" opacity={0.9} blend dx={3} dy={2} className="inset-0" />
        {src && <Image src={src} alt="Gabriel Dougherty" fill sizes="420px" className="object-cover" />}
        <Comic bg="#F7DF02" className="absolute px-[14px] py-[6px] text-[20px]" style={{ left: 24, bottom: 24 }}>
          PHOTO
        </Comic>
      </div>
    </Fit>
  );
}

export function About({ photoSrc }: { photoSrc?: string }) {
  const bl = { width: 560, height: 320, spacing: 16, maxR: 6, minR: 1, origin: { x: 0, y: 320 } };
  const br = { width: 440, height: 280, spacing: 16, maxR: 6, minR: 1, origin: { x: 440, y: 280 }, falloff: 380 };
  return (
    <section id="about" className="relative mx-auto max-w-[1440px] px-6 py-20 xl:px-[120px] xl:py-[140px]">
      <Art w={560} h={320} d={benDay({ ...bl, falloff: 420 })} fill="#F7DF02" opacity={0.85} blend className="bottom-0 left-0" />
      <Art w={560} h={320} d={benDay({ ...bl, falloff: 360 })} fill="#FF2D87" opacity={0.85} blend dx={6} dy={4} className="bottom-0 left-0" />
      <Art w={440} h={280} d={benDay(br)} fill="#00B7EB" opacity={0.9} blend className="bottom-0 right-0" />
      <Art w={440} h={280} d={benDay(br)} fill="#FF2D87" opacity={0.9} blend dx={6} dy={4} className="bottom-0 right-0" />

      <div className="relative flex flex-col items-center gap-24 xl:flex-row xl:gap-24">
        <Photo src={photoSrc} />
        <div className="relative z-10 flex w-full max-w-[640px] flex-col items-start gap-7">
          <Comic bg="#FF2D87" shadow={5} className="px-[18px] py-2 text-[26px] text-white">
            ABOUT ME
          </Comic>
          <h2 className="font-display text-[clamp(40px,10vw,64px)] leading-[.92] tracking-[.01em]">
            PRODUCT DESIGNER BRIDGING WEB APPS AND AI-NATIVE WORKFLOWS
          </h2>
          <p className="text-[19px] leading-normal">
            I&apos;m a product designer based in York, SC, working mostly in Figma — from full site layouts to product UI — and using AI
            tools like Claude and Cursor to move fast from an idea to something people can use. Recent work includes Snapback Studio, a
            125-design motion toolkit for Snapback Sports, and freelance web design for a local school board campaign.
          </p>
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
            {stats.map(([n, label, shadow]) => (
              <li
                key={n}
                className="relative overflow-hidden border-[3px] border-ink bg-white px-5 py-[18px]"
                style={{ boxShadow: `7px 7px 0 ${shadow}`, overflow: "visible" }}
              >
                <Art w={120} h={90} d={benDay({ width: 120, height: 90, spacing: 9, maxR: 3.4, minR: 0.6, origin: { x: 120, y: 0 }, falloff: 120 })} fill="#F7DF02" className="right-0 top-0" />
                <div className="font-display relative text-[56px] leading-none">{/^\d+$/.test(n) ? <CountUp value={+n} /> : n}</div>
                <div className="relative mt-2 text-sm font-medium leading-[1.35]">{label}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
