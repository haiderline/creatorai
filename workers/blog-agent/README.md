# AI Creator Tech Blog Agent

A scheduled Cloudflare Worker that collects AI-industry RSS items, asks Claude to create one sourced article, and commits it to `content/automated-posts.json`. The GitHub commit triggers the existing Cloudflare Pages build.

## Required Worker secrets

Configure these in Cloudflare Worker > Settings > Variables and Secrets:

- `ANTHROPIC_API_KEY` — Anthropic API key (secret).
- `GITHUB_TOKEN` — fine-grained GitHub token (secret), restricted to `haiderline/creatorai` with Contents: Read and write.
- `GITHUB_REPOSITORY` is already set in wrangler.jsonc.

## Deploy

From the repository root:

```sh
cd workers/blog-agent
npm install
npx wrangler login
npx wrangler secret put ANTHROPIC_API_KEY
npx wrangler secret put GITHUB_TOKEN
npx wrangler deploy
```

The cron is 03:00 UTC daily. Check Cloudflare Worker > Logs after the first scheduled run. For a manual test, use the Worker URL with `POST /run` and header `Authorization: Bearer <GITHUB_TOKEN>`. Do not expose that token in a browser or frontend.

## Editorial and safety behavior

- Reads current AI/technology RSS items from the configured publishers.
- Requires at least two article source links that match supplied feed URLs.
- Avoids duplicate slugs, validates required sections, and refuses to publish if source evidence is insufficient.
- Publishes one article per scheduled run by committing the JSON content file to the repository's `main` branch.
- Does not generate images. Featured-image generation can be added after selecting and configuring an image provider.
- A successful GitHub commit starts the existing Cloudflare Pages production deployment.

Review Cloudflare Pages build status and Worker logs during initial rollout. The worker does not modify the existing site design or runtime routes.
