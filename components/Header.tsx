"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { tools } from "@/lib/tools";
import { site } from "@/lib/site";
import { SearchBox } from "./SearchBox";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-navy-950/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-semibold text-white">
          <svg width="28" height="28" viewBox="0 0 64 64" aria-hidden="true">
            <defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#8b5cf6" /><stop offset="1" stopColor="#3b82f6" /></linearGradient></defs>
            <rect width="64" height="64" rx="16" fill="url(#lg)" />
            <path d="M26 20v24l20-12z" fill="#fff" />
          </svg>
          <span className="hidden min-[400px]:inline">{site.short}</span>
        </Link>
        <nav aria-label="Main" className="relative flex items-center gap-0.5 text-sm">
          <button type="button" aria-expanded={open} aria-controls="tools-menu" onClick={() => setOpen((o) => !o)} className="btn rounded-lg px-3 text-muted hover:text-white">
            Tools <span aria-hidden="true" className={`transition-transform ${open ? "rotate-180" : ""}`}>▾</span>
          </button>
          <Link href="/viral-prompts/" className="btn rounded-lg px-3 text-muted hover:text-white">
            <span className="sm:hidden">Prompts</span><span className="hidden sm:inline">Viral Prompts</span>
          </Link>
          <Link href="/blog/" className="btn hidden rounded-lg px-3 text-muted hover:text-white sm:inline-flex">Blog</Link>
          <SearchBox />
          {open && (
            <div id="tools-menu" className="card absolute right-0 top-full mt-2 w-72 p-2 shadow-2xl shadow-black/40">
              <ul>
                {tools.map((t) => (
                  <li key={t.slug}>
                    <Link href={`/${t.slug}/`} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-ink hover:bg-white/8">
                      <span aria-hidden="true">{t.icon}</span>
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
