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
      <About />
      <CaseStudies />
      <Contact />
    </main>
  );
}
