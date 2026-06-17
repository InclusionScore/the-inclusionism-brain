import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GitCompareArrows } from "lucide-react";
import { comparisonAxes, dynamicChain, getFrameworkGroups } from "@/lib/frameworks";
import { isLocale, localePath, t } from "@/lib/i18n";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(t).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const labels = t[locale];
  return {
    title: metadataTitle(labels.nav.compare),
    description: labels.meta.compare,
    alternates: { canonical: siteUrl(localePath(locale, "/compare")) },
    openGraph: {
      title: socialTitle(labels.nav.compare),
      description: labels.meta.compare,
      url: siteUrl(localePath(locale, "/compare")),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    }
  };
}

export default async function LocalizedComparePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = t[locale];
  const groups = getFrameworkGroups();

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">{labels.compare.kicker}</p>
      <h1 className="brand-title mt-3 max-w-6xl text-5xl leading-none sm:text-8xl">{labels.compare.title}</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-lg leading-8 text-white/70">{labels.compare.description}</p>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-white/55">{labels.compare.moral}</p>

      <section className="mt-10 grid gap-4 lg:grid-cols-4">
        {comparisonAxes.map((axis) => (
          <div key={axis.key} className="border border-white/15 bg-black p-4">
            <p className="brand-title text-3xl leading-none text-signal">{labels.compare[axis.key]}</p>
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
        <p className="text-xs font-black uppercase tracking-[0.32em] text-red">{labels.common.coreDynamic}</p>
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
