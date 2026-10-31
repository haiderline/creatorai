import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { posts } from "@/lib/posts";
import { abs } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: abs("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...tools.map((t) => ({ url: abs(`/${t.slug}/`), lastModified: now, changeFrequency: "monthly" as const, priority: 0.9 })),
    { url: abs("/blog/"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((p) => ({ url: abs(`/blog/${p.slug}/`), lastModified: new Date(p.date), changeFrequency: "monthly" as const, priority: 0.6 })),
    ...["about", "contact", "privacy-policy", "terms-of-service", "disclaimer"].map((s) => ({
      url: abs(`/${s}/`), lastModified: now, changeFrequency: "yearly" as const, priority: 0.3,
    })),
  ];
}
