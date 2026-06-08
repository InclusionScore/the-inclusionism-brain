import SearchBox from "@/components/SearchBox";
import { getSearchIndex } from "@/lib/content";

export default function NotesPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm uppercase tracking-[0.3em] text-signal">Canon reader</p>
      <h1 className="mt-3 text-4xl font-semibold">Read the Inclusionism Canon</h1>
      <p className="mt-4 max-w-3xl text-slate-300">
        Search titles and note bodies across the vault. Wikilinks inside notes become internal links, with backlinks and related notes shown below each entry.
      </p>
      <div className="mt-8">
        <SearchBox entries={getSearchIndex()} />
      </div>
    </main>
  );
}
