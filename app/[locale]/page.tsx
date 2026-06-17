import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, BookOpen, GitBranch, Library } from "lucide-react";
import GraphPreview from "@/components/GraphPreview";
import { getGraph } from "@/lib/content";
import { isLocale, localePath, type Locale, t } from "@/lib/i18n";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(t).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const labels = t[locale];
  return {
    title: metadataTitle(labels.home.title),
    description: labels.meta.home,
    alternates: { canonical: siteUrl(localePath(locale, "/")) },
    openGraph: {
      title: socialTitle(labels.home.title),
      description: labels.meta.home,
      url: siteUrl(localePath(locale, "/")),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    }
  };
}

export default async function LocalizedHomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = t[locale];
  const graph = getGraph();

  return (
    <main className="brain-grid blueprint overflow-hidden">
      <section className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:py-12">
        <div className="relative z-10 max-w-4xl">
          <p className="brand-kicker">{labels.home.kicker}</p>
          <h1 className="brand-title mt-5 max-w-5xl text-6xl leading-[0.85] sm:text-8xl lg:text-9xl">{labels.home.title}</h1>
          <p className="mt-5 brand-title text-4xl leading-none text-signal sm:text-6xl">{labels.home.subtitle}</p>
          <p className="mt-6 max-w-2xl text-lg font-bold leading-8 text-white/80 sm:text-xl">{labels.home.description}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={localePath(locale as Locale, "/graph")} className="hard-button inline-flex items-center gap-2 px-5 py-3 text-xs">
              <GitBranch size={17} />
              {labels.home.graph}
            </Link>
            <Link href={localePath(locale as Locale, "/what-is-inclusionism")} className="outline-button inline-flex items-center gap-2 px-5 py-3 text-xs">
              <BookOpen size={17} />
              {labels.home.introduction}
            </Link>
            <Link href={localePath(locale as Locale, "/notes")} className="outline-button inline-flex items-center gap-2 px-5 py-3 text-xs">
              <Library size={17} />
              {labels.home.canon}
            </Link>
          </div>
        </div>

        <div className="relative z-10">
          <GraphPreview graph={graph} href={localePath(locale as Locale, "/graph")} />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="grid gap-4 border-y border-white/15 py-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-4xl">
            {labels.home.narrative.map((line) => (
              <p key={line} className="brand-title border-b border-white/10 py-3 text-3xl leading-none text-white last:border-b-0 sm:text-5xl">
                {line}
              </p>
            ))}
          </div>
          <Link href={localePath(locale as Locale, "/what-is-inclusionism")} className="outline-button inline-flex items-center gap-2 px-5 py-3 text-xs">
            {labels.home.startHere}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
