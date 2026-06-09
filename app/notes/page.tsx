import SearchBox from "@/components/SearchBox";
import { getSearchIndex } from "@/lib/content";

export default function NotesPage() {
  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">Canon reader</p>
      <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">Read the Inclusionism Canon</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">
        Search titles and note bodies across the vault. Wikilinks inside notes become internal links, with backlinks and related notes shown below each entry.
      </p>
      <div className="mt-8">
        <SearchBox entries={getSearchIndex()} />
      </div>
    </main>
  );
}
