"use client";
import { useEffect, useRef } from "react";

/**
 * Responsive ad slot.
 * - Default: renders nothing (no ads, no empty boxes).
 * - NEXT_PUBLIC_AD_PLACEHOLDERS=true: labelled empty box, for checking layout only.
 * - NEXT_PUBLIC_ADSENSE_ENABLED=true + NEXT_PUBLIC_ADSENSE_CLIENT: renders a real ad unit.
 *   Only turn this on after Google approves your site. The AdSense script itself is added in app/layout.tsx.
 */
const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "";
const enabled = process.env.NEXT_PUBLIC_ADSENSE_ENABLED === "true" && client.length > 0;
const placeholders = process.env.NEXT_PUBLIC_AD_PLACEHOLDERS === "true";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export function AdSlot({ slot, className = "" }: { slot?: string; className?: string }) {
  const pushed = useRef(false);
  useEffect(() => {
    if (!enabled || pushed.current) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blocked or script not ready */
    }
  }, []);

  if (enabled) {
    return (
      <aside aria-label="Advertisement" className={`my-10 min-h-[100px] overflow-hidden ${className}`}>
        <p className="mb-1 text-center text-xs text-muted/70">Advertisement</p>
        <ins className="adsbygoogle block" style={{ display: "block" }} data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
      </aside>
    );
  }
  if (placeholders) {
    return (
      <aside aria-label="Ad placeholder" className={`my-10 flex min-h-[100px] items-center justify-center rounded-xl border border-dashed border-white/15 text-xs text-muted/70 ${className}`}>
        Ad placeholder (responsive)
      </aside>
    );
  }
  return null;
}
