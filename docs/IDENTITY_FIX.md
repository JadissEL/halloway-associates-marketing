# Identity fix — Halloway Associates

**Date:** 2026-10-31  
**Lane:** Public marketing site, carte, demos, outreach copy kit, brand surfaces.

## Canonical identity

| Field | Value |
|-------|--------|
| Company | Halloway Associates |
| Site (no trailing slash) | `https://hallowayassociates.com` |
| Contact email | `jadisselantaki@hallowayassociates.com` |
| Founder | Jadiss Elantaki |
| Origin | Greek startup |
| Mission | Help everyone get the maximum opportunity from their businesses |
| Offers | (1) digital presence / websites / apps (2) consulting sessions |

## Source of truth

- [`config/brand.json`](../config/brand.json) — JSON canon  
- [`src/lib/brand.js`](../src/lib/brand.js) — app import + `VITE_*` overrides  
- [`.env.example`](../.env.example) — public site env samples  

Static HTML (`public/card/print.html`, `public/outreach/one-pager.html`) hardcodes the same values (cannot import Vite modules).

## What changed

- Company rename LocalPresence → **Halloway Associates** on public site, meta/OG/Twitter/canonical/JSON-LD, footer, legal stubs, demos CTAs, admin CRM labels.
- Product package label → **Kit présence digitale** / Digital Presence Kit (replacing “Local Presence Kit” on public + outreach copy).
- Contact email + site URL wired everywhere public (mailto, footer, legal, card, one-pager, outreach signatures).
- QR / digital card → `https://hallowayassociates.com/audit` (not localhost).
- Added `public/robots.txt` + `public/sitemap.xml` with absolute hallowayassociates.com URLs.
- Outreach kit (`outreach/`) signatures and CTAs updated; **no live sending enabled**.
- Outbound OS brand defaults / `.env.example` / seed / login defaults aligned to the same identity (dry-run remains default).

## Intentionally kept (leftovers)

| Item | Why kept |
|------|----------|
| `outbound-os` package name `localpresence-outbound-os` | Internal npm name; renaming would churn lockfiles for parallel agents |
| DB name `localpresence_outbound` in Docker/`DATABASE_URL` | Renaming would break existing local volumes |
| Health service id `localpresence-outbound-os` | Internal ops string |
| Prisma migration SQL historical `DEFAULT 'LocalPresence'` | Immutable history; schema default updated for new installs |
| Unit tests using `example.com` (unsubscribe / emailDomain) | Fixtures, not public brand |
| CSS tokens `--lp-*` | Design-system class prefixes, not customer-facing brand |
| `sessionStorage` key `lp_admin` / `lp_outbound_token` | Local storage keys, not public URLs |
| Empty `VITE_PHONE` / `VITE_INSTAGRAM` | Not provided; contact surfaces hide empty fields |
| SIRET / full postal address in legal stubs | Still “à compléter” pending legal registration details |
| `localhost` in `.env.example` comments / Outbound CORS / unsubscribe base | Local-dev only |
| Mentions of “LocalPresence” inside `docs/IDENTITY_FIX.md` / `business/00-conflicts.md` | Historical conflict notes only |

## Verification checklist

1. Repo search for `localpresence.example`, `LocalPresence` on public paths — cleared or limited to intentional leftovers above.  
2. Contact email on contact / footer / legal / card = `jadisselantaki@hallowayassociates.com`.  
3. QR / print card target = `https://hallowayassociates.com/audit`.  
4. Meta `og:url` / canonical resolve to `https://hallowayassociates.com…`.

## Re-seed note (Outbound OS)

If a local DB was seeded with the old operator email, re-run `npm run db:seed` (or update workspace settings in UI) after pulling brand env defaults.
