import Link from "next/link";
import type { ViralPrompt } from "@/lib/viral";
import { CopyButton } from "./CopyButton";

export function PromptCard({ p }: { p: ViralPrompt }) {
  return (
    <article className="card flex flex-col p-5">
      <p className="text-xs text-violet-200">{p.category}</p>
      <h3 className="mt-1 font-semibold text-white">
        <Link href={`/viral-prompts/${p.slug}/`} className="hover:text-violet-200">{p.title}</Link>
      </h3>
      <p className="mt-2 line-clamp-4 flex-1 text-sm leading-6 text-muted">{p.prompt}</p>
      <p className="mt-3 text-xs text-muted/80">{p.aspect} · {p.duration}</p>
      <div className="mt-4 flex gap-2">
        <CopyButton text={p.prompt} className="btn-ghost min-h-9! px-3!" />
        <Link href={`/viral-prompts/${p.slug}/`} className="btn-ghost min-h-9! px-3!">View</Link>
      </div>
    </article>
  );
}
