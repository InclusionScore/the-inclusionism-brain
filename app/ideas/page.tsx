import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, entityIds } from "@/lib/entities";
import { ideaPages } from "@/lib/ideas";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Ideas and Questions"),
  description: "Explore the political, economic, technological, and civilizational questions that Inclusionism attempts to explain.",
  alternates: { canonical: siteUrl("/ideas") },
  openGraph: {
    title: socialTitle("Ideas and Questions"),
    description: "Problem-led explainers connecting contemporary questions to the Inclusionism canon.",
    url: siteUrl("/ideas"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function IdeasPage() {
  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd data={breadcrumb([{ name: "Ideas", path: "/ideas" }])} />
      <p className="brand-kicker">Questions Inclusionism Tries to Explain</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">Start with the problem, then enter the canon.</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">
        These essays begin with questions people already ask about technology, ownership, value, personhood, equity, and agency. Each answer is grounded in the Inclusionism canon and links back to its underlying concepts.
      </p>

      <section className="mt-10 divide-y divide-white/15 border-y border-white/15" aria-label="Inclusionism idea pages">
        {ideaPages.map((idea) => (
          <article key={idea.slug} className="grid gap-4 py-7 md:grid-cols-[1fr_2fr_auto] md:items-start">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-signal">Explainer</p>
            <div>
              <h2 className="brand-title text-4xl leading-none sm:text-5xl">
                <Link href={`/ideas/${idea.slug}`} className="hover:text-signal">{idea.title}</Link>
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-white/65">{idea.description}</p>
            </div>
            <Link href={`/ideas/${idea.slug}`} className="outline-button px-4 py-3 text-center text-xs">Read</Link>
          </article>
        ))}
      </section>

      <p className="mt-10 max-w-3xl text-sm leading-7 text-white/50">
        Written within the intellectual system developed by <Link href="/about/james-felton-keith" className="text-signal hover:underline">James Felton Keith</Link>. Canon definitions remain the source of truth when an explainer and a canon note differ.
      </p>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Inclusionism Ideas and Questions",
        url: siteUrl("/ideas"),
        about: { "@id": entityIds.inclusionism },
        author: { "@id": entityIds.jamesFeltonKeith },
        hasPart: ideaPages.map((idea) => ({ "@type": "Article", name: idea.title, url: siteUrl(`/ideas/${idea.slug}`) }))
      }} />
    </main>
  );
}
