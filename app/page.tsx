import Link from "next/link";
import { GitBranch, Library, MessageSquareText } from "lucide-react";

const dynamicChain = ["Interaction", "Value", "Recognition", "Agency", "Legitimacy", "Fairness", "Belonging"];

export default function HomePage() {
  return (
    <main className="brain-grid blueprint overflow-hidden">
      <section className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="max-w-5xl">
          <p className="brand-kicker">A living philosophy engine</p>
          <h1 className="brand-title mt-5 max-w-5xl text-5xl leading-[0.9] sm:text-8xl lg:text-9xl">The Inclusionism Brain</h1>
          <p className="mt-7 max-w-3xl text-2xl font-bold leading-9 text-white">
            A framework for value, agency, legitimacy, fairness, and belonging.
          </p>
          <p className="mt-5 max-w-4xl border-l-4 border-signal pl-5 text-base leading-7 text-white/70 sm:text-lg">
            Inclusionism explains how differentiated agents generate value through interaction, and how civilizations recognize, attribute,
            distribute, and legitimate that value.
          </p>
        </div>

        <div className="ink-panel brand-rule p-5 lg:p-6">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-red">Core dynamic</p>
          <div className="mt-5 grid gap-2">
            {dynamicChain.map((item, index) => (
              <div key={item} className="grid grid-cols-[1fr_auto] items-center border-b border-white/15 py-2 last:border-b-0">
                <span className="brand-title text-xl sm:text-2xl">{item}</span>
                {index < dynamicChain.length - 1 && <span className="text-2xl font-black text-signal">→</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-3 lg:col-span-2">
          {[
            { href: "/graph", label: "Explore the Graph", icon: GitBranch },
            { href: "/notes", label: "Read the Canon", icon: Library },
            { href: "/debate", label: "Debate Inclusionism", icon: MessageSquareText }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={action.href} className="group ink-panel p-6 transition hover:-translate-y-1 hover:border-signal hover:shadow-glow">
                <Icon className="text-signal" size={30} />
                <span className="brand-title mt-8 block text-3xl">{action.label}</span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
