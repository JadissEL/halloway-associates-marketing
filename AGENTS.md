# AGENTS.md — rules for every Cursor agent

**Read first:** [`docs/CONTROL_PLANE.md`](docs/CONTROL_PLANE.md) · [`docs/IDENTITY.md`](docs/IDENTITY.md)  
**Health gate:** `npm run verify` · [`docs/DEFINITION_OF_DONE.md`](docs/DEFINITION_OF_DONE.md)

You are a guest in a multi-agent repo. Collisions already happened. Follow these hard rules.

## Hard rules

1. **Control plane first** — if your change fights CONTROL_PLANE or IDENTITY, stop and align.  
2. **One Vite app** — repo root only. Do not scaffold a second public site.  
3. **Primary product = Niche Digital Portfolios** — `src/portfolios/<niche>/` (Influencers first). Studio shell stays thin.  
4. **Read** [`docs/PORTFOLIO_SYSTEM.md`](docs/PORTFOLIO_SYSTEM.md) before adding a niche.  
5. **One Outbound OS** — only `outbound-os/`. Do not fork another outreach app.  
6. **One brand config** — only `config/brand.json`. No parallel `brand.ts` sources of truth.  
7. **One niches data file** — only `config/niches.json`.  
8. **No outreach launch** — `docs/business/LAUNCH_SWITCH.md` stays OFF; keep `DRY_RUN=true`.  
9. **Preserve > Extend > Optimize** — don’t rewrite working features.  
10. **Lane discipline** — touch only declared lane files unless fixing build breakage.  
11. **Archive don’t ghost** — uncertain deletes go to `_archive/YYYY-…/`.  
12. **Log decisions** — append [`docs/KNOWN_CONFLICTS_RESOLVED.md`](docs/KNOWN_CONFLICTS_RESOLVED.md).  
13. **No secrets** in git.

## Canonical identity

- Company: **Halloway Associates**  
- Site: **https://hallowayassociates.com**  
- Email: **jadisselantaki@hallowayassociates.com**  
- Mission / offers: see IDENTITY.md  

`LocalPresence` is **legacy internal** (npm/DB names OK). Not public branding.

## Allowed lanes vs forbidden

| Lane | Allowed paths | Forbidden |
|------|---------------|-----------|
| Marketing UI | `src/`, `public/`, root Vite configs | Creating another Vite app; editing OS schema unless wiring forms |
| Brand / ICP data | `config/brand.json`, `config/niches.json` | Second brand or niches file; inventing LocalPresence public alias |
| Business docs | `docs/business/` | Recreating root `business/*` trees (pointer README only) |
| Outbound OS | `outbound-os/**` | Enabling live send; second CRM; forking package |
| Outreach copy | `outreach/**` (templates) | Sending; flipping LAUNCH_SWITCH |
| Control plane | `docs/CONTROL_*.md`, `AGENTS.md`, `scripts/verify-project.mjs` | Weakening verify to hide breakage |
| Quarantine | `_archive/` | Deleting archive without founder OK |

**Never touch without founder + explicit ask:** `docs/business/LAUNCH_SWITCH.md` → ON, production secrets, paid API spend.

## Where things live

| Need | Path |
|------|------|
| Niche kits (primary) | `src/portfolios/` |
| Studio shell | `src/pages/` (thin) |
| Brand | `config/brand.json` |
| Niches (100 + flagship) | `config/niches.json` |
| Portfolio rules | `docs/PORTFOLIO_SYSTEM.md` |
| Business docs | `docs/business/` |
| Outbound | `outbound-os/` |
| Outreach copy | `outreach/` (templates only) |

## Before you finish

- [ ] `npm run verify` (or `verify:docs` if build already known green)  
- [ ] No new competing README “truth”  
- [ ] Identity strings match IDENTITY.md on public surfaces  
