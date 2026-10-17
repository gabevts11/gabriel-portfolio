import Image from "next/image";
import { benDay } from "@/lib/comic-art";
import { Art, Comic, Fit, Streams } from "./art";
import { Caption } from "./Caption";

const panels = [
  ["USERS FIRST", "Anyone can build with AI now. I make sure people can actually use what gets built.", "#00B7EB", -1.5],
  ["FIGMA TO LIVE", "Wireframes, prototypes and components, then shipped as a real site or app.", "#FF2D87", 1],
  ["OFF THE CLOCK", "College football, F1, movies, and the occasional snowboard run.", "#5B2BC2", -0.8],
] as const;

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
      <div className="rough absolute border-4 border-ink bg-cyan" style={{ left: 24, top: 24, width: 420, height: 520 }} />
      <div className="rgb-ghost absolute left-0 top-0" style={{ width: 420, height: 520 }}>
      <div className="rough relative box-border h-full w-full overflow-hidden border-[6px] border-ink bg-paper">
        <Art w={420} h={520} d={benDay({ ...dots, origin: { x: 0, y: 0 } })} fill="#00B7EB" opacity={0.9} blend className="inset-0" />
        <Art w={420} h={520} d={benDay({ ...dots, origin: { x: 420, y: 520 } })} fill="#FF2D87" opacity={0.9} blend dx={3} dy={2} className="inset-0" />
        {src && <Image src={src} alt="Gabe Dougherty" fill sizes="420px" className="object-cover" />}
        <Comic bg="#F7DF02" className="absolute px-[14px] py-[6px] text-[20px]" style={{ left: 24, bottom: 24 }}>
          PHOTO
        </Comic>
      </div>
      </div>
    </Fit>
  );
}

export function About({ photoSrc }: { photoSrc?: string }) {
  // Both corner fields straddle the About / Selected Work seam: biggest dots on the boundary, fading out both ways, so the halftone flows across.
  const bl = { width: 560, height: 640, spacing: 16, maxR: 6, minR: 1, origin: { x: 0, y: 320 } };
  const br = { width: 440, height: 560, spacing: 16, maxR: 6, minR: 1, origin: { x: 440, y: 280 }, falloff: 380 };
  return (
    <section id="about" data-flip="1" className="relative mx-auto max-w-[1440px] px-6 py-20 xl:px-[120px] xl:py-[140px]">
      <Art w={560} h={640} d={benDay({ ...bl, falloff: 420 })} fill="#F7DF02" opacity={0.85} blend className="-bottom-[320px] left-0 origin-left scale-[.5] md:scale-100" />
      <Art w={560} h={640} d={benDay({ ...bl, falloff: 360 })} fill="#FF2D87" opacity={0.85} blend dx={6} dy={4} className="-bottom-[320px] left-0 origin-left scale-[.5] md:scale-100" />
      <Art w={440} h={560} d={benDay(br)} fill="#00B7EB" opacity={0.9} blend className="-bottom-[280px] right-0 hidden md:block" />
      <Art w={440} h={560} d={benDay(br)} fill="#FF2D87" opacity={0.9} blend dx={6} dy={4} className="-bottom-[280px] right-0 hidden md:block" />

      <div className="relative flex flex-col items-center gap-24 xl:flex-row xl:gap-24">
        <Photo src={photoSrc} />
        <div className="relative z-10 flex w-full max-w-[640px] flex-col items-start gap-7">
          <Comic bg="#FF2D87" shadow={5} className="px-[18px] py-2 text-[26px] text-white">
            ABOUT ME
          </Comic>
          <Caption rot={-1.5}>MEANWHILE, IN YORK, SC…</Caption>
          <h2 className="rgb-split font-display text-[clamp(40px,10vw,64px)] leading-[.92] tracking-[.01em]">
            DESIGNING THINGS PEOPLE ACTUALLY USE.
          </h2>
          <div className="flex max-w-[600px] flex-col gap-4 text-[19px] leading-normal">
            <p>
              I&apos;m a product designer in York, SC. I care about how people actually use a product and how to make it work for them. I
              start with the person on the other side of the screen, then work backward to the layout, the flow and the details.
            </p>
            <p>
              I work mostly in Figma, from full site layouts to product UI. Building with AI is what pulled me into design, and I use tools
              like Claude and Cursor to get from an idea to something real, checking every output against what people need.
            </p>
          </div>
          <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-3">
            {panels.map(([title, text, shadow, rot]) => (
              <li
                key={title}
                className="relative border-[3px] border-ink bg-white px-5 py-4"
                style={{ boxShadow: `7px 7px 0 ${shadow}`, transform: `rotate(${rot}deg)` }}
              >
                <div className="font-display text-[26px] leading-none tracking-[.03em]">{title}</div>
                <div className="mt-2 text-[15px] font-medium leading-[1.4]">{text}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
