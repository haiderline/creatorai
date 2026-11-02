import { tools } from "./tools";
import { posts } from "./posts";
import { viral, cats } from "./viral";
import type { Doc } from "./search";

const pages: [string, string, string, string][] = [
  ["About", "/about/", "Who we are and how the free prompt tools work.", "about us team mission"],
  ["Contact", "/contact/", "Email us with feedback, bug reports or partnership questions.", "contact email support feedback"],
  ["Privacy Policy", "/privacy-policy/", "How data, local storage, cookies and ads are handled.", "privacy cookies data adsense"],
  ["Terms of Service", "/terms-of-service/", "Terms for using the site and its tools.", "terms conditions legal"],
  ["Disclaimer", "/disclaimer/", "No affiliation with AI platforms and no guaranteed results.", "disclaimer legal"],
  ["Link to Us", "/link-to-us/", "Badges and HTML snippets to link or cite CreatorAI.", "backlink badge embed share cite"],
];

export const docs: Doc[] = [
  ...tools.map((t) => ({ id: t.slug, title: t.name, desc: t.description, text: [t.intro, ...t.tips, ...t.steps].join(" "), tags: ["tool", "generator", t.mode], url: `/${t.slug}/`, type: "Tool" })),
  ...viral.map((p) => ({ id: p.slug, title: p.title, desc: p.why, text: p.prompt, tags: [...p.tags, p.category, "viral prompt"], url: `/viral-prompts/${p.slug}/`, type: "Viral prompt" })),
  ...cats.map((c) => ({ id: c.slug, title: `${c.name} prompts`, desc: c.intro, text: c.tips.join(" "), tags: ["category", c.name], url: `/viral-prompts/category/${c.slug}/`, type: "Category" })),
  ...posts.map((p) => ({ id: p.slug, title: p.title, desc: p.description, text: p.sections.map((s) => `${s.h} ${s.p.join(" ")}`).join(" "), tags: ["guide", "blog"], url: `/blog/${p.slug}/`, type: "Guide" })),
  { id: "viral-all", title: "Viral AI video prompts", desc: "Browse and copy viral-style prompts for Kling, Runway, Veo, Sora and Seedance.", text: "library collection trending", tags: ["viral", "library"], url: "/viral-prompts/", type: "Page" },
  ...pages.map(([title, url, desc, tags]) => ({ id: url, title, desc, text: "", tags: tags.split(" "), url, type: "Page" })),
];
