# Deep research — Salon · Café · Lawyer · Courier demos

| Meta | Value |
|------|--------|
| **Purpose** | Feature SoT for the four commercial share demos (not influencers). |
| **Date** | 2026-10-31 |
| **Status** | `active` — drives `src/demos/*` surfaces |
| **Primary kit path later** | Graduate into `src/portfolios/<niche>/` when ready |

Research synthesized from industry booking/POS vendors (Fresha, Booksy, Square Appointments, Booker, Dabicus, ProperKind, Dropinly), hospitality checklists (menu + order + reserve + allergens), legal practice sites (intake, portal, disclaimers — LawPay / ABA-aligned patterns), and courier ops (Onfleet / Track-POD / Shipday / Spoke: quote, dispatch, track, ePOD). EU notes: GDPR consent on forms, PSD2/SCA for card deposits, confidentiality disclaimer for avocats.

---

## 1) Salon / barbershop

| Priority | Features |
|----------|----------|
| Must | Service catalog (duration + price), stylist pick, live availability, online booking, deposits / no-show policy, email+SMS reminder cadence, client records (notes/allergies consent), staff calendars, NAP + hours, gallery, reviews CTA, privacy |
| Strong | Waitlist + walk-in queue, gift cards / packages, retail POS stub, rebooking portal, Google Business deep-link, team bios |
| Later full kit | Marketplace, payroll/commissions, inventory, 2-way calendar sync, WhatsApp |

**Demo sections:** Home · Services · Team · Book · Waitlist · Client portal · Staff day · Gallery · Policies · FAQ · Legal

---

## 2) Café / restaurant

| Priority | Features |
|----------|----------|
| Must | HTML menu with prices, allergen + dietary tags + filter, hours, address/map, phone, reservations, takeaway/order cart, photos, reviews, privacy |
| Strong | Loyalty stamps, events / private hire, gift vouchers, kitchen ticket stream (staff), no-show policy |
| Later full kit | Full POS, delivery routing, marketplace listing |

**Demo sections:** Home · Menu · Reserve · Order · Events · Loyalty · Kitchen · Reviews · FAQ · Legal

---

## 3) Lawyer / cabinet

| Priority | Features |
|----------|----------|
| Must | Practice areas, attorney bio + credentials, **disclaimer** (form ≠ attorney–client), secure intake, consultation booking, fees overview, confidentiality/GDPR, contact |
| Strong | Client portal (messages, documents, invoices), conflict-check stub, e-signature retainer stub, bill pay CTA |
| Later full kit | Full practice management (Clio-class), trust accounting, QES eIDAS |

**Demo sections:** Home · Domains · Team · Intake · Book · Portal · Fees · Confidentiality · FAQ · Legal

---

## 4) Courier / local delivery

| Priority | Features |
|----------|----------|
| Must | Service zones + rate card, quote request, booking capture, live tracking page, ETA notifications copy, proof of delivery (photo/signature), B2B invoicing stub, contact |
| Strong | Dispatch board, driver app preview, SLA / insurance, failed-delivery exceptions |
| Later full kit | Route optimization API, multi-depot, marketplace APIs |

**Demo sections:** Home · Zones & rates · Quote · Track · POD · Dispatch · Driver · B2B · FAQ · Legal

---

## Share rule

Commercials send `/p/salons|cafes|avocats|livreurs` only — see [`PORTFOLIO_SHARE.md`](PORTFOLIO_SHARE.md).
