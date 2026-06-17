import Link from "next/link";
import type { Metadata } from "next";
import { ExternalLink, Headphones } from "lucide-react";
import { getAllPodcastEpisodes } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Podcast"),
  description: "Listen to spoken Inclusionism think pieces and connect episodes back to the evolving canon.",
  alternates: { canonical: siteUrl("/podcast") },
  openGraph: {
    title: socialTitle("Podcast"),
    description: "Listen to spoken Inclusionism think pieces and connect episodes back to the evolving canon.",
    url: siteUrl("/podcast"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "short", day: "numeric", year: "numeric" }).format(new Date(value));
}

export default function PodcastPage() {
  const episodes = getAllPodcastEpisodes();

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">Podcast</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">Spoken think pieces for the canon.</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">
        Podcast episodes are treated as spoken arguments and working propositions that can pressure-test, extend, or revise Inclusionism.
      </p>

      {episodes.length ? (
        <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {episodes.map((episode) => (
            <article key={episode.slug} className="grid gap-5 py-7 md:grid-cols-[1fr_240px]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.28em] text-signal">{formatDate(episode.date)}</p>
                <Link href={`/podcast/${episode.slug}`} className="group mt-3 block">
                  <h2 className="brand-title text-4xl leading-none group-hover:text-signal sm:text-5xl">{episode.title}</h2>
                </Link>
                <p className="mt-4 max-w-3xl text-sm leading-6 text-white/65">{episode.description.slice(0, 320)}</p>
              </div>
              <div className="flex flex-col gap-3 md:items-end">
                <Link href={`/podcast/${episode.slug}`} className="outline-button inline-flex items-center justify-center gap-2 px-4 py-3 text-xs">
                  <Headphones size={16} />
                  Listen
                </Link>
                {episode.link ? (
                  <a href={episode.link} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-white/55 hover:text-signal">
                    Source <ExternalLink size={14} />
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="ink-panel brand-rule mt-10 p-6">
          <h2 className="brand-title text-4xl leading-none">No podcast episodes imported yet.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
            The app imports episodes from the podcast RSS feed at build time. If this state appears in production, redeploy or check that the feed is reachable.
          </p>
        </section>
      )}
    </main>
  );
}
