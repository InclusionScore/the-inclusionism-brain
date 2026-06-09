import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllNotes, getNote, renderNoteMarkdown } from "@/lib/content";

export function generateStaticParams() {
  return getAllNotes().map((note) => ({ slug: note.slug }));
}

export default async function NotePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const note = getNote(slug);
  if (!note) notFound();
  const html = renderNoteMarkdown(note);
  const related = [...note.links, ...note.backlinks].filter((item, index, list) => list.findIndex((other) => other.slug === item.slug) === index);

  return (
    <main className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
      <article className="max-w-4xl">
        <p className="brand-kicker">{note.category}</p>
        <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{note.title}</h1>
        <div className="prose prose-invert mt-8 max-w-none prose-headings:brand-title prose-headings:font-black prose-headings:text-white prose-p:text-white/75 prose-li:text-white/75 prose-hr:border-white/15" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <aside className="space-y-5">
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl">Backlinks</h2>
          <div className="mt-3 space-y-2">
            {note.backlinks.length ? note.backlinks.map((link) => (
              <Link key={link.slug} href={`/notes/${link.slug}`} className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
                {link.title}
              </Link>
            )) : <p className="text-sm text-white/45">No backlinks yet.</p>}
          </div>
        </section>
        <section className="ink-panel p-5">
          <h2 className="brand-title text-3xl">Related Notes</h2>
          <div className="mt-3 space-y-2">
            {related.slice(0, 14).map((link) => (
              <Link key={link.slug} href={`/notes/${link.slug}`} className="block border border-white/15 bg-black px-3 py-2 text-sm font-bold hover:border-signal hover:text-signal">
                {link.title}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}
