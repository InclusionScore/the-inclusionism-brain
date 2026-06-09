import Link from "next/link";
import type { Metadata } from "next";
import { getCandidateNotes } from "@/lib/content";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Under Development"),
  description: "Candidate Inclusionism notes that are visible for review but not yet settled canon.",
  alternates: { canonical: siteUrl("/under-development") },
  openGraph: {
    title: socialTitle("Under Development"),
    description: "Candidate Inclusionism notes that are visible for review but not yet settled canon.",
    url: siteUrl("/under-development"),
    siteName: siteConfig.name,
    images: ["/brand/og-image.png"]
  }
};

export default function UnderDevelopmentPage() {
  const candidates = getCandidateNotes();

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">Canon Workflow</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">Under Development</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-signal pl-5 text-white/70">
        Candidate notes are visible for review, critique, and refinement. They may evolve into canon, remain unresolved, or be deprecated.
      </p>

      <section className="mt-8 grid gap-3 md:grid-cols-4">
        {["Draft", "Candidate", "Canon", "Deprecated"].map((status) => (
          <div key={status} className="border border-white/15 bg-black p-4">
            <p className="brand-title text-3xl leading-none text-signal">{status}</p>
            <p className="mt-3 text-xs leading-5 text-white/50">
              {status === "Draft" && "Private working material."}
              {status === "Candidate" && "Publicly reviewable, not settled doctrine."}
              {status === "Canon" && "Published as settled public canon."}
              {status === "Deprecated" && "Retired from public doctrine."}
            </p>
          </div>
        ))}
      </section>

      {candidates.length ? (
        <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
          {candidates.map((note) => (
            <article key={note.slug} className="grid gap-4 py-6 md:grid-cols-[1fr_180px]">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.24em] text-signal">{note.category}</p>
                <Link href={`/notes/${note.slug}`} className="group mt-3 block">
                  <h2 className="brand-title text-4xl leading-none group-hover:text-signal sm:text-5xl">{note.title}</h2>
                </Link>
                <p className="mt-3 max-w-3xl text-sm leading-6 text-white/60">{note.excerpt}</p>
              </div>
              <div className="md:text-right">
                <Link href={`/notes/${note.slug}`} className="outline-button inline-block px-4 py-3 text-xs">
                  Review Candidate
                </Link>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <section className="ink-panel brand-rule mt-10 p-6">
          <h2 className="brand-title text-4xl leading-none">No candidate notes yet.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-white/65">
            Add `status: Candidate` to a note's frontmatter to make it visible here without presenting it as settled canon.
          </p>
        </section>
      )}
    </main>
  );
}
