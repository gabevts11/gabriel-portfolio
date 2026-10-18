import type { Metadata, Viewport } from "next";
import { Abril_Fatface, Bangers, Caveat_Brush, Luckiest_Guy, Mochiy_Pop_One, Space_Grotesk, Special_Elite } from "next/font/google";
import "./globals.css";
import { CalmToggle } from "@/components/CalmToggle";
import { CursorTrail } from "@/components/CursorTrail";
import { PageGlitch } from "@/components/PageGlitch";
import { ScrollGlitch } from "@/components/ScrollGlitch";

const bangers = Bangers({ weight: "400", variable: "--font-bangers", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});
// Universe-transition fonts: not preloaded; PageGlitch warms them in idle time.
const ransom = Abril_Fatface({ weight: "400", variable: "--font-ransom", subsets: ["latin"], preload: false });
const typewriter = Special_Elite({ weight: "400", variable: "--font-typewriter", subsets: ["latin"], preload: false });
const anime = Mochiy_Pop_One({ weight: "400", variable: "--font-anime", subsets: ["latin"], preload: false });
const brush = Caveat_Brush({ weight: "400", variable: "--font-brush", subsets: ["latin"], preload: false });
const cartoon = Luckiest_Guy({ weight: "400", variable: "--font-cartoon", subsets: ["latin"], preload: false });

// Opt out of browser auto-dark-mode, which inverted the halftone art in Chrome on iOS.
export const viewport: Viewport = { colorScheme: "only light" };

export const metadata: Metadata = {
  // Absolute base so social images resolve on the live domain.
  metadataBase: new URL("https://gabedougherty.com"),
  title: "Gabe Dougherty — Software Product Designer",
  description:
    "Gabe Dougherty is a software product designer who takes apps and websites from wireframes to prototypes to production, designed for people who actually use them.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${bangers.variable} ${spaceGrotesk.variable} ${ransom.variable} ${typewriter.variable} ${anime.variable} ${cartoon.variable} ${brush.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip">
        <script dangerouslySetInnerHTML={{ __html: 'try{if(localStorage.getItem("calm-mode")==="1")document.documentElement.setAttribute("data-calm","")}catch(e){}' }} />
        {children}
        <CalmToggle />
        <PageGlitch />
        <ScrollGlitch />
        <CursorTrail />
      </body>
    </html>
  );
}
