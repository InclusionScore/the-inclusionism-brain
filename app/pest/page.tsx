import type { Metadata } from "next";
import Link from "next/link";
import { searchNotes } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("PEST Lens"),
  description: "Explore Inclusionism through political, economic, sociocultural, and technological questions.",
  alternates: { canonical: siteUrl("/pest") },
  openGraph: {
    title: socialTitle("PEST Lens"),
    description: "Explore Inclusionism through political, economic, sociocultural, and technological questions.",
    url: siteUrl("/pest"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

const lenses = [
  { name: "Political", prompt: "What does Inclusionism say about democracy?", query: "democracy governance legitimacy participation citizenship" },
  { name: "Economic", prompt: "What does Inclusionism say about AI ownership?", query: "AI ownership universal basic ownership value distribution labor" },
  { name: "Sociocultural", prompt: "What does Inclusionism say about race, class, and caste?", query: "race class caste belonging recognition fairness" },
  { name: "Technological", prompt: "What does Inclusionism say about transhumanism and personal data?", query: "transhumanism personal data intelligence infrastructure agency" }
];

export default function PestPage() {
  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">PEST Lens</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">Political, economic, sociocultural, and technological questions.</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">
        Use the four lenses to inspect how Inclusionism talks about power, ownership, identity, intelligence, and civilizational legitimacy.
      </p>
      <div className="mt-10 grid gap-x-8 gap-y-10 md:grid-cols-2">
        {lenses.map((lens) => {
          const notes = searchNotes(lens.query, 5);
          return (
            <section key={lens.name} className="border-t-4 border-signal pt-5">
              <p className="text-xs font-black uppercase tracking-[0.28em] text-red">{lens.name}</p>
              <h2 className="brand-title mt-3 text-4xl leading-none">{lens.prompt}</h2>
              <div className="mt-5 space-y-2">
                {notes.map((note) => (
                  <Link key={note.slug} href={`/notes/${note.slug}`} className="block border border-white/15 bg-black p-4 hover:border-signal">
                    <p className="brand-title text-2xl leading-none">{note.title}</p>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/55">{note.excerpt}</p>
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
