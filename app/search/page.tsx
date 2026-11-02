import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SearchPage } from "@/components/SearchPage";

export const metadata: Metadata = {
  title: "Search",
  description: "Search viral AI video prompts, free prompt generators and guides.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/search/" },
};

export default function Search() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-14">
      <Breadcrumbs items={[{ name: "Search", href: "/search/" }]} />
      <h1 className="mb-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Search</h1>
      <SearchPage />
    </div>
  );
}
