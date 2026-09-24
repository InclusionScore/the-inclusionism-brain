import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, entityIds } from "@/lib/entities";
import { publications } from "@/lib/publications";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Books and Publications"),
  description: "Books and selected publications by James Felton Keith related to Inclusionism, data economics, artificial intelligence, and ownership.",
  alternates: { canonical: siteUrl("/publications") },
  openGraph: {
    title: socialTitle("Books and Publications"),
    description: "The published work surrounding Inclusionism, Data Is Labor, information ownership, and the AI economy.",
    url: siteUrl("/publications"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function PublicationsPage() {
  return (
    <main className="brain-grid mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Books and Publications by James Felton Keith",
          url: siteUrl("/publications"),
          author: { "@id": entityIds.jamesFeltonKeith },
          about: { "@id": entityIds.inclusionism },
          hasPart: publications.map((publication) => ({
            "@type": publication.type === "Book" ? "Book" : "CreativeWorkSeries",
            name: publication.title,
            datePublished: String(publication.year),
            description: publication.description,
            author: { "@id": entityIds.jamesFeltonKeith },
            url: publication.url
          }))
        },
        breadcrumb([{ name: "Publications", path: "/publications" }])
      ]} />
      <p className="brand-kicker">Bibliography</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">Books and Publications</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">
        Selected published work connecting Inclusionism to personal data, labor, artificial intelligence, ownership, and international governance.
      </p>
      <section className="mt-10 divide-y divide-white/15 border-y border-white/15">
        {publications.map((publication) => (
          <article key={publication.title} className="grid gap-4 py-7 md:grid-cols-[120px_1fr_auto]">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-signal">{publication.year}<br />{publication.type}</p>
            <div>
              <h2 className="brand-title text-4xl leading-none">{publication.title}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">{publication.description}</p>
            </div>
            <a href={publication.url} className="outline-button h-fit px-4 py-3 text-center text-xs">Source</a>
          </article>
        ))}
      </section>
      <p className="mt-8 text-sm leading-7 text-white/50">
        For the author's broader bibliography and current publication information, consult the <a href="https://www.jamesfeltonkeith.com/bio" className="text-signal hover:underline">official biography</a>. Read the evolving philosophical framework in the <Link href="/notes" className="text-signal hover:underline">Inclusionism canon</Link>.
      </p>
    </main>
  );
}
