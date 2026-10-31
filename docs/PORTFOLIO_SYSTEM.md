# Portfolio system — Niche Digital Kits

| Meta | Value |
|------|--------|
| **Purpose** | How Halloway delivers productized digital portfolios per niche. |
| **Primary product** | Niche kits under `src/portfolios/<niche>/` |
| **Studio shell** | Thin Halloway site at repo root routes (`/`, `/kits`, contact, consulting) |
| **First kit** | **Influencers** — live |
| **Readiness gate** | [`INFLUENCER_KIT_READY.md`](INFLUENCER_KIT_READY.md) → verdict `INFLUENCER_KIT_READY` |
| **Last updated** | 2026-10-31 (deep demos + share isolation) |
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
- Gallery of kits (live vs coming next) on `/kits` — **founder + commercials only**  
- Contact: jadisselantaki@hallowayassociates.com  
- Hero proof = live Influencer portfolio  

## Commercial share isolation (one niche per prospect)

Prospects must **not** open a link and see ~100 niches or the full kit gallery.

| Layer | Path | Who |
|-------|------|-----|
| Studio gallery | `/kits` | You / commercials (copy share links here) |
| Isolated entry | `/p/<slug>` | Prospect — arms share mode, opens one kit |
| Kit surface | `/portfolios/<slug>` or `/demos/...` with `?share=1` | Prospect browses that métier only |
| Soft bridge | `/built-by` | Attribution — **no** ICP / kits gallery |

Registry SoT: [`config/portfolios.json`](../config/portfolios.json). Helpers: `src/lib/portfolios.js`, `src/lib/kitShare.js`.

Cheat sheet: [`PORTFOLIO_SHARE.md`](PORTFOLIO_SHARE.md).

When building the next niche kit, register it in `portfolios.json` with `sharePath` and wire share mode in layout/demo chrome (hide studio→`/` gallery links; use `/built-by`).

## Identity

Company / site / email / mission unchanged — see `docs/IDENTITY.md`.
