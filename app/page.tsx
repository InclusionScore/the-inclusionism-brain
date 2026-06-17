import Link from "next/link";
import { ArrowRight, BookOpen, GitBranch, Library } from "lucide-react";
import GraphPreview from "@/components/GraphPreview";
import { getGraph } from "@/lib/content";

export default function HomePage() {
  const graph = getGraph();

  return (
    <main className="brain-grid blueprint overflow-hidden">
      <section className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-12">
        <div className="relative z-10 max-w-4xl">
          <p className="brand-kicker">A living philosophy engine</p>
          <h1 className="brand-title mt-5 max-w-5xl text-6xl leading-[0.85] sm:text-8xl lg:text-9xl">Inclusionism</h1>
          <p className="mt-5 brand-title text-4xl leading-none text-signal sm:text-6xl">A Code of Equity</p>
          <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/80 sm:text-xl">
            A guided doorway into a canon about value, agency, ownership, legitimacy, and belonging.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/graph" className="hard-button inline-flex items-center gap-2 px-5 py-3 text-xs">
              <GitBranch size={17} />
              Explore the Graph
            </Link>
            <Link href="/what-is-inclusionism" className="outline-button inline-flex items-center gap-2 px-5 py-3 text-xs">
              <BookOpen size={17} />
              Read the Introduction
            </Link>
            <Link href="/notes" className="outline-button inline-flex items-center gap-2 px-5 py-3 text-xs">
              <Library size={17} />
              Explore the Canon
            </Link>
          </div>
        </div>

        <div className="relative z-10">
          <GraphPreview graph={graph} />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 border-y border-white/15 py-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            {[
              "A civilization is built through participation.",
              "Every interaction creates value.",
              "Value becomes meaningful when it is recognized and attributed.",
              "A just society returns value as agency to the people and communities who help create it.",
              "Inclusionism is a code of equity built around that idea."
            ].map((line) => (
              <p key={line} className="brand-title border-b border-white/10 py-3 text-3xl leading-none text-white last:border-b-0 sm:text-5xl">
                {line}
              </p>
            ))}
          </div>
          <Link href="/what-is-inclusionism" className="outline-button inline-flex items-center gap-2 px-5 py-3 text-xs">
            Start Here
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
