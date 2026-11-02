"use client";
import { useId, useMemo, useState } from "react";
import { search, type Doc } from "@/lib/search";
import type { ViralPrompt } from "@/lib/viral";
import { PromptCard } from "./PromptCard";

export function ViralLibrary({ prompts, cats }: { prompts: ViralPrompt[]; cats: { name: string; slug: string }[] }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const name = useId();
  const docs = useMemo<Doc[]>(() => prompts.map((p) => ({ id: p.slug, title: p.title, desc: p.why, text: p.prompt, tags: [...p.tags, p.category], url: "", type: "" })), [prompts]);
  const list = useMemo(() => {
    const query = q.trim();
    const base = query ? search(docs, query, 100).map((d) => prompts.find((p) => p.slug === d.id)!) : prompts;
    return cat === "all" ? base : base.filter((p) => p.catSlug === cat);
  }, [q, cat, docs, prompts]);

  return (
    <div>
      <div className="card space-y-4 p-4 sm:p-5">
        <div>
          <label htmlFor={`${name}-q`} className="sr-only">Search viral prompts</label>
          <input id={`${name}-q`} type="search" className="input" placeholder="Search prompts: neon, drone, product, cat, rain…" value={q} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
        </div>
        <fieldset>
          <legend className="sr-only">Category</legend>
          <div className="flex flex-wrap gap-2">
            {[{ name: "All", slug: "all" }, ...cats].map((c) => (
              <label key={c.slug} className="relative">
                <input className="peer sr-only" type="radio" name={`${name}-cat`} checked={cat === c.slug} onChange={() => setCat(c.slug)} />
                <span className="chip">{c.name}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>
      <p aria-live="polite" className="mt-4 text-sm text-muted">{list.length} prompt{list.length === 1 ? "" : "s"}</p>
      {list.length === 0 ? (
        <p className="mt-6 text-muted">No prompts match. Try another word or choose All.</p>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => <PromptCard key={p.slug} p={p} />)}
        </div>
      )}
    </div>
  );
}
