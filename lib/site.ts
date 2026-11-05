export const site = {
  name: "CreatorAI Video Prompt Generator",
  short: "CreatorAI",
  tagline: "Free AI video prompts for Kling, Runway, Veo, Sora and Seedance",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://aicreatortech.com").replace(/\/$/, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "haideraliline123@gmail.com",
  updated: "October 31, 2026",
  adsense: {
    client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
    enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true",
    placeholders: process.env.NEXT_PUBLIC_AD_PLACEHOLDERS === "true",
  },
};

/** Absolute URL with a trailing slash (matches `trailingSlash: true`). */
export function abs(path: string): string {
  const p = path === "/" ? "/" : path.endsWith("/") ? path : `${path}/`;
  return site.url + p;
}
