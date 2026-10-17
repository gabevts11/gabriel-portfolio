// Real case-study copy. Only facts from Gabriel's own materials; never add metrics.
export type CaseColor = "yellow" | "red" | "magenta" | "cyan" | "purple";

export type CaseStudy = {
  slug: string;
  issue: string;
  kicker: string;
  title: string;
  summary: string;
  concept?: boolean;
  meta: [string, string][];
  stats: [string, string, CaseColor][];
  problem: string;
  process: string;
  decisions: string[];
  outcome: string;
  shots: string[]; // labels for placeholder screenshots
  heroMock?: boolean; // show the district-map illustration in the hero
  hardParts?: string[]; // extra list under the process
  flow?: string[]; // "how it works" steps
  images?: { mock: "latest" | "error" | "early" | "seats"; label: string; caption: string; staged?: boolean }[]; // replaces the placeholder shots
};

export const cases: CaseStudy[] = [
  {
    slug: "snapback-studio",
    issue: "ISSUE #02",
    kicker: "MOTION DESIGN · DESIGN SYSTEM · BRAND",
    title: "SNAPBACK STUDIO",
    summary:
      "A browser-based motion design studio for Snapback Sports: stream graphics, jumbotron loops, sponsor packages and intros for every sub-brand, built to their brand guide and exportable to CapCut.",
    meta: [["ROLE", "Designer & builder"], ["TIMELINE", "Not yet listed"], ["TOOLS", "Browser-based tool · Figma"]],
    stats: [["125", "Editable motion designs", "magenta"], ["19", "Design groups, each in 16:9 and 9:16", "cyan"], ["60", "Published iterations of the live studio", "red"]],
    problem:
      "Snapback Sports and its family of 9 sub-brands needed a large, consistent library of broadcast and social motion graphics (stream overlays, jumbotron loops, sponsor packages, recurring segment intros and outros) that stayed on-brand across every channel and could be quickly customized and exported for real production use, without re-rendering a new video for every variant.",
    process:
      "Storyboarded new concepts with several variants before building from the picks. Built a single self-contained, no-install browser tool holding 125 editable motion designs across 19 groups, each shipping in both 16:9 (1920×1080) and 9:16 (1080×1920), with element-level editing (text, photos, color, timing), per-design content fields, layer toggles and autosave. Iterated on feedback round by round (timing, framing, color, sound), republishing the live studio 60 times. QA'd every change in both formats: loops checked for seamlessness, transitions checked for full frame coverage at the cut, mobile layouts checked against safe zones. Also recreated part of the system (the \"word wall\") in Figma with brand variables, components and Figma Motion.",
    decisions: [
      "Built every design to ship in dual format (16:9 and 9:16) rather than desktop-only, since the same content runs live-stream, in-stadium and as social video.",
      "Enforced brand discipline by flagging guide conflicts instead of breaking them, and captured new house rules as they emerged (white hat icon except on white backgrounds; retired an earlier grid background; plain hat for Snapback Saturday).",
      "Built a review panel directly into the tool that grades every design with strengths and notes, making QA a visible, structured part of the system.",
      "Exported transparent-background (WebM alpha) versions for overlays, so designs drop directly into CapCut without extra compositing.",
      "Used close stand-ins for Snapback's licensed fonts (Barlow for DIN 2014, Unbounded for Monument Extended Ultrabold), checked against Snapback's official June 2024 brand guide.",
    ],
    outcome:
      "125 shipped, editable designs across 19 groups: stream and YouTube graphics (19), scene transitions (19), stadium and jumbotron loops (13), hat icon motion (9), brand family (4), fan events (3), plus packages for the Sam Houston jersey sponsorship (6), Snapback Saturday (9), Chop (2), Trivia (9), Betting (5) and Collects (6), and intro/outro sets for all 9 sub-brands. Built to the Snapback brand guide (5 brand colors, 3 typefaces), with 60 published iterations of the live studio.",
    shots: ["THE STUDIO", "SAM HOUSTON JERSEY REVEAL", "FIGMA WORD WALL"],
  },
  {
    slug: "campaign-website",
    issue: "ISSUE #03",
    kicker: "WEB DESIGN · FREELANCE · WIX",
    title: "CAMPAIGN WEBSITE",
    summary:
      "A responsive campaign site for a local school board candidate, with supporter forms and a custom district lookup tool that maps a voter's address to their seat.",
    meta: [["ROLE", "Freelance designer & developer"], ["TIMELINE", "Aug 2026 – present"], ["TOOLS", "Wix · Figma · ChatGPT"]],
    stats: [["661", "Sessions in the first period", "cyan"], ["506", "Unique visitors", "purple"], ["21", "Form submissions, 11 of them volunteer sign-ups", "red"]],
    problem:
      "A local school board candidate needed an online presence to reach voters: a bio, platform priorities, events, voter information, and ways to volunteer or donate, plus a way for voters to quickly find their own district information instead of reading a static list.",
    process:
      "Designed and launched a responsive, multi-page Wix site: candidate bio, platform priorities, events, voter info, and supporter forms (email signup, volunteer, contact, donation support), connected to the campaign's social channels. For the district lookup, I researched the official boundary map, which was only available as a PDF, extracted its vector shapes and converted them into georeferenced GeoJSON, then matched an address's coordinates (from the U.S. Census Geocoder) against the five district polygons. I led the research, direction, interface design, debugging and testing, working with ChatGPT as an AI-assisted development partner, and iterated the tool through about 25 versions. The tool is embedded in the campaign's Wix site.",
    hardParts: [
      "Getting usable geometry: the source was an official PDF map, not a GIS dataset, so the district shapes had to be extracted, rebuilt and georeferenced.",
      "Address accuracy: ZIP code or city matching is not precise enough, so the lookup uses coordinates. Edge-case addresses are a known limit, so this is not claimed to cover every address.",
      "Browser and service limits: cross-origin rules shaped which services were practical, and a public map tile endpoint was dropped after an access problem.",
      "Responsive layout: the map notice needed repeated adjustment so text stayed readable and left-aligned at every width.",
    ],
    flow: ["ADDRESS", "GEOCODING", "COORDINATES", "DISTRICT POLYGON MATCH", "SEAT RESULT"],
    decisions: [
      "Built the district lookup as an interactive embedded tool rather than a static info page, so each voter gets a personalized answer.",
      "Matched on coordinates and district polygons instead of ZIP code or neighborhood, because streets next to each other can sit in different seats.",
      "Added an outside-boundaries message so an address that falls outside all five seats gets an honest answer instead of a made-up one.",
      "Kept the result short and added a beta note pointing people to official county resources to verify, since wrong district information could mislead voters.",
      "Prioritized a mobile-first layout, since traffic skewed mobile and organic Facebook.",
    ],
    outcome:
      "661 sessions from 506 unique visitors in the site's first period, primarily mobile and organic Facebook traffic. 21 form submissions, including 11 volunteer sign-ups. The lookup tool is a campaign aid, not an official government service, and it does not determine voter eligibility.",
    shots: [],
    heroMock: true,
    images: [
      { mock: "latest", label: "LATEST DESIGN", caption: "The lookup tool in its later version: blue, cream and orange, with a serif heading. Redrawn in code from the prototype, with sample text." },
      { mock: "early", label: "EARLY PROTOTYPE", caption: "An early version: address field, boundary map and result panel. Redrawn in code, with sample text." },
      { mock: "seats", label: "THE EXTRACTED SEATS", caption: "The five district shapes rebuilt from the official PDF map and converted to GeoJSON." },
      { mock: "error", label: "OUTSIDE BOUNDARIES (STAGED)", caption: "An illustrated example of the error state, staged for documentation. It is not a recording of a live session.", staged: true },
    ],
  },
  {
    slug: "snapback-experiences",
    issue: "ISSUE #04",
    kicker: "PRODUCT DESIGN · MOBILE APP · CONCEPT",
    title: "SNAPBACK EXPERIENCES",
    concept: true,
    summary:
      "A concept app for Snapback's sports-experience community, part Letterboxd and part Yelp: log the games you go to, rate them, rank them, and see what fans recommend doing at each one.",
    meta: [["ROLE", "Product designer"], ["STATUS", "Concept, not built"], ["TOOLS", "Figma"]],
    stats: [["CONCEPT", "Wireframes and mockups only, no live product", "purple"], ["7", "Screens designed", "magenta"]],
    problem:
      "Snapback's community of sports fans has no shared place to record the games and events they attend, rate them, or find out what is worth doing at a given venue. The CEO described the idea as \"the Yelp for sports\".",
    process:
      "This is a concept, not a shipped product. Started with low-fidelity wireframes for the core flows (a discover feed, search and browse, a leaderboard of top-rated experiences, an experience page with comments, a log and review flow, and a user profile), then built the same seven screens as branded mockups in Figma using Snapback's brand colors and type. Researched Snapback's existing Trivia app for patterns worth reusing.",
    decisions: [
      "Framed the product as logging and rating real-world sports experiences, with a leaderboard and per-experience recommendations and comments.",
      "Reused the verdict-stamp pattern from Snapback Trivia as the app's rating badge.",
      "Built the mockups from shared components (nav bar, rating stamp, filter chip, buttons) so every screen stays consistent.",
    ],
    outcome:
      "A concept only: seven wireframed and branded screens, no development and no user testing. Nothing here has launched or been measured.",
    shots: ["DISCOVER FEED", "LEADERBOARD", "LOG AN EXPERIENCE"],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
