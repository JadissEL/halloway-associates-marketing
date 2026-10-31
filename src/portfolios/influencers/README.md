# Influencer / Creator Digital Portfolio (kit)

**Niche:** Influencers & creators (flagship)  
**Sample client:** Nova Vale (`data.js`)  
**Studio:** Halloway Associates · https://hallowayassociates.com · jadisselantaki@hallowayassociates.com  
**Live routes:** `/portfolios/influencers/*`

## What this kit is

A complete digital product set so a creator can sell **paid access to their time** (collabs, guidance, meets, lessons) under their brand — filtering unserious DMs.

## Contents

| Piece | Where |
|-------|--------|
| Website + standard pages | Home, About, Offers, Media kit, FAQ, Links, Legal, Card |
| **Email connect (required)** | `/connect` — gate before contact & booking |
| User dashboard | `/account` — my requests + messages |
| Contact (email-gated) | `/contact` |
| Booking + Stripe test | `/book/:offerId` |
| **Creator dashboard tools** | `/creator/*` — overview, requests, messages, clients, offers, calendar, analytics, settings |
| Creator login (demo) | email `book@novavale.example` + PIN **`nova-demo`** |
| Config / offers | `data.js` |
| Printables | `/public/portfolios/influencers/templates/` |

### Auth model

- **Users/fans/brands:** **Clerk** — Gmail (`oauth_google`) + LinkedIn (`oauth_linkedin_oidc`) when `VITE_CLERK_PUBLISHABLE_KEY` is set. See `docs/CLERK_INFLUENCER_AUTH.md`. Email connect remains as fallback.
- **Creator:** kit PIN/email demo (`CREATOR_DEMO_PIN` = `nova-demo`) until Clerk roles are wired.
- Clerk syncs into kit session for booking / contact / user dashboard.

## Customize for a real influencer

1. Edit `data.js` — name, handle, portrait paths, offers, prices, `calUrl`.  
2. Replace `/images/creator.jpg` (or point paths to client assets).  
3. Set production Stripe keys + webhook (replace simulated pay).  
4. Fill Cal.com URL.  
5. Lawyer-review `Legal.jsx` + add VAT/entity.  
6. Export card via Print → PDF; update email signature HTML in `templates/`.  
7. Point domain (or subdomain) at this app route or extract as standalone deploy later.

## Multi-language

UI is **EN first**. Add `data.fr.js` or i18n keys when delivering EL/FR markets.

## AI services & third-party connections

Proposal catalog for this niche lives in **`config/niches.json`** (`id: influencers`) — fields `ai_services` and `third_party_connections`, each with `plus` / `plus_fr` (business upside).

- Studio browse: `/pour-qui` (expand Influenceurs)  
- Creator overview: `/portfolios/influencers/creator` (Platform roadmap section)  
- Re-enrich all niches: `node scripts/enrich-niches-ai-integrations.mjs`

## Related

- System rules: `docs/PORTFOLIO_SYSTEM.md`  
- ICP + add-ons: `docs/business/ICP_100_NICHES.md`  
- Template for next niche: `src/portfolios/_template/`  
