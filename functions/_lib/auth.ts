import type { AuthUser, Env } from "./types";

export async function requireUser(request: Request, env: Env): Promise<AuthUser | null> {
  const authorization = request.headers.get("Authorization") || "";
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  if (!match || !env.SUPABASE_URL || !env.SUPABASE_ANON_KEY) return null;

  try {
    const response = await fetch(`${env.SUPABASE_URL.replace(/\/$/, "")}/auth/v1/user`, {
      headers: {
        apikey: env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${match[1]}`,
      },
    });
    if (!response.ok) return null;
    const user = await response.json() as { id?: string; email?: string };
    if (!user.id) return null;
    return { id: user.id, email: user.email };
  } catch {
    return null;
  }
}
