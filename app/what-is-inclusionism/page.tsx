import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { dynamicChain } from "@/lib/frameworks";
import { issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("What Is Inclusionism?"),
  description:
    "Inclusionism is a civilizational framework for value, agency, legitimacy, fairness, ownership, and belonging in the age of AI, democracy, data, and economic transformation.",
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
      "A civilizational framework for understanding how differentiated agents generate value through interaction and how societies legitimate that value.",
    url: siteUrl("/what-is-inclusionism"),
    siteName: siteConfig.name,
    images: ["/brand/og-image.png"]
  },
  twitter: {
    card: "summary_large_image",
    title: socialTitle("What Is Inclusionism?"),
    description:
      "A civilizational framework for value, agency, legitimacy, fairness, ownership, and belonging.",
    images: ["/brand/og-image.png"]
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
            headline: "What Is Inclusionism?",
            description: metadata.description,
            author: { "@type": "Organization", name: "Inclusionism" },
            publisher: { "@type": "Organization", name: "Inclusionism" },
            mainEntityOfPage: siteUrl("/what-is-inclusionism"),
            about: [
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
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: [
              {
                "@type": "Question",
                name: "What is Inclusionism?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "Inclusionism is a framework for understanding how differentiated agents generate value through interaction and how civilizations recognize, attribute, distribute, and legitimate that value."
                }
              },
              {
                "@type": "Question",
                name: "Is Inclusionism socialism or democratic socialism?",
                acceptedAnswer: {
                  "@type": "Answer",
                  text:
                    "No. Inclusionism can overlap with some egalitarian concerns, but it is broader than a left-right ideology. It is a civilizational framework about value, agency, legitimacy, ownership, fairness, and belonging."
                }
              }
            ]
          }
        ]}
      />
      <p className="brand-kicker">Flagship Explainer</p>
      <h1 className="brand-title mt-3 max-w-6xl text-5xl leading-none sm:text-8xl">What Is Inclusionism?</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-xl font-bold leading-9 text-white">
        Inclusionism is a framework for understanding how differentiated agents generate value through interaction and how civilizations recognize, attribute,
        distribute, and legitimate that value.
      </p>

      <section className="mt-10 border-y border-white/15 py-6">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-red">Core Dynamic</p>
        <div className="mt-4 grid gap-2 md:grid-cols-7">
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
          ["A Theory Of Value", "It asks how value emerges from interaction among people, institutions, data systems, AI, communities, and other agents."],
          ["A Test Of Legitimacy", "It tests whether recognition, ownership, governance, and belonging are fair enough to make a system legitimate."]
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
        <Link href="/compare" className="hard-button px-5 py-3 text-xs">Compare Frameworks</Link>
        <Link href="/notes" className="outline-button px-5 py-3 text-xs">Read the Canon</Link>
        <Link href="/debate" className="outline-button px-5 py-3 text-xs">Debate Inclusionism</Link>
      </section>
    </main>
  );
}
