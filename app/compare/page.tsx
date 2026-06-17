import Link from "next/link";
import type { Metadata } from "next";
import { GitCompareArrows } from "lucide-react";
import { comparisonAxes, dynamicChain, getFrameworkGroups } from "@/lib/frameworks";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export const metadata: Metadata = {
  title: metadataTitle("Compare Frameworks"),
  description: "Compare Inclusionism with political, economic, and future-oriented frameworks across value, attribution, ownership, agency, equity, and belonging.",
  alternates: { canonical: siteUrl("/compare") },
  openGraph: {
    title: socialTitle("Compare Frameworks"),
    description: "Compare Inclusionism with political, economic, and future-oriented frameworks across value, attribution, ownership, agency, equity, and belonging.",
    url: siteUrl("/compare"),
    siteName: siteConfig.name,
    images: ["/brand/inclusionism-logo-border.png"]
  }
};

export default function ComparePage() {
  const groups = getFrameworkGroups();

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">Compare Frameworks</p>
      <h1 className="brand-title mt-3 max-w-6xl text-5xl leading-none sm:text-8xl">A civilizational framework map.</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">
        Inclusionism does not seek to win by proving every other philosophy wrong. Philosophies win by explaining more phenomena with fewer contradictions.
        Inclusionism should be tested against other frameworks by asking whether it better explains how value and agency remain connected through attribution,
        ownership, equity, legitimacy, fairness, belonging, AI, democracy, race, class, and civilization.
      </p>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-white/55">
        Inclusionism may be left of progressive in moral orientation, but it is presented here as a broader civilizational framework rather than merely another
        left-wing ideology.
      </p>

      <section className="mt-10 grid gap-4 lg:grid-cols-4">
        {comparisonAxes.map((axis) => (
          <div key={axis.key} className="border border-white/15 bg-black p-4">
            <p className="brand-title text-3xl leading-none text-signal">{axis.label}</p>
            <div className="mt-5 h-2 border border-white/30 bg-white/10">
              <div className="h-full w-[82%] bg-signal" />
            </div>
            <div className="mt-3 flex justify-between gap-3 text-[0.65rem] font-black uppercase tracking-[0.16em] text-white/50">
              <span>{axis.left}</span>
              <span className="text-right">{axis.right}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-10 border-y border-white/15 py-6">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-red">Social dynamic</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3 lg:grid-cols-9">
          {dynamicChain.map((item, index) => (
            <div key={item} className="grid min-h-24 border border-white/15 bg-black p-3">
              <span className="brand-title text-2xl leading-none">{item}</span>
              {index < dynamicChain.length - 1 ? <span className="self-end text-2xl font-black text-signal">→</span> : null}
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10 space-y-10">
        {groups.map((group) => (
          <section key={group.name}>
            <div className="flex items-end justify-between border-b-2 border-white pb-3">
              <h2 className="brand-title text-4xl leading-none sm:text-5xl">{group.name}</h2>
              <GitCompareArrows className="text-signal" size={28} />
            </div>
            <div className="mt-4 grid gap-0 border-l border-t border-white/15 md:grid-cols-2 lg:grid-cols-3">
              {group.items.map((framework) => (
                <Link key={`${group.name}-${framework.slug}`} href={`/compare/${framework.slug}`} className="group min-h-56 border-b border-r border-white/15 bg-black p-5 hover:bg-white hover:text-black">
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-red group-hover:text-black">{framework.group}</p>
                  <h3 className="brand-title mt-4 text-4xl leading-none group-hover:text-black">{framework.name}</h3>
                  <p className="mt-4 text-sm leading-6 text-white/60 group-hover:text-black/70">{framework.coreDistinction}</p>
                </Link>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
