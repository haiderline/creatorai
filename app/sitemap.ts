import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { posts } from "@/lib/posts";
import { abs } from "@/lib/site";
import { viral, cats } from "@/lib/viral";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  // The content model currently has publication dates, not reliable
  // last-modified timestamps. Omit lastModified rather than publishing
  // misleading dates that imply unchanged pages were recently updated.
  return [
    { url: abs("/"), changeFrequency: "weekly", priority: 1 },
    ...tools.map((tool) => ({
      url: abs(`/${tool.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.9,
    })),
    { url: abs("/viral-prompts/"), changeFrequency: "weekly", priority: 0.9 },
    ...cats.map((category) => ({
      url: abs(`/viral-prompts/category/${category.slug}/`),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...viral.map((prompt) => ({
      url: abs(`/viral-prompts/${prompt.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: abs("/blog/"), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: abs(`/blog/${post.slug}/`),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...["about", "contact", "link-to-us", "privacy-policy", "terms-of-service", "disclaimer"].map((slug) => ({
      url: abs(`/${slug}/`),
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })),
  ];
}
