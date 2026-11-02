import { LegalPage } from "@/components/LegalPage";
import { CopyButton } from "@/components/CopyButton";
import { pageMeta } from "@/lib/seo";
import { abs, site } from "@/lib/site";

export const metadata = pageMeta({
  path: "/link-to-us/",
  title: "Link to Us: Badges and Embed Code",
  description: "Link to or cite CreatorAI Video Prompt Generator. Copy a text link or badge for your blog, video description or resource list.",
});

export default function LinkToUs() {
  const home = abs("/");
  const text = `<a href="${home}">CreatorAI Video Prompt Generator</a>`;
  const badge = `<a href="${home}"><img src="${site.url}/badge.svg" alt="Free AI video prompts by CreatorAI" width="220" height="56"></a>`;
  const lib = `<a href="${abs("/viral-prompts/")}">Viral AI video prompts</a>`;
  const Box = ({ code }: { code: string }) => (
    <div className="my-3 rounded-xl border border-white/10 bg-navy-950/70 p-4">
      <pre className="overflow-x-auto whitespace-pre-wrap break-all font-mono text-sm text-ink">{code}</pre>
      <div className="mt-3"><CopyButton text={code} label="Copy code" className="btn-ghost min-h-9! px-3!" /></div>
    </div>
  );
  return (
    <LegalPage title="Link to Us" path="/link-to-us/" updated={false}>
      <p>If you write about AI video, run a resource list or publish tutorials, you are welcome to link to our free tools. Copy any snippet below.</p>
      <h2>Text link</h2>
      <Box code={text} />
      <h2>Link to the viral prompt library</h2>
      <Box code={lib} />
      <h2>Badge</h2>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/badge.svg" alt="Free AI video prompts by CreatorAI" width={220} height={56} className="my-3" />
      <Box code={badge} />
      <h2>Share your own prompt</h2>
      <p>Have a prompt that worked well? Email it to <a href={`mailto:${site.email}?subject=Prompt%20submission`}>{site.email}</a>. We may feature original prompts with credit to you and a link to your site.</p>
    </LegalPage>
  );
}
