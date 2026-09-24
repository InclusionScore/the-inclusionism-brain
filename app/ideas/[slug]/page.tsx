import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { searchNotes } from "@/lib/content";
import { breadcrumb, entityIds } from "@/lib/entities";
import { getFrameworkComparison } from "@/lib/frameworks";
import { getIdeaPage, ideaPages } from "@/lib/ideas";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return ideaPages.map((idea) => ({ slug: idea.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const idea = getIdeaPage(slug);
  if (!idea) return {};
  return {
    title: metadataTitle(idea.seoTitle),
    description: idea.description,
    keywords: idea.keywords,
    alternates: { canonical: siteUrl(`/ideas/${idea.slug}`) },
    openGraph: {
      title: socialTitle(idea.seoTitle),
      description: idea.description,
      url: siteUrl(`/ideas/${idea.slug}`),
      siteName: siteConfig.name,
      type: "article",
      images: ["/brand/inclusionism-logo-border.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(idea.seoTitle),
      description: idea.description,
      images: ["/brand/inclusionism-logo-border.png"]
    }
  };
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = getIdeaPage(slug);
  if (!idea) notFound();

  const relatedNotes = idea.canonQueries
    .flatMap((query) => searchNotes(query, 6))
    .filter((note, index, list) => list.findIndex((item) => item.slug === note.slug) === index)
    .slice(0, 12);
  const comparisons = idea.compareSlugs.map(getFrameworkComparison).filter(Boolean);
  const url = siteUrl(`/ideas/${idea.slug}`);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
      <JsonLd data={[
        {
          "@context": "https://schema.org",
          "@type": "Article",
          "@id": `${url}#article`,
          headline: idea.title,
          description: idea.description,
          url,
          mainEntityOfPage: url,
          author: { "@id": entityIds.jamesFeltonKeith },
          publisher: { "@id": entityIds.keithInstitute },
          about: [{ "@id": entityIds.inclusionism }, ...relatedNotes.slice(0, 6).map((note) => ({ "@type": "DefinedTerm", name: note.title, url: siteUrl(`/notes/${note.slug}`) }))],
          isAccessibleForFree: true
        },
        breadcrumb([
          { name: "Ideas", path: "/ideas" },
          { name: idea.title, path: `/ideas/${idea.slug}` }
        ])
      ]} />

      <article className="max-w-4xl">
        <p className="brand-kicker">Inclusionism Explainer</p>
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{idea.title}</h1>
        <p className="mt-6 max-w-3xl border-l-4 border-red pl-5 text-lg leading-8 text-white/75">{idea.question}</p>
        <p className="mt-6 max-w-3xl text-xl font-bold leading-9 text-white">{idea.thesis}</p>
        <p className="mt-5 text-sm text-white/50">
          By <Link href="/about/james-felton-keith" rel="author" className="font-bold text-signal hover:underline">James Felton Keith</Link> · Part of the Inclusionism intellectual system
        </p>

        <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {idea.sections.map((section) => (
            <section key={section.heading} className="py-7">
              <h2 className="brand-title text-4xl leading-none text-signal">{section.heading}</h2>
              <div className="mt-5 space-y-5">
                {section.paragraphs.map((paragraph) => <p key={paragraph} className="text-base leading-8 text-white/72">{paragraph}</p>)}
              </div>
            </section>
          ))}
        </div>
      </article>

      <aside className="space-y-5">
        <section className="ink-panel brand-rule p-5">
          <h2 className="brand-title text-3xl leading-none">Canon Sources</h2>
          <p className="mt-3 text-sm leading-6 text-white/55">These canon notes provide the definitions and relationships behind this explainer.</p>
          <div className="mt-4 space-y-2">
            {relatedNotes.map((note) => (
              <Link key={note.slug} href={`/notes/${note.slug}`} className="block border border-white/15 bg-black p-3 hover:border-signal">
                <span className="text-xs font-black uppercase tracking-[0.18em] text-red">{note.category}</span>
                <span className="mt-2 block font-bold">{note.title}</span>
              </Link>
            ))}
          </div>
        </section>
        {comparisons.length ? (
          <section className="ink-panel p-5">
            <h2 className="brand-title text-3xl leading-none text-signal">Compare Traditions</h2>
            <div className="mt-4 space-y-2">
              {comparisons.map((framework) => framework ? (
                <Link key={framework.slug} href={`/compare/${framework.slug}`} className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal">
                  Inclusionism and {framework.name}
                </Link>
              ) : null)}
            </div>
          </section>
        ) : null}
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl leading-none">Continue Exploring</h2>
          <div className="mt-4 space-y-2">
            <Link href="/what-is-inclusionism" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal">What Is Inclusionism?</Link>
            <Link href="/ideas" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal">All Ideas</Link>
            <Link href="/notes" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal">Explore the Canon</Link>
          </div>
        </section>
      </aside>
    </main>
  );
}
