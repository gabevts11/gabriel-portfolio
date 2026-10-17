// Real case-study copy. Only facts from Gabriel's own materials; never add metrics.
export type CaseColor = "yellow" | "red" | "magenta" | "cyan" | "purple";

export type CaseStudy = {
  slug: string;
  issue: string;
  kicker: string;
  title: string;
  summary: string;
  concept?: boolean;
  badge?: string; // stamp under the title
  meta: [string, string][];
  stats: [string, string, CaseColor][];
  problem: string;
  process: string;
  decisions: string[];
  outcome: string;
  shots: string[]; // labels for placeholder screenshots
  related?: { label: string; text: string; href?: string; cta?: string }; // short pointer to other work
  disclaimer?: string; // shown under the hero summary
  hero?: string; // real image for the hero panel
  heroMock?: string; // key of the code-drawn illustration for the hero and homepage card
  hardParts?: string[]; // extra list under the process
  flow?: string[]; // "how it works" steps
  images?: { mock?: string; src?: string; w?: number; h?: number; src2?: string; w2?: number; h2?: number; label: string; caption: string; staged?: boolean }[]; // replaces the placeholder shots
};

export const cases: CaseStudy[] = [
  {
    slug: "snapback-studio",
    issue: "ISSUE #02",
    kicker: "MOTION DESIGN SYSTEM · BROWSER TOOL · PROTOTYPE · PERSONAL PROJECT",
    title: "SNAPBACK MOTION STUDIO",
    badge: "PROTOTYPE · BUILT ON MY OWN, NOT A CLIENT PROJECT",
    summary:
      "A quick prototype I built on my own initiative to show what I can do: a motion design system for Snapback Sports, and the browser-based studio that runs it: stream graphics, jumbotron loops, sponsor packages and intros for each sub-brand, built to their brand guide and exportable to CapCut.",
    meta: [["ROLE", "Designer & builder"], ["PROJECT", "Personal prototype"], ["TOOLS", "Browser-based tool · Figma"]],
    stats: [["125", "Editable motion designs", "magenta"], ["19", "Scene transitions that fully cover the cut", "cyan"], ["60", "Published iterations of the live studio", "red"]],
    problem:
      "I picked Snapback Sports as a real brand to prototype against. The brand and its family of accounts publish a steady stream of broadcast and social motion graphics, so I wanted to see whether one tool could make that whole library consistent: stream overlays, jumbotron loops, sponsor packages and recurring segment intros and outros, on-brand across every channel, quick to customize and exportable for real production use, without re-rendering a new video for every variant.",
    disclaimer: "Personal prototype, made quickly on my own to show initiative. It was not commissioned, and I am not affiliated with, employed by, or endorsed by Snapback Sports. Snapback and partner names, logos and brand assets belong to their owners and appear only to show the work.",
    related: {
      label: "ALSO BUILT: ASTORA",
      text: "Another tool I designed and directed: Astora, a prompt-engineering platform and Chrome extension for repeatable AI workflows across different tasks. I wrote the requirements, designed the UI in Figma, ran QA and set up payments and deployment, and it was built with Lovable, an AI and no-code tool, not hand-coded by me.",
      href: "https://astoraai.com",
      cta: "VISIT ASTORA",
    },
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
      "125 shipped, editable designs, each in 16:9 and 9:16: stream and YouTube graphics (19), scene transitions (19), stadium and jumbotron loops (13), hat icon motion (9), brand family (4), fan events and trips (3), the Sam Houston jersey sponsorship (6), Snapback Saturday (9), Chop (2), Trivia (9), Betting (5) and Collects (6), plus 21 intros and outros across eight Snapback brands. Built to the Snapback brand guide (five colors, three typefaces), with 60 published versions of the live studio. It is a prototype made to show initiative, not a delivered or commissioned project.",
    shots: [],
    hero: "/work/studio/studio-ui.jpg",
    images: [
      { src: "/work/studio/jersey.jpg", w: 1600, h: 900, src2: "/work/studio/jersey-m.jpg", w2: 506, h2: 900, label: "SAM HOUSTON JERSEY REVEAL", caption: "One design, both formats (16:9 and 9:16): a frame from the jersey sponsorship package." },
      { src: "/work/studio/leaderboard.jpg", w: 1600, h: 900, src2: "/work/studio/leaderboard-m.jpg", w2: 506, h2: 900, label: "TRIVIA LEADERBOARD", caption: "Your row climbs the board while the score counts up, with the Certified Ball Knowledge verdict stamp." },
      { src: "/work/studio/family.jpg", w: 1600, h: 900, src2: "/work/studio/family-m.jpg", w2: 506, h2: 900, label: "ONE BECOMES MANY", caption: "The brand family piece: the master lockup splits into every channel." },
      { src: "/work/studio/ticket.jpg", w: 1600, h: 900, src2: "/work/studio/ticket-m.jpg", w2: 506, h2: 900, label: "TRANSITION · TICKET TEAR", caption: "One of 19 scene transitions, captured mid-wipe. In the studio it plays over your own clip." },
    ],
  },
  {
    slug: "campaign-website",
    issue: "ISSUE #03",
    kicker: "WEB DESIGN · FREELANCE · WIX",
    title: "CAMPAIGN WEBSITE",
    summary:
      "A full campaign website for a local school board candidate: bio, platform, events, voter info and ways to volunteer, donate and sign up, plus a custom lookup tool that maps a voter's address to their seat.",
    meta: [["ROLE", "Freelance designer & developer"], ["TIMELINE", "Aug 2026 – present"], ["TOOLS", "Wix · Figma · ChatGPT"]],
    stats: [["661", "Sessions in the first period", "cyan"], ["506", "Unique visitors", "purple"], ["21", "Form submissions, 11 of them volunteer sign-ups", "red"]],
    problem:
      "A local school board candidate needed one place online to reach voters: who they are, what they stand for, when and where to meet them, how to vote, and easy ways to volunteer, donate or stay in touch. The site also had to work on a phone, since that is where most voters would find it, and give each voter a quick way to find their own district instead of reading a static list.",
    process:
      "Designed and launched a responsive, multi-page site in Wix and Figma: home, meet the candidate, priorities, experience, voter info, events and contact, with a Donate button always in the navigation. Built the supporter forms (email signup, volunteer, contact, donation support) and connected them to the campaign's social channels. Gave the whole site one look: a blue, cream and orange palette with a serif heading type, so it reads as one campaign on every page. The one custom-built piece is the district lookup tool, embedded in the voter info page. For it, I researched the official boundary map, which was only available as a PDF, extracted its vector shapes into georeferenced GeoJSON, and matched an address's coordinates (from the U.S. Census Geocoder) against the five district polygons. I led the research, direction, interface design, debugging and testing, working with ChatGPT as an AI-assisted development partner, and iterated the tool through about 25 versions.",
    hardParts: [
      "Getting usable geometry: the source was an official PDF map, not a GIS dataset, so the district shapes had to be extracted, rebuilt and georeferenced.",
      "Address accuracy: ZIP code or city matching is not precise enough, so the lookup uses coordinates. Edge-case addresses are a known limit, so this is not claimed to cover every address.",
      "Browser and service limits: cross-origin rules shaped which services were practical, and a public map tile endpoint was dropped after an access problem.",
      "Responsive layout: the map notice needed repeated adjustment so text stayed readable and left-aligned at every width.",
    ],
    flow: ["ADDRESS", "GEOCODING", "COORDINATES", "DISTRICT POLYGON MATCH", "SEAT RESULT"],
    decisions: [
      "Organized the site around what a voter needs to do: learn about the candidate, check how to vote, and take action, with forms and a Donate button reachable from every page.",
      "Built the district lookup as an interactive embedded tool rather than a static info page, so each voter gets a personalized answer.",
      "Matched on coordinates and district polygons instead of ZIP code or neighborhood, because streets next to each other can sit in different seats.",
      "Added an outside-boundaries message so an address that falls outside all five seats gets an honest answer instead of a made-up one.",
      "Kept the result short and added a beta note pointing people to official county resources to verify, since wrong district information could mislead voters.",
      "Prioritized a mobile-first layout, since traffic skewed mobile and organic Facebook.",
    ],
    outcome:
      "661 sessions from 506 unique visitors in the site's first period, primarily mobile and organic Facebook traffic. 21 form submissions, including 11 volunteer sign-ups. The lookup tool is a campaign aid, not an official government service, and it does not determine voter eligibility.",
    shots: [],
    heroMock: "poster",
    images: [
      { mock: "sitemap", label: "THE SITE, PAGE BY PAGE", caption: "An illustration of the site's structure: its pages and the ways visitors can help. Page names only, no real content." },
      { mock: "phone", label: "BUILT FOR PHONES", caption: "An illustration of the mobile layout: simple header, one clear message, two actions, and the district lookup within reach." },
      { mock: "latest", label: "THE LOOKUP TOOL, LATEST", caption: "The lookup tool in its later version: blue, cream and orange, with a serif heading. Redrawn in code from the prototype, with sample text." },
      { mock: "early", label: "THE LOOKUP TOOL, EARLY", caption: "An early version: address field, boundary map and result panel. Redrawn in code, with sample text." },
      { mock: "seats", label: "THE EXTRACTED SEATS", caption: "The five district shapes rebuilt from the official PDF map and converted to GeoJSON." },
      { mock: "error", label: "OUTSIDE BOUNDARIES (STAGED)", caption: "An illustrated example of the error state, staged for documentation. It is not a recording of a live session.", staged: true },
    ],
  },
  {
    slug: "snapback-experiences",
    issue: "ISSUE #04",
    kicker: "PRODUCT DESIGN · MOBILE APP · PROTOTYPE · PERSONAL CONCEPT",
    title: "SNAPBACK EXPERIENCES",
    badge: "CONCEPT PROTOTYPE · DESIGNS ONLY, NOT A BUILT APP",
    concept: true,
    summary:
      "A quick concept I made on my own initiative: an app for Snapback's sports-experience community, part Letterboxd and part Yelp: log the games you go to, rate them, rank them, and see what fans recommend doing at each one.",
    meta: [["ROLE", "Product designer"], ["STATUS", "Quick concept, not built"], ["TOOLS", "Figma"]],
    stats: [["CONCEPT", "Wireframes and mockups only, no live product", "purple"], ["7", "Screens designed", "magenta"], ["3", "Core mechanics: two borrowed, one original", "cyan"]],
    problem:
      "Fans have no shared place to record the games and events they attend, rate them, or find out what is worth doing at a given venue. I explored the idea as \"the Yelp for sports\": treat every game, tailgate or stadium visit like a place worth reviewing.",
    disclaimer: "Personal concept, made quickly on my own to show initiative. No one at Snapback has seen or approved it, and I am not affiliated with, employed by, or endorsed by Snapback Sports. Snapback names, colors and brand assets belong to their owners and appear only to show the concept.",
    related: {
      label: "SHIPPED APPS",
      text: "Experiences is a concept, but I have shipped two iOS apps: an AI meal planner and an offline-first fitness tracker, both published on the App Store. I directed both as product owner, covering requirements, UI and UX design, QA, subscriptions with RevenueCat and App Store submission, using AI and no-code tools rather than hand-coding them.",
    },
    process:
      "This is a concept, not a shipped product. I started with low-fidelity wireframes for seven screens, then built the same screens as branded designs in Figma, using Snapback's own colors and type. The idea borrows two mechanics and adds one: a personal diary of attended experiences with ratings and a profile (from Letterboxd), detail pages with reviews and practical tips (from Yelp), and an original leaderboard of top-rated experiences.",
    flow: ["DISCOVER", "SEARCH", "LEADERBOARD", "EXPERIENCE", "COMMENTS", "LOG", "PROFILE"],
    decisions: [
      "Made the rating badge a \"Certified\" stamp that echoes the verdict stamp in Snapback Trivia, so Experiences reads as a sibling product in the Snapback family.",
      "Made the leaderboard the original mechanic: filterable by sport, team, region and time period, with the top spot getting a trophy and a yellow glow.",
      "Used a hero card plus two-column grid on the Discover feed, with titles over the image, the same poster-card language as Letterboxd and Yelp.",
      "Pulled colors and type from Snapback's brand guide instead of inventing a look, and kept to color and type only, not Snapback's hat-logo artwork.",
      "Built shared components (nav bar, rating stamp, button, image placeholder) once so a change updates all seven screens.",
    ],
    outcome:
      "A concept only: seven wireframed and branded screens, with no development and no user testing, so there are no results to report. Still to do: real photography (black placeholders stand in for every image), interactive prototyping between screens, and getting it in front of the people who would use it.",
    shots: [],
    heroMock: "xp",
    images: [
      { mock: "xp-discover", label: "DISCOVER", caption: "A hero card and grid of poster-style experience cards, each with a Certified rating. Redrawn in code from the Figma design, with sample content." },
      { mock: "xp-leaderboard", label: "LEADERBOARD", caption: "The original mechanic: top-rated experiences ranked, filterable by sport, team, region and time period." },
      { mock: "xp-detail", label: "EXPERIENCE DETAIL", caption: "An aggregate rating, a log button and recommendations from people who were there." },
      { mock: "xp-log", label: "LOG AN EXPERIENCE", caption: "The diary side: star rating, a written review and tags like tailgate, food and seating." },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
