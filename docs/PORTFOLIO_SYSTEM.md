# Portfolio system — Niche Digital Kits

| Meta | Value |
|------|--------|
| **Purpose** | How Halloway delivers productized digital portfolios per niche. |
| **Primary product** | Niche kits under `src/portfolios/<niche>/` |
| **Studio shell** | Thin Halloway site at repo root routes (`/`, `/kits`, contact, consulting) |
| **First kit** | **Influencers** — live |
| **Readiness gate** | [`INFLUENCER_KIT_READY.md`](INFLUENCER_KIT_READY.md) → verdict `INFLUENCER_KIT_READY` |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |

## Product vision

Halloway Associates builds **ready digital product kits** for business niches — not an agency brochure as the centerpiece.

Each kit is a complete set the niche can buy/use (site + booking + card + templates).

## Canonical paths (one Vite app)

```
src/portfolios/
  _template/           # copy structure for next niche
  influencers/         # FULL kit (priority, live)
public/portfolios/
  influencers/         # printables, signatures, PDFs helpers
docs/PORTFOLIO_SYSTEM.md
```

**Do not** create a second Vite app. Studio shell + kits share `config/brand.json`.

## Kit checklist (every niche)

1. Website (desktop-first) + standard pages (about, FAQ, legal, links)  
2. **Email connect** before any contact / booking  
3. Offer catalog + booking/request + intake + success  
4. **User dashboard** (their requests / messages)  
5. **Creator dashboard** (inbox, clients, tools)  
6. Carte + QR → booking  
7. Media kit / credibility page  
8. Link-in-bio hub  
9. Email signature + social templates  
10. One-pager + rate-card / proposal  
11. Legal stubs  
12. Kit `README.md` (customize for a real client)

## Adding the next niche

1. Copy `src/portfolios/_template/` → `src/portfolios/<slug>/`  
2. Copy `public/portfolios/_template/` assets if needed  
3. Register routes in `App.jsx`  
4. Add card on `/kits`  
5. Ensure niche exists in `config/niches.json` with `ai_services` + `third_party_connections` (run `node scripts/enrich-niches-ai-integrations.mjs` after category edits)  
6. Keep outreach **LOCKED**

## AI & third-party “plus” (catalog)

Every niche in `config/niches.json` lists optional **AI services** and **third-party connections**, each with a business upside (`plus` / `plus_fr`). Surface on `/pour-qui` (expand row) and use when scoping a kit proposal.

## Studio shell rules

- Short who we are + what we sell (kits) + consulting CTA  
- Gallery of kits (live vs coming next)  
- Contact: jadisselantaki@hallowayassociates.com  
- Hero proof = live Influencer portfolio  

## Identity

Company / site / email / mission unchanged — see `docs/IDENTITY.md`.
