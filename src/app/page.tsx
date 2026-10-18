import { About } from "@/components/About";
import { CaseStudies } from "@/components/CaseStudies";
import { Contact } from "@/components/Contact";
import { Grain } from "@/components/Grain";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Grain />
      <Hero />
      <About photoSrc="/gabe-photo-2.jpg" />
      <CaseStudies />
      <Contact />
    </main>
  );
}
