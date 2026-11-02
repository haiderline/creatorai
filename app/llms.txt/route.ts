import { tools } from "@/lib/tools";
import { cats } from "@/lib/viral";
import { abs, site } from "@/lib/site";

export const dynamic = "force-static";

export function GET() {
  const body = `# ${site.name}

> ${site.tagline}. Free browser-based tools and a library of copy-and-paste prompts for AI video platforms. No sign-up.

## Tools
${tools.map((t) => `- [${t.name}](${abs(`/${t.slug}/`)}): ${t.blurb}`).join("\n")}

## Prompt library
- [Viral AI video prompts](${abs("/viral-prompts/")}): curated prompts for Kling, Runway, Veo, Sora and Seedance
${cats.map((c) => `- [${c.name}](${abs(`/viral-prompts/category/${c.slug}/`)})`).join("\n")}

## Guides
- [Blog](${abs("/blog/")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
