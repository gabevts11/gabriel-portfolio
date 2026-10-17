import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetail } from "@/components/CaseDetail";
import { Grain } from "@/components/Grain";
import { cases, getCase } from "@/lib/cases";

export const generateStaticParams = () => cases.map(({ slug }) => ({ slug }));

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const c = getCase((await params).slug);
  return { title: c ? `${c.title} — Gabriel Dougherty` : "Case file", description: c?.summary };
}

export default async function Page({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const i = cases.findIndex((c) => c.slug === slug);
  if (i < 0) notFound();
  return (
    <main className="overflow-x-clip">
      <Grain />
      <CaseDetail c={cases[i]} next={cases[(i + 1) % cases.length]} />
    </main>
  );
}
