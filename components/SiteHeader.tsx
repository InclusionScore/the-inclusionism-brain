"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, GitBranch, GitCompareArrows, Headphones, Library, MessageSquareText, Newspaper, Search } from "lucide-react";
import { isLocale, localeNames, localePath, locales, type Locale, t } from "@/lib/i18n";

const nav = [
  { href: "/what-is-inclusionism", key: "whatIs", icon: Compass },
  { href: "/graph", key: "graph", icon: GitBranch },
  { href: "/compare", key: "compare", icon: GitCompareArrows },
  { href: "/issues", key: "issues", icon: Library },
  { href: "/notes", key: "canon", icon: Search },
  { href: "/essays", key: "essays", icon: Newspaper },
  { href: "/podcast", key: "podcast", icon: Headphones },
  { href: "/debate", key: "debate", icon: MessageSquareText },
  { href: "/pest", key: "pest", icon: Library }
] as const;

function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : "en";
}

function pathWithoutLocale(pathname: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts[0] && isLocale(parts[0])) return `/${parts.slice(1).join("/")}`;
  return pathname || "/";
}

export default function SiteHeader() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);
  const labels = t[locale];
  const basePath = pathWithoutLocale(pathname);

  return (
    <header className="sticky top-0 z-40 border-b border-white/12 bg-black/92 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2.5 sm:px-5">
        <Link href={localePath(locale, "/")} className="flex shrink-0 items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center border border-white bg-white text-xl font-black leading-none text-black sm:h-9 sm:w-9" aria-label="Inclusionism logo">
            ≥
          </span>
          <span className="brand-title text-base leading-none tracking-wide sm:text-lg">Inclusionism</span>
        </Link>
        <nav className="flex flex-1 justify-end gap-0.5 overflow-x-auto">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={localePath(locale, item.href)}
                className="flex items-center gap-1.5 border border-transparent px-2 py-2 text-[0.66rem] font-bold uppercase tracking-[0.12em] text-white/62 hover:border-signal hover:text-white lg:px-2.5"
              >
                <Icon size={15} />
                <span className="hidden xl:inline">{labels.nav[item.key]}</span>
              </Link>
            );
          })}
        </nav>
        <label className="sr-only" htmlFor="language-select">Language</label>
        <select
          id="language-select"
          value={locale}
          onChange={(event) => {
            const next = event.target.value as Locale;
            window.location.href = localePath(next, basePath);
          }}
          className="max-w-20 border border-white/20 bg-black px-1.5 py-2 text-[0.66rem] font-black uppercase text-white outline-none hover:border-signal sm:max-w-none sm:px-2"
        >
          {locales.map((item) => (
            <option key={item} value={item}>{localeNames[item]}</option>
          ))}
        </select>
      </div>
    </header>
  );
}
