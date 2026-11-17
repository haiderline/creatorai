export function json(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
      "x-content-type-options": "nosniff",
      "referrer-policy": "same-origin",
    },
  });
}

export function isSameOrigin(request: Request, env: { APP_ORIGIN?: string }): boolean {
  const origin = request.headers.get("Origin");
  if (!origin) return false;
  const expected = env.APP_ORIGIN || new URL(request.url).origin;
  try {
    return new URL(origin).origin === new URL(expected).origin;
  } catch {
    return false;
  }
}
