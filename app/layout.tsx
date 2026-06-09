import type { Metadata } from "next";
import Link from "next/link";
import { GitBranch, Library, MessageSquareText, Search } from "lucide-react";
import { siteConfig, siteUrl } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: "Inclusionism" }],
  creator: "Inclusionism",
  publisher: "Inclusionism",
  alternates: {
    canonical: siteUrl()
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteUrl(),
    siteName: siteConfig.name,
    type: "website",
    images: [
      {
        url: "/brand/og-image.png",
        width: 1200,
        height: 630,
        alt: "Inclusionism"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: ["/brand/og-image.png"]
  }
};

const nav = [
  { href: "/graph", label: "Graph", icon: GitBranch },
  { href: "/notes", label: "Canon", icon: Search },
  { href: "/debate", label: "Debate", icon: MessageSquareText },
  { href: "/pest", label: "PEST", icon: Library }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-white/15 bg-black/90 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center border-2 border-white bg-white text-2xl font-black leading-none text-black" aria-label="Inclusionism logo">
                ≥
              </span>
              <span className="brand-title text-lg leading-none tracking-wide">Inclusionism</span>
            </Link>
            <nav className="flex gap-1">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 border border-transparent px-3 py-2 text-xs font-bold uppercase tracking-wider text-white/70 hover:border-signal hover:text-white"
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
