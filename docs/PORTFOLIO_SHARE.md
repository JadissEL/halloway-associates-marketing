# Portfolio share links — commercials

| Meta | Value |
|------|--------|
| **Purpose** | Give each prospect **one** niche portfolio — not the studio gallery. |
| **Studio** | `/kits` (copy links) |
| **Entry** | `/p/<slug>` |
| **Last updated** | 2026-10-31 |

## How to pitch

1. Open the Halloway studio → **Kits**.  
2. Find the métier (influencers, salons, avocats, …).  
3. **Copy share link** → send that URL only.  
4. Do **not** send `/kits`, `/pour-qui`, or the home page as the demo.

## Current share paths

| Niche | Share URL path | Opens |
|-------|----------------|--------|
| Influencers | `/p/influencers` | Full kit |
| Salons / barbers | `/p/salons` | Deep demo (booking, waitlist, portals) |
| Cafés | `/p/cafes` | Deep demo (menu/allergens, reserve, order) |
| Lawyers | `/p/avocats` | Deep demo (intake, portal, fees) |
| Couriers | `/p/livreurs` | Deep demo (quote, track, POD, dispatch) |

Feature research SoT: [`DEMO_NICHE_RESEARCH.md`](DEMO_NICHE_RESEARCH.md).

Prefix with your live origin (e.g. production site or current Vercel preview).

## What the prospect sees

- Only that niche’s site/demo  
- “Built by Halloway” via `/built-by` if they look for the agency  
- **No** list of 100 businesses, **no** other kits  

## Adding a niche for commercials

1. Add a kit row in `config/portfolios.json`.  
2. Route `/p/:slug` already resolves via ShareEntry.  
3. Hide gallery CTAs in share mode (see InfluencerLayout / DemoShell).  
4. List the path in this table.
