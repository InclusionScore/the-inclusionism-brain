import Link from "next/link";
import { searchNotes } from "@/lib/content";

const lenses = [
  { name: "Political", prompt: "What does Inclusionism say about democracy?", query: "democracy governance legitimacy participation citizenship" },
  { name: "Economic", prompt: "What does Inclusionism say about AI ownership?", query: "AI ownership universal basic ownership value distribution labor" },
  { name: "Sociocultural", prompt: "What does Inclusionism say about race, class, and caste?", query: "race class caste belonging recognition fairness" },
  { name: "Technological", prompt: "What does Inclusionism say about transhumanism and personal data?", query: "transhumanism personal data intelligence infrastructure agency" }
];

export default function PestPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm uppercase tracking-[0.3em] text-signal">PEST Lens</p>
      <h1 className="mt-3 text-4xl font-semibold">Political, economic, sociocultural, and technological questions.</h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        Use the four lenses to inspect how Inclusionism talks about power, ownership, identity, intelligence, and civilizational legitimacy.
      </p>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {lenses.map((lens) => {
          const notes = searchNotes(lens.query, 5);
          return (
            <section key={lens.name} className="rounded-md border border-white/10 bg-panel/70 p-5">
              <p className="text-sm text-signal">{lens.name}</p>
              <h2 className="mt-2 text-2xl font-semibold">{lens.prompt}</h2>
              <div className="mt-4 space-y-2">
                {notes.map((note) => (
                  <Link key={note.slug} href={`/notes/${note.slug}`} className="block rounded-md border border-white/10 bg-ink/60 p-3 hover:border-signal/60">
                    <p className="font-medium">{note.title}</p>
                    <p className="mt-1 line-clamp-2 text-sm leading-6 text-slate-400">{note.excerpt}</p>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
