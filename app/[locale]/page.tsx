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
      <section className="relative mx-auto grid max-w-7xl gap-7 px-4 py-7 sm:px-6 md:py-9 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div className="relative z-10 min-w-0 max-w-[calc(100vw-2rem)] sm:max-w-3xl">
          <p className="brand-kicker">{labels.home.kicker}</p>
          <h1 className="brand-title mt-4 max-w-4xl text-4xl leading-[0.95] sm:text-6xl lg:text-7xl">{labels.home.title}</h1>
          <p className="mt-4 text-2xl font-black leading-tight text-signal sm:text-3xl">{labels.home.subtitle}</p>
          <p className="mt-4 max-w-xs text-base font-semibold leading-7 text-white/78 sm:max-w-2xl sm:text-lg">{labels.home.description}</p>
          <div className="mt-6 grid max-w-xs gap-3 sm:flex sm:max-w-none sm:flex-wrap">
            <Link href={localePath(locale as Locale, "/graph")} className="hard-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-[0.72rem] sm:w-auto">
              <GitBranch size={17} />
              {labels.home.graph}
            </Link>
            <Link href={localePath(locale as Locale, "/what-is-inclusionism")} className="outline-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-[0.72rem] sm:w-auto">
              <BookOpen size={17} />
              {labels.home.introduction}
            </Link>
            <Link href={localePath(locale as Locale, "/notes")} className="outline-button inline-flex w-full items-center justify-center gap-2 px-4 py-3 text-[0.72rem] sm:w-auto">
              <Library size={17} />
              {labels.home.canon}
            </Link>
          </div>
        </div>

        <div className="relative z-10 min-w-0 max-w-[calc(100vw-2rem)] sm:max-w-none">
          <GraphPreview graph={graph} href={localePath(locale as Locale, "/graph")} />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <div className="grid gap-5 border-y border-white/15 py-7 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xs sm:max-w-3xl">
            {labels.home.narrative.map((line) => (
              <p key={line} className="border-b border-white/10 py-3 text-lg font-semibold leading-7 text-white/88 last:border-b-0 sm:text-2xl sm:leading-9">
                {line}
              </p>
            ))}
          </div>
          <Link href={localePath(locale as Locale, "/what-is-inclusionism")} className="outline-button inline-flex w-fit items-center gap-2 px-4 py-3 text-[0.72rem]">
            {labels.home.startHere}
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
