import { Calistoga } from "next/font/google";
import { DISTRICTS, DISTRICT_VIEWBOX } from "@/lib/district-paths";

const calistoga = Calistoga({ weight: "400", subsets: ["latin"] });

export type MockKind = "latest" | "error" | "early" | "seats" | "poster" | "sitemap" | "phone";

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
  const bangers = { fontFamily: "var(--font-bangers), cursive" } as const;
  if (kind === "poster") {
    const pin = DISTRICTS[0];
    const nav = ["MEET", "PRIORITIES", "EVENTS", "VOTER INFO"];
    let nx = 30;
    return (
      <svg viewBox="0 0 440 270" role="img" aria-label="Illustration of a campaign website with a district map card" className={className} preserveAspectRatio={slice ? "xMidYMid slice" : "xMidYMid meet"}>
        <rect x="26" y="24" width="388" height="232" fill="#111" />
        <rect x="18" y="16" width="388" height="232" fill="#FFF8E7" stroke="#111" strokeWidth="4" />
        <rect x="18" y="16" width="388" height="26" fill="#F7DF02" stroke="#111" strokeWidth="4" />
        {[0, 1, 2].map((i) => <circle key={i} cx={34 + i * 14} cy="29" r="4" fill={["#E8202A", "#F7DF02", "#00B7EB"][i]} stroke="#111" strokeWidth="1.5" />)}
        {nav.map((n) => { const w = n.length * 6.4 + 14; const x = nx; nx += w + 6; return (
          <g key={n}><rect x={x} y="52" width={w} height="16" fill="#fff" stroke="#111" strokeWidth="1.5" /><text x={x + w / 2} y="64" textAnchor="middle" style={bangers} fontSize="11" fill="#111">{n}</text></g>
        ); })}
        <rect x={nx} y="52" width="52" height="16" fill="#FF751F" stroke="#111" strokeWidth="1.5" /><text x={nx + 26} y="64" textAnchor="middle" style={bangers} fontSize="11" fill="#111">DONATE</text>
        <rect x="32" y="86" width="150" height="14" fill="#111" /><rect x="32" y="106" width="118" height="14" fill="#111" />
        <rect x="32" y="130" width="130" height="5" fill="#bbb" /><rect x="32" y="141" width="104" height="5" fill="#bbb" />
        <rect x="32" y="158" width="74" height="20" fill="#FF751F" stroke="#111" strokeWidth="2" /><text x="69" y="173" textAnchor="middle" style={bangers} fontSize="12" fill="#111">GET INVOLVED</text>
        <rect x="112" y="158" width="70" height="20" fill="#fff" stroke="#111" strokeWidth="2" /><text x="147" y="173" textAnchor="middle" style={bangers} fontSize="12" fill="#111">SIGN UP</text>
        <rect x="200" y="82" width="190" height="118" fill="#cfcfd4" stroke="#111" strokeWidth="2" /><text x="295" y="148" textAnchor="middle" style={bangers} fontSize="18" fill="#9a9aa6">PHOTO</text>
        <g transform="rotate(-4 310 205)">
          <rect x="262" y="148" width="148" height="98" fill="#111" transform="translate(5 5)" />
          <rect x="262" y="148" width="148" height="98" fill="#fff" stroke="#111" strokeWidth="3" />
          <Seats x={266} y={152} w={86} h={86} fills={SEAT_COLORS} stroke="#111" label="#111" labelPrefix="" sw={14} labels={false} />
          <g transform={`translate(${266 + pin.x * 0.086} ${152 + pin.y * 0.086})`}><path d="M0 0C-7-8-7-17 0-17S7-8 0 0Z" fill="#E8202A" stroke="#111" strokeWidth="1.6" /><circle cx="0" cy="-11" r="2.2" fill="#fff" /></g>
          <text x="358" y="182" style={bangers} fontSize="17" fill="#111">WHICH</text><text x="358" y="200" style={bangers} fontSize="17" fill="#111">SEAT IS</text><text x="358" y="218" style={bangers} fontSize="17" fill="#E8202A">MINE?</text>
        </g>
      </svg>
    );
  }
  if (kind === "sitemap") {
    const pages = [["HOME", "#F7DF02"], ["MEET THE CANDIDATE", "#00B7EB"], ["PRIORITIES", "#FF2D87"], ["EXPERIENCE", "#F7DF02"], ["VOTER INFO", "#E8202A"], ["EVENTS", "#00B7EB"], ["CONTACT", "#FF2D87"]];
    const forms = ["EMAIL SIGNUP", "VOLUNTEER", "CONTACT", "DONATION SUPPORT"];
    return (
      <svg viewBox="0 0 880 560" role="img" aria-label="Illustration of the website's pages and forms" className={className} preserveAspectRatio={slice ? "xMidYMin slice" : "xMidYMid meet"}>
        <rect width="880" height="560" fill="#F4EEDC" />
        <text x="40" y="62" style={bangers} fontSize="34" fill="#111">THE PAGES</text>
        {pages.map(([n, c], i) => { const col = i % 4, row = Math.floor(i / 4); const x = 40 + col * 205, y = 86 + row * 120; return (
          <g key={n}><rect x={x + 6} y={y + 6} width="190" height="92" fill="#111" /><rect x={x} y={y} width="190" height="92" fill={c} stroke="#111" strokeWidth="4" /><rect x={x + 14} y={y + 14} width="60" height="8" fill="#111" opacity=".25" /><text x={x + 14} y={y + 66} style={bangers} fontSize="26" fill="#111">{n}</text></g>
        ); })}
        <text x="40" y="372" style={bangers} fontSize="34" fill="#111">THE WAYS TO HELP</text>
        {forms.map((n, i) => (
          <g key={n}><rect x={46 + i * 205} y={394} width="190" height="56" fill="#111" /><rect x={40 + i * 205} y={388} width="190" height="56" fill="#fff" stroke="#111" strokeWidth="4" /><text x={135 + i * 205} y={423} textAnchor="middle" style={bangers} fontSize="21" fill="#111">{n}</text></g>
        ))}
        <rect x="46" y="478" width="400" height="56" fill="#111" /><rect x="40" y="472" width="400" height="56" fill="#FF751F" stroke="#111" strokeWidth="4" /><text x="240" y="509" textAnchor="middle" style={bangers} fontSize="24" fill="#111">DONATE + DISTRICT LOOKUP TOOL</text>
      </svg>
    );
  }
  if (kind === "phone") {
    return (
      <svg viewBox="0 0 500 700" role="img" aria-label="Illustration of the site on a phone" className={className} preserveAspectRatio={slice ? "xMidYMin slice" : "xMidYMid meet"}>
        <rect width="500" height="700" fill="#F4EEDC" />
        <rect x="130" y="50" width="260" height="610" rx="34" fill="#111" transform="translate(10 10)" />
        <rect x="130" y="50" width="260" height="610" rx="34" fill="#FFF8E7" stroke="#111" strokeWidth="6" />
        <rect x="136" y="56" width="248" height="46" rx="28" fill="#F7DF02" stroke="#111" strokeWidth="3" />
        <rect x="150" y="68" width="62" height="22" fill="#cfcfd4" />
        {[0, 1, 2].map((i) => <rect key={i} x="346" y={70 + i * 8} width="24" height="3" fill="#111" />)}
        <rect x="150" y="122" width="220" height="128" rx="14" fill="#cfcfd4" stroke="#111" strokeWidth="3" />
        <rect x="150" y="270" width="190" height="16" fill="#111" /><rect x="150" y="294" width="150" height="16" fill="#111" />
        <rect x="150" y="324" width="210" height="6" fill="#bbb" /><rect x="150" y="338" width="170" height="6" fill="#bbb" />
        <rect x="150" y="366" width="120" height="34" rx="17" fill="#FF751F" stroke="#111" strokeWidth="3" /><text x="210" y="390" textAnchor="middle" style={bangers} fontSize="18" fill="#111">MEET</text>
        <rect x="150" y="410" width="150" height="34" rx="17" fill="#FF751F" stroke="#111" strokeWidth="3" /><text x="225" y="434" textAnchor="middle" style={bangers} fontSize="18" fill="#111">GET INVOLVED</text>
        <rect x="150" y="470" width="220" height="150" rx="10" fill="#fff" stroke="#111" strokeWidth="3" />
        <Seats x={160} y={480} w={110} h={110} fills={SEAT_COLORS} stroke="#111" label="#111" labelPrefix="" sw={10} labels={false} />
        <text x="276" y="520" style={bangers} fontSize="20" fill="#111">FIND</text><text x="276" y="544" style={bangers} fontSize="20" fill="#111">YOUR</text><text x="276" y="568" style={bangers} fontSize="20" fill="#E8202A">SEAT</text>
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
