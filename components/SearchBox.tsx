"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { search, type Doc } from "@/lib/search";

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [docs, setDocs] = useState<Doc[] | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const wrap = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => { setOpen(false); setQ(""); }, [pathname]);
  useEffect(() => {
    if (open && !docs) import("@/lib/search-index").then((m) => setDocs(m.docs));
    if (open) input.current?.focus();
  }, [open, docs]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      const typing = !!t && (["INPUT", "TEXTAREA", "SELECT"].includes(t.tagName) || t.isContentEditable);
      if (e.key === "Escape") setOpen(false);
      else if (e.key === "/" && !typing && !e.metaKey && !e.ctrlKey) { e.preventDefault(); setOpen(true); }
    };
    const onDown = (e: PointerEvent) => { if (wrap.current && !wrap.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => { document.removeEventListener("keydown", onKey); document.removeEventListener("pointerdown", onDown); };
  }, []);

  const query = q.trim();
  const results = docs && query ? search(docs, query, 8) : [];

  return (
    <div ref={wrap}>
      <button type="button" aria-label="Search prompts and tools" aria-expanded={open} aria-controls="site-search" onClick={() => setOpen((o) => !o)} className="btn size-11 rounded-lg px-0! text-muted hover:text-white">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7" /><path d="m20 20-3.5-3.5" /></svg>
      </button>
      {open && (
        <div id="site-search" role="dialog" aria-label="Search" className="card absolute right-0 top-full mt-2 w-[min(30rem,calc(100vw-2rem))] p-3 shadow-2xl shadow-black/40">
          <form onSubmit={(e) => { e.preventDefault(); if (query) router.push(`/search/?q=${encodeURIComponent(query)}`); }}>
            <label htmlFor="site-search-input" className="sr-only">Search</label>
            <input id="site-search-input" ref={input} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts, tools and guides" className="input" autoComplete="off" />
          </form>
          <div aria-live="polite" className="mt-2">
            {!query ? (
              <p className="px-1 py-2 text-sm text-muted">Try “neon”, “product”, “camera” or “negative prompt”. Press / anywhere to search.</p>
            ) : !docs ? (
              <p className="px-1 py-2 text-sm text-muted">Loading…</p>
            ) : results.length === 0 ? (
              <p className="px-1 py-2 text-sm text-muted">No results for “{query}”. Try a shorter or different word.</p>
            ) : (
              <ul>
                {results.map((d) => (
                  <li key={d.url}>
                    <Link href={d.url} className="block rounded-lg px-3 py-2 hover:bg-white/8">
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-medium text-white">{d.title}</span>
                        <span className="shrink-0 text-xs text-violet-200">{d.type}</span>
                      </span>
                      <span className="line-clamp-1 text-sm text-muted">{d.desc}</span>
                    </Link>
                  </li>
                ))}
                <li><Link href={`/search/?q=${encodeURIComponent(query)}`} className="block rounded-lg px-3 py-2 text-sm text-violet-300 hover:bg-white/8">See all results</Link></li>
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
