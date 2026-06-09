import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExternalLink, MessageSquareText, PenLine } from "lucide-react";
import { getAllEssays, getEssay } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return getAllEssays().map((essay) => ({ slug: essay.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) return {};

  return {
    title: metadataTitle(essay.title),
    description: essay.excerpt || siteConfig.description,
    alternates: { canonical: siteUrl(`/essays/${essay.slug}`) },
    openGraph: {
      title: socialTitle(essay.title),
      description: essay.excerpt || siteConfig.description,
      url: siteUrl(`/essays/${essay.slug}`),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle(essay.title),
      description: essay.excerpt || siteConfig.description,
      images: ["/brand/og-image.png"]
    }
  };
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(value));
}

function paragraphs(content: string) {
  return content.split(/\n{2,}/).map((paragraph) => paragraph.trim()).filter(Boolean).slice(0, 24);
}

function debatePrompt(title: string, excerpt: string) {
  return `Debate this Inclusionism essay as a think piece that may evolve the canon: "${title}".\n\nEssay excerpt:\n${excerpt}`;
}

function canonUpdatePrompt(title: string, excerpt: string) {
  return `Suggest canon updates based on this Inclusionism essay: "${title}".\n\nIdentify what notes should change, what unresolved questions should be added, and what claims need stronger support.\n\nEssay excerpt:\n${excerpt}`;
}

export default async function EssayPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const essay = getEssay(slug);
  if (!essay) notFound();

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_360px]">
      <article className="max-w-4xl">
        <p className="brand-kicker">Essay / {formatDate(essay.date)}</p>
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{essay.title}</h1>
        <p className="mt-6 max-w-3xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">
          {essay.excerpt}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={`/debate?question=${encodeURIComponent(debatePrompt(essay.title, essay.excerpt))}`} className="hard-button inline-flex items-center gap-2 px-4 py-3 text-xs">
            <MessageSquareText size={16} />
            Debate this essay
          </Link>
          <Link href={`/debate?question=${encodeURIComponent(canonUpdatePrompt(essay.title, essay.excerpt))}`} className="outline-button inline-flex items-center gap-2 px-4 py-3 text-xs">
            <PenLine size={16} />
            Suggest Canon Updates
          </Link>
          <a href={essay.link} target="_blank" rel="noreferrer" className="outline-button inline-flex items-center gap-2 px-4 py-3 text-xs">
            <ExternalLink size={16} />
            Original Substack
          </a>
        </div>

        <div className="prose prose-invert mt-10 max-w-none prose-p:text-white/75">
          {paragraphs(essay.content).map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>

      <aside className="space-y-5">
        <section className="ink-panel brand-rule p-5">
          <h2 className="brand-title text-3xl leading-none">Canon Relationship</h2>
          <p className="mt-3 text-sm leading-6 text-white/60">
            Essays are not treated as settled doctrine. They are think pieces that can pressure-test, extend, or revise the Inclusionism canon.
          </p>
        </section>
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl leading-none text-signal">Related Notes</h2>
          <div className="mt-4 space-y-3">
            {essay.relatedNotes.length ? essay.relatedNotes.map((note) => (
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
