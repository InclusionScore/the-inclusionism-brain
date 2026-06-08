import type { Metadata } from "next";
import Link from "next/link";
import { Brain, GitBranch, MessageSquareText, Search } from "lucide-react";
import "./globals.css";

export const metadata: Metadata = {
  title: "The Inclusionism Brain",
  description: "Explore, challenge, and debate a living framework for value, agency, equity, and belonging."
};

const nav = [
  { href: "/graph", label: "Graph", icon: GitBranch },
  { href: "/notes", label: "Canon", icon: Search },
  { href: "/debate", label: "Debate", icon: MessageSquareText },
  { href: "/pest", label: "PEST", icon: Brain }
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="sticky top-0 z-40 border-b border-white/10 bg-ink/85 backdrop-blur-xl">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-md border border-signal/40 bg-signal/10 text-signal">
                <Brain size={19} />
              </span>
              <span className="font-semibold tracking-wide">The Inclusionism Brain</span>
            </Link>
            <nav className="flex gap-1">
              {nav.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-white/10 hover:text-white"
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
