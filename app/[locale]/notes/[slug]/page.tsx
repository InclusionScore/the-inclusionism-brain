import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getReadableNotes, getNote, renderNoteMarkdown } from "@/lib/content";
import { isLocale, localePath, t } from "@/lib/i18n";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(t).flatMap((locale) => getReadableNotes().map((note) => ({ locale, slug: note.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const note = getNote(slug);
  if (!isLocale(locale) || !note) return {};
  return {
    title: metadataTitle(`${note.title} | Inclusionism Canon`),
    description: note.excerpt || siteConfig.description,
    robots: note.status === "Candidate" ? { index: false, follow: true } : undefined,
    alternates: { canonical: siteUrl(localePath(locale, `/notes/${note.slug}`)) },
    openGraph: {
      title: socialTitle(note.title),
      description: note.excerpt || siteConfig.description,
      url: siteUrl(localePath(locale, `/notes/${note.slug}`)),
      siteName: siteConfig.name,
      images: ["/brand/inclusionism-logo-border.png"]
    }
  };
}

export default async function LocalizedNotePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const note = getNote(slug);
  if (!isLocale(locale) || !note) notFound();
  const labels = t[locale];
  const html = renderNoteMarkdown(note);
  const related = [...note.links, ...note.backlinks].filter((item, index, list) => list.findIndex((other) => other.slug === item.slug) === index);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
      <article className="max-w-4xl">
        <p className="brand-kicker">{note.category}</p>
        {note.status === "Candidate" ? (
          <div className="mt-4 inline-block border border-signal bg-black px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-signal">
            Candidate / {labels.notes.underDevelopment}
          </div>
        ) : null}
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{note.title}</h1>
        <p className="mt-5 max-w-3xl border-l-4 border-signal pl-5 text-sm leading-6 text-white/60">{labels.common.sourceLanguage}</p>
        <div className="prose prose-invert mt-8 max-w-none prose-headings:brand-title prose-headings:font-black prose-headings:text-white prose-p:text-white/75 prose-li:text-white/75 prose-hr:border-white/15" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <aside className="space-y-5">
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl">{labels.common.relatedCanonNotes}</h2>
          <div className="mt-3 space-y-2">
            {related.slice(0, 14).map((link) => (
              <Link key={link.slug} href={localePath(locale, `/notes/${link.slug}`)} className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
                {link.title}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}
