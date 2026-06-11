import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Compass, GitBranch, GitCompareArrows, Headphones, Library, MessageSquareText, Newspaper } from "lucide-react";
import { dynamicChain } from "@/lib/frameworks";
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

  return (
    <main className="brain-grid blueprint overflow-hidden">
      <section className="relative mx-auto grid min-h-[calc(100vh-65px)] max-w-7xl gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center">
        <div className="max-w-5xl">
          <p className="brand-kicker">{labels.home.kicker}</p>
          <h1 className="brand-title mt-5 max-w-5xl text-5xl leading-[0.9] sm:text-8xl lg:text-9xl">{labels.home.title}</h1>
          <p className="mt-7 max-w-3xl text-2xl font-bold leading-9 text-white">{labels.home.subtitle}</p>
          <p className="mt-5 max-w-4xl border-l-4 border-signal pl-5 text-base leading-7 text-white/70 sm:text-lg">{labels.home.description}</p>
        </div>

        <div className="ink-panel brand-rule p-5 lg:p-6">
          <p className="text-xs font-black uppercase tracking-[0.32em] text-red">{labels.common.coreDynamic}</p>
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
            { href: "/what-is-inclusionism", label: labels.common.whatIs, icon: Compass },
            { href: "/graph", label: labels.home.graph, icon: GitBranch },
            { href: "/compare", label: labels.common.compareFrameworks, icon: GitCompareArrows },
            { href: "/issues", label: labels.home.issues, icon: Library },
            { href: "/notes", label: labels.common.readCanon, icon: Library },
            { href: "/essays", label: labels.home.essays, icon: Newspaper },
            { href: "/podcast", label: labels.home.podcast, icon: Headphones },
            { href: "/debate", label: labels.common.debateInclusionism, icon: MessageSquareText }
          ].map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.href} href={localePath(locale as Locale, action.href)} className="group ink-panel p-6 transition hover:-translate-y-1 hover:border-signal hover:shadow-glow">
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
