import { notFound, redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n";

export default async function LocalizedFallbackPage({ params }: { params: Promise<{ locale: string; path: string[] }> }) {
  const { locale, path } = await params;
  if (!isLocale(locale)) notFound();
  redirect(`/${path.join("/")}`);
}
