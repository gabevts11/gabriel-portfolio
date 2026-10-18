"use client";

import { useEffect, useRef, useState } from "react";

// Loads and plays only while on screen, so the page stays light. Reduced-motion users get a poster with controls.
export function ClipVideo({ slug, mobile, label, className = "", loop }: { slug: string; mobile?: boolean; label: string; className?: string; loop?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [still, setStill] = useState(false);
  const name = mobile ? `${slug}-m` : slug;
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    setStill(reduce);
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          if (!v.getAttribute("src")) v.src = `/work/studio/clips/${name}.mp4`;
          if (!reduce) v.play().catch(() => {});
        } else v.pause();
      },
      { rootMargin: "150px" },
    );
    io.observe(v);
    return () => io.disconnect();
  }, [name]);
  return (
    <video
      ref={ref}
      poster={`/work/studio/clips/${name}.jpg`}
      width={mobile ? 540 : 960}
      height={mobile ? 960 : 540}
      muted
      loop={loop}
      onEnded={loop ? undefined : (e) => { const v = e.currentTarget; setTimeout(() => { if (!still) v.play().catch(() => {}); }, 900); }} // short beat before each replay, so quick transitions read
      playsInline
      preload="none"
      controls={still && !loop}
      aria-label={label}
      className={className}
    />
  );
}
