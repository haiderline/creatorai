import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";
import { cats, viral } from "@/lib/viral";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ViralLibrary } from "@/components/ViralLibrary";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";

export const metadata = pageMeta({
  path: "/viral-prompts/",
  title: `${viral.length} Viral AI Video Prompts to Copy and Paste`,
  description: `Browse ${viral.length} viral-style AI video prompts for products, food, nature, fantasy, action and social content. Copy them for Kling, Runway, Veo, Sora and Seedance.`,
});

export default function ViralIndex() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: "Viral Prompts", href: "/viral-prompts/" }]} />
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">Viral AI video prompts</h1>
        <p className="mt-4 text-lg leading-8 text-muted">
          {viral.length} original prompts based on the formats that keep performing on short-video platforms. Search, copy, and adapt them for Kling, Runway, Veo, Sora or Seedance.
        </p>
      </header>

      <ViralLibrary prompts={viral} cats={cats.map((c) => ({ name: c.name, slug: c.slug }))} />

      <section aria-labelledby="cats" className="mt-16">
        <h2 id="cats" className="text-2xl font-semibold text-white">Browse by category</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {cats.map((c) => (
            <Link key={c.slug} href={`/viral-prompts/category/${c.slug}/`} className="card block p-5 hover:border-violet-400/50">
              <h3 className="font-semibold text-white">{c.name}</h3>
              <p className="mt-1.5 line-clamp-3 text-sm leading-6 text-muted">{c.intro}</p>
            </Link>
          ))}
        </div>
      </section>

      <div className="mx-auto mt-14 max-w-3xl">
        <h2 className="text-2xl font-semibold text-white">How to use these prompts</h2>
        <p className="mt-3 leading-7 text-muted">
          Copy any prompt as a starting point, then change the subject, setting or lighting to make it yours. Prompts work best when you keep one subject and one action per clip. For full control over style, camera and platform formatting, open the <Link className="text-violet-300 underline underline-offset-2" href="/ai-video-prompt-generator/">AI video prompt generator</Link>.
        </p>
        <AdSlot />
      </div>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Viral AI video prompts",
          url: abs("/viral-prompts/"),
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: viral.length,
            itemListElement: viral.map((p, i) => ({ "@type": "ListItem", position: i + 1, name: p.title, url: abs(`/viral-prompts/${p.slug}/`) })),
          },
        }}
      />
    </div>
  );
}
