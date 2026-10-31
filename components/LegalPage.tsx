import type { ReactNode } from "react";
import { Breadcrumbs } from "./Breadcrumbs";
import { site } from "@/lib/site";

export function LegalPage({ title, path, updated = true, children }: { title: string; path: string; updated?: boolean; children: ReactNode }) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: title, href: path }]} />
      <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
      {updated && <p className="mt-2 text-sm text-muted">Last updated: {site.updated}</p>}
      <div className="prose-page mt-6">{children}</div>
    </div>
  );
}
