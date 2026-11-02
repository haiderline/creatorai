"use client";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { copyText } from "@/lib/clipboard";
import { generate, modeConfig, randomValues, type Field, type Mode, type Result, type Values } from "@/lib/generator";

type Entry = { id: string; mode: Mode; ts: number; values: Values; results: Result[] };
const KEY = "creatorai:history:v1";
const MAX = 30;

function loadHistory(): Entry[] {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
function saveHistory(h: Entry[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(h));
  } catch {
    /* storage full or blocked: history simply will not persist */
  }
}
function Chips({ field, value, onChange, multi }: { field: Field; value: string | string[]; onChange: (v: string | string[]) => void; multi?: boolean }) {
  const name = useId();
  const selected = Array.isArray(value) ? value : [value];
  return (
    <fieldset>
      <legend className="mb-2 text-sm font-medium text-ink">{field.label}</legend>
      <div className="flex flex-wrap gap-2">
        {field.options!.map((o) => {
          const checked = selected.includes(o);
          return (
            <label key={o} className="relative">
              <input
                className="peer sr-only"
                type={multi ? "checkbox" : "radio"}
                name={name}
                checked={checked}
                onChange={() => onChange(multi ? (checked ? selected.filter((x) => x !== o) : [...selected, o]) : o)}
              />
              <span className="chip">{o}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

export function PromptTool({ mode }: { mode: Mode }) {
  const cfg = modeConfig[mode];
  const requiredField = cfg.fields.find((f) => f.required);
  const [values, setValues] = useState<Values>(cfg.defaults);
  const [results, setResults] = useState<Result[]>([]);
  const [count, setCount] = useState(3);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState("");
  const [history, setHistory] = useState<Entry[]>([]);
  const resultsRef = useRef<HTMLElement>(null);
  const uid = useId();

  useEffect(() => setHistory(loadHistory()), []);

  const set = (k: string, v: string | string[]) => {
    setValues((p) => ({ ...p, [k]: v }));
    if (error) setError("");
  };

  const run = useCallback(
    (vals: Values) => {
      const rf = cfg.fields.find((f) => f.required);
      if (rf && !String(vals[rf.key] ?? "").trim()) {
        setError(`Please fill in “${rf.label}” or press Random for an idea.`);
        return;
      }
      if (mode === "negative" && !(vals.issues as string[]).length) {
        setError("Select at least one problem to avoid.");
        return;
      }
      setError("");
      const res = generate(mode, vals, count, (Date.now() ^ Math.floor(Math.random() * 1e9)) >>> 0);
      setResults(res);
      const entry: Entry = { id: `${Date.now()}`, mode, ts: Date.now(), values: vals, results: res };
      setHistory((prev) => {
        const next = [entry, ...prev].slice(0, MAX);
        saveHistory(next);
        return next;
      });
      if (window.matchMedia("(max-width: 1023px)").matches) {
        requestAnimationFrame(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }));
      }
    },
    [cfg.fields, count, mode],
  );

  const copy = async (text: string, id: string) => {
    if (await copyText(text)) {
      setCopied(id);
      setTimeout(() => setCopied(""), 1800);
    }
  };

  const download = () => {
    const body = results.map((r) => `${r.label}\n${"-".repeat(r.label.length)}\n${r.text}`).join("\n\n\n");
    const blob = new Blob([`CreatorAI prompts\n\n${body}\n`], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `creatorai-${mode}-prompts.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const reset = () => {
    setValues(cfg.defaults);
    setResults([]);
    setError("");
  };
  const clear = () => {
    const blank: Values = { ...values };
    for (const f of cfg.fields) if (f.type === "text" || f.type === "textarea") blank[f.key] = "";
    if (mode === "negative") blank.issues = [];
    setValues(blank);
    setResults([]);
    setError("");
  };
  const modeHistory = history.filter((h) => h.mode === mode);
  const removeEntry = (id: string) =>
    setHistory((prev) => {
      const next = prev.filter((h) => h.id !== id);
      saveHistory(next);
      return next;
    });
  const clearHistory = () =>
    setHistory((prev) => {
      const next = prev.filter((h) => h.mode !== mode);
      saveHistory(next);
      return next;
    });

  return (
    <div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]">
        <form
          className="card space-y-6 p-5 sm:p-6"
          aria-label="Prompt options"
          onSubmit={(e) => {
            e.preventDefault();
            run(values);
          }}
        >
          {cfg.fields.map((f) => {
            const id = `${uid}-${f.key}`;
            const v = values[f.key];
            if (f.type === "chips") return <Chips key={f.key} field={f} value={v} onChange={(x) => set(f.key, x)} />;
            if (f.type === "multi") return <Chips key={f.key} field={f} value={v} multi onChange={(x) => set(f.key, x)} />;
            return (
              <div key={f.key}>
                <label htmlFor={id} className="mb-2 block text-sm font-medium text-ink">{f.label}</label>
                {f.type === "textarea" ? (
                  <textarea
                    id={id}
                    rows={3}
                    className="input resize-y"
                    placeholder={f.placeholder}
                    value={String(v ?? "")}
                    maxLength={400}
                    aria-invalid={!!error && f.required}
                    aria-describedby={error && f.required ? `${uid}-err` : undefined}
                    onChange={(e) => set(f.key, e.target.value)}
                  />
                ) : f.type === "select" ? (
                  <select id={id} className="input" value={String(v ?? "")} onChange={(e) => set(f.key, e.target.value)}>
                    {f.options!.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                ) : (
                  <input id={id} type="text" className="input" placeholder={f.placeholder} value={String(v ?? "")} maxLength={200} onChange={(e) => set(f.key, e.target.value)} />
                )}
                {f.required && error && <p id={`${uid}-err`} role="alert" className="mt-2 text-sm text-rose-300">{error}</p>}
              </div>
            );
          })}
          {error && !requiredField && <p role="alert" className="text-sm text-rose-300">{error}</p>}
          {error && requiredField && mode === "negative" && <p role="alert" className="text-sm text-rose-300">{error}</p>}

          <div className="flex flex-wrap items-center gap-2">
            <button type="submit" className="btn-primary flex-1 sm:flex-none sm:px-8">Generate prompts</button>
            <button type="button" className="btn-ghost" onClick={() => { const rv = randomValues(mode); setValues(rv); run(rv); }}>Random</button>
            <button type="button" className="btn-ghost" onClick={clear}>Clear</button>
            <button type="button" className="btn-ghost" onClick={reset}>Reset</button>
            {mode !== "negative" && (
              <label className="ml-auto flex items-center gap-2 text-sm text-muted">
                Variations
                <select className="input w-auto! py-1.5!" value={count} onChange={(e) => setCount(Number(e.target.value))}>
                  {[1, 3, 5].map((n) => <option key={n}>{n}</option>)}
                </select>
              </label>
            )}
          </div>

          <div>
            <p className="mb-2 text-sm font-medium text-ink">Try an example</p>
            <div className="flex flex-wrap gap-2">
              {cfg.examples.map((ex) => (
                <button key={ex.name} type="button" className="btn-ghost min-h-9! rounded-full! px-3.5!" onClick={() => { setValues(ex.values); run(ex.values); }}>
                  {ex.name}
                </button>
              ))}
            </div>
          </div>
        </form>

        <section ref={resultsRef} aria-label="Generated prompts" aria-live="polite" className="scroll-mt-24 self-start lg:sticky lg:top-20">
          {results.length === 0 ? (
            <div className="card flex min-h-64 flex-col items-center justify-center p-8 text-center">
              <p className="font-medium text-white">Your prompts will appear here</p>
              <p className="mt-2 max-w-xs text-sm leading-6 text-muted">Fill in the options and press Generate, or press Random to see an example.</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-white">Your prompts</h2>
                <button type="button" className="btn-ghost min-h-9!" onClick={download}>Download .txt</button>
              </div>
              {results.map((r, i) => (
                <article key={`${r.label}-${i}`} className="card rise p-5" style={{ animationDelay: `${i * 60}ms` }}>
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <h3 className="text-sm font-medium text-violet-200">{r.label}</h3>
                    <button type="button" className="btn-ghost min-h-9! px-3!" onClick={() => copy(r.text, `${r.label}-${i}`)}>
                      {copied === `${r.label}-${i}` ? "Copied" : "Copy"}
                    </button>
                  </div>
                  <p className="whitespace-pre-wrap text-[15px] leading-7 text-ink">{r.text}</p>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>

      <details className="card mt-6 p-5">
        <summary className="cursor-pointer font-medium text-white">History on this device ({modeHistory.length})</summary>
        {modeHistory.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nothing yet. Prompts you generate are saved in this browser only.</p>
        ) : (
          <div className="mt-4 space-y-3">
            <ul className="space-y-3">
              {modeHistory.map((h) => (
                <li key={h.id} className="rounded-xl border border-white/10 bg-navy-950/50 p-4">
                  <p className="text-xs text-muted">{new Date(h.ts).toLocaleString()}</p>
                  <p className="mt-1 line-clamp-2 text-sm text-ink">{h.results[0]?.text}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <button type="button" className="btn-ghost min-h-9! px-3!" onClick={() => { setValues(h.values); setResults(h.results); resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }); }}>Restore</button>
                    <button type="button" className="btn-ghost min-h-9! px-3!" onClick={() => copy(h.results[0]?.text ?? "", h.id)}>{copied === h.id ? "Copied" : "Copy"}</button>
                    <button type="button" className="btn-ghost min-h-9! px-3!" onClick={() => removeEntry(h.id)}>Delete</button>
                  </div>
                </li>
              ))}
            </ul>
            <button type="button" className="btn-ghost" onClick={clearHistory}>Clear history</button>
          </div>
        )}
      </details>
    </div>
  );
}
