import type { CSSProperties } from "react";
import type { ViralPrompt } from "@/lib/viral";

const palettes: Record<string, [string, string, string]> = {
  "Product Ads": ["#10172f", "#6c5ce7", "#d9f2ff"],
  "Food and ASMR": ["#321b24", "#f59e0b", "#ffe8bd"],
  "Nature and Animals": ["#102b2b", "#34d399", "#d1fae5"],
  "Fantasy and Sci-Fi": ["#24143d", "#a78bfa", "#f0abfc"],
  "Cinematic and Action": ["#2a1720", "#fb7185", "#fed7aa"],
  "Lifestyle and Social": ["#1d2440", "#60a5fa", "#fbcfe8"],
};

export function PromptArtwork({ p, className = "" }: { p: ViralPrompt; className?: string }) {
  const [base, accent, glow] = palettes[p.category] ?? palettes["Fantasy and Sci-Fi"];
  const id = p.slug.replace(/[^a-z0-9]/g, "");
  let seed = 0;
  for (let i = 0; i < p.slug.length; i++) seed = (seed * 31 + p.slug.charCodeAt(i)) >>> 0;
  const x = 88 + (seed % 105);
  const y = 62 + ((seed >>> 5) % 70);
  const tilt = seed % 30 - 15;
  const style: CSSProperties = { background: `linear-gradient(135deg, ${base}, #080b17)` };
  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`} style={style}>
      <svg viewBox="0 0 640 360" role="img" aria-label={`Illustrated artwork for ${p.title}`} className="block h-full w-full">
        <defs>
          <linearGradient id={`bg-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={base} /><stop offset="100%" stopColor="#090d1b" />
          </linearGradient>
          <radialGradient id={`glow-${id}`}>
            <stop offset="0%" stopColor={glow} stopOpacity=".9" /><stop offset="100%" stopColor={accent} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`object-${id}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={glow} /><stop offset="100%" stopColor={accent} />
          </linearGradient>
        </defs>
        <rect width="640" height="360" fill={`url(#bg-${id})`} />
        <circle cx={x + 80} cy={y + 15} r="170" fill={`url(#glow-${id})`} opacity=".75" />
        <path d="M0 285 Q150 230 300 290 T640 260 V360 H0Z" fill="#050816" opacity=".7" />
        <g opacity=".35" fill="none" stroke={glow} strokeWidth="1.5">
          <circle cx="500" cy="70" r="38" /><circle cx="500" cy="70" r="58" /><path d="M40 80 H220 M420 300 H600" />
        </g>
        <g transform={`translate(${x} ${y}) rotate(${tilt})`}>
          <ellipse cx="0" cy="125" rx="118" ry="17" fill="#02040b" opacity=".55" />
          <rect x="-90" y="-55" width="180" height="155" rx="30" fill={`url(#object-${id})`} opacity=".94" />
          <rect x="-72" y="-38" width="144" height="120" rx="22" fill="#10182c" opacity=".7" />
          <path d="M-52 25 Q-10 -42 50 10 Q15 70 -52 25Z" fill={glow} opacity=".88" />
          <circle cx="45" cy="-18" r="13" fill="#fff" opacity=".8" />
          <path d="M-120 -82 Q0 -145 125 -78" fill="none" stroke={glow} strokeWidth="5" strokeLinecap="round" opacity=".75" />
        </g>
        <g fill={glow} opacity=".8">
          <circle cx="85" cy="65" r="4" /><circle cx="560" cy="155" r="5" /><circle cx="445" cy="45" r="3" />
          <circle cx="530" cy="260" r="3" /><circle cx="160" cy="265" r="4" />
        </g>
        <path d="M24 326 H616" stroke={accent} strokeOpacity=".5" />
      </svg>
      <span className="pointer-events-none absolute bottom-3 left-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[.18em] text-white/80">AI prompt artwork</span>
    </div>
  );
}
