import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  path: "/privacy-policy/",
  title: "Privacy Policy",
  description: "How CreatorAI Video Prompt Generator handles data, local storage, cookies and Google AdSense advertising.",
});

export default function Privacy() {
  return (
    <LegalPage title="Privacy Policy" path="/privacy-policy/">
      <p>This policy explains what information {site.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects when you use this website and how it is used.</p>
      <h2>Information you enter</h2>
      <p>Text and options you enter in our tools are processed in your browser to create prompts. We do not receive or store them on our servers.</p>
      <h2>Local storage</h2>
      <p>To provide prompt history, the tools save your recent prompts in your browser&rsquo;s local storage. This data stays on your device. You can remove it with the Clear history button or by clearing your browser data.</p>
      <h2>Log and analytics data</h2>
      <p>Our hosting provider may process standard technical data, such as IP address, browser type and pages requested, to deliver the site and protect it from abuse.</p>
      <h2>Cookies and advertising</h2>
      <p>We may display ads from Google AdSense. Google and its partners use cookies and similar technologies to serve ads based on your visits to this and other websites. Google&rsquo;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and other sites on the internet.</p>
      <ul>
        <li>You can opt out of personalized advertising in <a href="https://adssettings.google.com" rel="noopener noreferrer">Google Ads Settings</a>.</li>
        <li>You can also opt out of some third-party vendors&rsquo; use of cookies at <a href="https://www.aboutads.info" rel="noopener noreferrer">aboutads.info</a>.</li>
        <li>Learn how Google uses data from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">policies.google.com/technologies/partner-sites</a>.</li>
      </ul>
      <p>Where required by law, such as in the European Economic Area, the United Kingdom and Switzerland, we will ask for your consent before personalized ads or non-essential cookies are used.</p>
      <h2>Third-party links</h2>
      <p>Our pages may link to other sites. We are not responsible for their privacy practices.</p>
      <h2>Children&rsquo;s privacy</h2>
      <p>This site is not directed to children under 13, and we do not knowingly collect personal information from them.</p>
      <h2>Your rights</h2>
      <p>Depending on where you live, you may have rights to access, correct or delete personal data we hold. Because we collect very little, requests are usually simple. Contact us at <a href={`mailto:${site.email}`}>{site.email}</a>.</p>
      <h2>Changes to this policy</h2>
      <p>We may update this policy from time to time. The date at the top shows when it was last revised.</p>
    </LegalPage>
  );
}
