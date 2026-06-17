import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { dynamicChain } from "@/lib/frameworks";
import { isLocale, localePath, t } from "@/lib/i18n";
import { issueLandings } from "@/lib/issues";
import { metadataTitle, siteConfig, siteUrl, socialTitle } from "@/lib/site";

export function generateStaticParams() {
  return Object.keys(t).map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const labels = t[locale];
  return {
    title: metadataTitle(labels.common.whatIs),
    description: labels.meta.home,
    alternates: { canonical: siteUrl(localePath(locale, "/what-is-inclusionism")) },
    openGraph: {
      title: socialTitle(labels.common.whatIs),
      description: labels.meta.home,
      url: siteUrl(localePath(locale, "/what-is-inclusionism")),
      siteName: siteConfig.name,
      images: ["/brand/inclusionism-logo-border.png"]
    }
  };
}

export default async function LocalizedWhatIsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const labels = t[locale];

  return (
    <main className="brain-grid mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="brand-kicker">{labels.home.kicker}</p>
      <h1 className="brand-title mt-3 max-w-6xl text-5xl leading-none sm:text-8xl">{labels.common.whatIs}</h1>
      <p className="mt-6 max-w-4xl border-l-4 border-signal pl-5 text-xl font-bold leading-9 text-white">{labels.home.description}</p>
      <p className="mt-5 max-w-3xl text-sm leading-6 text-white/55">{labels.common.sourceLanguage}</p>
      <section className="mt-10 border-y border-white/15 py-6">
        <p className="text-xs font-black uppercase tracking-[0.32em] text-red">{labels.common.coreDynamic}</p>
        <div className="mt-4 grid gap-2 md:grid-cols-3 lg:grid-cols-9">
          {dynamicChain.map((item) => (
            <div key={item} className="grid min-h-24 border border-white/15 bg-black p-3">
              <span className="brand-title text-2xl leading-none">{item}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="mt-10 grid gap-3 md:grid-cols-4">
        {issueLandings.map((issue) => (
          <Link key={issue.slug} href={localePath(locale, `/issues/${issue.slug}`)} className="border border-white/15 bg-black p-4 hover:border-signal">
            <p className="brand-title text-3xl leading-none">{issue.title}</p>
            <p className="mt-3 line-clamp-3 text-xs leading-5 text-white/50">{issue.question}</p>
          </Link>
        ))}
      </section>
      <section className="mt-10 flex flex-wrap gap-3">
        <Link href={localePath(locale, "/compare")} className="hard-button px-5 py-3 text-xs">{labels.common.compareFrameworks}</Link>
        <Link href={localePath(locale, "/notes")} className="outline-button px-5 py-3 text-xs">{labels.common.readCanon}</Link>
        <Link href={localePath(locale, "/debate")} className="outline-button px-5 py-3 text-xs">{labels.common.debateInclusionism}</Link>
      </section>
    </main>
  );
}
