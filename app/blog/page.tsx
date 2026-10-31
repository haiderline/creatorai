import Link from "next/link";
import { posts } from "@/lib/posts";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { AdSlot } from "@/components/AdSlot";

export const metadata = pageMeta({
  path: "/blog/",
  title: "AI Video Prompt Guides and Tutorials",
  description: "Practical guides on writing AI video prompts, camera movement terms, and choosing between text-to-video and image-to-video.",
});

export default function BlogIndex() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: "Blog", href: "/blog/" }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">Blog</h1>
      <p className="mt-3 text-muted">Short, practical guides for AI video creators.</p>
      <ul className="mt-8 space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}/`} className="card block p-5 hover:border-violet-400/50">
              <h2 className="text-lg font-semibold text-white">{p.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted">{p.description}</p>
              <p className="mt-3 text-xs text-muted/80">{new Date(p.date).toLocaleDateString("en-US", { dateStyle: "long", timeZone: "UTC" })} · {p.readMinutes} min read</p>
            </Link>
          </li>
        ))}
      </ul>
      <AdSlot />
    </div>
  );
}
