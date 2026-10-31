# CreatorAI Video Prompt Generator

Free AI video prompt generator built with **Next.js 16 (App Router, static export)**, **React 19**, **TypeScript** and **Tailwind CSS v4**.
No paid APIs: all prompts are generated in the browser from curated phrase banks. Deploys free on Cloudflare Pages.

## What's inside

| Route | Purpose |
|---|---|
| `/` | Home, tool grid, guides, FAQ |
| `/ai-video-prompt-generator/` | Main generator (subject, style, camera, environment, lighting, duration, aspect, platform) |
| `/image-to-video-prompt-generator/` | Motion prompts for a still image |
| `/cinematic-camera-movement-generator/` | 15 camera moves with speed and platform formatting |
| `/ai-animation-prompt-generator/` | 2D, anime, 3D, claymation, paper cut-out, pixel art |
| `/ai-video-negative-prompt-generator/` | Short / standard / thorough negative prompts + positive rewrites |
| `/text-to-video-prompt-generator/` | Idea to labeled scene/action/camera/look/audio prompt |
| `/blog/`, `/about/`, `/contact/`, `/privacy-policy/`, `/terms-of-service/`, `/disclaimer/` | Content and AdSense-required pages |

Generator features (all working): multiple variations (1/3/5), copy, download `.txt`, random, examples, clear, reset, history saved in `localStorage` (restore/copy/delete/clear).

SEO: per-page title, description, canonical, Open Graph and Twitter tags; static HTML for every page; `sitemap.xml`; `robots.txt`; JSON-LD (`WebSite`, `Organization`, `WebApplication`, `FAQPage`, `BreadcrumbList`, `Article`); breadcrumbs; internal links between tools and guides.

## Run locally

Requires Node.js 20.9+ (22 recommended, see `.nvmrc`).

```bash
npm install
cp .env.example .env.local     # then edit values
npm run dev                    # http://localhost:3000
```

Check the production build:

```bash
npm run build                  # outputs static site to ./out
npm run preview                # serves ./out locally
```

## Before you go live (important)

1. Set `NEXT_PUBLIC_SITE_URL` to your real URL (affects canonicals, sitemap, Open Graph).
2. Set `NEXT_PUBLIC_CONTACT_EMAIL` to a real inbox. Google AdSense expects working contact details.
3. Review the Privacy Policy, Terms and Disclaimer for your situation (they are general templates, not legal advice).
4. Add more original blog posts in `lib/posts.ts` over time. Original, helpful content is what earns organic traffic and AdSense approval.

## Deploy to Cloudflare Pages (free)

1. Push this folder to a GitHub (or GitLab) repository.
2. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick the repo.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Environment variables (Production):
   - `NODE_VERSION` = `22`
   - `NEXT_PUBLIC_SITE_URL` = `https://your-project.pages.dev` (change later to your custom domain)
   - `NEXT_PUBLIC_CONTACT_EMAIL` = your email
5. **Save and Deploy**. Every `git push` redeploys automatically.

No adapter or Workers runtime is needed because the site is fully static. Security and caching headers come from `public/_headers`.

## Connect a custom domain later

1. Pages project → **Custom domains** → **Set up a custom domain** → enter `yourdomain.com`.
2. If the domain is already on Cloudflare DNS, confirm the DNS record it proposes. Otherwise add the domain to Cloudflare (or create the CNAME it shows at your registrar).
3. Add `www.yourdomain.com` as well and redirect one to the other (Cloudflare Redirect Rules), so only one version is indexed.
4. Update `NEXT_PUBLIC_SITE_URL` to `https://yourdomain.com` and redeploy. This rewrites canonicals, sitemap and Open Graph URLs.
5. In **Google Search Console** add the domain, then submit `https://yourdomain.com/sitemap.xml`.

## Google AdSense

Ads are **off by default**. Nothing from Google is loaded until you enable it.

1. Publish the site with real content, contact details and the legal pages (already included).
2. Apply at <https://adsense.google.com> and wait for approval.
3. After approval, set in Cloudflare env vars and redeploy:
   - `NEXT_PUBLIC_ADSENSE_ENABLED=true`
   - `NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-XXXXXXXXXXXXXXXX`
4. Optionally pass your ad unit ID: `<AdSlot slot="1234567890" />`.
5. Add your seller line to `public/ads.txt`: `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0`
6. If you serve visitors in the EEA, UK or Switzerland, add a Google-certified consent management platform before enabling ads (Google requires this).

`NEXT_PUBLIC_AD_PLACEHOLDERS=true` shows labelled empty boxes so you can check layout; keep it `false` on the live site. Ad slots sit only in page content below the tools, never beside or between generator controls.

## Project structure

```
app/            routes (App Router), sitemap.ts, robots.ts, globals.css
components/     Header, Footer, PromptTool (generator UI), Faq, Breadcrumbs, AdSlot, JsonLd
lib/generator.ts  prompt engine and form configuration for all 6 tools
lib/tools.ts      tool pages: titles, descriptions, content, FAQs
lib/posts.ts      blog posts
public/         og.png, _headers
```

To add a phrase, style or platform, edit `lib/generator.ts`. To add a tool, add an entry to `lib/tools.ts` and a mode in `lib/generator.ts`.
