import type { Metadata } from "next";
import { abs, site } from "./site";

export function pageMeta(o: { path: string; title: string; description: string; type?: "website" | "article" }): Metadata {
  const url = abs(o.path);
  return {
    title: o.title,
    description: o.description,
    alternates: { canonical: url, types: { "application/rss+xml": "/feed.xml" } },
    openGraph: {
      title: `${o.title} | ${site.short}`,
      description: o.description,
      url,
      siteName: site.name,
      type: o.type ?? "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: `${o.title} | ${site.short}`, description: o.description, images: ["/og.png"] },
  };
}
