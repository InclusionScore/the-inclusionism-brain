import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { searchNotes } from "@/lib/content";
import { dynamicChain, getFrameworkComparison } from "@/lib/frameworks";
import { getIssueLanding, issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return issueLandings.map((issue) => ({ slug: issue.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const issue = getIssueLanding(slug);
  if (!issue) return {};

  return {
    title: metadataTitle(issue.seoTitle),
    description: issue.description,
    keywords: issue.keywords,
    alternates: { canonical: siteUrl(`/issues/${issue.slug}`) },
    openGraph: {
      title: socialTitle(issue.seoTitle),
      description: issue.description,
      url: siteUrl(`/issues/${issue.slug}`),
      siteName: siteConfig.name,
      images: ["/brand/inclusionism-logo-border.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(issue.seoTitle),
      description: issue.description,
      images: ["/brand/inclusionism-logo-border.png"]
    }
  };
}

export default async function IssuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const issue = getIssueLanding(slug);
  if (!issue) notFound();

  const relatedNotes = issue.canonQueries.flatMap((query) => searchNotes(query, 5)).filter((note, index, list) => list.findIndex((item) => item.slug === note.slug) === index).slice(0, 10);
  const comparisons = issue.compareSlugs.map(getFrameworkComparison).filter(Boolean);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: issue.seoTitle,
            url: siteUrl(`/issues/${issue.slug}`),
            description: issue.description,
            keywords: issue.keywords.join(", "),
            about: issue.keywords.map((name) => ({ "@type": "Thing", name }))
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Issues", item: siteUrl("/issues") },
              { "@type": "ListItem", position: 2, name: issue.title, item: siteUrl(`/issues/${issue.slug}`) }
            ]
          }
        ]}
      />
      <article className="max-w-4xl">
        <p className="brand-kicker">Issue / {issue.title}</p>
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{issue.seoTitle}</h1>
        <p className="mt-6 max-w-3xl border-l-4 border-red pl-5 text-lg leading-8 text-white/70">{issue.question}</p>

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
          <p className="text-xs font-black uppercase tracking-[0.32em] text-red">Social Dynamic</p>
          <div className="mt-4 grid gap-2 sm:grid-cols-3 lg:grid-cols-9">
            {dynamicChain.map((item) => (
              <div key={item} className="border border-white/15 bg-black p-3">
                <span className="brand-title text-xl leading-none">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="brand-title text-4xl leading-none">Compare this issue</h2>
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
          <h2 className="brand-title text-3xl leading-none">Related Canon Notes</h2>
          <div className="mt-4 space-y-3">
            {relatedNotes.map((note) => (
              <Link key={note.slug} href={`/notes/${note.slug}`} className="block border border-white/15 bg-black p-3 hover:border-signal">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-red">{note.category}</p>
                <p className="brand-title mt-2 text-2xl leading-none">{note.title}</p>
                <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/45">{note.excerpt}</p>
              </Link>
            ))}
          </div>
        </section>
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl leading-none text-signal">Keep Exploring</h2>
          <div className="mt-4 space-y-2">
            <Link href="/what-is-inclusionism" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal">What Is Inclusionism?</Link>
            <Link href="/compare" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal">Compare Frameworks</Link>
            <Link href="/debate" className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal">Debate Inclusionism</Link>
          </div>
        </section>
      </aside>
    </main>
  );
}
