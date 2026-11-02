import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cats, catBySlug, viralInCat } from "@/lib/viral";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PromptCard } from "@/components/PromptCard";
import { AdSlot } from "@/components/AdSlot";

export const dynamicParams = false;
export function generateStaticParams() {
  return cats.map((c) => ({ category: c.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const c = catBySlug((await params).category);
  if (!c) return {};
  return pageMeta({ path: `/viral-prompts/category/${c.slug}/`, title: `${c.name} AI Video Prompts`, description: `${viralInCat(c.slug).length} copy-and-paste ${c.name.toLowerCase()} AI video prompts for Kling, Runway, Veo, Sora and Seedance. ${c.intro}`.slice(0, 158) });
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const c = catBySlug((await params).category);
  if (!c) notFound();
  const list = viralInCat(c.slug);
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: "Viral Prompts", href: "/viral-prompts/" }, { name: c.name, href: `/viral-prompts/category/${c.slug}/` }]} />
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{c.name} AI video prompts</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{c.intro}</p>
      </header>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{list.map((p) => <PromptCard key={p.slug} p={p} />)}</div>
      <div className="mx-auto mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-white">Tips for {c.name.toLowerCase()} prompts</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-muted marker:text-violet-300">{c.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        <AdSlot />
        <p className="text-sm text-muted">Explore other categories: {cats.filter((x) => x.slug !== c.slug).map((x, i) => (
          <span key={x.slug}>{i > 0 && ", "}<Link className="text-violet-300 hover:text-violet-200" href={`/viral-prompts/category/${x.slug}/`}>{x.name}</Link></span>
        ))}.</p>
      </div>
    </div>
  );
}
