import type { Metadata } from "next";
import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { getSearchIndex } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Canon"),
  description: "Read and search the Inclusionism canon: notes, backlinks, concepts, and internal wikilinks.",
  alternates: { canonical: siteUrl("/notes") },
  openGraph: {
    title: socialTitle("Canon"),
    description: "Read and search the Inclusionism canon: notes, backlinks, concepts, and internal wikilinks.",
    url: siteUrl("/notes"),
    siteName: siteConfig.name,
    images: ["/brand/og-image.png"]
  }
};

export default function NotesPage() {
  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">Canon reader</p>
      <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">Read the Inclusionism Canon</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">
        Search settled Canon notes across the vault. Draft and Deprecated notes stay private, while Candidate notes are separated from the canon workflow.
      </p>
      <Link href="/under-development" className="outline-button mt-6 inline-block px-4 py-3 text-xs">
        Under Development
      </Link>
      <div className="mt-8">
        <SearchBox entries={getSearchIndex()} />
      </div>
    </main>
  );
}
