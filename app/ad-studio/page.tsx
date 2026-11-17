import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";

export const metadata = {
  title: "AI Video Ad Studio — Coming Soon",
  description: "Turn a product brief into video ad concepts, scripts, storyboards and AI video prompts with CreatorAI Ad Studio.",
  robots: { index: false, follow: true },
};

const deliverables = [
  ["3 creative angles", "Explore different ways to position your product or service."],
  ["Hooks and scripts", "Build a clear opening hook and a timed 15- or 30-second ad script."],
  ["4–6 scene storyboard", "Plan each shot with visual action, camera movement, lighting and timing."],
  ["Model-ready scene prompts", "Get separate prompts you can adapt for Kling, Runway, Veo, Sora or Seedance."],
  ["Voiceover and captions", "Finish the package with a voiceover draft, on-screen copy and a CTA."],
  ["Exportable production plan", "Copy or download the plan to share with your editor or production workflow."],
];

const bundles = [
  { name: "Starter", price: "$5", credits: "10 credits", note: "Try your first campaign" },
  { name: "Creator", price: "$12", credits: "30 credits", note: "For regular content creation", popular: true },
  { name: "Studio", price: "$29", credits: "100 credits", note: "For businesses and agencies" },
];

export default function AdStudioPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: "Ad Studio", href: "/ad-studio/" }]} />
      <section className="card relative overflow-hidden p-6 sm:p-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-28 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-full border border-violet-300/30 bg-violet-400/10 px-3 py-1 text-xs font-semibold tracking-wide text-violet-200">
            CREATORAI PRO · COMING SOON
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Turn your product into a video ad campaign.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-muted">
            Build a complete production-ready ad package: creative angles, hooks, scripts, scene-by-scene storyboards and prompts for the AI video tool you already use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#planned-pricing" className="btn-primary px-6">See planned credit packs</a>
            <Link href="/ai-video-prompt-generator/" className="btn-ghost px-6">Try the free prompt tools</Link>
          </div>
          <p className="mt-4 text-sm text-muted">Ad Studio is a planned paid product. Checkout and generation are not live yet.</p>
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">One brief. A complete ad production plan.</h2>
        <p className="mt-3 max-w-2xl leading-7 text-muted">
          Designed for creators making their own content and businesses or agencies producing product and service ads. You bring the product knowledge; Ad Studio organizes the creative and production work.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {deliverables.map(([title, description], i) => (
            <article key={title} className="card p-5">
              <span className="text-sm font-semibold text-violet-300">0{i + 1}</span>
              <h3 className="mt-3 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="text-2xl font-semibold text-white sm:text-3xl">How it will work</h2>
        <ol className="mt-7 grid gap-4 md:grid-cols-4">
          {[
            ["01", "Describe your offer", "Add your product, audience, benefit and campaign goal."],
            ["02", "Choose the format", "Select the social platform, video length, style and AI video model."],
            ["03", "Generate your ad kit", "Get creative directions, a timed script and scene prompts."],
            ["04", "Take it into production", "Copy or export the plan and create the video in your chosen tool."],
          ].map(([number, title, description]) => (
            <li key={number} className="card p-5">
              <span className="text-sm font-semibold text-violet-300">{number}</span>
              <h3 className="mt-3 font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="planned-pricing" className="mt-16 scroll-mt-24">
        <div className="max-w-2xl">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Simple, one-time credit packs</h2>
          <p className="mt-3 leading-7 text-muted">Proposed launch pricing for feedback. No subscription or automatic renewal is planned for the first release.</p>
        </div>
        <div className="mt-7 grid gap-4 md:grid-cols-3">
          {bundles.map((bundle) => (
            <article key={bundle.name} className={"card p-6 " + (bundle.popular ? "border-violet-400/60 bg-violet-500/10" : "")}>
              {bundle.popular && <span className="text-xs font-semibold uppercase tracking-wide text-violet-200">Most popular · planned</span>}
              <h3 className="mt-2 text-lg font-semibold text-white">{bundle.name}</h3>
              <p className="mt-4 text-4xl font-semibold tracking-tight text-white">{bundle.price}</p>
              <p className="mt-2 font-medium text-violet-200">{bundle.credits}</p>
              <p className="mt-3 text-sm text-muted">{bundle.note}</p>
              <p className="mt-6 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm text-muted">Checkout not available yet</p>
            </article>
          ))}
        </div>
        <p className="mt-4 text-xs leading-6 text-muted">Pricing and credit usage are provisional. A complete campaign is planned to cost 5 credits; final limits and prices will be confirmed after API-cost and payment testing.</p>
      </section>

      <section className="mt-16 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <h2 className="text-xl font-semibold text-white">What Ad Studio does — and doesn't do</h2>
        <p className="mt-3 max-w-3xl leading-7 text-muted">
          Ad Studio will generate creative concepts, scripts, storyboards and text prompts. It will not render a finished video in its first release. You will use the prompts in your selected video-generation platform. Always review product claims, rights and ad-platform requirements before publishing.
        </p>
      </section>

      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-7">
        <p className="text-sm text-muted">Need a prompt right now? The existing CreatorAI tools are free.</p>
        <Link href="/ai-video-prompt-generator/" className="btn-primary px-6">Open free generator</Link>
      </div>
    </div>
  );
}
