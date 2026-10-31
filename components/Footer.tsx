import Link from "next/link";
import { tools } from "@/lib/tools";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-navy-950/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-semibold text-white">{site.name}</p>
          <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
            Free prompt tools for AI video creators. Everything runs in your browser and your prompts stay on your device.
          </p>
        </div>
        <nav aria-label="Tools">
          <p className="mb-3 text-sm font-medium text-white">Tools</p>
          <ul className="space-y-2 text-sm text-muted">
            {tools.map((t) => (
              <li key={t.slug}><Link className="hover:text-white" href={`/${t.slug}/`}>{t.name}</Link></li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Company">
          <p className="mb-3 text-sm font-medium text-white">Company</p>
          <ul className="space-y-2 text-sm text-muted">
            <li><Link className="hover:text-white" href="/blog/">Blog</Link></li>
            <li><Link className="hover:text-white" href="/about/">About</Link></li>
            <li><Link className="hover:text-white" href="/contact/">Contact</Link></li>
            <li><Link className="hover:text-white" href="/privacy-policy/">Privacy Policy</Link></li>
            <li><Link className="hover:text-white" href="/terms-of-service/">Terms of Service</Link></li>
            <li><Link className="hover:text-white" href="/disclaimer/">Disclaimer</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10 py-5 text-center text-xs text-muted/80">
        © {new Date().getFullYear()} {site.name}. Not affiliated with Kling, Runway, Google, OpenAI or ByteDance. Product names belong to their owners.
      </div>
    </footer>
  );
}
