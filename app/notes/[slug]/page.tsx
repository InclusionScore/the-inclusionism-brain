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
    <main className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_320px]">
      <article>
        <p className="text-sm uppercase tracking-[0.3em] text-signal">{note.category}</p>
        <h1 className="mt-3 text-4xl font-semibold">{note.title}</h1>
        <div className="prose prose-invert mt-8 max-w-none prose-headings:text-white prose-hr:border-white/10" dangerouslySetInnerHTML={{ __html: html }} />
      </article>
      <aside className="space-y-5">
        <section className="rounded-md border border-white/10 bg-panel/70 p-5">
          <h2 className="font-semibold">Backlinks</h2>
          <div className="mt-3 space-y-2">
            {note.backlinks.length ? note.backlinks.map((link) => (
              <Link key={link.slug} href={`/notes/${link.slug}`} className="block rounded-md border border-white/10 bg-ink/60 px-3 py-2 text-sm hover:border-signal/60">
                {link.title}
              </Link>
            )) : <p className="text-sm text-slate-400">No backlinks yet.</p>}
          </div>
        </section>
        <section className="rounded-md border border-white/10 bg-panel/70 p-5">
          <h2 className="font-semibold">Related Notes</h2>
          <div className="mt-3 space-y-2">
            {related.slice(0, 14).map((link) => (
              <Link key={link.slug} href={`/notes/${link.slug}`} className="block rounded-md border border-white/10 bg-ink/60 px-3 py-2 text-sm hover:border-signal/60">
                {link.title}
              </Link>
            ))}
          </div>
        </section>
      </aside>
    </main>
  );
}
