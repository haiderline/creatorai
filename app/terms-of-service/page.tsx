import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  path: "/terms-of-service/",
  title: "Terms of Service",
  description: "The terms that apply when you use the CreatorAI Video Prompt Generator website and its free tools.",
});

export default function Terms() {
  return (
    <LegalPage title="Terms of Service" path="/terms-of-service/">
      <p>By using {site.name} you agree to these terms. If you do not agree, please do not use the site.</p>
      <h2>Use of the service</h2>
      <p>The tools are provided free for personal and commercial use. You agree not to misuse the site, attempt to disrupt it, scrape it at a rate that harms performance, or use it for unlawful purposes.</p>
      <h2>Generated prompts</h2>
      <p>Prompts created by the tools are yours to use. We do not claim ownership of them. You are responsible for how you use prompts and for any content you create with third-party AI platforms, including compliance with those platforms&rsquo; terms and applicable laws.</p>
      <h2>Intellectual property</h2>
      <p>The site design, text, code and phrase libraries are owned by us or our licensors. Product and company names are trademarks of their respective owners, and their use here does not imply endorsement.</p>
      <h2>No warranty</h2>
      <p>The service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee that prompts will produce a particular result on any AI platform, or that the site will be uninterrupted or error-free.</p>
      <h2>Limitation of liability</h2>
      <p>To the fullest extent permitted by law, we are not liable for indirect, incidental or consequential damages arising from your use of the site.</p>
      <h2>Changes</h2>
      <p>We may update these terms. Continued use after changes means you accept the revised terms.</p>
      <h2>Contact</h2>
      <p>Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
    </LegalPage>
  );
}
