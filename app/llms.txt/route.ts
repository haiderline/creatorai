import { tools } from "@/lib/tools";
import { posts } from "@/lib/posts";
import { cats, viral } from "@/lib/viral";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.tagline}. Free browser-based tools and copy-and-paste prompt examples for AI video platforms. The generators format prompts; they do not render or generate video files.

## About
CreatorAI is a prompt-writing resource for creators working with AI video platforms. Its browser-based generators help structure scene descriptions, subject actions, camera movement, lighting, style and platform-specific details. Prompt examples are written text, not claims of tested or generated video output unless a page explicitly says otherwise.

## Main pages
- [Home](${abs("/")})
- [About CreatorAI](${abs("/about/")})
- [Contact](${abs("/contact/")})
- [Viral AI video prompt library](${abs("/viral-prompts/")})
- [Blog and guides](${abs("/blog/")})

## Free prompt tools
${tools.map((tool) => `- [${tool.name}](${abs(`/${tool.slug}/`)}): ${tool.blurb}`).join("\n")}

## Prompt categories
${cats.map((category) => `- [${category.name}](${abs(`/viral-prompts/category/${category.slug}/`)})`).join("\n")}

## Individual prompt examples
${viral.map((prompt) => `- [${prompt.title}](${abs(`/viral-prompts/${prompt.slug}/`)}): ${prompt.why}`).join("\n")}

## Educational guides
${posts.map((post) => `- [${post.title}](${abs(`/blog/${post.slug}/`)}): ${post.description}`).join("\n")}

## Usage notes
- Prompt pages provide text that visitors can copy and adapt in their chosen AI video platform.
- Platform features, prompt controls and output quality can change; check the relevant platform for current capabilities.
- The sitemap at ${site.url}/sitemap.xml is the canonical machine-readable URL inventory.
- This file is a supplementary content index. It does not replace crawlable page links, the XML sitemap or search-engine indexing requirements.
`;
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
