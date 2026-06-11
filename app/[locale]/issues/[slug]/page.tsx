import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { searchNotes } from "@/lib/content";
import { getFrameworkComparison } from "@/lib/frameworks";
import { isLocale, localePath, t } from "@/lib/i18n";
import { getIssueLanding, issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(t).flatMap((locale) => issueLandings.map((issue) => ({ locale, slug: issue.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const issue = getIssueLanding(slug);
  if (!isLocale(locale) || !issue) return {};
  return {
    title: metadataTitle(issue.seoTitle),
    description: issue.description,
    alternates: { canonical: siteUrl(localePath(locale, `/issues/${issue.slug}`)) },
    openGraph: {
      title: socialTitle(issue.seoTitle),
      description: issue.description,
      url: siteUrl(localePath(locale, `/issues/${issue.slug}`)),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    }
  };
}

export default async function LocalizedIssuePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const issue = getIssueLanding(slug);
  if (!isLocale(locale) || !issue) notFound();
  const labels = t[locale];
  const relatedNotes = issue.canonQueries.flatMap((query) => searchNotes(query, 5)).filter((note, index, list) => list.findIndex((item) => item.slug === note.slug) === index).slice(0, 8);
  const comparisons = issue.compareSlugs.map(getFrameworkComparison).filter(Boolean);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
      <article className="max-w-4xl">
        <p className="brand-kicker">{labels.nav.issues} / {issue.title}</p>
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{issue.seoTitle}</h1>
        <p className="mt-6 max-w-3xl border-l-4 border-red pl-5 text-lg leading-8 text-white/70">{issue.question}</p>
        <p className="mt-5 max-w-3xl text-sm leading-6 text-white/50">{labels.common.sourceLanguage}</p>
        <section className="mt-10 grid gap-5 border-y border-white/15 py-6 md:grid-cols-2">
          <div>
            <h2 className="brand-title text-4xl leading-none text-signal">Inclusionist Frame</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{issue.inclusionistFrame}</p>
          </div>
          <div>
            <h2 className="brand-title text-4xl leading-none text-signal">Why It Matters</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{issue.whyItMatters}</p>
          </div>
        </section>
        <section className="mt-10">
          <h2 className="brand-title text-4xl leading-none">{labels.common.compareFrameworks}</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {comparisons.map((framework) => framework ? (
              <Link key={framework.slug} href={`/compare/${framework.slug}`} className="border border-white/15 bg-black p-4 hover:border-signal">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-signal">Inclusionism vs</p>
                <p className="brand-title mt-2 text-3xl leading-none">{framework.name}</p>
              </Link>
            ) : null)}
          </div>
        </section>
      </article>
      <aside className="space-y-5">
        <section className="ink-panel brand-rule p-5">
          <h2 className="brand-title text-3xl leading-none">{labels.common.relatedCanonNotes}</h2>
          <div className="mt-4 space-y-3">
            {relatedNotes.map((note) => (
              <Link key={note.slug} href={localePath(locale, `/notes/${note.slug}`)} className="block border border-white/15 bg-black p-3 hover:border-signal">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-red">{note.category}</p>
                <p className="brand-title mt-2 text-2xl leading-none">{note.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/45">{note.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}
