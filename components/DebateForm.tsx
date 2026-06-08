"use client";

import Link from "next/link";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";

type DebateResponse = {
  sections: Record<string, string | string[]>;
  relevantNotes: { slug: string; title: string; category: string; excerpt: string }[];
};

export default function DebateForm() {
  const [question, setQuestion] = useState("");
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
      <form onSubmit={submit} className="rounded-md border border-white/10 bg-panel/80 p-4 shadow-glow">
        <label className="text-lg font-semibold">What part of Inclusionism do you disagree with?</label>
        <textarea
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          rows={5}
          className="mt-4 w-full rounded-md border border-white/10 bg-ink p-4 text-sm leading-6 outline-none focus:border-signal"
          placeholder="Example: Does Universal Basic Ownership risk weakening individual liberty or productive incentives?"
        />
        <button className="mt-4 inline-flex items-center gap-2 rounded-md bg-signal px-5 py-3 font-semibold text-ink disabled:opacity-60" disabled={loading}>
          <Send size={17} />
          {loading ? "Reading the canon..." : "Generate debate brief"}
        </button>
      </form>
      {answer && (
        <div className="mt-8 grid gap-4">
          {Object.entries(answer.sections).map(([name, value]) => (
            <section key={name} className="rounded-md border border-white/10 bg-panel/70 p-5">
              <h2 className="text-xl font-semibold">{name}</h2>
              {Array.isArray(value) ? (
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-300">
                  {value.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p className="mt-3 text-sm leading-6 text-slate-300">{value}</p>
              )}
            </section>
          ))}
          <section className="rounded-md border border-white/10 bg-panel/70 p-5">
            <h2 className="text-xl font-semibold">Relevant Notes</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              {answer.relevantNotes.map((note) => (
                <Link key={note.slug} href={`/notes/${note.slug}`} className="rounded-md border border-white/10 bg-ink/70 p-3 hover:border-signal/60">
                  <p className="text-xs text-signal">{note.category}</p>
                  <p className="mt-1 font-medium">{note.title}</p>
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">{note.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
