# Offers & discounts — canonical doctrine

| Meta | Value |
|------|--------|
| **Company** | Halloway Associates |
| **Site** | https://hallowayassociates.com |
| **Email** | jadisselantaki@hallowayassociates.com |
| **Flagship** | Influencer Digital Kit |
| **Machine SoT** | [`config/offers.json`](../../config/offers.json) |
| **Beachhead commercial** | [`OFFER_AND_BEACHHEAD.md`](OFFER_AND_BEACHHEAD.md) (geo + band lock) |
| **Cheat sheet** | [`../OFFER_CHEATSHEET.md`](../OFFER_CHEATSHEET.md) |
| **Outreach** | LOCKED — no coupon-led cold copy |
| **Last updated** | 2026-10-31 |
| **Status** | `active` · tier targets **PROVISIONAL** inside €790–€1490 |

---

## 1) Philosophy

1. Productized > custom chaos  
2. Price for outcome + speed — not billable hours theater  
3. Discounting is a tool, not a personality — **list price default**  
4. Never discount from fear  
5. Trade value for value (scope/timing/prepay/case study)  
6. **One price truth** — site, kit, proposals, outreach = config  
7. Anchor real package value before concessions  
8. Premium-accessible — not cheapest freelancer  
9. Influencer offers map to collab / guidance / meet / lessons  
10. Founder approval beyond written matrix  

---

## 2) Offer architecture

### A) Influencer Digital Kit

Promise: turn attention into booked, paid time.  
Baseline includes/excludes: `config/offers.json` → `flagship_product` (+ `brand.json` `KIT_SCOPE`).

### B) Tiers (PROVISIONAL targets)

| Tier | Target € | Band | Floor | Intent |
|------|----------|------|-------|--------|
| Starter | 890 | 790–990 | 790 | Launch fast |
| **Pro** (recommended) | **1190** | 1090–1290 | 990 | Monetizing now |
| Authority | 1490 | 1390–1490 | 1290 | Larger personal brands |

Delivery 7–14d (Authority max 12) · deposit **50%** · revisions per tier in config.

### C) Add-ons · D) Care · E) Consulting

See `addons[]`, `care_plans[]`, `consulting[]` in config.  
**Care:** do not discount Care to close a kit.  
**Audit:** free for qualified ICP (provisional). **Strategy 45m:** €150 (locked placeholder).

### F) Future niches

Same skeleton `{Niche} Digital Kit` — influencers = template; no 100 price lists today.

---

## 3) Pricing principles

- Lead with **Pro**  
- Public: `show_from` / bands; proposals: exact  
- Deposit/remainder **50/50** (min deposit **40%**)  
- Rush = higher price  
- Custom = change order  
- Currency **EUR** · tax note excl. VAT placeholder  
- No fake strikethrough “was €20k” theater  

---

## 4) Discount doctrine

**Default:** list price. Log every exception: `discount_code`, `percent`, `list_price`, `final_price`, `approved_by`, `date`.

### Allowed codes

| Code | Max | Notes |
|------|-----|-------|
| CASE_STUDY | 5–10% or small free add-on | Written permission |
| REFERRAL_PREPAY | 5–8% | Intro or 100% upfront |
| BUNDLE | 5–12% | Kit+Care 3mo or Kit+consult pack |
| MULTI_SEAT | 5–15% | Founder; seats scoped |
| PILOT_BEACHHEAD | ≤15% | Slots in config; founder |
| WINBACK | match prior once | Within 60 days |
| PARTNER | per card | Written terms |
| SCOPE_TRADE | prefer shrink | Over pure % |

### Caps

- Stacked ≤ **20%** without founder written exception  
- Prefer one concession  
- Never below `price_floor_eur`  
- Free full kit forbidden · Care forever free forbidden  

### Forbidden / prefer alternatives

See config `forbidden` + `alternatives_to_discount_order`.  
Never 0% deposit for serious production.

### Approval

| Size | Approver |
|------|----------|
| 0% | Anyone |
| ≤10% + allowed code | Solo founder self-log OK |
| 11–20% | Founder explicit |
| >20% or below floor | Founder only + written why |

---

## 5) Sales language

Do: name kit+tier · outcomes · audit for Starter vs Pro · includes/excludes in writing.  
Don’t: apologize · lead with discount · “flexible” with no bounds · negotiate against yourself · >3 tiers + 2–3 add-ons in one send.

### Pricing reply macro order

1. Confirm goal (collab / lessons / meets)  
2. Recommend one tier + why  
3. Price/band + deposit + timeline  
4. Five includes  
5. CTA audit or approve  

Templates: `outreach/followups/influencers/reply_pricing.md` (+ too_expensive).

---

## 6) Proposal rules

Must include: tier + list price · discount code + final · deposit amount/due · remainder trigger · delivery window · includes/excludes · revisions · **expiry 14 days** · optional consulting + care.  
Expired → list price unless WINBACK.

Template: [`../../outreach/proposal-template.md`](../../outreach/proposal-template.md)

---

## 7) Outreach money talk

Cold: outcomes + “from €790” or “pricing after audit” OK.  
**No** coupons, “limited 50% off,” or bribe breakups.  
Pilot only after interest if `pilot_beachhead.slots_remaining > 0`.

---

## 8–10) Promotions · edge cases · workflow

Max ~2 promos/year later; early stage default **no public promo**.  
Edge cases (ghost after discount, scope creep, friends): see doctrine intent in config + cheat sheet.  
Friends/family still use `PARTNER` or founder exception — don’t hide.

---

## 11) Config consumers

| Consumer | Reads |
|----------|--------|
| `src/lib/offers.js` | tiers, care, consulting, display mode |
| `/tarifs`, `/offre` | public bands |
| Proposals / macros | exact + codes |
| Verify | offers.json present + Pro recommended + deposit 50 |

---

## 12) Open founder decisions

Exact list locks + pilot slots + free audit: [`14_OPEN_DECISIONS.md`](14_OPEN_DECISIONS.md) (D13+).  
Until then: **PROVISIONAL** targets — public shows “from / bands” + audit CTA.
