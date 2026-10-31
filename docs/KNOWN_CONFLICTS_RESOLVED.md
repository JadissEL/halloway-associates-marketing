# Known conflicts — resolved

| Meta | Value |
|------|--------|
| **Purpose** | Conflict → decision → why (multi-agent cleanup). |
| **Owner** | Main controlling agent |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |

| ID | Conflict | Decision | Why |
|----|----------|----------|-----|
| R1 | Public brand LocalPresence vs Halloway | **Halloway Associates** everywhere public | Founder identity override; `config/brand.json` |
| R2 | Dual Business OS trees `business/` vs `docs/business/` | **Canonical = `docs/business/`**; legacy moved to `_archive/business-legacy-2026-10-31/` | One hub; stop overwrite wars |
| R3 | Empty `card/` vs `public/card/` | Keep **`public/card/`**; archive empty folder | Print assets already under public |
| R4 | OS package/DB name `localpresence_*` | **Keep internal** | Renaming breaks Docker volumes / lockfiles; not public |
| R5 | Multiple README / tracker narratives | Precedence: CONTROL_PLANE → IDENTITY → brand.json → README | Single control plane |
| R6 | Outreach enablement drift in docs (“READY_FOR_FIRST_CAMPAIGN”) | **LAUNCH_SWITCH OFF** still governs send | Setup ≠ unlock |
| R7 | PRODUCT_BRAND / LocalPresence alias experiments | Removed from public brand.js; kit = Kit présence digitale | No dual public brand |
| R8 | Who owns integrations | `docs/INTEGRATIONS.md` | Free-tier board; no second adapter tree |
| R9 | Residual `business/04-icp/` vs `config/niches.json` | **Canonical = `config/niches.json`**; narrative = `docs/business/ICP_100_NICHES.md`; archive `04-icp` | One machine source |
| R10 | Env examples sprawl | Root `.env.example` + `outbound-os/.env.example` only | Documented in ARCHITECTURE |
| R11 | Package manager | **npm** at root and in outbound-os | No pnpm/yarn dual workflows |
| R12 | Client geography | **`TARGET_MARKETS` in `config/brand.json`** (17 countries); HQ/beachhead country = Greece | Founder-defined addressable markets; ops still one city×niche first |
| R13 | Agency brochure vs niche kits | **Primary product = `src/portfolios/*`**; thin studio shell at `/` | Founder re-scope 2026-10-31; one Vite app |
| R14 | Per-niche AI / integrations narrative | **SoT = `config/niches.json`** fields `ai_services` + `third_party_connections` (each with `plus`/`plus_fr`); UI = `/pour-qui` expand; script = `enrich-niches-ai-integrations.mjs` | One catalog for proposals; no parallel offer lists |
| R15 | When may outreach unlock | Only after **`INFLUENCER_KIT_READY`** + founder flips `LAUNCH_SWITCH` | Product gate before acquisition; switch still OFF |
| R16 | Offer + beachhead ambiguity | **`OFFER_BEACHHEAD_LOCKED`** in `docs/business/OFFER_AND_BEACHHEAD.md` + `config/brand.json` | Athens×influencers; later markets not active; prices/deposit/consulting encoded |
| R17 | Pre-GTM unlock authority | Verdict `READY_TO_UNLOCK_OUTREACH` ≠ auto-ON; only founder types UNLOCK in `LAUNCH_SWITCH` | Agent audits; never flips switch |
| R18 | Follow-up cadence / tone drift | Canonical = `docs/OUTREACH_FOLLOWUPS.md` + `outreach/followups/` + 5-step influencer sequence/seed | Respect > persistence; max 5 cold; one CTA/link |
| R19 | Pricing / discount improvisation | SoT = `config/offers.json` + `docs/business/OFFERS_AND_DISCOUNTS.md`; site reads via `src/lib/offers.js`; stack cap 20%; no cold coupons | One price truth |

Append new rows; do not silently reverse without a new row.
