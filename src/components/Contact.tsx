import type { CSSProperties } from "react";
import { benDay } from "@/lib/comic-art";
import { Art, Comic } from "./art";
import { Caption } from "./Caption";
import { CopyEmail } from "./CopyEmail";

const dots = { width: 520, height: 300, spacing: 16, maxR: 6, minR: 1, origin: { x: 520, y: 300 }, falloff: 290 };

export function Contact() {
  return (
    <section id="contact" data-flip="1" className="relative mx-auto flex max-w-[1440px] flex-col items-start gap-[22px] px-6 pb-16 pt-12 xl:px-[120px] xl:pb-20">
      <Art w={520} h={300} d={benDay(dots)} fill="#FF2D87" opacity={0.7} blend className="bottom-0 right-0 hidden md:block" />
      <Art w={520} h={300} d={benDay(dots)} fill="#00B7EB" opacity={0.7} blend dx={6} dy={4} className="bottom-0 right-0 hidden md:block" />
      <Comic bg="#F7DF02" shadow={5} className="px-[18px] py-2 text-[26px]">
        CONTACT
      </Comic>
      <Caption rot={-1}>TO BE CONTINUED… IN YOUR INBOX</Caption>
      <h2
        className="rgb-split font-display text-[clamp(52px,14vw,110px)] leading-[.88] tracking-[.01em]"
        style={{ "--ts-extra": "7px 7px 0 #111" } as CSSProperties}
      >
        SAY HI!
      </h2>
      <p className="max-w-[560px] text-xl leading-normal">Open to new opportunities. Reach me by email or LinkedIn.</p>
      <div className="relative z-10 flex flex-wrap gap-5">
        <CopyEmail />
        <Comic as="a" href="https://www.linkedin.com/in/gabe-dougherty" target="_blank" rel="noopener noreferrer" bg="#00B7EB" shadow={6} className="comic-link px-6 py-3 text-2xl">
          LINKEDIN
        </Comic>
      </div>
      <p className="relative z-10 mt-10 text-sm font-medium tracking-[.08em] text-[#4d4d4d]">© GABE DOUGHERTY · YORK, SC</p>
    </section>
  );
}
