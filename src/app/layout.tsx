import type { Metadata } from "next";
import { Bangers, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CursorTrail } from "@/components/CursorTrail";
import { ScrollGlitch } from "@/components/ScrollGlitch";

const bangers = Bangers({ weight: "400", variable: "--font-bangers", subsets: ["latin"] });
const spaceGrotesk = Space_Grotesk({
  weight: ["400", "500"],
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

// Absolute base for social images; swap for the custom domain once there is one.
export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  title: "Gabriel Dougherty — Software Product Designer",
  description:
    "Gabriel Dougherty designs web apps and products, and directs AI-assisted builds from Figma to App Store.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${bangers.variable} ${spaceGrotesk.variable} antialiased`}>
      <body className="min-h-screen overflow-x-clip">{children}
        <ScrollGlitch />
        <CursorTrail />
      </body>
    </html>
  );
}
