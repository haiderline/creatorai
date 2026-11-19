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
      <h2>Hosting, analytics and diagnostics</h2>
      <p>Our hosting provider may process standard technical information, including IP address, browser type, device information and pages requested, to deliver the website, maintain security and diagnose errors.</p>
      <p>We use Google Analytics 4 to understand aggregate website usage, such as which pages are visited and how visitors use the site. Google may use cookies or similar technologies and process information such as device and browser details, approximate location and interaction events. Learn more in <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">Google's explanation of how it uses information from sites and apps that use its services</a>.</p>
      <p>We also use Microsoft Clarity to understand how visitors interact with pages and to diagnose usability issues. Depending on the features and settings in use, Clarity may collect interaction events, device and browser information, and session-replay or heatmap data. See the <a href="https://privacy.microsoft.com/privacystatement" rel="noopener noreferrer">Microsoft Privacy Statement</a>.</p>
      <h2>Cookies and advertising</h2>
      <p>We may display advertisements through Google AdSense. If ads are served, Google and its advertising partners may use cookies or similar technologies to measure ads, limit repeated ads and, where permitted, personalize advertising based on visits to this and other websites. For details, see <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer">How Google uses information for advertising</a>.</p>
      <ul>
        <li>You can manage personalized advertising through <a href="https://adssettings.google.com" rel="noopener noreferrer">Google Ads Settings</a>.</li>
        <li>You can learn about industry advertising opt-outs at <a href="https://www.aboutads.info" rel="noopener noreferrer">aboutads.info</a>.</li>
        <li>Learn how Google uses data from sites that use its services at <a href="https://policies.google.com/technologies/partner-sites" rel="noopener noreferrer">Google's partner-sites policy</a>.</li>
      </ul>
      <p>Where consent is legally required, we will obtain it before using non-essential cookies or serving personalized ads. Before serving ads to users in the European Economic Area, the United Kingdom or Switzerland, we will implement a Google-certified consent management platform as required by Google's policies.</p>
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
