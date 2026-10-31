import Link from "next/link";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}/`}
      className="card group block p-5 transition-colors hover:border-violet-400/50 focus-visible:outline-2 focus-visible:outline-violet-300"
    >
      <span aria-hidden="true" className="mb-3 flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-violet-500/30 to-blue-500/30 text-lg">{tool.icon}</span>
      <h3 className="font-semibold text-white">{tool.name}</h3>
      <p className="mt-1.5 text-sm leading-6 text-muted">{tool.blurb}</p>
    </Link>
  );
}
