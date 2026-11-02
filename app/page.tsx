import Link from "next/link";
import { pageMeta } from "@/lib/seo";
import { site, abs } from "@/lib/site";
import { tools } from "@/lib/tools";
import { posts } from "@/lib/posts";
import { viral } from "@/lib/viral";
import { PromptCard } from "@/components/PromptCard";
import { ToolCard } from "@/components/ToolCard";
import { Faq } from "@/components/Faq";
import { AdSlot } from "@/components/AdSlot";
import { JsonLd } from "@/components/JsonLd";

export const metadata = {
  ...pageMeta({
    path: "/",
    title: `${site.name}: Free Prompts for Kling, Runway, Veo and Sora`,
    description: "Free AI video prompt generator with tools for text-to-video, image-to-video, camera movements, animation and negative prompts. No sign-up, runs in your browser.",
  }),
  title: { absolute: `${site.name}: Free Prompts for Kling, Runway, Veo and Sora` },
};

const faqs = [
  { q: "What is an AI video prompt generator?", a: "It is a tool that turns your idea into a detailed, well-structured prompt that AI video models such as Kling, Runway, Veo, Sora and Seedance can follow more accurately." },
  { q: "Do I need an account or a paid plan?", a: "No. Every tool is free, needs no sign-up and runs entirely in your browser." },
  { q: "Does it create the video for me?", a: "No. It writes the prompt. You paste it into the AI video platform you already use." },
  { q: "Where are my prompts saved?", a: "Only in your own browser's local storage. You can delete them from the history panel at any time." },
];

export default function Home() {
  const main = tools[0];
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      <section className="py-16 text-center sm:py-24">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-6xl">
          Write better AI video prompts in seconds
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-muted">
          Choose your subject, style, camera and lighting. Get prompts formatted for Kling, Runway, Veo, Sora and Seedance. Free, with no sign-up.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${main.slug}/`} className="btn-primary px-8">Open the generator</Link>
          <Link href="/viral-prompts/" className="btn-ghost px-6">Browse viral prompts</Link>
        </div>
        <p className="mt-5 text-sm text-muted">Runs in your browser. Your prompts never leave your device.</p>
      </section>

      <section aria-labelledby="tools">
        <h2 id="tools" className="text-2xl font-semibold text-white">Choose a tool</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((t) => <ToolCard key={t.slug} tool={t} />)}
        </div>
      </section>

      <section aria-labelledby="viral" className="mt-20">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="viral" className="text-2xl font-semibold text-white">Viral AI video prompts</h2>
          <Link href="/viral-prompts/" className="text-sm text-violet-300 hover:text-violet-200">See all {viral.length} prompts</Link>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {viral.filter((_, i) => i % 7 === 0 || i % 7 === 3).slice(0, 6).map((p) => <PromptCard key={p.slug} p={p} />)}
        </div>
      </section>

      <section aria-labelledby="how" className="mt-20">
        <h2 id="how" className="text-2xl font-semibold text-white">How it works</h2>
        <ol className="mt-6 grid gap-4 md:grid-cols-3">
          {[
            ["Describe your idea", "Type a short subject, or press Random to get started."],
            ["Choose your look", "Pick style, camera movement, environment, lighting and your AI video platform."],
            ["Copy and create", "Copy the prompt, or download it as a text file, and paste it into your video tool."],
          ].map(([t, d], i) => (
            <li key={t} className="card p-5">
              <p className="text-sm font-medium text-violet-200">Step {i + 1}</p>
              <p className="mt-1 font-semibold text-white">{t}</p>
              <p className="mt-1.5 text-sm leading-6 text-muted">{d}</p>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="learn" className="mt-20">
        <h2 id="learn" className="text-2xl font-semibold text-white">Learn prompt writing</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {posts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="card block p-5 hover:border-violet-400/50">
              <p className="font-semibold text-white">{p.title}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{p.description}</p>
            </Link>
          ))}
        </div>
      </section>

      <AdSlot />
      <Faq items={faqs} />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "WebSite", name: site.name, url: abs("/"), potentialAction: { "@type": "SearchAction", target: `${site.url}/search/?q={search_term_string}`, "query-input": "required name=search_term_string" } },
            { "@type": "Organization", name: site.name, url: abs("/"), logo: `${site.url}/icon.svg` },
          ],
        }}
      />
    </div>
  );
}
