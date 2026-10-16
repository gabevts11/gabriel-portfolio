import { About } from "@/components/About";
import { Hero } from "@/components/Hero";

export default function Home() {
  return (
    <main className="overflow-x-clip">
      <Hero />
      <About />
    </main>
  );
}
