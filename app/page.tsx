import Link from "next/link";
import { GitBranch, Library, MessageSquareText } from "lucide-react";

const dynamicChain = ["Interaction", "Value", "Recognition", "Agency", "Legitimacy", "Fairness", "Belonging"];

export default function HomePage() {
  return (
    <main className="brain-grid">
      <section className="mx-auto flex min-h-[calc(100vh-65px)] max-w-7xl flex-col justify-center px-4 py-16 sm:px-6">
        <div className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.3em] text-signal">A living philosophy engine</p>
          <h1 className="mt-5 text-5xl font-semibold tracking-tight sm:text-7xl">The Inclusionism Brain</h1>
          <p className="mt-6 max-w-3xl text-xl leading-8 text-slate-300">
            Explore, challenge, and debate a living framework for value, agency, equity, and belonging.
          </p>
          <p className="mt-5 max-w-4xl text-base leading-7 text-slate-400">
            Inclusionism is a framework for understanding how differentiated agents generate value through interaction and how civilizations
            recognize, attribute, distribute, and legitimate that value.
          </p>
        </div>

        <div className="mt-10 grid gap-3 md:grid-cols-3">
          {[
            { href: "/graph", label: "Explore the Graph", icon: GitBranch },
            { href: "/notes", label: "Read the Canon", icon: Library },
            { href: "/debate", label: "Debate Inclusionism", icon: MessageSquareText }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="group rounded-md border border-white/10 bg-panel/80 p-6 hover:border-signal/70">
                <Icon className="text-signal" size={28} />
                <span className="mt-8 block text-2xl font-semibold">{action.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 rounded-md border border-white/10 bg-ink/70 p-4">
          <div className="flex flex-wrap items-center gap-2">
            {dynamicChain.map((item, index) => (
              <div key={item} className="flex items-center gap-2">
                <span className="rounded-md border border-signal/30 bg-signal/10 px-3 py-2 text-sm font-medium text-slate-100">{item}</span>
                {index < dynamicChain.length - 1 && <span className="text-gold">→</span>}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
