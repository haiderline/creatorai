import { requireUser } from "../../_lib/auth";
import { isSameOrigin, json } from "../../_lib/http";
import type { D1PreparedStatement, PagesContext } from "../../_lib/types";

const CAMPAIGN_COST = 5;
const MAX_BODY_BYTES = 12_000;
const allowedObjectives = new Set(["awareness", "traffic", "leads", "sales"]);
const allowedPlatforms = new Set(["TikTok", "Instagram Reels", "YouTube Shorts", "Facebook/Instagram Ads"]);
const allowedStyles = new Set(["UGC", "Cinematic product commercial", "Lifestyle", "Demo/explainer"]);
const allowedModels = new Set(["Kling", "Runway", "Veo", "Sora", "Seedance", "Model-neutral"]);

type Brief = {
  productName: string;
  description: string;
  audience: string;
  objective: string;
  platform: string;
  duration: number;
  style: string;
  videoModel: string;
  callToAction: string;
  keyBenefit?: string;
  brandVoice?: string;
  notes?: string;
};

function clean(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function validateBrief(raw: unknown): Brief | null {
  if (!raw || typeof raw !== "object") return null;
  const x = raw as Record<string, unknown>;
  const brief: Brief = {
    productName: clean(x.productName, 100),
    description: clean(x.description, 1200),
    audience: clean(x.audience, 300),
    objective: clean(x.objective, 30),
    platform: clean(x.platform, 40),
    duration: Number(x.duration),
    style: clean(x.style, 50),
    videoModel: clean(x.videoModel, 30),
    callToAction: clean(x.callToAction, 180),
    keyBenefit: clean(x.keyBenefit, 300),
    brandVoice: clean(x.brandVoice, 100),
    notes: clean(x.notes, 500),
  };
  if (!brief.productName || !brief.description || !brief.audience || !brief.callToAction) return null;
  if (!allowedObjectives.has(brief.objective) || !allowedPlatforms.has(brief.platform)) return null;
  if (![15, 30].includes(brief.duration) || !allowedStyles.has(brief.style) || !allowedModels.has(brief.videoModel)) return null;
  return brief;
}

async function reserveCredits(db: NonNullable<PagesContext["env"]["DB"]>, userId: string, generationId: string) {
  const statements: D1PreparedStatement[] = [
    db.prepare("INSERT OR IGNORE INTO credit_accounts (user_id, balance, updated_at) VALUES (?, 0, datetime('now'))").bind(userId),
    db.prepare("UPDATE credit_accounts SET balance = balance - ?, updated_at = datetime('now') WHERE user_id = ? AND balance >= ?")
      .bind(CAMPAIGN_COST, userId, CAMPAIGN_COST),
    db.prepare(`INSERT INTO credit_ledger (id, user_id, delta, reason, reference_id, created_at)
      SELECT ?, ?, ?, 'ad_campaign_generation', ?, datetime('now') WHERE changes() = 1`)
      .bind(crypto.randomUUID(), userId, -CAMPAIGN_COST, generationId),
  ];
  const results = await db.batch(statements);
  return (results[1]?.meta?.changes ?? 0) === 1;
}

async function refundCredits(db: NonNullable<PagesContext["env"]["DB"]>, userId: string, generationId: string) {
  await db.batch([
    db.prepare(`INSERT INTO credit_ledger (id, user_id, delta, reason, reference_id, created_at)
      SELECT ?, ?, ?, 'generation_failed_refund', ?, datetime('now')
      WHERE NOT EXISTS (SELECT 1 FROM credit_ledger WHERE user_id = ? AND reason = 'generation_failed_refund' AND reference_id = ?)`)
      .bind(crypto.randomUUID(), userId, CAMPAIGN_COST, generationId, userId, generationId),
    db.prepare("UPDATE credit_accounts SET balance = balance + ?, updated_at = datetime('now') WHERE user_id = ? AND changes() = 1")
      .bind(CAMPAIGN_COST, userId),
  ]);
}

function extractOutput(payload: any): string {
  if (typeof payload?.output_text === "string") return payload.output_text;
  const parts: string[] = [];
  for (const item of payload?.output ?? []) {
    for (const content of item?.content ?? []) {
      if (content?.type === "output_text" && typeof content.text === "string") parts.push(content.text);
    }
  }
  return parts.join("\n");
}

export const onRequest = async ({ request, env }: PagesContext): Promise<Response> => {
  if (request.method !== "POST") return json({ error: "Method not allowed." }, 405);
  if (!isSameOrigin(request, env)) return json({ error: "Origin not allowed." }, 403);
  const user = await requireUser(request, env);
  if (!user) return json({ error: "Please sign in to generate an ad campaign." }, 401);
  if (!env.DB || !env.OPENAI_API_KEY) return json({ error: "Ad Studio is not configured yet." }, 503);

  const declaredLength = Number(request.headers.get("Content-Length") || 0);
  if (declaredLength > MAX_BODY_BYTES) return json({ error: "Request is too large." }, 413);

  let body: unknown;
  try { body = await request.json(); } catch { return json({ error: "Invalid JSON request." }, 400); }
  const brief = validateBrief(body);
  if (!brief) return json({ error: "Please complete all required fields using the available options." }, 400);

  const idempotencyKey = request.headers.get("Idempotency-Key") || "";
  if (!/^[a-zA-Z0-9_-]{16,80}$/.test(idempotencyKey)) {
    return json({ error: "A valid Idempotency-Key header is required." }, 400);
  }
  const existing = await env.DB.prepare(
    "SELECT id, status, output_json, credits_charged FROM generations WHERE user_id = ? AND idempotency_key = ?"
  ).bind(user.id, idempotencyKey).first<{ id: string; status: string; output_json: string | null; credits_charged: number }>();
  if (existing?.status === "completed" && existing.output_json) {
    const account = await env.DB.prepare("SELECT balance FROM credit_accounts WHERE user_id = ?").bind(user.id).first<{ balance: number }>();
    return json({ generationId: existing.id, creditsCharged: 0, creditsRemaining: account?.balance ?? 0, result: JSON.parse(existing.output_json), replayed: true });
  }
  if (existing) return json({ error: "This generation request is already being processed or has failed. Start a new request." }, 409);

  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS total FROM generations WHERE user_id = ? AND created_at >= datetime('now', '-1 day')"
  ).bind(user.id).first<{ total: number }>();
  if ((recent?.total ?? 0) >= 10) return json({ error: "Daily generation limit reached. Please try again tomorrow." }, 429);

  const generationId = crypto.randomUUID();
  try {
    await env.DB.prepare(
      "INSERT INTO generations (id, user_id, idempotency_key, input_json, status, credits_charged, created_at) VALUES (?, ?, ?, ?, 'processing', ?, datetime('now'))"
    ).bind(generationId, user.id, idempotencyKey, JSON.stringify(brief), CAMPAIGN_COST).run();
  } catch {
    return json({ error: "This generation request has already been submitted. Check your campaign history before retrying." }, 409);
  }

  const reserved = await reserveCredits(env.DB, user.id, generationId);
  if (!reserved) {
    await env.DB.prepare("UPDATE generations SET status = 'failed', credits_charged = 0 WHERE id = ? AND user_id = ?")
      .bind(generationId, user.id).run();
    const account = await env.DB.prepare("SELECT balance FROM credit_accounts WHERE user_id = ?").bind(user.id).first<{ balance: number }>();
    return json({ error: "Not enough credits.", credits: account?.balance ?? 0, required: CAMPAIGN_COST }, 402);
  }

  try {
    const prompt = [
      "You are CreatorAI Ad Studio, an expert short-form video advertising creative strategist.",
      "Create an accurate, production-ready ad campaign package from the brief below.",
      "Return ONLY valid JSON with keys: creativeAngles (array of 3 objects with title, rationale, hook), recommendedConcept, script (array of timed scene/voiceover/onScreenText objects), storyboard (array of 4 to 6 objects with time, visualAction, shot, cameraMovement, lighting, transition, videoPrompt), voiceover, caption, callToAction, hashtags (array), productionChecklist (array).",
      "Do not invent product features, certifications, prices, statistics, testimonials, guarantees or performance claims. If information is missing, use cautious wording or mark it for user confirmation.",
      "Make prompts specific to the selected video model, but do not claim guaranteed compatibility or generate a finished video.",
      "The total script must fit the requested duration. Keep text concise and practical.",
      "Campaign brief: " + JSON.stringify(brief),
    ].join("\n\n");

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: { "Authorization": `Bearer ${env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: env.OPENAI_MODEL || "gpt-6-astra",
        input: prompt,
        text: { format: { type: "json_object" } },
        max_output_tokens: 5000,
        store: false,
      }),
    });

    if (!response.ok) throw new Error(`OpenAI request failed with status ${response.status}`);
    const apiResult = await response.json();
    const outputText = extractOutput(apiResult);
    const output = JSON.parse(outputText);
    await env.DB.prepare(
      "UPDATE generations SET output_json = ?, status = 'completed' WHERE id = ? AND user_id = ?"
    ).bind(JSON.stringify(output), generationId, user.id).run();

    const account = await env.DB.prepare("SELECT balance FROM credit_accounts WHERE user_id = ?").bind(user.id).first<{ balance: number }>();
    return json({ generationId, creditsCharged: CAMPAIGN_COST, creditsRemaining: account?.balance ?? 0, result: output });
  } catch {
    await env.DB.prepare("UPDATE generations SET status = 'failed' WHERE id = ? AND user_id = ?").bind(generationId, user.id).run();
    await refundCredits(env.DB, user.id, generationId);
    return json({ error: "Generation failed. Your credits have been returned. Please try again." }, 502);
  }
};

