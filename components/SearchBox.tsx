"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { SearchEntry } from "@/lib/types";

export default function SearchBox({ entries, placeholder = "Search value, agency, ownership, AI, democracy...", noteHrefPrefix = "/notes" }: { entries: SearchEntry[]; placeholder?: string; noteHrefPrefix?: string }) {
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
      <label className="flex items-center gap-3 border-2 border-white bg-black px-4 py-4 focus-within:border-signal">
        <Search className="text-signal" size={20} />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-base font-bold outline-none placeholder:text-white/35"
        />
      </label>
      <div className="mt-7 divide-y divide-white/15 border-y border-white/15">
        {results.map((entry) => (
          <Link key={entry.slug} href={`${noteHrefPrefix}/${entry.slug}`} className="grid gap-3 py-5 transition hover:bg-white hover:px-4 hover:text-black md:grid-cols-[220px_1fr]">
            <p className="text-xs font-black uppercase tracking-[0.24em] text-signal">{entry.category}</p>
            <div>
              <h2 className="brand-title text-3xl leading-none">{entry.title}</h2>
              <p className="mt-2 line-clamp-3 text-sm leading-6 opacity-70">{entry.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
