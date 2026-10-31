# 04 — Financial

| Meta | Value |
|------|--------|
| **Purpose** | Practical money model: costs, scenarios, cash timing, pricing policy, go/no-go gates. |
| **Owner role** | Ops / finance admin hat (Founder) |
| **Last updated** | 2026-10-31 |
| **Status** | `draft` |
| **Non-goals** | Formal forecast for banks; tax filing; enabling paid ads from this file alone. |

---

## Setup costs (one-time) — EUR

| Item | Low | Base | Notes |
|------|-----|------|-------|
| Domaine + DNS | 15 | 40 | Annual often OpEx |
| Design assets / fonts | 0 | 50 | Prefer open/system already in repo |
| Legal setup buffer | 0 | 300 | Depends on `{{LEGAL_FORM}}` |
| Accounting setup | 0 | 150 | Tool onboarding |
| Hardware (if needed) | 0 | 0 | Assume existing |
| **Total setup** | **~15** | **~540** | Edit to taste |

## Monthly operating costs — EUR

| Item | Low | Base | Aggressive tools |
|------|-----|------|------------------|
| Hosting (Vercel/Render/etc.) | 0 | 20 | 50 |
| Domain/email | 5 | 15 | 25 |
| Formspree / mail | 0 | 10 | 20 |
| Outbound infra (when used) | 0 | 15 | 40 |
| AI API (optional) | 0 | 10 | 50 |
| Accounting tool | 0 | 20 | 40 |
| Misc software | 5 | 15 | 30 |
| **Total OpEx / mo** | **~10** | **~105** | **~255** |

---

## Revenue scenarios (months 0–6) — kits closed

| Month | Conservative | Base | Aggressive |
|-------|--------------|------|------------|
| M0–1 | 0 | 0–1 | 1 |
| M2 | 0 | 1 | 2 |
| M3 | 1 | 2 | 3 |
| M4 | 1 | 2 | 4 |
| M5 | 1 | 3 | 4 |
| M6 | 2 | 3 | 5 |
| **Sum kits** | **~5** | **~12** | **~19** |
| @ €1 100 avg | ~€5.5k | ~€13k | ~€21k |
| Care MRR end M6 | €0–100 | €150–300 | €300–500 |

*Aggressive assumes soft GTM + network — **not** unlocked cold outbound.*

---

## Cashflow timing

| Event | Policy (default) |
|-------|------------------|
| Deposit | **50%** on signed proposal (**LOCKED** — `OFFER_AND_BEACHHEAD`) |
| Remainder | **50%** on launch / go-live |
| Care | Monthly in advance |
| Late payment | Pause care / support after written notice |

---

## Pricing policy & discounts

- Publish bands (€790–1 490); quote inside band after audit  
- **No discount > 15%** without founder written reason  
- Friends/family: max 1 courtesy project / year, still written scope  
- Never discount below €790 kit without cutting scope in writing  

---

## CapEx vs OpEx

| CapEx | OpEx |
|-------|------|
| Rare hardware, major licenses bought outright | Hosting, SaaS, domains, ads (later), contractors per project |

Prefer OpEx SaaS while validating.

---

## Founder draw / salary placeholder

```
Owner draw rule (draft):
- Pay tools + taxes buffer first
- Draw only from cleared deposits/remainders
- Target draw: €____ / month after M3 if cash runway ≥ 2 months OpEx
- Never draw from care prepaid without delivery capacity
```

---

## Financial go / no-go gates

### Before paid ads or paid lead tools

- [ ] ≥ 3 paid kits delivered with positive margin  
- [ ] Care or clear referral loop started  
- [ ] OpEx known for 2 months  
- [ ] `LAUNCH_SWITCH` still respected (ads ≠ cold email spam)  
- [ ] CAC hypothesis written (max CAC ≤ 20% deal size)

### Before outbound live send

- [ ] `LAUNCH_SWITCH.md` → ON with signature  
- [ ] Compliance review (see 11)  
- [ ] Dry-run proven  
- [ ] Daily/hourly caps configured  
