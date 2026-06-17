"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, localePath, type Locale } from "@/lib/i18n";

const links = [
  { href: "/what-is-inclusionism", label: "Introduction" },
  { href: "/graph", label: "Graph" },
  { href: "/notes", label: "Canon" },
  { href: "/compare", label: "Compare" },
  { href: "/pest", label: "PEST" },
  { href: "/what-is-inclusionism", label: "About" },
  { href: "/sitemap.xml", label: "Sitemap" }
];

function localeFromPath(pathname: string): Locale {
  const first = pathname.split("/").filter(Boolean)[0];
  return first && isLocale(first) ? first : "en";
}

export default function SiteFooter() {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);

  return (
    <footer className="border-t border-white/10 bg-black/80">
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-8 text-xs text-white/42 sm:px-6 md:flex-row md:items-center md:justify-between">
        <nav className="flex flex-wrap gap-x-5 gap-y-3">
          {links.map((item) => {
            const href = item.href.endsWith(".xml") ? item.href : localePath(locale, item.href);
            return (
              <Link key={`${item.label}-${item.href}`} href={href} className="font-bold uppercase tracking-[0.18em] hover:text-signal">
                {item.label}
              </Link>
            );
          })}
        </nav>
        <p className="font-bold uppercase tracking-[0.18em]">© Keith Institute</p>
      </div>
    </footer>
  );
}
