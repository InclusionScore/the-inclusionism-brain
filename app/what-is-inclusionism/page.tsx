import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { breadcrumb, entityIds } from "@/lib/entities";
import { dynamicChain } from "@/lib/frameworks";
import { issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("What Is Inclusionism?"),
  description:
    "Inclusionism is a philosophical and civilizational framework developed by James Felton Keith for connecting value, agency, equity, legitimacy, and belonging.",
  keywords: [
    "what is Inclusionism",
    "value and agency",
    "ownership and legitimacy",
    "AI ownership",
    "democracy and belonging",
    "civilizational framework"
  ],
  alternates: { canonical: siteUrl("/what-is-inclusionism") },
  openGraph: {
    title: socialTitle("What Is Inclusionism?"),
    description:
      "A civilizational framework for recognizing, attributing, and returning value as meaningful agency.",
    url: siteUrl("/what-is-inclusionism"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle("What Is Inclusionism?"),
    description:
      "A theory of how value and agency should remain connected.",
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function WhatIsInclusionismPage() {
  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": siteUrl("/what-is-inclusionism#article"),
            headline: "What Is Inclusionism?",
            description: metadata.description,
            author: { "@id": entityIds.jamesFeltonKeith },
            publisher: { "@id": entityIds.keithInstitute },
            mainEntityOfPage: siteUrl("/what-is-inclusionism"),
            about: { "@id": entityIds.inclusionism },
            mentions: [
              "value creation",
              "agency",
              "legitimacy",
              "fairness",
              "belonging",
              "ownership",
              "artificial intelligence",
              "democracy"
            ].map((name) => ({ "@type": "Thing", name }))
          },
          breadcrumb([{ name: "What Is Inclusionism?", path: "/what-is-inclusionism" }])
        ]}
      />
      <p className="brand-kicker">Flagship Explainer</p>
      <h1 className="brand-title mt-3 max-w-6xl text-5xl leading-none sm:text-8xl">What Is Inclusionism?</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-xl font-bold leading-9 text-white">
        Inclusionism is a philosophical and civilizational framework developed by James Felton Keith concerned with how differentiated agents generate value
        through interaction and how systems recognize, attribute, distribute, and legitimate that value.
      </p>
      <p className="mt-5 max-w-4xl text-base leading-8 text-white/70">
        Inclusionism is a Code of Equity: a framework for recognizing, attributing, distributing, and legitimizing value so that the agents and communities
        who contribute to its creation receive meaningful ownership, participation, influence, and self-determination in the systems they help create.
      </p>
      <p className="mt-4 text-sm text-white/50">
        Developed by <Link href="/about/james-felton-keith" className="text-signal hover:underline">James Felton Keith</Link>.
      </p>

      <section className="mt-10 border-y border-white/15 py-6">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-red">Core Dynamic</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3 lg:grid-cols-9">
          {dynamicChain.map((item, index) => (
            <div key={item} className="grid min-h-24 border border-white/15 bg-black p-3">
              <span className="brand-title text-2xl leading-none">{item}</span>
              {index < dynamicChain.length - 1 ? <span className="self-end text-2xl font-black text-signal">→</span> : null}
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          ["Not Just Politics", "Inclusionism is not merely socialism, democratic socialism, liberalism, capitalism, or progressivism. It is a broader account of how civilizations decide whose value counts."],
          ["A Value-Agency Theory", "It asks whether value generated through interaction is returned as meaningful agency to the contributors who help create it."],
          ["A Code Of Equity", "It tests whether recognition, attribution, ownership, governance, and belonging are fair enough to make a system legitimate."]
        ].map(([title, body]) => (
          <div key={title} className="border border-white/15 bg-black p-5">
            <h2 className="brand-title text-4xl leading-none text-signal">{title}</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">{body}</p>
          </div>
        ))}
      </section>

      <section className="mt-10">
        <h2 className="brand-title text-5xl leading-none">Explore by 21st century question</h2>
        <div className="mt-5 grid gap-3 md:grid-cols-4">
          {issueLandings.map((issue) => (
            <Link key={issue.slug} href={`/issues/${issue.slug}`} className="border border-white/15 bg-black p-4 hover:border-signal">
              <p className="brand-title text-3xl leading-none">{issue.title}</p>
              <p className="mt-3 line-clamp-3 text-xs leading-5 text-white/50">{issue.question}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-wrap gap-3">
        <Link href="/ideas" className="hard-button px-5 py-3 text-xs">Explore the Ideas</Link>
        <Link href="/compare" className="hard-button px-5 py-3 text-xs">Compare Frameworks</Link>
        <Link href="/notes" className="outline-button px-5 py-3 text-xs">Read the Canon</Link>
        <Link href="/publications" className="outline-button px-5 py-3 text-xs">Publications</Link>
        <Link href="/debate" className="outline-button px-5 py-3 text-xs">Debate Inclusionism</Link>
      </section>
    </main>
  );
}
