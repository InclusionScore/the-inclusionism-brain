import Link from "next/link";
import { ArrowRight, BookOpen, GitBranch, Library } from "lucide-react";
import GraphPreview from "@/components/GraphPreview";
import { getGraph } from "@/lib/content";

export default function HomePage() {
  const graph = getGraph();

  return (
    <main className="brain-grid blueprint overflow-hidden">
      <section className="relative mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-6 md:py-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative z-10 min-w-0 max-w-[calc(100vw-2rem)] sm:max-w-3xl">
          <p className="brand-kicker">A living philosophy engine</p>
          <h1 className="brand-title mt-4 max-w-4xl text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">Inclusionism</h1>
          <p className="mt-4 text-2xl font-black leading-tight text-signal sm:text-3xl">A Code of Equity</p>
          <p className="mt-4 max-w-xs text-base font-semibold leading-7 text-white/78 sm:max-w-2xl sm:text-lg">
            A guided doorway into a canon about value, agency, ownership, legitimacy, and belonging.
          </p>
          <div className="mt-6 grid max-w-xs gap-3 sm:flex sm:max-w-none sm:flex-wrap">
            <Link href="/graph" className="hard-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-[0.72rem] sm:w-auto">
              <GitBranch size={17} />
              Explore the Graph
            </Link>
            <Link href="/what-is-inclusionism" className="outline-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-[0.72rem] sm:w-auto">
              <BookOpen size={17} />
              Read the Introduction
            </Link>
            <Link href="/notes" className="outline-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-[0.72rem] sm:w-auto">
              <Library size={17} />
              Explore the Canon
            </Link>
          </div>
        </div>

        <div className="relative z-10 min-w-0 max-w-[calc(100vw-2rem)] sm:max-w-none">
          <GraphPreview graph={graph} />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="grid gap-5 border-y border-white/15 py-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xs sm:max-w-3xl">
            {[
              "A civilization is built through participation.",
              "Every interaction creates value.",
              "Value becomes meaningful when it is recognized and attributed.",
              "A just society returns value as agency to the people and communities who help create it.",
              "Inclusionism is a code of equity built around that idea."
            ].map((line) => (
              <p key={line} className="border-b border-white/10 py-3 text-lg font-semibold leading-7 text-white/88 last:border-b-0 sm:text-2xl sm:leading-9">
                {line}
              </p>
            ))}
          </div>
          <Link href="/what-is-inclusionism" className="outline-button inline-flex w-fit items-center gap-2 px-4 py-3 text-[0.72rem]">
            Start Here
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
