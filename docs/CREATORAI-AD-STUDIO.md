# CreatorAI Ad Studio — Product Specification

**Status:** Product plan / pre-build specification  
**Repository:** haiderline/creatorai  
**Product route:** /ad-studio/  
**Primary model:** prepaid credits (one-time purchases)  
**Audience:** independent creators, small businesses, ecommerce teams and marketing agencies

## 1. Product positioning

CreatorAI Ad Studio turns a product or service brief into a ready-to-produce short-form video advertising package. It generates creative strategy and production instructions; it does **not** render or export a finished video in the MVP.

**Promise:** From product brief to a structured video ad plan, with platform-ready prompts for the user's chosen AI video generator.

The free prompt tools remain free. Ad Studio is a separate paid workflow that saves customers time by producing a complete campaign package rather than one standalone prompt.

## 2. Target users and jobs to be done

### Individual creators
- Need scroll-stopping hooks and short video concepts.
- Need scene-by-scene prompts for Reels, TikTok and YouTube Shorts.
- Need voiceover, on-screen copy and captions in one workflow.
- Often work with limited production budgets.

### Businesses and agencies
- Need repeatable product/service ad concepts.
- Need several creative angles for testing.
- Need a clear CTA and platform-specific formats.
- Need exports they can hand to an editor or AI video operator.

## 3. MVP input form

Required:
- Product/service name
- Short product or service description (do not require a URL in v1)
- Target audience
- Campaign objective (awareness, traffic, leads, sales)
- Destination platform (TikTok, Instagram Reels, YouTube Shorts, Facebook/Instagram Ads)
- Video duration (15 or 30 seconds)
- Visual direction (UGC, cinematic product commercial, lifestyle, demo/explainer)
- AI video model (Kling, Runway, Veo, Sora, Seedance, or model-neutral)
- Call to action

Optional:
- Key benefit / differentiator
- Offer or price
- Brand voice
- Must-include / must-avoid notes

Do not fetch arbitrary user-provided URLs in v1. If website import is added later, use a hardened server-side fetcher with SSRF protections, timeouts, content limits and domain/IP validation.

## 4. MVP output package

One paid campaign generation returns:
1. Three distinct creative angles with a short rationale.
2. One recommended concept and opening hook.
3. A 15- or 30-second script with timing.
4. A storyboard of 4–6 scenes (time range, visual action, shot size, camera movement, lighting and transition).
5. A separate ready-to-paste video prompt for each scene, formatted for the selected model.
6. Voiceover script and optional on-screen text.
7. Caption, CTA and a small set of relevant hashtags.
8. A concise production checklist and export as Markdown / TXT.

**Disclosure:** outputs are AI-generated creative suggestions. The service does not guarantee views, conversions, model compatibility or a finished video. Users must review claims, prices, product facts, rights and platform ad policies before publishing.

## 5. Credit model and launch pricing hypothesis

Credits are prepaid and do not auto-renew in the MVP. Proposed launch bundles:

| Bundle | Price | Credits | Approx. campaigns* |
|---|---:|---:|---:|
| Starter | $5 | 10 | 2 |
| Creator | $12 | 30 | 6 |
| Studio | $29 | 100 | 20 |

*Assumes one complete campaign costs 5 credits. Actual consumption and pricing must be calibrated after measuring model/API costs, payment fees, refunds and support time.

### Credit rules
- Full campaign package: 5 credits.
- Regenerate one scene prompt: 1 credit.
- Rewrite hook, CTA or voiceover: 1 credit each.
- Copying, viewing and downloading an existing result: free.
- Show the credit cost before every paid generation.
- Never charge twice for a retried request with the same idempotency key.
- Refund credits automatically if generation fails before a usable result is saved.
- No negative balances; no client-side authority over balances.
- Purchased credits are non-transferable. Expiry/refund policy must be clearly disclosed and reviewed before launch.

Do not advertise the estimated campaign count as guaranteed until usage and costs have been load-tested.

## 6. Proposed user journey

1. Visitor opens Ad Studio and reviews sample output and pricing.
2. User signs in / creates an account.
3. User chooses a credit bundle and completes hosted checkout.
4. Verified payment webhook records the transaction and credits the account.
5. User submits the ad brief; server checks authentication and available credits.
6. Server reserves/deducts credits atomically, calls the text-generation provider and stores the result.
7. On success, user sees the package, can regenerate individual sections, copy or download.
8. User can see balance and a simple transaction / generation history.

No video-generation API is included in v1. The customer uses the resulting prompts in their own video platform.

## 7. MVP scope

### Must ship
- Responsive Ad Studio landing page and clear examples.
- Account authentication.
- Credit wallet and immutable credit ledger.
- One-time credit bundle checkout.
- Verified payment webhook with signature validation and idempotency.
- Ad brief form with server-side validation.
- Structured AI generation with bounded output length and rate limits.
- Campaign result page, copy and Markdown/TXT export.
- Generation history and current balance.
- Failed-generation credit refund.
- Privacy, terms, refund policy and AI-output disclosure.
- Admin visibility into orders, credit adjustments and generation failures.

### Explicitly out of scope for v1
- Rendering finished videos or hosting generated media.
- Automatic publishing to social platforms.
- Team seats / agency workspaces.
- Monthly subscriptions or auto-renewal.
- Arbitrary URL scraping / website import.
- Image upload, voice cloning or custom brand asset training.
- Unlimited generation plans.

## 8. Technical architecture for the existing project

The current site is Next.js App Router with output: export, deployed as static assets on Cloudflare Pages. Static export cannot safely host Next.js server route handlers, server actions, private API keys, payment webhook processing or a trusted credit wallet.

Keep the current public site and SEO pages static. Add a separate Cloudflare Pages Functions API under the repository's root functions/ directory (or a separately deployed Worker if deployment constraints require it). Never put secret keys in NEXT_PUBLIC_* variables or browser JavaScript.

### Proposed services
- **Frontend:** existing Next.js static export and Cloudflare Pages.
- **API:** Cloudflare Pages Functions / Worker.
- **Database:** Cloudflare D1 for users' credit ledger, orders, generation jobs and saved outputs; use atomic SQL transactions / conditional updates for balance changes.
- **Authentication:** choose and configure a supported hosted auth provider before coding. Validate signed sessions on every API request; never trust a user ID supplied by the browser.
- **Payments:** Paddle hosted checkout, subject to seller account approval and payout verification for the operator's country.
- **AI:** server-side text-generation API provider selected after cost, quality, data handling and output-format evaluation.
- **Secrets:** Cloudflare Pages/Worker encrypted environment secrets only.
- **Observability:** request IDs, webhook event IDs, provider latency, token usage, generation outcome and credit-ledger audit trail. Do not log customer secrets or unnecessary personal data.

### Suggested API surface
- POST /api/billing/checkout — create a hosted checkout for a server-defined bundle.
- POST /api/billing/webhook — verify payment-provider signature; process each event once.
- GET /api/me — return authenticated user and credit balance.
- GET /api/credits/ledger — paginated credit history.
- POST /api/ad-studio/generate — validate brief, reserve credits, generate and persist output.
- POST /api/ad-studio/regenerate — regenerate one allowed section with a 1-credit charge.
- GET /api/ad-studio/history — list the authenticated user's saved campaigns.

### Minimum data model
- users: auth subject, email, created_at.
- credit_accounts: user_id, balance, updated_at.
- credit_ledger: id, user_id, delta, reason, order_id, generation_id, idempotency_key, created_at.
- orders: provider, provider_transaction_id (unique), user_id, bundle_id, amount, currency, status, created_at.
- generations: id, user_id, input_json, output_json, model, status, credits_charged, provider_usage, created_at.
- webhook_events: provider_event_id (unique), received_at, processed_at, status.

Treat the ledger as the audit source. A balance is a cached total and must only change in the same atomic operation as a ledger entry.

## 9. Payment provider decision

**First candidate: Paddle**, using hosted checkout and webhooks. Paddle's current documentation lists countries it cannot support; Pakistan is not on the published unsupported-country list, but this is not a promise of individual seller approval. Apply and verify identity, business details and payout eligibility before building the live checkout. Keep the payment layer provider-agnostic so another approved provider can be substituted.

**Do not build on Lemon Squeezy for a new store.** Its official notice says new sign-ups closed on 16 November 2026 and transaction processing ends on 31 March 2027. This makes it unsuitable for a new long-term integration.

References:
- Paddle seller country eligibility: https://www.paddle.com/help/start/account-verification/which-countries-are-supported
- Paddle supported countries / sales API: https://developer.paddle.com/concepts/sell/supported-countries-locales/
- Lemon Squeezy wind-down notice: https://docs.lemonsqueezy.com/migration

Payment provider approval, fees, payout availability and tax treatment must be confirmed in the merchant's own account before launch.

## 10. Build sequence and acceptance criteria

### Phase 0 — decisions and access
- Obtain approval for payment provider and payout method.
- Choose authentication and AI providers.
- Create Cloudflare D1 database and secrets.
- Confirm production domain, privacy terms and refund policy.
**Gate:** no live payments until seller account and payout are approved.

### Phase 1 — safe foundation
- Create D1 schema and migrations.
- Implement authentication verification.
- Implement credit ledger and atomic debit/refund functions.
- Add webhook signature verification and idempotency.
**Acceptance:** forged webhook rejected; replayed webhook adds credits once; users cannot read or change another user's balance; failed generation restores credits exactly once.

### Phase 2 — Ad Studio generation
- Build brief form and server-side schema validation.
- Add structured text generation and output parsing.
- Save results and support section-level regeneration.
- Add per-user rate limits and output-size caps.
**Acceptance:** valid request produces all required sections; invalid/oversized requests are rejected; cost is shown before generation; failed requests refund credits.

### Phase 3 — checkout and customer experience
- Add hosted credit bundle checkout.
- Connect webhook to ledger.
- Add account balance, history, exports and receipts.
- Run sandbox end-to-end purchase tests.
**Acceptance:** sandbox purchase credits the correct account once; refunds/reversals are reconciled; no secrets appear in client bundle.

### Phase 4 — controlled launch
- Invite 10–20 beta users.
- Measure cost per campaign, completion rate, repeat usage, refund rate and bundle conversion.
- Adjust credit pricing based on real unit economics.
- Open public purchase only after support and monitoring are ready.

## 11. Launch metrics

Track:
- Visitor → sign-up conversion.
- Sign-up → first campaign conversion.
- First campaign → first purchase conversion.
- Credits purchased and consumed per user.
- AI cost per campaign and gross margin after payment fees.
- Generation failure and refund rates.
- Repeat purchase rate and support/refund requests.

## 12. Security and launch checklist

- [ ] Payment seller account and payouts approved.
- [ ] Webhook signature verified against raw request body.
- [ ] Unique provider transaction and event IDs enforced.
- [ ] Credit debits and ledger writes are atomic and idempotent.
- [ ] Authentication and ownership enforced server-side.
- [ ] AI provider keys remain server-side.
- [ ] Rate limits, input validation and output limits enabled.
- [ ] Privacy, terms, refund and AI disclosure pages reviewed.
- [ ] Test checkout, duplicate webhook, refund, failure and abuse cases.
- [ ] Existing Google Analytics, AdSense, Microsoft Clarity, Search Console verification and public free generators remain unchanged.

---
This document is a product and engineering plan, not a statement that checkout, accounts, credit balances or AI generation are already live.
