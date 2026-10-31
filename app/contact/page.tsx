import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  path: "/contact/",
  title: "Contact Us",
  description: "Contact the CreatorAI Video Prompt Generator team with questions, feedback, bug reports or privacy requests.",
});

export default function Contact() {
  return (
    <LegalPage title="Contact" path="/contact/" updated={false}>
      <p>We read every message. Email us for feedback, bug reports, partnership questions or privacy requests.</p>
      <p><a href={`mailto:${site.email}`} className="text-lg font-medium">{site.email}</a></p>
      <h2>What to include</h2>
      <ul>
        <li>The page you were on and the tool you were using.</li>
        <li>Your browser and device, for bug reports.</li>
        <li>A short description of what you expected and what happened.</li>
      </ul>
      <p>We aim to reply within a few business days.</p>
    </LegalPage>
  );
}
