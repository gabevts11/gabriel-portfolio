import { Anton, Barlow } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });
const barlow = Barlow({ weight: ["400", "500", "600"], subsets: ["latin"] });

export type XpKind = "xp-discover" | "xp-leaderboard" | "xp-detail" | "xp-log";

const Y = "#F7DF02", D = "#222222", B = "#233160", G = "#8a8a8a";
const head = { fontFamily: anton.style.fontFamily } as const;
const body = { fontFamily: barlow.style.fontFamily } as const;

function Card({ x, y, w, h, tag, title, place, big }: { x: number; y: number; w: number; h: number; tag: string; title: string; place: string; big?: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx="16" fill={D} />
      <path d={`M${x + w * 0.15} ${y + h} L${x + w * 0.5} ${y} M${x + w * 0.4} ${y + h} L${x + w * 0.75} ${y}`} stroke="#fff" strokeOpacity=".05" strokeWidth="12" />
      <rect x={x} y={y + h * 0.55} width={w} height={h * 0.45} rx="16" fill="#000" opacity=".45" />
      <text x={x + 16} y={y + 28} style={body} fontSize="12" fontWeight="600" fill={Y}>★ {tag} CERTIFIED</text>
      <text x={x + 14} y={y + h - (big ? 36 : 40)} style={head} fontSize={big ? 24 : 17} fill="#fff">{title}</text>
      <text x={x + 14} y={y + h - 14} style={body} fontSize="12" fill="#ddd">{place}</text>
    </g>
  );
}

function Nav() {
  const items = ["DISCOVER", "SEARCH", "LOG", "RANKS", "PROFILE"];
  return (
    <g>
      <rect y="700" width="375" height="80" fill="#fff" />
      <rect y="700" width="375" height="1" fill="#e6e6e6" />
      {items.map((t, i) => (
        <g key={t}>
          <circle cx={37 + i * 75} cy="728" r="8" fill="none" stroke={t === "LOG" ? Y : G} strokeWidth="2.4" />
          <text x={37 + i * 75} y="758" textAnchor="middle" style={body} fontSize="10" fontWeight={t === "LOG" ? 600 : 400} fill={t === "LOG" ? "#111" : G}>{t}</text>
        </g>
      ))}
    </g>
  );
}

function Title({ kicker, title }: { kicker: string; title: string }) {
  return (
    <g>
      <text x="20" y="40" style={body} fontSize="12" fontWeight="500" fill={B}>{kicker}</text>
      <text x="20" y="82" style={head} fontSize="36" fill="#111">{title}</text>
    </g>
  );
}

const rows: [string, string][] = [["Kentucky Football Game", "4.8"], ["Daytona 500", "4.7"], ["Duke Basketball Game", "4.6"], ["Churchill Downs Derby", "4.5"], ["Tennessee Tailgate Lot C", "4.3"]];

// Concept screens redrawn in code from the hi-fi Figma pass. Venues and ratings are sample content, not real data.
export function ExperiencesMock({ kind, className = "", slice = false }: { kind: XpKind; className?: string; slice?: boolean }) {
  return (
    <svg viewBox="0 0 375 780" role="img" aria-label="Concept app screen redrawn in code, with sample content" className={className} preserveAspectRatio={slice ? "xMidYMin slice" : "xMidYMid meet"}>
      <rect width="375" height="780" fill="#fff" />
      {kind === "xp-discover" && (
        <g>
          <Title kicker="SNAPBACK EXPERIENCES" title="DISCOVER" />
          <Card x={20} y={104} w={335} h={215} tag="4.8" title="KENTUCKY FOOTBALL GAME" place="Lexington, KY" big />
          <Card x={20} y={338} w={160} h={160} tag="4.6" title="DUKE BASKETBALL GAME" place="Durham, NC" />
          <Card x={195} y={338} w={160} h={160} tag="4.7" title="DAYTONA 500" place="Daytona Beach, FL" />
          <text x="20" y="530" style={body} fontSize="12" fill={G}>MORE NEAR YOU</text>
          <Card x={20} y={548} w={335} h={170} tag="4.5" title="CHURCHILL DOWNS DERBY" place="Louisville, KY" big />
        </g>
      )}
      {kind === "xp-leaderboard" && (
        <g>
          <Title kicker="TOP RATED" title="LEADERBOARD" />
          {["Sport ▾", "Team ▾", "Region ▾", "This Month ▾"].map((c, i) => (
            <g key={c}><rect x={20 + i * 82} y="104" width="76" height="32" rx="16" fill="#fff" stroke="#ccc" /><text x={58 + i * 82} y="125" textAnchor="middle" style={body} fontSize="12" fill="#111">{c}</text></g>
          ))}
          {rows.map(([t, r], i) => (
            <g key={t}>
              <rect x="20" y={158 + i * 92} width="335" height="80" rx="10" fill={i === 0 ? Y : "#f3f3f3"} />
              <text x="40" y={206 + i * 92} style={head} fontSize="22" fill="#111">#{i + 1}</text>
              <rect x="96" y={170 + i * 92} width="56" height="56" rx="28" fill={D} />
              <text x="166" y={196 + i * 92} style={body} fontSize="15" fontWeight="600" fill="#111">{t}</text>
              <text x="166" y={216 + i * 92} style={body} fontSize="12" fill={i === 0 ? "#444" : G}>★ {r}</text>
            </g>
          ))}
        </g>
      )}
      {kind === "xp-detail" && (
        <g>
          <text x="20" y="40" style={body} fontSize="13" fill={B}>‹ Back</text>
          <rect x="20" y="62" width="335" height="190" rx="12" fill={D} />
          <path d="M60 252 L170 62 M150 252 L260 62" stroke="#fff" strokeOpacity=".05" strokeWidth="14" />
          <text x="20" y="316" style={head} fontSize="30" fill="#111">KENTUCKY FOOTBALL GAME</text>
          <rect x="20" y="332" width="104" height="24" rx="12" fill={D} />
          <text x="72" y="349" textAnchor="middle" style={body} fontSize="11" fontWeight="600" fill={Y}>★ 4.6 CERTIFIED</text>
          <text x="134" y="349" style={body} fontSize="12" fill={G}>238 logs · Lexington, KY</text>
          <rect x="20" y="378" width="335" height="52" rx="10" fill={Y} />
          <text x="187" y="410" textAnchor="middle" style={body} fontSize="16" fontWeight="600" fill="#111">+ Log this experience</text>
          <text x="20" y="470" style={body} fontSize="11" fill={G}>RECOMMENDATIONS</text>
          {[["Sam T.", "Tailgate in Lot C: best brats, arrive by 9am."], ["Jordan P.", "Section 112 has the best view, worth the upgrade."]].map(([n, t], i) => (
            <g key={n}><circle cx="42" cy={506 + i * 66} r="20" fill={D} /><text x="76" y={500 + i * 66} style={body} fontSize="13" fontWeight="600" fill="#111">{n}</text><text x="76" y={520 + i * 66} style={body} fontSize="12" fill={G}>{t}</text></g>
          ))}
          <text x="20" y="652" style={body} fontSize="12" fontWeight="500" fill="#111">See all comments →</text>
        </g>
      )}
      {kind === "xp-log" && (
        <g>
          <Title kicker="KENTUCKY FOOTBALL GAME" title="LOG EXPERIENCE" />
          <text x="20" y="130" style={body} fontSize="11" fill={G}>YOUR RATING</text>
          {[0, 1, 2, 3, 4].map((i) => <text key={i} x={20 + i * 46} y="178" fontSize="40" fill={i < 4 ? Y : "#ddd"}>★</text>)}
          <text x="20" y="226" style={body} fontSize="11" fill={G}>YOUR REVIEW</text>
          <rect x="20" y="240" width="335" height="150" rx="10" fill="#f3f3f3" />
          <text x="34" y="268" style={body} fontSize="12" fill={G}>Write your review, tips, recommendations…</text>
          <text x="20" y="430" style={body} fontSize="11" fill={G}>TAG IT</text>
          {["Tailgate", "Food", "Seating", "Traditions"].map((c, i) => (
            <g key={c}><rect x={20 + i * 84} y="446" width="78" height="32" rx="16" fill="#fff" stroke="#ccc" /><text x={59 + i * 84} y="467" textAnchor="middle" style={body} fontSize="12" fill="#111">{c}</text></g>
          ))}
          <rect x="20" y="520" width="335" height="52" rx="10" fill={Y} />
          <text x="187" y="552" textAnchor="middle" style={body} fontSize="16" fontWeight="600" fill="#111">+ Log this experience</text>
        </g>
      )}
      <Nav />
    </svg>
  );
}

// Two phones side by side, cropped by the panel they sit in.
export function XpHero() {
  return (
    <div className="absolute inset-0 flex items-start justify-center gap-4 px-6 pt-5">
      {(["xp-discover", "xp-leaderboard"] as const).map((k, i) => (
        <div key={k} className={`w-[38%] shrink-0 overflow-hidden rounded-[14px] border-[3px] border-ink bg-white ${i ? "mt-6" : ""}`} style={{ boxShadow: "5px 5px 0 #111" }}>
          <ExperiencesMock kind={k} className="block h-auto w-full" />
        </div>
      ))}
    </div>
  );
}
