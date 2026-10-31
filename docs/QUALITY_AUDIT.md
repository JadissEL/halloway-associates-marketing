# Quality audit — Halloway Associates (2026-10-31)

Scope: marketing site + Outbound OS. **No new product scope** — polish, harden, finish incomplete surfaces.

## Method

1. Discovery of packages, routes, env, broken links, TS errors  
2. Scorecard (before)  
3. P0/P1 fixes only  
4. Verify: marketing `npm run build`; outbound `npm run lint` + `build` + `test` (12/12)

---

## Scorecard

| Pillar | Before | After | Notes |
|--------|--------|-------|-------|
| Content | 6.5 | **8** | FR CTA fixed; placeholders clearer; outreach still human |
| UI/UX | 7 | **8.5** | a11y focus/skip/reduced-motion; OG; demo livreur; CRM out of public footer |
| Engineering | 6 | **8** | OS TS lint green; Redis types; audit JSON; webhook secret |
| Flows | 6.5 | **8** | Form success email bug fixed; optional OS inbound; CSV errors surfaced |
| Perf | 6 | **7** | Font subset trimmed; images ~2.4 MB local (acceptable MVP) |
| Security | 6 | **8** | Webhook auth; prod JWT/password fail-fast; CORS multi-origin |
| Docs | 5 | **8.5** | Unified root README + this audit + limitations |

**Overall:** ~6.2 → **~8.1**

---

## What was weak

1. Home CTA mixed EN on FR site  
2. LeadForm cleared email before success copy  
3. Broken/wrong demo link (livreur → avocat)  
4. CRM-lite in public legal footer  
5. No Open Graph / skip-link / focus-visible  
6. Outbound web TS errors blocked lint/build  
7. Email webhook open without shared secret  
8. CSV import silently skipped bad rows  
9. Port clash marketing/OS both on 5173  
10. Root README ignored Outbound OS

---

## What we fixed

### Marketing (`/`)
- FR-only primary CTAs  
- LeadForm: capture submitted email; unique field ids; optional `VITE_OUTBOUND_API_URL` → `/api/public/inbound-lead`  
- `/demos/livreur` + footer/examples links  
- SEO/OG helper; skip link; `:focus-visible`; `prefers-reduced-motion`  
- Fonts trimmed; CRM removed from public footer  
- Root README + `.env.example` updated  

### Outbound OS (`outbound-os/`)
- `POST /api/public/inbound-lead` (rate-limited)  
- Webhook `x-webhook-secret` / `WEBHOOK_SECRET` (required in production)  
- Prod fail-fast on default JWT / operator password  
- CSV import returns `created` / `skipped` / `errors[]`; UI shows first errors  
- Redis `Redis` import typing; audit `Prisma.InputJsonValue`; error handler typing  
- UI mutations typed; Vite port **5174**; CORS allows 5173+5174  

---

## Verification commands & results

```text
npm run build                          # marketing OK
cd outbound-os && npm run lint         # OK
cd outbound-os && npm run build        # OK
cd outbound-os && npm test             # 12/12 OK
```

Dry-run campaign path not re-smoke-tested end-to-end in this gate (needs Docker DB up). Unit coverage for suppressions/classifier/scheduler passes.

---

## Verdict

**READY_FOR_UNIFY_DEPLOY** — with caveats listed in [`KNOWN_LIMITATIONS.md`](KNOWN_LIMITATIONS.md) (placeholders, Formspree, Docker for live OS smoke).

Blockers that would have meant **BLOCKED** are cleared (lint/build/TS, broken demo CTA, open webhook in prod posture).

---

## Follow-on (Prompt 3)

Unify completed 2026-10-31 → see [`UNIFY_VERDICT.md`](UNIFY_VERDICT.md): **READY_FOR_FIRST_CAMPAIGN_SETUP**.
