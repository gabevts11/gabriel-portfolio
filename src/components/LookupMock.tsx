import { Calistoga } from "next/font/google";
import { DISTRICTS, DISTRICT_VIEWBOX } from "@/lib/district-paths";

const calistoga = Calistoga({ weight: "400", subsets: ["latin"] });

export type MockKind = "latest" | "error" | "early" | "seats" | "poster";

const SEAT_COLORS = ["#F7DF02", "#00B7EB", "#FF2D87", "#E8202A", "#5B2BC2"];
const SANS = "var(--font-space-grotesk), system-ui, sans-serif";

function Seats({ x, y, w, h, fills, stroke, label, labelPrefix, sw = 4, labels = true }: { x: number; y: number; w: number; h: number; fills: string[]; stroke: string; label: string; labelPrefix: string; sw?: number; labels?: boolean }) {
  return (
    <svg x={x} y={y} width={w} height={h} viewBox={DISTRICT_VIEWBOX} preserveAspectRatio="xMidYMid meet">
      {DISTRICTS.map((s, i) => (
        <g key={s.seat}>
          <path d={s.d} fill={fills[i % fills.length]} stroke={stroke} strokeWidth={sw} strokeLinejoin="round" />
          {labels && <text x={s.x} y={s.y} textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize={34} fill={label} stroke="#fff" strokeWidth={8} paintOrder="stroke">
            {labelPrefix} {s.seat}
          </text>}
        </g>
      ))}
    </svg>
  );
}

// Redrawn from the lookup prototype's real district shapes, with sample text. Vector, so it stays sharp at any size.
export function LookupMock({ kind, slice = false, className = "" }: { kind: MockKind; slice?: boolean; className?: string }) {
  if (kind === "poster") {
    const pin = DISTRICTS[0];
    const k = 250 / 1000;
    const bangers = { fontFamily: "var(--font-bangers), cursive" } as const;
    return (
      <svg viewBox="0 0 440 270" role="img" aria-label="Illustration: a district map and a Find My District button" className={className} preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"}>
        <Seats x={14} y={10} w={250} h={250} fills={SEAT_COLORS} stroke="#111" label="#111" labelPrefix="" sw={9} labels={false} />
        <g transform={`translate(${14 + pin.x * k} ${10 + pin.y * k})`}>
          <ellipse cx="0" cy="3" rx="9" ry="3.5" fill="#111" opacity=".35" />
          <path d="M0 0C-14-16-14-34 0-34S14-16 0 0Z" fill="#E8202A" stroke="#111" strokeWidth="3" strokeLinejoin="round" />
          <circle cx="0" cy="-22" r="4.5" fill="#fff" stroke="#111" strokeWidth="2" />
        </g>
        <text x="276" y="92" style={bangers} fontSize="40" fill="#111">WHICH</text>
        <text x="276" y="130" style={bangers} fontSize="40" fill="#111">SEAT IS</text>
        <text x="276" y="168" style={bangers} fontSize="40" fill="#E8202A" stroke="#111" strokeWidth="1.2" paintOrder="stroke">MINE?</text>
        <rect x="282" y="196" width="140" height="36" fill="#111" />
        <rect x="276" y="190" width="140" height="36" fill="#F7DF02" stroke="#111" strokeWidth="3" />
        <text x="346" y="215" textAnchor="middle" style={bangers} fontSize="19" fill="#111">FIND MY DISTRICT</text>
      </svg>
    );
  }
  const aria = "Redrawn interface of the district lookup tool, with sample text";
  if (kind === "seats") {
    return (
      <svg viewBox="0 0 880 700" role="img" aria-label="The five district shapes extracted from the boundary map" className={className} preserveAspectRatio={slice ? "xMidYMin slice" : "xMidYMid meet"}>
        <rect width="880" height="700" fill="#F4EEDC" />
        <Seats x={60} y={40} w={760} h={620} fills={SEAT_COLORS} stroke="#111" label="#111" labelPrefix="SEAT" />
      </svg>
    );
  }
  const early = kind === "early";
  const err = kind === "error";
  const t = early
    ? { bg: "#f5f6f8", card: "#fff", ink: "#1d232c", sub: "#6b7280", line: "#d5d9e0", btn: "#111827", map: "#e6eaf0", fill: "#dbe1ea", edge: "#444f63", prefix: "District", head: "Inter, " + SANS, headW: 800 }
    : { bg: "#234A8F", card: "#F7F2E7", ink: "#234A8F", sub: "#234A8F", line: "#234A8F", btn: "#FF751F", map: "#E6E1D3", fill: "rgba(35,74,143,.16)", edge: "#2c3e63", prefix: "Seat", head: calistoga.style.fontFamily, headW: 400 };
  return (
    <svg viewBox="0 0 880 700" role="img" aria-label={aria} className={className} preserveAspectRatio={slice ? "xMidYMin slice" : "xMidYMid meet"}>
      <rect width="880" height="700" fill={t.bg} />
      <rect x="40" y="32" width="800" height="636" rx="18" fill={t.card} />
      <text x="72" y="90" fontFamily={t.head} fontWeight={t.headW} fontSize="32" fill={t.ink}>Find Your School Board District</text>
      <text x="72" y="118" fontFamily={early ? SANS : t.head} fontSize="14" fill={early ? t.sub : t.ink}>Enter your address to see your school board district, trustee, and 2026 election information.</text>
      <rect x="72" y="136" width="596" height="46" rx="8" fill={early ? "#fff" : "none"} stroke={t.line} strokeWidth="1.3" />
      <text x="90" y="165" fontFamily={SANS} fontSize="16" fill={err ? t.ink : early ? "#9aa1ad" : "#5a6f9f"}>{err ? "123 Example Road" : "Enter your address here..."}</text>
      <rect x="682" y="136" width="126" height="46" rx="8" fill={t.btn} />
      <text x="745" y="164" textAnchor="middle" fontFamily={SANS} fontWeight={700} fontSize="14" fill="#fff">Find My District</text>
      {err && <text x="72" y="208" fontFamily={SANS} fontSize="14.5" fill={t.ink}>The address was found, but it falls outside the five School Board Districts.</text>}
      <rect x="72" y="224" width="430" height="412" rx="10" fill={t.map} stroke={t.line} strokeWidth="1.3" />
      <Seats x={72} y={232} w={430} h={396} fills={[t.fill]} stroke={t.edge} label={early ? "#111" : "#1d232c"} labelPrefix={t.prefix} />
      {!early && <rect x="72" y="232" width="430" height="396" fill={t.fill} opacity="0" />}
      <rect x="84" y="570" width="406" height="54" rx="6" fill="#fff" opacity=".94" />
      <text x="96" y="590" fontFamily={SANS} fontSize="11" fill={t.ink}>School District boundaries</text>
      <text x="96" y="606" fontFamily={SANS} fontSize="10.5" fill={t.sub}>This service is in beta testing. Please verify your district</text>
      <text x="96" y="619" fontFamily={SANS} fontSize="10.5" fill={t.sub}>information at your county elections website.</text>
      <rect x="520" y="224" width="288" height="412" rx="10" fill={early ? "#fff" : "none"} stroke={t.line} strokeWidth="1.3" />
      <text x="540" y="258" fontFamily={SANS} fontWeight={700} fontSize="12" letterSpacing="1.4" fill={early ? t.sub : t.ink}>SCHOOL DISTRICT</text>
      <text x="540" y="294" fontFamily={SANS} fontWeight={700} fontSize="28" fill={t.ink}>Enter an address</text>
    </svg>
  );
}
