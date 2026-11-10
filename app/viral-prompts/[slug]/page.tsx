import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { catBySlug, viral, viralBySlug, viralInCat } from "@/lib/viral";
import { pageMeta } from "@/lib/seo";
import { abs, site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CopyButton, DownloadButton } from "@/components/CopyButton";
import { PromptCard } from "@/components/PromptCard";
import { PromptArtwork } from "@/components/PromptArtwork";
import { ShareLinks } from "@/components/ShareLinks";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() {
  return viral.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = viralBySlug((await params).slug);
  if (!p) return {};
  const desc = `Copy this ${p.category.toLowerCase()} AI video prompt for Kling, Runway, Veo, Sora and Seedance. ${p.why}`;
  return pageMeta({ path: `/viral-prompts/${p.slug}/`, title: `${p.title}: AI Video Prompt`, description: desc.length > 158 ? desc.slice(0, 155).trimEnd() + "…" : desc });
}

export default async function PromptPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = viralBySlug((await params).slug);
  if (!p) notFound();
  const cat = catBySlug(p.catSlug)!;
  const related = viralInCat(p.catSlug).filter((x) => x.slug !== p.slug).slice(0, 3);
  const explore = viral.filter((x) => x.catSlug !== p.catSlug && x.slug !== p.slug).slice(0, 3);
  const path = `/viral-prompts/${p.slug}/`;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: "Viral Prompts", href: "/viral-prompts/" }, { name: p.category, href: `/viral-prompts/category/${p.catSlug}/` }, { name: p.title, href: path }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{p.title}: AI video prompt</h1>
      <p className="mt-3 text-sm text-muted">{p.category} · {p.aspect} · {p.duration}</p>
      <PromptArtwork p={p} className="mt-6 aspect-[16/9]" />

      <section aria-labelledby="prompt" className="card mt-6 p-5 sm:p-6">
        <h2 id="prompt" className="text-sm font-medium text-violet-200">Prompt</h2>
        <p className="mt-3 text-[17px] leading-8 text-ink">{p.prompt}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          <CopyButton text={p.prompt} label="Copy prompt" className="btn-primary px-6" />
          <DownloadButton text={p.prompt} filename={`${p.slug}.txt`} />
          <Link href="/ai-video-prompt-generator/" className="btn-ghost">Make your own version</Link>
        </div>
      </section>

      <div className="prose-page">
        <h2>Why this prompt works</h2>
        <p>{p.why}</p>
        <h2>Recommended settings</h2>
        <ul>
          <li>Aspect ratio: {p.aspect}</li>
          <li>Duration: {p.duration}</li>
          <li>Works with Kling, Runway, Veo, Sora and Seedance. Choose the format that matches where you will publish.</li>
        </ul>
        <h2>How to adapt it</h2>
        <ul>{cat.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        <p>Related topics: {p.tags.join(", ")}.</p>
      </div>

      <div className="mt-8"><ShareLinks path={path} title={`${p.title}: AI video prompt`} /></div>
      <AdSlot />

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-12">
          <h2 id="related" className="text-2xl font-semibold text-white">More {p.category.toLowerCase()} prompts</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">{related.map((r) => <PromptCard key={r.slug} p={r} />)}</div>
          <p className="mt-5 text-sm"><Link className="text-violet-300 underline underline-offset-2" href={`/viral-prompts/category/${p.catSlug}/`}>See all {p.category} prompts</Link></p>
        </section>
      )}

      {explore.length > 0 && (
        <section aria-labelledby="discover-more" className="mt-12">
          <h2 id="discover-more" className="text-2xl font-semibold text-white">Discover more viral AI prompts</h2>
          <p className="mt-2 text-sm text-muted">Explore ideas from other categories and connect related creative formats.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{explore.map((r) => <PromptCard key={r.slug} p={r} />)}</div>
          <p className="mt-5 text-sm"><Link className="text-violet-300 underline underline-offset-2" href="/viral-prompts/">Browse the complete viral prompt library</Link></p>
        </section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: `${p.title}: AI video prompt`,
          text: p.prompt,
          description: p.why,
          keywords: p.tags.join(", "),
          url: abs(path),
          genre: p.category,
          datePublished: p.date,
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
    </div>
  );
}
