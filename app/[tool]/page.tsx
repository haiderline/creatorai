import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { tools, toolBySlug } from "@/lib/tools";
import { postBySlug } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { abs } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PromptTool } from "@/components/PromptTool";
import { Faq } from "@/components/Faq";
import { AdSlot } from "@/components/AdSlot";
import { viral } from "@/lib/viral";
import { ToolCard } from "@/components/ToolCard";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() {
  return tools.map((t) => ({ tool: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ tool: string }> }): Promise<Metadata> {
  const t = toolBySlug((await params).tool);
  if (!t) return {};
  return pageMeta({ path: `/${t.slug}/`, title: t.title, description: t.description });
}

export default async function ToolPage({ params }: { params: Promise<{ tool: string }> }) {
  const tool = toolBySlug((await params).tool);
  if (!tool) notFound();
  const others = tools.filter((t) => t.slug !== tool.slug);
  const articles = tool.related.map(postBySlug).filter((p) => !!p);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: tool.name, href: `/${tool.slug}/` }]} />
      <header className="mb-8 max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{tool.h1}</h1>
        <p className="mt-4 text-lg leading-8 text-muted">{tool.blurb}</p>
      </header>

      <PromptTool mode={tool.mode} />

      <div className="mx-auto mt-16 max-w-3xl">
        <section aria-labelledby="about-tool">
          <h2 id="about-tool" className="text-2xl font-semibold text-white">About this tool</h2>
          <p className="mt-3 leading-7 text-muted">{tool.intro}</p>
        </section>

        <section aria-labelledby="how-to" className="mt-10">
          <h2 id="how-to" className="text-2xl font-semibold text-white">How to use it</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-6 leading-7 text-muted marker:text-violet-300">
            {tool.steps.map((s) => <li key={s}>{s}</li>)}
          </ol>
        </section>

        <section aria-labelledby="tips" className="mt-10">
          <h2 id="tips" className="text-2xl font-semibold text-white">Tips for better results</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-muted marker:text-violet-300">
            {tool.tips.map((s) => <li key={s}>{s}</li>)}
          </ul>
        </section>

        <AdSlot />
        <Faq items={tool.faqs} />

        {articles.length > 0 && (
          <section aria-labelledby="read" className="mt-14">
            <h2 id="read" className="text-2xl font-semibold text-white">Related guides</h2>
            <ul className="mt-4 space-y-2">
              {articles.map((p) => p && (
                <li key={p.slug}><Link className="text-violet-300 underline underline-offset-2 hover:text-violet-200" href={`/blog/${p.slug}/`}>{p.title}</Link></li>
              ))}
            </ul>
          </section>
        )}
      </div>

      <aside className="card mx-auto mt-14 max-w-3xl p-5">
        <p className="font-semibold text-white">Need inspiration?</p>
        <p className="mt-1 text-sm text-muted">Browse {viral.length} copy-and-paste viral prompts for products, food, nature, fantasy and action.</p>
        <Link href="/viral-prompts/" className="btn-primary mt-4 px-6">Browse viral prompts</Link>
      </aside>

      <section aria-labelledby="more" className="mt-16">
        <h2 id="more" className="text-2xl font-semibold text-white">More free tools</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.slice(0, 3).map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
        <p className="mt-4 text-sm text-muted">
          Also available: {others.slice(3).map((t, i) => (
            <span key={t.slug}>{i > 0 && ", "}<Link className="text-violet-300 hover:text-violet-200" href={`/${t.slug}/`}>{t.name}</Link></span>
          ))}.
        </p>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: tool.name,
          url: abs(`/${tool.slug}/`),
          description: tool.description,
          applicationCategory: "MultimediaApplication",
          operatingSystem: "Any (web browser)",
          offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        }}
      />
    </div>
  );
}
