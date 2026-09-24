import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import SearchBox from "@/components/SearchBox";
import { getAllNotes, getSearchIndex } from "@/lib/content";
import { entityIds } from "@/lib/entities";
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
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function NotesPage() {
  const notes = getAllNotes();
  const groups = [...new Set(notes.map((note) => note.category))].sort().map((category) => ({
    category,
    notes: notes.filter((note) => note.category === category).sort((a, b) => a.title.localeCompare(b.title))
  }));

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "DefinedTermSet",
        "@id": entityIds.canon,
        name: "Inclusionism Canon",
        url: siteUrl("/notes"),
        creator: { "@id": entityIds.jamesFeltonKeith },
        publisher: { "@id": entityIds.keithInstitute },
        isPartOf: { "@id": entityIds.inclusionism },
        hasDefinedTerm: notes.map((note) => ({ "@id": `${siteUrl(`/notes/${note.slug}`)}#term`, "@type": "DefinedTerm", name: note.title, url: siteUrl(`/notes/${note.slug}`) }))
      }} />
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

      <section className="mt-12" aria-labelledby="canon-index-title">
        <p className="brand-kicker">Crawlable Concept Index</p>
        <h2 id="canon-index-title" className="brand-title mt-3 text-4xl leading-none sm:text-6xl">Every public canon concept</h2>
        <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
          The graph is an exploratory interface. This index provides a conventional document path to every settled canon note for readers, researchers, and crawlers.
        </p>
        <div className="mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <section key={group.category} className="border-t-2 border-signal pt-4">
              <h3 className="brand-title text-3xl leading-none">{group.category}</h3>
              <ul className="mt-4 space-y-2">
                {group.notes.map((note) => (
                  <li key={note.slug}>
                    <Link href={`/notes/${note.slug}`} className="text-sm font-semibold text-white/70 hover:text-signal">{note.title}</Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
