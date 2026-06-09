"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type DebateResponse = {
  disclaimer?: string;
  sections: Record<string, string | string[]>;
  relevantNotes: { slug: string; title: string; category: string; excerpt: string; url?: string }[];
};

export default function DebateForm({ initialQuestion = "" }: { initialQuestion?: string }) {
  const [question, setQuestion] = useState(initialQuestion);
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<DebateResponse | null>(null);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    const response = await fetch("/api/debate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question })
    });
    setAnswer(await response.json());
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={submit} className="ink-panel brand-rule p-5 shadow-redglow sm:p-7">
        <label className="brand-title block text-4xl leading-none">What part of Inclusionism do you disagree with?</label>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={5}
          className="mt-5 w-full border-2 border-white/25 bg-black p-4 text-base leading-7 outline-none placeholder:text-white/35 focus:border-signal"
          placeholder="Example: Does Universal Basic Ownership risk weakening individual liberty or productive incentives?"
        />
        <button className="hard-button mt-4 inline-flex items-center gap-2 px-5 py-3 text-xs disabled:opacity-60" disabled={loading}>
          <Send size={17} />
          {loading ? "Reading the canon..." : "Generate debate brief"}
        </button>
      </form>
      {answer && (
        <div className="mt-8 divide-y divide-white/15 border-y border-white/15">
          {answer.disclaimer ? <p className="py-4 text-xs leading-5 text-white/55">{answer.disclaimer}</p> : null}
          {Object.entries(answer.sections).map(([name, value]) => (
            <section key={name} className="grid gap-3 py-6 md:grid-cols-[260px_1fr]">
              <h2 className="brand-title text-3xl leading-none text-signal">{name}</h2>
              {name === "Relevant Notes" && answer.relevantNotes.length > 0 ? (
                <ul className="space-y-2 text-sm leading-6">
                  {answer.relevantNotes.map((note) => (
                    <li key={note.slug}>
                      <Link href={note.url || `/notes/${note.slug}`} className="text-white/75 underline decoration-signal/60 underline-offset-4 hover:text-signal">
                        {note.title}
                      </Link>
                      <span className="text-white/45"> - {note.category}</span>
                    </li>
                  ))}
                </ul>
              ) : Array.isArray(value) ? (
                <ul className="list-disc space-y-2 pl-5 text-sm leading-6 text-white/75">
                  {value.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p className="text-sm leading-6 text-white/75">{value}</p>
              )}
            </section>
          ))}
          <section className="py-6">
            <h2 className="brand-title text-3xl leading-none text-red">Source Excerpts</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              {answer.relevantNotes.map((note) => (
                <Link key={note.slug} href={note.url || `/notes/${note.slug}`} className="border border-white/15 bg-black p-4 hover:border-signal">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-signal">{note.category}</p>
                  <p className="brand-title mt-2 text-2xl leading-none">{note.title}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-white/55">{note.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
