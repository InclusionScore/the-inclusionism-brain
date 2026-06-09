import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { getReadableNotes, getNote, renderNoteMarkdown } from "@/lib/content";
import { issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return getReadableNotes().map((note) => ({ slug: note.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) return {};

  return {
    title: metadataTitle(`${note.title} | Inclusionism Canon`),
    description: note.excerpt || siteConfig.description,
    keywords: [note.title, note.category, "Inclusionism", "value", "agency", "legitimacy", "fairness", "belonging"],
    robots: note.status === "Candidate" ? { index: false, follow: true } : undefined,
    alternates: { canonical: siteUrl(`/notes/${note.slug}`) },
    openGraph: {
      title: socialTitle(note.title),
      description: note.excerpt || siteConfig.description,
      url: siteUrl(`/notes/${note.slug}`),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(note.title),
      description: note.excerpt || siteConfig.description,
      images: ["/brand/og-image.png"]
    }
  };
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const html = renderNoteMarkdown(note);
  const related = [...note.links, ...note.backlinks].filter((item, index, list) => list.findIndex((other) => other.slug === item.slug) === index);
  const issueLinks = issueLandings.filter((issue) => issue.canonQueries.some((query) => query.toLowerCase().includes(note.title.toLowerCase()) || query.toLowerCase().includes(note.category.toLowerCase()))).slice(0, 4);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: note.title,
            description: note.excerpt,
            articleSection: note.category,
            author: { "@type": "Organization", name: "Inclusionism" },
            publisher: { "@type": "Organization", name: "Inclusionism" },
            mainEntityOfPage: siteUrl(`/notes/${note.slug}`),
            keywords: [note.title, note.category, "Inclusionism", "value", "agency", "legitimacy", "belonging"].join(", "),
            isAccessibleForFree: true
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Canon", item: siteUrl("/notes") },
              { "@type": "ListItem", position: 2, name: note.title, item: siteUrl(`/notes/${note.slug}`) }
            ]
          }
        ]}
      />
      <article className="max-w-4xl">
        <p className="brand-kicker">{note.category}</p>
        {note.status === "Candidate" ? (
          <div className="mt-4 inline-block border border-signal bg-black px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-signal">
            Candidate / Under Development
          </div>
        ) : null}
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{note.title}</h1>
        {note.status === "Candidate" ? (
          <p className="mt-5 max-w-3xl border-l-4 border-signal pl-5 text-sm leading-6 text-white/60">
            This note is visible for development and debate. It is not yet settled canon.
          </p>
        ) : null}
        <div className="prose prose-invert mt-8 max-w-none prose-headings:brand-title prose-headings:font-black prose-headings:text-white prose-p:text-white/75 prose-li:text-white/75 prose-hr:border-white/15" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <aside className="space-y-5">
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl">Backlinks</h2>
          <div className="mt-3 space-y-2">
            {note.backlinks.length ? note.backlinks.map((link) => (
              <Link key={link.slug} href={`/notes/${link.slug}`} className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
                {link.title}
              </Link>
            )) : <p className="text-sm text-white/45">No backlinks yet.</p>}
          </div>
        </section>
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl">Related Notes</h2>
          <div className="mt-3 space-y-2">
            {related.slice(0, 14).map((link) => (
              <Link key={link.slug} href={`/notes/${link.slug}`} className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
                {link.title}
              </Link>
            ))}
          </div>
        </section>
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl text-signal">Discovery Paths</h2>
          <div className="mt-3 space-y-2">
            <Link href="/what-is-inclusionism" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
              What Is Inclusionism?
            </Link>
            <Link href="/compare" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
              Compare Frameworks
            </Link>
            {(issueLinks.length ? issueLinks : issueLandings.slice(0, 4)).map((issue) => (
              <Link key={issue.slug} href={`/issues/${issue.slug}`} className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
                {issue.title}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}
