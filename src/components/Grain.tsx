// Mount once as the first child of <main>. Holds the shared #rough filter (used by .rough) and the film-grain overlay.
// Grain is a small CSS-tiled noise image (see .grain in style-layer.css), drawn once and tiled, not a live full-screen filter.
export function Grain() {
  return (
    <>
      <svg aria-hidden="true" width="0" height="0" className="pointer-events-none absolute">
        <filter id="rough" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="7" result="n" />
          <feDisplacementMap in="SourceGraphic" in2="n" scale="2.5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div aria-hidden="true" className="grain pointer-events-none fixed inset-0 z-40" />
    </>
  );
}
