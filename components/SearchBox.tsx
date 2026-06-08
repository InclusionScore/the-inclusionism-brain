"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { SearchEntry } from "@/lib/types";

export default function SearchBox({ entries }: { entries: SearchEntry[] }) {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    if (!terms.length) return entries.slice(0, 30);
    return entries
      .map((entry) => ({
        entry,
        score: terms.reduce((score, term) => score + (entry.title.toLowerCase().includes(term) ? 8 : entry.text.includes(term) ? 1 : 0), 0)
      }))
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 40)
      .map((item) => item.entry);
  }, [entries, query]);

  return (
    <div>
      <label className="flex items-center gap-3 rounded-md border border-white/10 bg-panel px-4 py-3">
        <Search className="text-signal" size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search value, agency, ownership, AI, democracy..."
          className="w-full bg-transparent text-base outline-none placeholder:text-slate-500"
        />
      </label>
      <div className="mt-6 grid gap-3 md:grid-cols-2">
        {results.map((entry) => (
          <Link key={entry.slug} href={`/notes/${entry.slug}`} className="rounded-md border border-white/10 bg-panel/70 p-4 hover:border-signal/60">
            <p className="text-xs text-signal">{entry.category}</p>
            <h2 className="mt-2 text-lg font-semibold">{entry.title}</h2>
            <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{entry.excerpt}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
