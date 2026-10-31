import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts, postBySlug } from "@/lib/posts";
import { toolBySlug } from "@/lib/tools";
import { pageMeta } from "@/lib/seo";
import { abs, site } from "@/lib/site";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";

export const dynamicParams = false;
export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = postBySlug((await params).slug);
  return p ? pageMeta({ path: `/blog/${p.slug}/`, title: p.title, description: p.description, type: "article" }) : {};
}

export default async function Post({ params }: { params: Promise<{ slug: string }> }) {
  const post = postBySlug((await params).slug);
  if (!post) notFound();
  const tool = toolBySlug(post.tool);
  return (
    <article className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }, { name: post.title, href: `/blog/${post.slug}/` }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{post.title}</h1>
      <p className="mt-3 text-sm text-muted">
        {new Date(post.date).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })} · {post.readMinutes} min read
      </p>
      <div className="prose-page mt-6">
        <p className="text-lg!">{post.description}</p>
        {post.sections.map((s) => (
          <section key={s.h}>
            <h2>{s.h}</h2>
            {s.p.map((t) => <p key={t}>{t}</p>)}
          </section>
        ))}
      </div>
      {tool && (
        <aside className="card mt-10 p-5">
          <p className="font-semibold text-white">Try it yourself</p>
          <p className="mt-1 text-sm text-muted">Put this advice to work with our free {tool.name.toLowerCase()}.</p>
          <Link href={`/${tool.slug}/`} className="btn-primary mt-4 px-6">Open {tool.name}</Link>
        </aside>
      )}
      <AdSlot />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          description: post.description,
          datePublished: post.date,
          dateModified: post.date,
          mainEntityOfPage: abs(`/blog/${post.slug}/`),
          author: { "@type": "Organization", name: site.name },
          publisher: { "@type": "Organization", name: site.name },
        }}
      />
    </article>
  );
}
