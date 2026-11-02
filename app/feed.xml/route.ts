import { posts } from "@/lib/posts";
import { viral } from "@/lib/viral";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function GET() {
  const items = [
    ...posts.map((p) => ({ title: p.title, url: abs(`/blog/${p.slug}/`), desc: p.description, date: p.date })),
    ...viral.map((p) => ({ title: `${p.title}: AI video prompt`, url: abs(`/viral-prompts/${p.slug}/`), desc: p.why, date: p.date })),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>
<title>${esc(site.name)}</title><link>${abs("/")}</link><description>${esc(site.tagline)}</description><language>en</language>
<atom:link href="${site.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items.map((i) => `<item><title>${esc(i.title)}</title><link>${i.url}</link><guid>${i.url}</guid><pubDate>${new Date(i.date).toUTCString()}</pubDate><description>${esc(i.desc)}</description></item>`).join("\n")}
</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
