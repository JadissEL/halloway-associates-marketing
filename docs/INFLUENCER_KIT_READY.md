# Influencer Kit — readiness gate

| Meta | Value |
|------|--------|
| **Purpose** | Before-outreach product gate for the Influencer Digital Kit |
| **Product** | Influencer Digital Portfolio (not an agency brochure) |
| **Studio** | Halloway Associates · https://hallowayassociates.com · jadisselantaki@hallowayassociates.com |
| **Canonical path** | `/portfolios/influencers` |
| **Date** | 2026-10-31 |
| **Outreach** | **LOCKED** — `docs/business/LAUNCH_SWITCH.md` = `OFF` |
| **Verdict** | **`INFLUENCER_KIT_READY`** |

---

## Demo URLs / paths

| Surface | Path |
|---------|------|
| Kit home (hero product) | `/portfolios/influencers` |
| Offers (collab / guidance / meet / lessons / mentoring) | `/portfolios/influencers/offers` |
| Connect (email / Clerk) | `/portfolios/influencers/connect` |
| Booking + intake + mock pay | `/portfolios/influencers/book/:offerId` e.g. `/book/guidance` |
| Success | `/portfolios/influencers/success` |
| User dashboard | `/portfolios/influencers/account` |
| Creator login | `/portfolios/influencers/creator/login` (demo: `book@novavale.example` / PIN `nova-demo`) |
| Creator OS | `/portfolios/influencers/creator` |
| Media kit | `/portfolios/influencers/media-kit` |
| Link-in-bio | `/portfolios/influencers/links` |
| Carte visite (print + digital + QR) | `/portfolios/influencers/card` |
| FAQ / About / Legal / Contact | `/faq` · `/about` · `/legal` · `/contact` (under kit prefix) |
| Studio kits index | `/kits` |
| Consulting | `/offre` |
| Contact (studio) | `/contact` |

**Local demo:** `npm run dev` → open `http://localhost:5173/portfolios/influencers`  
**Production (when deployed):** `https://hallowayassociates.com/portfolios/influencers`

**Happy-path checkout demo**

1. `/portfolios/influencers/connect` — email connect  
2. `/portfolios/influencers/offers` → Book  
3. Intake → **Complete mock payment**  
4. `/success` → `/account` (request listed)  
5. Creator: login → `/creator/requests` sees paid request  

---

## Gate checklist

| # | Criterion | Result | Evidence |
|---|-----------|--------|----------|
| 1 | `/portfolios/influencers` is the hero product | **PASS** | Studio home CTAs → kit; `demos/createur` redirects here; `IDENTITY.md` primary proof |
| 2 | Studio shell thin: kits + consulting + contact | **PASS** | Header: Kits · Influencers · Consulting · Contact; product proof = kit |
| 3 | Kit includes website, booking flow, card, media kit, link-in-bio, offers, intake, success, README | **PASS** | Routes above + `src/portfolios/influencers/README.md` + `public/portfolios/influencers/templates/` |
| 4 | Stripe test **or** clear mock checkout E2E | **PASS** | Mock path in `Book.jsx` (`mode: stripe_test_simulated`, `pi_test_*`) → Success → Account; no keys required for demo |
| 5 | Desktop-first; mobile adapted | **PASS** | Desktop nav ≥1024px; mobile burger + drawer; hero/grids adapt |
| 6 | `docs/PORTFOLIO_SYSTEM.md` for next niches | **PASS** | Present; clone via `_template/` |
| 7 | No live outreach | **PASS** | `LAUNCH_SWITCH` = OFF |

---

## Kit inventory (criterion 3 detail)

| Piece | Status |
|-------|--------|
| Website (Home, About, FAQ, Legal) | PASS |
| Paid booking / request app flow | PASS |
| Intake → pay → success | PASS |
| User + creator dashboards | PASS |
| Carte visite print + digital + QR | PASS |
| Media kit | PASS |
| Link-in-bio | PASS |
| Offers: collab, guidance, meet, lesson (+ mentoring pack) | PASS |
| Templates (rate card, one-pager, signature, bio, proposal) | PASS |
| Kit README | PASS |

---

## Known demo limits (do not block READY)

- Mock Stripe only until live Checkout + webhook wired per client  
- Cal.com URL empty in sample `data.js` until client fills it  
- Clerk Gmail/LinkedIn optional (`VITE_CLERK_PUBLISHABLE_KEY`); email connect always works  
- Sample client = Nova Vale (`data.js`)

---

## Verdict

```
INFLUENCER_KIT_READY
```

Outreach remains **OFF**. Do not enable cold send until founder flips `LAUNCH_SWITCH` after GTM checklist.
