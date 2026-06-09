export const siteConfig = {
  name: "Inclusionism",
  title: "Inclusionism",
  description: "Explore, challenge, and debate a living framework for value, agency, legitimacy, fairness, and belonging.",
  domains: ["inclusionism.org", "www.inclusionism.org", "brain.inclusionism.org"]
};

export function siteUrl(path = "") {
  const base =
    process.env.NEXT_PUBLIC_CANONICAL_URL ||
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "https://inclusionism.org");
  const normalizedBase = base.replace(/\/$/, "");
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

export function metadataTitle(title?: string) {
  return title || siteConfig.name;
}

export function socialTitle(title?: string) {
  return title ? `${title} | ${siteConfig.name}` : siteConfig.name;
}
