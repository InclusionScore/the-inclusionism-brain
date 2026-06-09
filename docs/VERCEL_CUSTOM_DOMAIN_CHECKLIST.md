# Vercel Custom Domain Checklist

Use this checklist to attach production domains for Inclusionism.

Official Vercel docs:

- Domains overview: https://vercel.com/docs/domains
- Add a custom domain: https://vercel.com/docs/domains/working-with-domains/add-a-domain

## Target Domains

Attach all three domains to the same Vercel project:

- `inclusionism.org`
- `www.inclusionism.org`
- `brain.inclusionism.org`

## App Environment Variables

Set these in Vercel Project Settings -> Environment Variables for Production:

```text
NEXT_PUBLIC_CANONICAL_URL=https://inclusionism.org
NEXT_PUBLIC_SITE_URL=https://inclusionism.org
SITE_URL=https://inclusionism.org
CANONICAL_HOST=inclusionism.org
```

Optional strict redirect:

```text
FORCE_CANONICAL_HOST_REDIRECT=true
```

Leave `FORCE_CANONICAL_HOST_REDIRECT` unset if you want `www.inclusionism.org` and `brain.inclusionism.org` to serve the app directly while metadata still points canonically to `https://inclusionism.org`.

Set this only if Debate Mode should use OpenAI:

```text
OPENAI_API_KEY=...
```

Optional:

```text
OPENAI_MODEL=gpt-4.1-mini
```

## Vercel Dashboard Steps

1. Open Vercel.
2. Select the Inclusionism project.
3. Go to Settings -> Domains.
4. Add `inclusionism.org`.
5. Vercel may prompt you to also add `www.inclusionism.org`; add it.
6. Add `brain.inclusionism.org`.
7. For each domain, follow the DNS instructions shown by Vercel.

## DNS Records

Vercel's dashboard is the source of truth for exact records. In general:

- Apex domains such as `inclusionism.org` use an `A` record.
- Subdomains such as `www.inclusionism.org` and `brain.inclusionism.org` use `CNAME` records.
- If Vercel prompts for domain verification, add the TXT record it gives you.

Common configuration:

```text
inclusionism.org      A      76.76.21.21
www                   CNAME  cname.vercel-dns.com
brain                 CNAME  cname.vercel-dns.com
```

If Vercel gives project-specific CNAME targets, use those instead.

## Post-Deploy Verification

After DNS is verified and the deployment is ready:

1. Visit `https://inclusionism.org`.
2. Visit `https://www.inclusionism.org`.
3. Visit `https://brain.inclusionism.org`.
4. Confirm each loads the Inclusionism homepage or redirects intentionally if `FORCE_CANONICAL_HOST_REDIRECT=true`.
5. View page source and confirm canonical URLs point to `https://inclusionism.org`.
6. Check `https://inclusionism.org/robots.txt`.
7. Check `https://inclusionism.org/sitemap.xml`.
8. Check a social preview validator for `https://inclusionism.org` and confirm the `≥` Inclusionism card appears.

## Rollback

If a domain fails:

1. Keep the Vercel-generated `.vercel.app` URL as a fallback.
2. Remove or correct only the failing domain DNS record.
3. Wait for DNS propagation.
4. Re-check the domain status in Vercel Settings -> Domains.
