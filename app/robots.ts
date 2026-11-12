import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Search crawlers: allow discovery and citation in AI search products.
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
      },
      {
        userAgent: "Claude-SearchBot",
        allow: "/",
      },
      // User-initiated fetchers can retrieve public pages when a person asks.
      {
        userAgent: "Claude-User",
        allow: "/",
      },
      {
        userAgent: "Perplexity-User",
        allow: "/",
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
