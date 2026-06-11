import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SearchBox from "@/components/SearchBox";
import { getSearchIndex } from "@/lib/content";
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
    title: metadataTitle(labels.nav.canon),
    description: labels.meta.notes,
    alternates: { canonical: siteUrl(localePath(locale, "/notes")) },
    openGraph: {
      title: socialTitle(labels.nav.canon),
      description: labels.meta.notes,
      url: siteUrl(localePath(locale, "/notes")),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    }
  };
}

export default async function LocalizedNotesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = t[locale];

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">{labels.notes.kicker}</p>
      <h1 className="brand-title mt-3 text-5xl leading-none sm:text-8xl">{labels.notes.title}</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">{labels.notes.description}</p>
      <p className="mt-4 max-w-3xl text-sm leading-6 text-white/50">{labels.common.sourceLanguage}</p>
      <Link href={localePath(locale, "/under-development")} className="outline-button mt-6 inline-block px-4 py-3 text-xs">
        {labels.notes.underDevelopment}
      </Link>
      <div className="mt-8">
        <SearchBox entries={getSearchIndex()} placeholder={labels.notes.placeholder} noteHrefPrefix={localePath(locale, "/notes")} />
      </div>
    </main>
  );
}
