# 14 — Open decisions (founder)

| Meta | Value |
|------|--------|
| **Purpose** | List decisions that block clarity; owner = founder. |
| **Owner role** | Founder / CEO |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |
| **Non-goals** | Agent deciding tax; unlocking outreach. |
| **Commercial lock** | → [`OFFER_AND_BEACHHEAD.md`](OFFER_AND_BEACHHEAD.md) · verdict **`OFFER_BEACHHEAD_LOCKED`** |

---

## Resolved into OFFER_AND_BEACHHEAD (2026-10-31)

| ID | Decision | Outcome |
|----|----------|---------|
| D1 | Beachhead metro | **Athens, Greece** |
| D4 | Payment split | **50% deposit / 50% on launch** |
| D5 | Care edits / month | **3** |
| D9 | Consulting packaging | **Fixed €150 / 45 min** (placeholder flag) |
| — | Flagship product name | **Influencer Digital Kit** |
| — | Kit include / exclude | `KIT_SCOPE` in `config/brand.json` |
| — | Price band + delivery | **€790–1490** · **7–14 days** |
| — | First outreach languages | **EN + EL** |
| — | Later markets | `TARGET_MARKETS_LATER` (not active) |

Machine SoT: `config/brand.json` (`COMMERCIAL_LOCK = OFFER_BEACHHEAD_LOCKED`).

---

## Still open (do not block commercial lock)

### P0 leftovers (ops / identity)

| ID | Decision | Options | Recommendation | Status |
|----|----------|---------|----------------|--------|
| D2 | Fill `PHONE` / `INSTAGRAM` | Leave empty vs set | Set before networking | **OPEN** |
| D3 | `LEGAL_FORM` + `SIRET` / EL entity | Micro / SASU / EURL / EL | Expert | **OPEN** |

### P0/P1 — pricing locks (offers system live as PROVISIONAL)

| ID | Decision | Options | Recommendation | Status |
|----|----------|---------|----------------|--------|
| D13 | Exact Starter / Pro / Authority list € | Keep provisional targets 890/1190/1490 vs lock | Lock after 2–3 audits | **OPEN** (PROVISIONAL in `offers.json`) |
| D14 | Deposit % | 50/50 vs 40/60 | **50/50** already locked — confirm forever | Soft-confirm |
| D15 | Free audit vs paid | Free ICP / €49 / always free | Free qualified ICP | **OPEN** |
| D16 | Pilot beachhead | Off / 5 slots @ ≤15% | **5 slots** enabled in config | Soft-on — founder may disable |
| D17 | Rush fee | Fixed €300 vs % of tier | Fixed add-on €300 | Soft-on |

### P1 — within first 3 clients

| ID | Decision | Options | Recommendation | Status |
|----|----------|---------|----------------|--------|
| D6 | Accounting tool | Sheet / Freebe / Pennylane | Sheet until 5 clients | OPEN |
| D7 | VAT regime note | Franchise vs normal | Expert | OPEN |
| D8 | Soft GTM start date | After 1 simulated SOP vs calendar pick | After 1 full sim | OPEN |

### P2 — after Delivery Factory

| ID | Decision | Options | Recommendation | Status |
|----|----------|---------|----------------|--------|
| D10 | Second niche | Café vs lawyer | Café | OPEN |
| D11 | `LAUNCH_SWITCH` unlock | Stay OFF vs ON | Stay OFF until checklist | **LOCKED OFF** |
| D12 | Paid ads | None vs test | None until financial gates | LOCKED |

---

## Closed (reference)

| ID | Decision | Outcome |
|----|----------|---------|
| C1 | Public brand | **Halloway Associates** |
| C2 | Product line | **Niche Digital Portfolios** · flagship **Influencer Digital Kit** |
| C3 | LocalPresence public alias | **Retired** |
| C4 | Acquisition default | `LAUNCH_SWITCH = OFF` |
| C5 | Addressable markets list | 17 countries in `TARGET_MARKETS` |
| C6 | Active vs later geo | **Active = Greece (Athens)** · rest = `TARGET_MARKETS_LATER` |
| C7 | Offer + beachhead commercial | **`OFFER_BEACHHEAD_LOCKED`** |

---

## Structure / commercial verdicts

```
OFFER_BEACHHEAD_LOCKED
```

```
STRUCTURE_PARTIAL
```

**STRUCTURE_PARTIAL why:** D2–D3 (phone/IG/legal) still open.  
**Does not unlock outreach.** Flip `LAUNCH_SWITCH` only after GTM checklist + founder signature.
