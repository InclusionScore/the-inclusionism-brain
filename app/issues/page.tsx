import Link from "next/link";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Issues"),
  description: "Explore Inclusionism through major AI, democracy, economics, ownership, legitimacy, belonging, race, class, and future questions.",
  alternates: { canonical: siteUrl("/issues") },
  openGraph: {
    title: socialTitle("Issues"),
    description: "Explore Inclusionism through major AI, democracy, economics, ownership, legitimacy, belonging, race, class, and future questions.",
    url: siteUrl("/issues"),
    siteName: siteConfig.name,
    images: ["/brand/og-image.png"]
  }
};

export default function IssuesPage() {
  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Inclusionism Issues",
          url: siteUrl("/issues"),
          description: metadata.description,
          hasPart: issueLandings.map((issue) => ({
            "@type": "WebPage",
            name: issue.seoTitle,
            url: siteUrl(`/issues/${issue.slug}`)
          }))
        }}
      />
      <p className="brand-kicker">Issue Map</p>
      <h1 className="brand-title mt-3 max-w-6xl text-5xl leading-none sm:text-8xl">Discover Inclusionism through 21st century questions.</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">
        Inclusionism should be discoverable through the problems people are already asking about: AI, democracy, ownership, legitimacy, race, class,
        economics, belonging, and technological futures.
      </p>
      <div className="mt-10 grid border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-4">
        {issueLandings.map((issue) => (
          <Link key={issue.slug} href={`/issues/${issue.slug}`} className="group min-h-64 border-b border-r border-white/15 bg-black p-5 hover:bg-white hover:text-black">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-red group-hover:text-black">Issue</p>
            <h2 className="brand-title mt-4 text-4xl leading-none group-hover:text-black">{issue.title}</h2>
            <p className="mt-4 text-sm leading-6 text-white/60 group-hover:text-black/70">{issue.question}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
