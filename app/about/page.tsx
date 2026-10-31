import Link from "next/link";
import { LegalPage } from "@/components/LegalPage";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  path: "/about/",
  title: "About CreatorAI Video Prompt Generator",
  description: "Learn who we are, why we built free AI video prompt tools, and how the generators work without any paid AI API.",
});

export default function About() {
  return (
    <LegalPage title="About" path="/about/" updated={false}>
      <p>{site.name} is a set of free tools that help creators write clear prompts for AI video platforms such as Kling, Runway, Veo, Sora and Seedance.</p>
      <h2>Why we built it</h2>
      <p>Good AI video results usually start with a well-structured prompt, but remembering which details to include takes time. We built these tools so anyone can go from an idea to a usable prompt in seconds, without sign-ups or subscriptions.</p>
      <h2>How the tools work</h2>
      <p>The generators run entirely in your browser. They combine your choices with a library of carefully written phrases for styles, camera moves, environments and lighting, and format the result for the platform you select. No paid AI API is involved, and your inputs are not sent to our servers.</p>
      <h2>What we do not do</h2>
      <ul>
        <li>We do not generate videos. You paste prompts into the platform of your choice.</li>
        <li>We are not affiliated with any AI video platform mentioned on this site.</li>
        <li>We cannot guarantee a specific result, because every model interprets prompts differently.</li>
      </ul>
      <h2>Get in touch</h2>
      <p>Questions, ideas or corrections are welcome. Visit the <Link href="/contact/">contact page</Link>.</p>
    </LegalPage>
  );
}
