export type Doc = { id: string; title: string; desc: string; text: string; tags: string[]; url: string; type: string };

/** Lightweight client-side search: every word must match somewhere; title and tag hits rank higher. */
export function search(docs: Doc[], query: string, limit = 50): Doc[] {
  const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
  if (!tokens.length) return [];
  const scored: { d: Doc; score: number }[] = [];
  for (const d of docs) {
    const title = d.title.toLowerCase();
    const tags = d.tags.join(" ").toLowerCase();
    const desc = d.desc.toLowerCase();
    const text = d.text.toLowerCase();
    let total = 0;
    let ok = true;
    for (const t of tokens) {
      const re = new RegExp(`(^|[^a-z0-9])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
      let s = 0;
      if (re.test(title)) s += 7;
      if (re.test(tags)) s += 3;
      if (re.test(desc)) s += 2;
      if (re.test(text)) s += 1;
      if (!s) { ok = false; break; }
      total += s;
    }
    if (ok) scored.push({ d, score: total });
  }
  return scored.sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.d);
}
