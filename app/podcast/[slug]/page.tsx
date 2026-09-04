import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, MessageSquareText, PenLine } from "lucide-react";
import { getEditorialPodcastEpisode } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const revalidate = 3600;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const episode = await getEditorialPodcastEpisode(slug);
  if (!episode) return {};

  return {
    title: metadataTitle(episode.title),
    description: episode.description || siteConfig.description,
    alternates: { canonical: siteUrl(`/podcast/${episode.slug}`) },
    openGraph: {
      title: socialTitle(episode.title),
      description: episode.description || siteConfig.description,
      url: siteUrl(`/podcast/${episode.slug}`),
      siteName: siteConfig.name,
      images: ["/brand/inclusionism-logo-border.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(episode.title),
      description: episode.description || siteConfig.description,
      images: ["/brand/inclusionism-logo-border.png"]
    }
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

function paragraphs(content: string) {
  return content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean).slice(0, 18);
}

function debatePrompt(title: string, description: string) {
  return `Debate this Inclusionism podcast episode as a spoken think piece that may evolve the canon: "${title}".\n\nEpisode description:\n${description}`;
}

function canonUpdatePrompt(title: string, description: string) {
  return `Suggest canon updates based on this Inclusionism podcast episode: "${title}".\n\nIdentify what notes should change, what unresolved questions should be added, and what claims need stronger support.\n\nEpisode description:\n${description}`;
}

export default async function PodcastEpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const episode = await getEditorialPodcastEpisode(slug);
  if (!episode) notFound();

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
      <article className="max-w-4xl">
        <p className="brand-kicker">Podcast / {formatDate(episode.date)}</p>
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{episode.title}</h1>
        <p className="mt-6 max-w-3xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">
          {episode.description.slice(0, 520)}
        </p>

        {episode.audioUrl ? (
          <div className="ink-panel brand-rule mt-8 p-4">
            <audio controls preload="metadata" src={episode.audioUrl} className="w-full">
              <a href={episode.audioUrl}>Listen to the episode audio.</a>
            </audio>
            {episode.duration ? <p className="mt-3 text-xs font-bold uppercase tracking-wider text-white/45">Duration: {episode.duration}</p> : null}
          </div>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/debate?question=${encodeURIComponent(debatePrompt(episode.title, episode.description))}`} className="hard-button inline-flex items-center gap-2 px-4 py-3 text-xs">
            <MessageSquareText size={16} />
            Debate this episode
          </Link>
          <Link href={`/debate?question=${encodeURIComponent(canonUpdatePrompt(episode.title, episode.description))}`} className="outline-button inline-flex items-center gap-2 px-4 py-3 text-xs">
            <PenLine size={16} />
            Suggest Canon Updates
          </Link>
          {episode.link ? (
            <a href={episode.link} target="_blank" rel="noreferrer" className="outline-button inline-flex items-center gap-2 px-4 py-3 text-xs">
              <ExternalLink size={16} />
              Source
            </a>
          ) : null}
        </div>

        <div className="prose prose-invert mt-10 max-w-none prose-p:text-white/75">
          {paragraphs(episode.description).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <aside className="space-y-5">
        <section className="ink-panel brand-rule p-5">
          <h2 className="brand-title text-3xl leading-none">Canon Relationship</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">
            Podcast episodes are spoken think pieces. They can test the edges of the canon, surface unresolved tensions, and suggest new notes.
          </p>
        </section>
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl leading-none text-signal">Related Notes</h2>
          <div className="mt-4 space-y-3">
            {episode.relatedNotes.length ? episode.relatedNotes.map((note) => (
              <Link key={note.slug} href={`/notes/${note.slug}`} className="block border border-white/15 bg-black p-3 hover:border-signal">
                <p className="text-xs font-black uppercase tracking-[0.22em] text-red">{note.category}</p>
                <p className="brand-title mt-2 text-2xl leading-none">{note.title}</p>
                <p className="mt-2 text-xs leading-5 text-white/45">{note.reason}</p>
              </Link>
            )) : <p className="text-sm leading-6 text-white/45">No related canon notes were matched yet.</p>}
          </div>
        </section>
      </aside>
    </main>
  );
}
