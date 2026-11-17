import { requireUser } from "../_lib/auth";
import { json } from "../_lib/http";
import type { PagesContext } from "../_lib/types";

export const onRequest = async ({ request, env }: PagesContext): Promise<Response> => {
  if (request.method !== "GET") return json({ error: "Method not allowed." }, 405);
  const user = await requireUser(request, env);
  if (!user) return json({ error: "Sign in to access your CreatorAI account." }, 401);
  if (!env.DB) return json({ error: "Account services are being configured. Please try again later." }, 503);

  await env.DB.prepare(
    "INSERT OR IGNORE INTO credit_accounts (user_id, balance, updated_at) VALUES (?, 0, datetime('now'))"
  ).bind(user.id).run();

  const account = await env.DB.prepare(
    "SELECT balance FROM credit_accounts WHERE user_id = ?"
  ).bind(user.id).first<{ balance: number }>();

  return json({ user: { id: user.id, email: user.email ?? null }, credits: account?.balance ?? 0 });
};
