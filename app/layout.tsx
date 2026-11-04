import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name}: Free AI Video Prompts`, template: `%s | ${site.short}` },
  description: site.tagline,
  applicationName: site.name,
  robots: { index: true, follow: true },
  verification: {
  google: "jkvYuCo51XsplMK44iDfHrbO-x9F6p9GnNJwf7hbahY",
},
other: {
  "google-adsense-account": "ca-pub-4992884493604885",
},
};
export const viewport: Viewport = { themeColor: "#060a18", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const ads = site.adsense.enabled && site.adsense.client;
  return (
    <html lang="en">
      <body className="flex min-h-dvh flex-col">
       {/* Google Analytics */} 
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-3D6ZLMW3LE"
  strategy="afterInteractive"
/>
<Script id="google-analytics" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-3D6ZLMW3LE');
  `}
</Script>

        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-violet-500 focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <Header />
        <main id="main" className="flex-1">{children}</main>
        <Footer />
        {ads? (
          <Script
            id="adsense"
            async
            strategy="afterInteractive"
            crossOrigin="anonymous"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${site.adsense.client}`}
          />
        ): null}
      </body>
    </html>
  );
}
