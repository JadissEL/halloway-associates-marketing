# Full project audit — Halloway Associates

| Meta | Value |
|------|--------|
| **Date** | 2026-10-31 |
| **Scope** | Entire workspace: marketing site, Outbound OS, config, docs/business, outreach |
| **Control status** | `CONTROL_ESTABLISHED` (`npm run verify`) |
| **Business structure** | `STRUCTURE_PARTIAL` (founder P0 D1–D5 open) |
| **Outreach** | `LAUNCH_SWITCH = OFF` · dry-run only |
| **Owner** | Main controlling agent |

Companion canvas: Cursor canvases → `halloway-full-audit.canvas.tsx`

---

## 1. Executive verdict

The repo is **coherent and runnable** as a Greek-startup digital-presence studio (kit + consulting) with a dry-run Outbound OS. Multi-agent drift was reconciled. The limiting factor for revenue is **not** missing product scope — it is **founder-filled identity/ops gaps** (phone, metro, legal) and **production wiring** (Neon URL, analytics, calendar, email DNS) before soft selling.

**Overall health:** ~**8.2 / 10** engineering/control · ~**6.5 / 10** go-to-market readiness.

---

## 2. What exists (map)

| Layer | Path | Role | Health |
|-------|------|------|--------|
| Marketing site | `/` Vite React | Public site, demos, carte, audit funnel | **OK** build |
| Brand / ICP | `config/brand.json`, `niches.json` | SoT identity + 100 niches + 17 markets | **OK** |
| Outbound API | `outbound-os/server` | Fastify + Prisma + worker | **OK** lint/build/tests |
| Outbound UI | `outbound-os/web` | Desktop ops UI :5174 | **OK** (tsconfig fixed) |
| Business OS | `docs/business/` | Strategy → SOPs | **OK** docs; P0 open |
| Outreach kit | `outreach/` | Templates only | **OK** locked |
| Control plane | `docs/CONTROL_*`, `AGENTS.md`, `scripts/verify-project.mjs` | Agent governance | **OK** |
| Quarantine | `_archive/` | Legacy duplicates | **OK** |

Ports: marketing **5173** · OS UI **5174** · API **3001** · Postgres **5433**.

---

## 3. Scorecard (2026-10-31)

| Pillar | Score | Notes |
|--------|------:|-------|
| Control / identity | 9 | Halloway SoT; verify gate; LAUNCH OFF |
| Architecture clarity | 8.5 | Two apps, clear ownership |
| Marketing product | 8 | Funnel + demos + niches UI solid |
| Outbound product | 8 | Dry-run path proven; mocks for discover/AI |
| Business docs | 8.5 | Deep OS; STRUCTURE_PARTIAL on founder blanks |
| Deploy / prod readiness | 6 | Vercel/Neon exist; env/DNS/email still checklist |
| Security | 7.5 | Webhook/JWT hardening; CRM PIN weak; operator single-user |
| DX / quality tooling | 6.5 | OS TS good; marketing no ESLint/TS; OS npm audit noise |
| GTM readiness | 5.5 | Markets listed; beachhead metro + contact empty |
| Integrations depth | 5 | Catalog large; few runtime-connected |

---

## 4. Strengths (keep)

1. Single brand file + readers (site + OS).  
2. ICP: 100 niches + influencer flagship, one JSON.  
3. Kill-switch + dry-run defaults (compliance-minded).  
4. Form → `inbound-lead` when API URL set.  
5. Control plane prevents re-forking apps.  
6. Demos for salon / café / avocat / livreur / créateur.  
7. Unit tests for suppression / scheduler / classifier (13).  
8. Target markets encoded (17 countries) without pretending multi-country launch.

---

## 5. Gaps & enhancements (ranked)

### P0 — do before soft paid selling

| ID | Enhancement | Why |
|----|-------------|-----|
| P0-1 | Fill `PHONE`, `INSTAGRAM`; pick Greece **metro** (D1–D2) | Contact / carte / trust |
| P0-2 | Legal form + entity fields; lawyer pass on legal pages (D3) | Paid clients risk |
| P0-3 | Confirm payment split + care edit quota (D4–D5) | Proposal consistency |
| P0-4 | Wire production `DATABASE_URL` (Neon) + API host + CORS | Forms/OS beyond localhost |
| P0-5 | Change default operator password / JWT in any shared env | Security |

### P1 — high leverage (stability & conversion)

| ID | Enhancement | Why |
|----|-------------|-----|
| P1-1 | Analytics (Umami or GA4 free) on marketing | Know funnel |
| P1-2 | Cal.com / Calendly URL on audit CTA | Book without email ping-pong |
| P1-3 | Production Formspree **or** always-on inbound-lead | Leads not only localStorage |
| P1-4 | Marketing ESLint (+ optional migrate to TS gradually) | Catch regressions |
| P1-5 | Image WebP/AVIF + sizes | Perf / Lighthouse |
| P1-6 | OS: harden CRM-lite story (admin PIN → server auth or retire) | Security honesty |
| P1-7 | Playwright smoke for marketing critical path | Deploy confidence |
| P1-8 | `npm audit` triage in outbound-os (11 reported; no blind `--force`) | Supply chain |

### P2 — after first 1–3 kits delivered

| ID | Enhancement | Why |
|----|-------------|-----|
| P2-1 | Real lead discovery (Places/Hunter) behind keys | Less mock discover |
| P2-2 | Redis/BullMQ in prod (drop SYNC_JOBS) | Scale sends safely later |
| P2-3 | Resend + SPF/DKIM/DMARC when unlock near | Email reputation |
| P2-4 | i18n pass for EN markets (UK/US/AU/…); keep FR primary | 17-market list |
| P2-5 | Stripe test for deposits (optional) | Ops, not GTM unlock |
| P2-6 | Rename internal `localpresence_*` when volumes can migrate | Clarity only |
| P2-7 | Client delivery factory (separate from marketing) | Scope later |

### Explicit non-enhancements (still)

- Live cold outreach / Instantly / mass DM / cold SMS  
- Paying for tools “just in case”  
- Second marketing app or second brand file  
- Full redesign of working UI  

---

## 6. Risk register

| Risk | Severity | Mitigation |
|------|----------|------------|
| Selling before legal/phone filled | High | Close D1–D5 |
| 17 markets → diluted focus | High | One city × one niche ops rule |
| Accidental `DRY_RUN=false` | High | LAUNCH_SWITCH + verify |
| Admin PIN CRM | Medium | Document as demo-only; prefer OS |
| EPERM Prisma generate while API runs | Low | Stop API before `prisma generate` on Windows |
| Doc sprawl returns | Medium | CONTROL_PLANE + archive rule |

---

## 7. Suggested 30-day enhancement sequence

1. **Week 1:** Founder P0 fields + metro; deploy marketing+API dry-run; Cal + analytics.  
2. **Week 2:** One simulated kit SOP end-to-end; proposal template filled.  
3. **Week 3:** Soft network selling only (no cold outbound).  
4. **Week 4:** Review GO_LIVE_CHECKLIST; keep switch OFF until intentional.

---

## 8. Health evidence (this audit)

- `npm run verify:docs` — pass (brand, niches, launch OFF)  
- Marketing `npm run build` — pass  
- Outbound `lint` / `test` — expected green (see terminal of audit run)  
- Control docs present; outreach locked  

---

## 9. Handoff for agents

Read `AGENTS.md` + `CONTROL_PLANE.md`. Prefer enhancing **P0/P1** items above. Do not unlock outreach. Do not add parallel configs.
