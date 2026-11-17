# CreatorAI Ad Studio backend — setup checklist

This repository now contains a **backend foundation**, not a live payment product. The public site remains a Next.js static export. Server-only operations live in Cloudflare Pages Functions under `functions/`.

## Implemented in this commit

- `GET /api/me`: validates a Supabase access token server-side and returns the signed-in user and D1 credit balance.
- `POST /api/ad-studio/generate`: validates the brief, checks the signed-in user, reserves five credits, calls OpenAI Responses API, stores the result and refunds credits if generation fails.
- D1 migration for credit accounts, an auditable credit ledger and generation history.
- No API key, Supabase service-role key or payment secret is exposed in browser code.

## Required external setup before these endpoints can work

### 1. Supabase Auth (Google + email/password)

Create a Supabase project. In Authentication > Providers:
- Enable Email (password) and configure email confirmation.
- Enable Google OAuth and add the Google OAuth client credentials.
- Configure the production callback URL and allowed redirect URLs for `https://aicreatortech.com`.
- Copy the Project URL and the publishable/anon key.

Cloudflare Pages project > Settings > Environment variables:
- `SUPABASE_URL` — Supabase project URL (not NEXT_PUBLIC).
- `SUPABASE_ANON_KEY` — publishable/anon key (server environment variable).

The frontend login/signup UI and Google OAuth redirect flow are not included yet.

### 2. Cloudflare D1

Create a D1 database, for example `creatorai-adstudio`, then run the migration:

```bash
npx wrangler d1 create creatorai-adstudio
npx wrangler d1 execute creatorai-adstudio --remote --file=migrations/0001_ad_studio.sql
```

In Cloudflare Pages > creatorai > Settings > Bindings, add a D1 database binding:
- Variable name: `DB`
- Database: the D1 database you created

Redeploy after adding the binding. Preview and production bindings must be configured separately if you test preview deployments.

### 3. OpenAI API

Create an API key and add these Cloudflare Pages environment variables:
- `OPENAI_API_KEY` — secret; never use a NEXT_PUBLIC_ prefix.
- `OPENAI_MODEL` — optional model name enabled for your API project. The current code defaults to `gpt-6-astra`; set this to a model actually available to your API account if different.

OpenAI API usage is billed separately from ChatGPT subscriptions. Set a usage budget and monitor usage before public launch.

### 4. Application origin

Set `APP_ORIGIN=https://aicreatortech.com` in Cloudflare Pages production variables. For preview deployments, set the matching preview origin or leave the variable unset so the request origin is used.

## Important launch blockers

- New accounts start with **zero credits**. No top-up endpoint or Paddle webhook exists yet.
- No checkout endpoint exists. Do not accept payment or manually trust a browser-supplied credit balance.
- Paddle seller account must be approved and payout eligibility confirmed before enabling live checkout.
- Frontend authentication screens, credit purchase UI, transaction history UI, account recovery, privacy/terms review, and rate limiting/abuse monitoring still need implementation.
- The generation endpoint is intended for authenticated users only. Add a proper rate-limit control (Cloudflare rate limiting or a D1/KV-backed limiter) before beta.
- Review the D1 migration and test debit/refund behavior in a non-production database before adding real customer funds.

## Security model

- Supabase Auth validates access tokens through its Auth user endpoint on every request.
- The API checks same-origin requests and validates all brief fields server-side.
- Credits are debited server-side; client input cannot set a balance.
- D1 batch operations are used for the balance update and ledger write.
- Generation requests require a caller-supplied idempotency key; completed replays return the saved result without charging again.
- Refund ledger insertion is performed before the matching balance credit in a guarded batch, so duplicate refunds do not inflate the wallet.
- Failed generation refunds are guarded by a unique refund ledger index.
- OpenAI credentials are read only from Cloudflare environment secrets.
- Never add secrets to GitHub, source files, NEXT_PUBLIC variables, logs or client bundles.

## Next implementation steps

1. Configure Supabase and D1; verify `GET /api/me` returns 401 when signed out and zero credits for a new signed-in account.
2. Add sign-in/sign-up UI and connect Google + email/password.
3. Add account and campaign history UI.
4. Complete idempotent credit purchase webhooks after Paddle approval.
5. Add admin-controlled test-credit grants for private beta, with audit logging.
6. Add request throttling, monitoring, and end-to-end tests before public launch.
