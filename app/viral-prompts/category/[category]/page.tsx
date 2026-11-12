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
      <div className="mx-auto mt-14 max-w-3xl space-y-10">
        <section aria-labelledby="category-method">
          <h2 id="category-method" className="text-2xl font-semibold text-white">How to write better {c.name.toLowerCase()} AI video prompts</h2>
          <p className="mt-3 leading-7 text-muted">{c.intro} A useful prompt gives the video model a clear visual subject, one action to animate, a setting, and a deliberate camera instruction. Keep the first version simple; add detail only when it changes what should appear on screen.</p>
          <h3 className="mt-6 text-lg font-semibold text-white">Practical prompt checklist</h3>
          <ul className="mt-3 list-disc space-y-2 pl-6 leading-7 text-muted marker:text-violet-300">
            <li><strong className="text-ink">Subject:</strong> name the main object, person, animal or scene precisely.</li>
            <li><strong className="text-ink">Action:</strong> describe one visible action that can happen within a short clip.</li>
            <li><strong className="text-ink">Camera:</strong> choose one movement, such as a slow push-in, orbit or tracking shot.</li>
            <li><strong className="text-ink">Light and setting:</strong> use concrete details that define the mood and environment.</li>
            <li><strong className="text-ink">Continuity:</strong> state what must remain consistent, especially product shape, subject identity or scene layout.</li>
          </ul>
        </section>
        <section aria-labelledby="category-tips">
          <h2 id="category-tips" className="text-2xl font-semibold text-white">Category-specific tips</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 leading-7 text-muted marker:text-violet-300">{c.tips.map((t) => <li key={t}>{t}</li>)}</ul>
        </section>
        <section aria-labelledby="category-workflow">
          <h2 id="category-workflow" className="text-2xl font-semibold text-white">A simple workflow for testing a prompt</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6 leading-7 text-muted marker:text-violet-300">
            <li>Choose one example above and copy its prompt.</li>
            <li>Run it in your selected video generator using a supported aspect ratio and duration.</li>
            <li>Review whether the subject, action and camera movement are clear in the result.</li>
            <li>Change one instruction at a time so you can identify what improved or weakened the result.</li>
          </ol>
          <p className="mt-3 leading-7 text-muted">These are practical prompt-writing steps, not a claim that every example has been rendered or independently benchmarked. Video models interpret instructions differently, so check the controls and limits in the platform you use.</p>
          <p className="mt-4 leading-7 text-muted">Want to build a prompt from scratch? Use the <Link className="text-violet-300 underline underline-offset-2" href="/ai-video-prompt-generator/">free AI video prompt generator</Link> to combine a subject, style, camera move and lighting direction.</p>
        </section>
        <AdSlot />
        <p className="text-sm text-muted">Explore other categories: {cats.filter((x) => x.slug !== c.slug).map((x, i) => (
          <span key={x.slug}>{i > 0 && ", "}<Link className="text-violet-300 hover:text-violet-200" href={`/viral-prompts/category/${x.slug}/`}>{x.name}</Link></span>
        ))}.</p>
      </div>
    </div>
  );
}
