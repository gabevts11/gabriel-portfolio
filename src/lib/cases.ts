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
  did: string[]; // "what I did" tags
  tools: string[];
  goal: string;
  hypothesis: string; // labeled as a hypothesis on the page, never a result
  shots: string[]; // labels for placeholder screenshots
  related?: { label: string; text: string; href?: string; cta?: string }; // short pointer to other work
  disclaimer?: string; // shown under the hero summary
  hero?: string; // real image for the hero panel
  heroMock?: string; // key of the code-drawn illustration for the hero and homepage card
  hardParts?: string[]; // extra list under the process
  flow?: string[]; // "how it works" steps
  sitePages?: { src: string; w: number; h: number; label: string }[]; // full-page screenshots, shown cropped with a link to the full image
  screens?: { src: string; w: number; h: number; label: string }[]; // app screens, phone-shaped tiles
  guidePages?: { src: string; w: number; h: number; label: string }[]; // design-system pages, same tile treatment as sitePages
  brandGuide?: { src: string; w: number; h: number }; // tall one-page guide, shown cropped with a link to the full image
  heroClip?: string; // slug of a clip in /work/studio/clips that loops in the hero panel instead of a still
  clips?: { slug: string; label: string; caption: string; mobile?: boolean }[]; // animated exports in /work/studio/clips
  images?: { mock?: string; src?: string; w?: number; h?: number; src2?: string; w2?: number; h2?: number; label: string; caption: string; staged?: boolean }[]; // replaces the placeholder shots
};

export const cases: CaseStudy[] = [
  {
    slug: "snapback-studio",
    issue: "ISSUE #01",
    kicker: "MOTION DESIGN SYSTEM · BROWSER TOOL · PROTOTYPE · PERSONAL PROJECT",
    title: "SNAPBACK MOTION STUDIO",
    badge: "PROTOTYPE · BUILT ON MY OWN, NOT A CLIENT PROJECT",
    summary:
      "I built a motion design system for Snapback Sports and the browser studio that runs it: 44 editable designs, each in 16:9 and 9:16, held to their brand guide.",
    meta: [["ROLE", "Designer & builder"], ["PROJECT", "Personal prototype"]],
    stats: [["44", "Finished, editable motion designs", "magenta"], ["60", "Published iterations of the live studio", "red"]],
    problem:
      "I picked Snapback Sports as a real brand to prototype against. They publish a steady stream of broadcast and social motion graphics, so I wanted to see whether one tool could keep that whole library on-brand and quick to customize: stream graphics, stadium loops, game-day slates and brand intros, without re-rendering a new video for every variant.",
    disclaimer: "Personal prototype, made on my own initiative. It was not commissioned, and I am not affiliated with, employed by, or endorsed by Snapback Sports. Snapback and partner names, logos and brand assets belong to their owners and appear only to show the work.",
    process:
      "I storyboarded concepts with several variants, then built one self-contained browser tool with 44 editable designs, each in 16:9 and 9:16, with element-level editing and autosave. I iterated on feedback round by round, republishing the live studio 60 times, and checked every change in both formats. I also recreated part of the system, the word wall, in Figma with brand variables and components.",
    decisions: [
      "Shipped every design in both 16:9 and 9:16, since the same content runs on streams, in stadiums and as social video.",
      "Held to the brand guide: flagged conflicts instead of breaking them, and captured new house rules as they came up.",
      "Exported transparent WebM versions of overlays so they drop straight into CapCut.",
      "Used close stand-ins for Snapback's licensed fonts (Barlow, Unbounded), checked against the June 2024 brand guide.",
    ],
    did: ["Motion design system", "Browser-based tool", "Brand guide compliance", "16:9 and 9:16 formats", "QA and iteration"],
    tools: ["Claude Code", "Figma", "my brain"],
    goal: "One tool that keeps a brand's whole motion library consistent and quick to customize.",
    hypothesis: "If every design is editable, ships in both formats and follows the brand guide, a small team could make on-brand variants without re-rendering from scratch. Next step: test it with a real team.",
    outcome:
      "44 finished, editable designs, each in 16:9 and 9:16, including 4 intros and outros across two Snapback brands, built to the brand guide's colors and type. 60 published versions of the live studio. Next step: put it in front of a real team.",
    shots: [],
    heroClip: "wordwall",
    clips: [
      { slug: "ticket", label: "TRANSITION · TICKET TEAR", caption: "A ticket tears open and the camera pushes through, covering the cut.", mobile: true },
      { slug: "wordwall", label: "CHANNELS · WORD WALL", caption: "A wall of channel names scrolls behind the hat.", mobile: true },
      { slug: "brandfamily", label: "BRAND FAMILY", caption: "The master lockup with every Snapback channel under it." },
      { slug: "matchup", label: "STADIUM · MATCHUP SLATE", caption: "A split-screen matchup slate for game day." },
      { slug: "signingday", label: "HAT · SIGNING DAY", caption: "Hats line up on a table and one gets picked." },
      { slug: "roadtripmap", label: "SATURDAY · ROAD TRIP · MAP", caption: "A plane arcs across a dotted map with a distance and time readout." },
      { slug: "gradereveal", label: "CARDS · GRADE REVEAL", caption: "A graded trading card reveals its score and estimated value." },
      { slug: "noisemeter", label: "JUMBOTRON · NOISE METER", caption: "A stadium noise meter that climbs with the crowd." },
      { slug: "scorebug", label: "SCOREBUG · FOOTBALL", caption: "A broadcast scorebug for live football streams." },
      { slug: "playerstats", label: "STATS · PLAYER PANEL", caption: "A player stat panel that slides on and off." },
      { slug: "boardingpass", label: "SATURDAY · ROAD TRIP · BOARDING PASS", caption: "A boarding-pass take on the road trip graphic." },
      { slug: "chopintro", label: "CHOP · RISE INTRO", caption: "A brand intro for Snapback Chop." },
      { slug: "lowerthird", label: "SPORTS · LOWER THIRD", caption: "A name and title lower third." },
      { slug: "xsandos", label: "SATURDAY · X'S & O'S", caption: "A football play drawn out on the field." },
      { slug: "kineticintro", label: "SPORTS · KINETIC INTRO", caption: "A kinetic type intro." },
      { slug: "irisoutro", label: "SPORTS · IRIS OUTRO", caption: "An iris-close outro." },
    ],
  },
  {
    slug: "campaign-website",
    issue: "ISSUE #02",
    kicker: "WEB DESIGN · FREELANCE · WIX",
    title: "CAMPAIGN WEBSITE",
    summary:
      "I designed and launched a full campaign website for a local school board candidate, plus a custom tool that maps a voter's address to their seat. 661 sessions and 21 form submissions in the first period.",
    meta: [["ROLE", "Freelance designer & developer"], ["YEAR", "2026"]],
    stats: [["661", "Sessions in the first period", "cyan"], ["506", "Unique visitors", "purple"], ["21", "Form submissions, 11 of them volunteer sign-ups", "red"]],
    problem:
      "A local school board candidate needed one place online to reach voters: who they are, how to vote, and ways to volunteer, donate or stay in touch. It had to work on a phone, and give each voter a quick way to find their own district.",
    process:
      "I designed and launched a responsive multi-page site in Wix and Figma, prototyping with Claude: a Donate button in the navigation, supporter forms, and one look on every page (blue, cream and orange with a serif heading). The one custom piece is the district lookup tool on the voter info page. I researched the official boundary map, which was only a PDF, turned its shapes into georeferenced GeoJSON, and matched an address's coordinates against the five district polygons. I led the research, direction, interface, debugging and testing, and directed the build with ChatGPT's help over about 25 versions.",
    hardParts: [
      "Usable geometry: the source was a PDF map, so the district shapes had to be extracted, rebuilt and georeferenced.",
      "Address accuracy: the lookup uses coordinates, not ZIP codes. Edge-case addresses are a known limit.",
      "Browser limits: cross-origin rules shaped which services were practical, and one map tile source was dropped after an access problem.",
    ],
    flow: ["ADDRESS", "GEOCODING", "COORDINATES", "DISTRICT POLYGON MATCH", "SEAT RESULT"],
    decisions: [
      "Organized the site around what a voter needs to do: learn, check how to vote, and take action, with forms and Donate reachable from every page.",
      "Built the district lookup as an interactive tool so each voter gets a personal answer.",
      "Matched on coordinates and district polygons, not ZIP code, because neighboring streets can sit in different seats.",
      "Added an outside-boundaries message and a beta note pointing to official county resources, since wrong district information could mislead voters.",
    ],
    did: ["Website design", "Mobile-first layout", "Forms and sign-ups", "Custom district lookup tool", "Research and testing"],
    tools: ["Wix", "Figma", "Claude", "ChatGPT", "my brain"],
    goal: "Give voters one place to learn about the candidate, check how to vote and take action. The county had no tool for finding which seat you vote in, and looking it up was hard, so I built one.",
    hypothesis: "An address lookup makes finding your seat easier than working from the county's PDF map. Next step: track how many voters use it.",
    outcome:
      "661 sessions from 506 unique visitors in the site's first period, primarily mobile and organic Facebook traffic. 21 form submissions, including 11 volunteer sign-ups. The lookup tool is a campaign aid, not an official government service, and it does not determine voter eligibility.",
    shots: [],
    heroMock: "poster",
    brandGuide: { src: "/work/campaign/brand-guide.jpg", w: 1200, h: 3419 },
    sitePages: [
      { src: "/work/campaign/site-home.jpg", w: 1200, h: 1476, label: "HOME" },
      { src: "/work/campaign/site-about.jpg", w: 1200, h: 1427, label: "ABOUT" },
      { src: "/work/campaign/site-priorities.jpg", w: 1200, h: 1076, label: "PRIORITIES" },
      { src: "/work/campaign/site-experience.jpg", w: 1200, h: 1339, label: "EXPERIENCE" },
      { src: "/work/campaign/site-voter.jpg", w: 1200, h: 752, label: "VOTER INFO" },
      { src: "/work/campaign/site-events.jpg", w: 1200, h: 720, label: "EVENTS" },
      { src: "/work/campaign/site-contact.jpg", w: 1200, h: 944, label: "CONTACT" },
      { src: "/work/campaign/site-involved.jpg", w: 1200, h: 922, label: "GET INVOLVED" },
    ],
    images: [
      { mock: "phone", label: "BUILT FOR PHONES", caption: "An illustration of the mobile layout: simple header, one clear message, two actions, and the district lookup within reach." },
      { mock: "latest", label: "THE LOOKUP TOOL, LATEST", caption: "The lookup tool in its later version: blue, cream and orange, with a serif heading. Redrawn in code from the prototype, with sample text." },
      { mock: "early", label: "THE LOOKUP TOOL, EARLY", caption: "An early version: address field, boundary map and result panel. Redrawn in code, with sample text." },
      { mock: "seats", label: "THE EXTRACTED SEATS", caption: "The five district shapes rebuilt from the official PDF map and converted to GeoJSON." },
      { mock: "error", label: "OUTSIDE BOUNDARIES (STAGED)", caption: "An illustrated example of the error state, staged for documentation. It is not a recording of a live session.", staged: true },
    ],
  },
  {
    slug: "snapback-experiences",
    issue: "ISSUE #03",
    kicker: "PRODUCT DESIGN · MOBILE APP · PROTOTYPE · PERSONAL CONCEPT",
    title: "SNAPBACK EXPERIENCES",
    badge: "CONCEPT PROTOTYPE · DESIGNS ONLY, NOT A BUILT APP",
    concept: true,
    summary:
      "A self-initiated concept for a Snapback fan app: log the games you go to, rate them, see what fans recommend, then plan the whole weekend, from travel and tickets to dining and merch. Sixteen screens, designed in Figma.",
    meta: [["ROLE", "Product designer"], ["STATUS", "Concept, designed in Figma"]],
    stats: [["CONCEPT", "Wireframes and designs, ready to prototype", "purple"], ["16", "Screens designed", "magenta"], ["4", "Core ideas: two borrowed, two original", "cyan"]],
    problem:
      "Fans have no shared place to record the games they attend, rate them, or find what is worth doing at a venue, and no easy way to turn a great game into a trip. Snapback has said its long-term goal is one Snapback Experiences product, so I took that as the brief: \"the Yelp for sports\" first, then a trip planner on top.",
    disclaimer: "Personal concept, made on my own initiative. No one at Snapback has seen or approved it, and I am not affiliated with, employed by, or endorsed by Snapback Sports. Snapback names, colors and brand assets belong to their owners and appear only to show the concept.",
    process:
      "A concept, not a shipped product. I started with low-fidelity wireframes, then built the screens as branded designs in Figma using Snapback's colors and type. It borrows two ideas and adds two: a diary of attended experiences with ratings (from Letterboxd), detail pages with reviews and tips (from Yelp), an original leaderboard of top-rated experiences, and a trip planner that turns an experience into a weekend plan with travel, stay, tickets, dining and merch. All inventory and prices are sample data, and nothing is bookable.",
    flow: ["DISCOVER", "EXPERIENCE", "LOG", "LEADERBOARD", "PLAN TRIP", "CHECKOUT", "PROFILE"],
    decisions: [
      "Made the rating a \"Certified\" stamp that echoes the verdict stamp in Snapback Trivia, so Experiences reads as part of the family.",
      "Made the leaderboard an original mechanic: filterable by sport, team, region and time, with a trophy for the top spot.",
      "Labeled every trip as a sample, not live inventory, so no screen implies a real booking.",
      "Kept betting out of the main flow: it appears only as an optional partner service, gated by age and location, with responsible-gambling help.",
      "Pulled colors and type from Snapback's brand guide instead of inventing a look, and left out the hat-logo artwork.",
      "Built shared components once (nav bar, rating stamp, button) so a change updates all 16 screens.",
    ],
    did: ["Product design", "UX flows", "Wireframes", "Visual design", "Shared components"],
    tools: ["Claude Code", "Figma", "my brain"],
    related: { label: "WHAT SNAPBACK HAS SAID", text: "Snapback's founder has said in a public newsletter that the end of the road is a Snapback Experiences product: one place to book travel, tickets and dinner, buy team merch and bet, guided by Snapback's own recommendations and its fans'. A later newsletter calls Snapback Experiences the company's North Star. This concept is my own take on that direction, made on my own initiative.", href: "https://jacksettleman.beehiiv.com/p/can-i-invest-in-snapback-sports-1680", cta: "READ THE NEWSLETTER" },
    goal: "One place for fans to log, rate and discover game experiences, and plan the trip around them.",
    hypothesis: "Two familiar mechanics (a Letterboxd-style diary, Yelp-style reviews) plus an original leaderboard and a trip planner make it easy to learn, and turn a great game into a weekend people actually plan. Next step: test it with fans.",
    outcome:
      "16 wireframed and branded screens, a complete concept from discovery to checkout. Trips use sample inventory. Next: interactive prototyping between screens, real partner inventory, and testing with the fans who would use it.",
    shots: [],
    hero: "/work/experiences/card.jpg",
    guidePages: [
      { src: "/work/experiences/brand-01-brand-color.jpg", w: 1200, h: 1398, label: "BRAND AND COLOR" },
      { src: "/work/experiences/brand-02-typography.jpg", w: 1200, h: 2850, label: "TYPOGRAPHY" },
      { src: "/work/experiences/brand-03-buttons-badges.jpg", w: 1200, h: 1679, label: "BUTTONS AND BADGES" },
      { src: "/work/experiences/brand-04-navigation-forms.jpg", w: 1200, h: 2526, label: "NAVIGATION AND FORMS" },
      { src: "/work/experiences/brand-05-content-patterns.jpg", w: 1200, h: 2292, label: "CONTENT PATTERNS" },
      { src: "/work/experiences/brand-06-media-layout.jpg", w: 1200, h: 1763, label: "MEDIA AND LAYOUT" },
      { src: "/work/experiences/brand-07-trip-booking.jpg", w: 1200, h: 2775, label: "TRIP AND BOOKING" },
      { src: "/work/experiences/brand-08-journey-commerce.jpg", w: 1200, h: 2574, label: "JOURNEY AND COMMERCE" },
      { src: "/work/experiences/brand-09-checkout-pricing.jpg", w: 1200, h: 2531, label: "CHECKOUT AND PRICING" },
      { src: "/work/experiences/brand-10-status-safety.jpg", w: 1200, h: 1654, label: "STATUS AND PARTNER SAFETY" },
      { src: "/work/experiences/brand-11-component-library.jpg", w: 1600, h: 2188, label: "COMPONENT LIBRARY" },
    ],
    screens: [
      { src: "/work/experiences/screen-01-discover.jpg", w: 750, h: 2466, label: "DISCOVER" },
      { src: "/work/experiences/screen-02-search.jpg", w: 750, h: 1920, label: "SEARCH" },
      { src: "/work/experiences/screen-03-experience-detail.jpg", w: 750, h: 1934, label: "EXPERIENCE DETAIL" },
      { src: "/work/experiences/screen-04-comments.jpg", w: 750, h: 1920, label: "COMMENTS" },
      { src: "/work/experiences/screen-05-trips-dashboard.jpg", w: 750, h: 2620, label: "TRIPS DASHBOARD" },
      { src: "/work/experiences/screen-06-weekend-plan.jpg", w: 750, h: 3014, label: "WEEKEND PLAN" },
      { src: "/work/experiences/screen-07-travel-stay.jpg", w: 750, h: 2608, label: "TRAVEL AND STAY" },
      { src: "/work/experiences/screen-08-tickets-seats.jpg", w: 750, h: 2528, label: "TICKETS AND SEATS" },
      { src: "/work/experiences/screen-09-dining.jpg", w: 750, h: 2620, label: "DINING" },
      { src: "/work/experiences/screen-10-team-shop.jpg", w: 750, h: 2624, label: "TEAM SHOP" },
      { src: "/work/experiences/screen-11-eligibility.jpg", w: 750, h: 2478, label: "GAME DAY ELIGIBILITY" },
      { src: "/work/experiences/screen-12-itinerary.jpg", w: 750, h: 2994, label: "ITINERARY" },
      { src: "/work/experiences/screen-13-checkout.jpg", w: 750, h: 4150, label: "REVIEW AND CHECKOUT" },
      { src: "/work/experiences/screen-14-leaderboard.jpg", w: 750, h: 1920, label: "LEADERBOARD" },
      { src: "/work/experiences/screen-15-log-review.jpg", w: 750, h: 1920, label: "LOG AND REVIEW" },
      { src: "/work/experiences/screen-16-profile.jpg", w: 750, h: 2192, label: "PROFILE" },
    ],
  },
];

export const getCase = (slug: string) => cases.find((c) => c.slug === slug);
