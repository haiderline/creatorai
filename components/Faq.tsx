import { JsonLd } from "./JsonLd";
import type { Faq as FaqType } from "@/lib/tools";

export function Faq({ items }: { items: FaqType[] }) {
  return (
    <section aria-labelledby="faq" className="mt-14">
      <h2 id="faq" className="text-2xl font-semibold text-white">Frequently asked questions</h2>
      <div className="mt-5 divide-y divide-white/10 rounded-2xl border border-white/10 bg-navy-900/60">
        {items.map((f) => (
          <details key={f.q} className="group p-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-white focus-visible:outline-2 focus-visible:outline-violet-300">
              {f.q}
              <span aria-hidden="true" className="text-muted transition-transform group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-7 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />
    </section>
  );
}
