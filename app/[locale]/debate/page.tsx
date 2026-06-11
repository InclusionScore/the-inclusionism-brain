import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DebateForm from "@/components/DebateForm";
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
    title: metadataTitle(labels.nav.debate),
    description: labels.meta.debate,
    alternates: { canonical: siteUrl(localePath(locale, "/debate")) },
    openGraph: {
      title: socialTitle(labels.nav.debate),
      description: labels.meta.debate,
      url: siteUrl(localePath(locale, "/debate")),
      siteName: siteConfig.name,
      images: ["/brand/og-image.png"]
    }
  };
}

export default async function LocalizedDebatePage({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams?: Promise<{ question?: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = t[locale];
  const resolvedSearchParams = await searchParams;

  return (
    <main className="brain-grid mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">{labels.debate.kicker}</p>
      <h1 className="brand-title mt-3 max-w-5xl text-5xl leading-none sm:text-8xl">{labels.debate.title}</h1>
      <p className="mt-5 max-w-3xl border-l-4 border-red pl-5 text-white/70">{labels.debate.description}</p>
      <div className="mt-8">
        <DebateForm initialQuestion={resolvedSearchParams?.question || ""} labels={labels.debate} />
      </div>
    </main>
  );
}
