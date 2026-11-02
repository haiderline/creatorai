"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { search, type Doc } from "@/lib/search";

function Inner() {
  const params = useSearchParams();
  const router = useRouter();
  const initial = params.get("q") ?? "";
  const [q, setQ] = useState(initial);
  const [docs, setDocs] = useState<Doc[] | null>(null);
  useEffect(() => { import("@/lib/search-index").then((m) => setDocs(m.docs)); }, []);
  useEffect(() => setQ(initial), [initial]);

  const query = q.trim();
  const results = docs && query ? search(docs, query, 60) : [];

  return (
    <div>
      <form role="search" onSubmit={(e) => { e.preventDefault(); router.replace(query ? `/search/?q=${encodeURIComponent(query)}` : "/search/"); }}>
        <label htmlFor="q" className="sr-only">Search</label>
        <div className="flex gap-2">
          <input id="q" type="search" autoFocus className="input" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts, tools and guides" autoComplete="off" />
          <button type="submit" className="btn-primary px-6">Search</button>
        </div>
      </form>
      <div aria-live="polite" className="mt-6">
        {!query ? (
          <p className="text-muted">Type a word such as “neon”, “drone”, “product” or “anime”. Everything on the site is searchable: tools, viral prompts and guides.</p>
        ) : !docs ? (
          <p className="text-muted">Loading…</p>
        ) : results.length === 0 ? (
          <div>
            <p className="text-muted">No results for “{query}”. Try a shorter or different word, or browse the <Link className="text-violet-300 underline" href="/viral-prompts/">viral prompt library</Link>.</p>
          </div>
        ) : (
          <>
            <p className="mb-3 text-sm text-muted">{results.length} result{results.length === 1 ? "" : "s"} for “{query}”</p>
            <ul className="space-y-3">
              {results.map((d) => (
                <li key={d.url}>
                  <Link href={d.url} className="card block p-4 hover:border-violet-400/50">
                    <span className="flex items-center justify-between gap-3">
                      <span className="font-semibold text-white">{d.title}</span>
                      <span className="shrink-0 text-xs text-violet-200">{d.type}</span>
                    </span>
                    <span className="mt-1 line-clamp-2 block text-sm leading-6 text-muted">{d.desc}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

export function SearchPage() {
  return (
    <Suspense fallback={<p className="text-muted">Loading search…</p>}>
      <Inner />
    </Suspense>
  );
}
