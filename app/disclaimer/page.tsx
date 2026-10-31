import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  path: "/disclaimer/",
  title: "Disclaimer",
  description: "Important information about the CreatorAI Video Prompt Generator: no affiliation with AI platforms, no guaranteed results, and responsible use.",
});

export default function Disclaimer() {
  return (
    <LegalPage title="Disclaimer" path="/disclaimer/">
      <h2>No affiliation</h2>
      <p>{site.name} is an independent website. It is not affiliated with, endorsed by or sponsored by Kling, Runway, Google (Veo), OpenAI (Sora), ByteDance (Seedance) or any other company named on this site. All trademarks belong to their owners.</p>
      <h2>No guaranteed results</h2>
      <p>AI video models change often and respond differently to the same wording. Prompts from our tools are suggestions that improve clarity, not a promise of a specific video.</p>
      <h2>Platform features</h2>
      <p>Features such as negative prompts, audio generation, durations and aspect ratios vary by platform and plan. Always check the current documentation of the platform you use.</p>
      <h2>Responsible use</h2>
      <p>Do not use generated prompts to create deceptive, harmful or unlawful content, or to infringe the rights of others, including the likeness of real people and protected characters.</p>
      <h2>Advertising</h2>
      <p>This site may show advertisements. Ads are provided by third parties, and we do not endorse advertised products or services.</p>
    </LegalPage>
  );
}
