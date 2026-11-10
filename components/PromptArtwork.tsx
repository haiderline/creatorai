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
          <ellipse cx="0" cy="125" rx="126" ry="18" fill="#02040b" opacity=".55" />
          {p.category === "Product Ads" ? (
            <>
              <path d="M-42 -90 H42 L34 -60 L55 -42 V85 Q0 112 -55 85 V-42 L-34 -60Z" fill={`url(#object-${id})`} />
              <rect x="-24" y="-112" width="48" height="24" rx="5" fill={glow} />
              <rect x="-42" y="5" width="84" height="37" rx="8" fill="#10182c" opacity=".65" />
              <path d="M-85 -12 Q0 -135 85 -12" fill="none" stroke={glow} strokeWidth="5" opacity=".7" />
            </>
          ) : p.category === "Food and ASMR" ? (
            <>
              <ellipse cx="0" cy="45" rx="112" ry="62" fill={`url(#object-${id})`} />
              <ellipse cx="0" cy="28" rx="77" ry="38" fill="#fff1d6" opacity=".9" />
              <path d="M-60 20 Q-25 -60 15 -8 Q45 -72 68 20 Q20 75 -60 20Z" fill={glow} />
              <path d="M-75 -70 Q-20 -110 35 -70" fill="none" stroke="#fff" strokeWidth="7" strokeLinecap="round" opacity=".65" />
            </>
          ) : p.category === "Nature and Animals" ? (
            <>
              <ellipse cx="0" cy="48" rx="92" ry="62" fill={`url(#object-${id})`} />
              <circle cx="50" cy="-15" r="43" fill={glow} />
              <path d="M20 -45 L8 -94 L54 -61 M70 -48 L108 -84 L100 -25" fill={accent} />
              <circle cx="65" cy="-20" r="5" fill="#08111b" /><circle cx="91" cy="-20" r="5" fill="#08111b" />
              <path d="M72 4 Q82 14 94 4" fill="none" stroke="#08111b" strokeWidth="4" strokeLinecap="round" />
            </>
          ) : p.category === "Fantasy and Sci-Fi" ? (
            <>
              <ellipse cx="0" cy="65" rx="105" ry="28" fill={accent} opacity=".35" />
              <ellipse cx="0" cy="-5" rx="72" ry="105" fill="none" stroke={glow} strokeWidth="18" opacity=".8" />
              <ellipse cx="0" cy="-5" rx="47" ry="78" fill="#11152e" stroke={accent} strokeWidth="5" />
              <path d="M-35 25 Q0 -62 38 25 Q0 68 -35 25Z" fill={glow} opacity=".8" />
            </>
          ) : p.category === "Cinematic and Action" ? (
            <>
              <path d="M-112 38 L-82 -12 L-38 -42 H45 L88 -5 L112 38 V67 H-112Z" fill={`url(#object-${id})`} />
              <path d="M-48 -30 H35 L67 5 H-75Z" fill="#10182c" opacity=".85" />
              <circle cx="-66" cy="67" r="22" fill="#080b14" stroke={glow} strokeWidth="8" />
              <circle cx="69" cy="67" r="22" fill="#080b14" stroke={glow} strokeWidth="8" />
              <path d="M-125 -65 H-65 M65 -65 H125" stroke={glow} strokeWidth="5" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="0" cy="-48" r="43" fill={glow} />
              <path d="M-85 100 Q-75 -10 0 -5 Q75 -10 85 100Z" fill={`url(#object-${id})`} />
              <rect x="100" y="-100" width="48" height="190" rx="5" fill="none" stroke={glow} strokeWidth="8" opacity=".7" />
              <path d="M-115 -105 V-45 M-145 -75 H-85" stroke="#fff" strokeWidth="5" opacity=".65" />
            </>
          )}
        </g>
        <g fill={glow} opacity=".8">
          <circle cx="85" cy="65" r="4" /><circle cx="560" cy="155" r="5" /><circle cx="445" cy="45" r="3" />
          <circle cx="530" cy="260" r="3" /><circle cx="160" cy="265" r="4" />
        </g>
        <path d="M24 326 H616" stroke={accent} strokeOpacity=".5" />
      </svg>
      <span className="pointer-events-none absolute bottom-3 left-4 rounded-full border border-white/15 bg-black/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[.18em] text-white/80">Prompt illustration</span>
    </div>
  );
}
