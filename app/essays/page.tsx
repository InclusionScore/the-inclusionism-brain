import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { getEditorialEssays } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: metadataTitle("Essays"),
  description: "Read Inclusionism essays and connect think pieces back to the evolving canon.",
  alternates: { canonical: siteUrl("/essays") },
  openGraph: {
    title: socialTitle("Essays"),
    description: "Read Inclusionism essays and connect think pieces back to the evolving canon.",
    url: siteUrl("/essays"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default async function EssaysPage() {
  const essays = await getEditorialEssays();

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">Essays</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">Think pieces for an evolving canon.</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">
        Essays are treated as arguments, provocations, and working drafts that may refine the Inclusionism canon over time.
      </p>

      {essays.length ? (
        <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {essays.map((essay) => (
            <article key={essay.slug} className="grid gap-5 py-7 md:grid-cols-[220px_1fr_220px]">
              <Link href={`/essays/${essay.slug}`} className="group relative aspect-[4/3] overflow-hidden border border-white/15 bg-white/5">
                {essay.heroImage ? (
                  <Image src={essay.heroImage} alt={essay.heroImageAlt || essay.title} fill sizes="(min-width: 768px) 220px, 100vw" className="object-cover transition duration-300 group-hover:scale-105" />
                ) : (
                  <div className="flex h-full items-center justify-center bg-black text-6xl font-black text-signal">≥</div>
                )}
              </Link>
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-signal">{formatDate(essay.date)}</p>
                <Link href={`/essays/${essay.slug}`} className="group mt-3 block">
                  <h2 className="brand-title text-4xl leading-none group-hover:text-signal sm:text-5xl">{essay.title}</h2>
                </Link>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/65">{essay.excerpt}</p>
                <p className="mt-3 text-xs font-bold uppercase tracking-wider text-white/40">{essay.sourceName || essay.source}</p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link href={`/essays/${essay.slug}`} className="outline-button px-4 py-3 text-center text-xs">
                  Read Essay
                </Link>
                <a href={essay.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white/55 hover:text-signal">
                  Original <ExternalLink size={14} />
                </a>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="ink-panel brand-rule mt-10 p-6">
          <h2 className="brand-title text-4xl leading-none">No essays imported yet.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
            Essays refresh from the Substack feed automatically. If this state appears in production, check the feed URL and Vercel function logs.
          </p>
        </section>
      )}
    </main>
  );
}
