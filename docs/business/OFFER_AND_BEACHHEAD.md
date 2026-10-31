# Offer + beachhead — LOCKED

| Meta | Value |
|------|--------|
| **Purpose** | Founder-locked commercial + geo terms before any outreach. |
| **Owner** | Founder / CEO |
| **Last updated** | 2026-10-31 |
| **Status** | **`OFFER_BEACHHEAD_LOCKED`** |
| **Machine SoT** | [`config/brand.json`](../../config/brand.json) (`PRICING`, `BEACHHEAD`, `KIT_SCOPE`, markets) |
| **Outreach** | Still **OFF** — [`LAUNCH_SWITCH.md`](LAUNCH_SWITCH.md) |
| **Open leftovers** | Phone / Instagram / legal entity — see [`14_OPEN_DECISIONS.md`](14_OPEN_DECISIONS.md) (do **not** block this verdict) |

---

## Verdict

```
OFFER_BEACHHEAD_LOCKED
```

Encoded for site/kit via `config/brand.json` → `src/lib/brand.js`.

---

## 1. Flagship product name

| Field | Value |
|-------|--------|
| **Flagship** | **Influencer Digital Kit** |
| FR | Kit Digital Influenceur |
| Product line | Niche Digital Portfolios |
| Demo path | `/portfolios/influencers` |
| Config keys | `FLAGSHIP_PRODUCT_NAME`, `FLAGSHIP_PORTFOLIO_PATH` |

---

## 2. Included / not included

Canonical lists: `brand.json` → `KIT_SCOPE.included` / `KIT_SCOPE.not_included`.

**Included (summary):** branded site, offer catalog, connect gate, booking/intake/success, user + creator dashboards, media kit, link-in-bio, carte + QR, legal/FAQ, templates, README, proposal-layer AI/third-party options from niches catalog.

**Not included (summary):** live outreach/ads, inbox staffing, native apps, growth guarantees, legal/tax advice, unlimited redesigns, client SaaS bills, content production retainers.

---

## 3. Price bands · deposit · delivery

| Term | Locked value |
|------|----------------|
| Currency | **EUR** |
| Kit band | **€790 – €1 490** (quote inside after audit) |
| Booking complexity add-on | **+€300** when out of band complexity |
| Deposit | **50%** on signed proposal |
| Remainder | **50%** on launch / go-live |
| Delivery | **7–14 days** (`PROMISE_DAYS_MIN/MAX`) |
| Care | **€49 – €99 / mo** · **3** small edits / month |
| Max discount stack | **20%** — codes/floors in [`OFFERS_AND_DISCOUNTS.md`](OFFERS_AND_DISCOUNTS.md) · `config/offers.json` |
| Tiers | Starter / **Pro** / Authority — provisional targets inside kit band |

Config: `PRICING.*` + **`config/offers.json`** (tiers, add-ons, discount matrix)

---

## 4. Consulting session

| Term | Locked value |
|------|----------------|
| Offer | Consulting session (packaging / pricing / funnel) |
| Duration | **45 minutes** |
| Price | **€150** |
| Note | **Placeholder** until first 3 paid sessions — then recalibrate; still published for site/proposals |
| Config | `PRICING.consultingSessionEur`, `consultingPlaceholder: true` |

---

## 5. Beachhead (first wave)

| Term | Locked value |
|------|----------------|
| Country | **Greece** |
| City | **Athens** / Athènes |
| Niche | **Influencers / creators** (`influencers`) |
| Wave status | **active** |

Config: `BEACHHEAD`, `TARGET_MARKETS_ACTIVE: ["Greece"]`, `CITY` / `CITY_FR`.

---

## 6. First outreach language(s)

| Locked | **EN + EL** |
|--------|-------------|
| Note | EN primary for creator kit surfaces; EL for Athens local wave. Studio marketing remains FR-capable (`PRIMARY_LANG: fr`). |
| Config | `BEACHHEAD.outreach_languages: ["en","el"]` |

*No campaigns — languages locked for when switch flips.*

---

## 7. Later markets (not active)

Stored in `TARGET_MARKETS_LATER` — **not** first-wave outreach:

Cyprus · United Kingdom · Ireland · Netherlands · Germany · France · Luxembourg · Switzerland · Norway · UAE · Qatar · Morocco · USA · Japan · South Korea · Australia

Full addressable list (active ∪ later) remains in `TARGET_MARKETS` for reference only.

**Rule:** addressable ≠ simultaneous launch. Soft GTM / future outbound = Athens × influencers first.

---

## Site / kit consumers

| Consumer | Reads |
|----------|--------|
| `src/lib/brand.js` | pricing, beachhead, kit scope, markets active/later, flagship name |
| `/tarifs`, `/offre` | published bands + consulting + deposit/delivery |
| `/pour-qui` | beachhead city + active vs later markets |
| Verify | `COMMERCIAL_LOCK === OFFER_BEACHHEAD_LOCKED` + Athens beachhead |

---

## Explicitly still open (non-blocking)

| ID | Topic |
|----|--------|
| D2 | Phone / Instagram public |
| D3 | Legal form / SIRET or EL entity |
| D6–D8 | Accounting tool, VAT note, soft GTM calendar date |
| D10+ | Second niche after Delivery Factory |

These do **not** reopen `OFFER_BEACHHEAD_LOCKED`.
