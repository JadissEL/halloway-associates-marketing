# E2E verify — unify dry-run path

Run after Docker + deps are available. Record results in the table at the bottom.

## Prerequisites

```bash
# From repo root
cp .env.example .env   # set VITE_OUTBOUND_API_URL=http://localhost:3001
cd outbound-os
cp .env.example .env && cp .env server/.env
# Ensure SYNC_JOBS=true for local without Redis dependency
npm install
npm run db:up
npm run db:migrate
npm run db:seed
```

Terminals:

```bash
# A — API
cd outbound-os && npm run dev:server

# B — Worker
cd outbound-os && npm run worker

# C — Marketing
cd .. && npm run dev

# D — Outbound UI (optional for UI checks)
cd outbound-os && npm run dev
```

---

## Checklist

| # | Step | Command / action | Expected | Result |
|---|------|------------------|----------|--------|
| 1 | Boot | health + UIs | API `GET /api/health` → ok; site :5173; OS :5174 | |
| 2 | Audit form → OS | `POST /api/public/inbound-lead` or submit `/audit` | Lead `source=website_form` + pipeline + notification | |
| 3 | Campaign | OS: create or use seeded; attach leads | Campaign draft/paused with leads | |
| 4 | Dry-run send | Start + Traiter outbox | Outbox `dry_run_sent` / scheduled; caps ok | |
| 5 | Hot reply | Pipeline: paste positive reply | Classification `interested` → stage **hot** | |
| 6 | Unsubscribe | `GET /api/public/unsubscribe?token=…` or add suppression | Suppression + sequence stop | |
| 7 | Public pages | Open `/` `/offre` `/tarifs` `/audit` `/carte` `/demos/*` | 200, QR → audit URL | |

### Scripted smoke (API)

```powershell
$base = "http://localhost:3001"
Invoke-RestMethod "$base/api/health"
$inbound = Invoke-RestMethod -Method POST -Uri "$base/api/public/inbound-lead" -ContentType "application/json" -Body (@{
  type="audit"; name="E2E Visitor"; businessName="Salon E2E"; niche="salon"; city="Athènes";
  email="e2e-visitor@example.com"; phone="+30 6900000000"; website="@salon_e2e"
} | ConvertTo-Json)
# expect leadId + pipelineId

$login = Invoke-RestMethod -Method POST -Uri "$base/api/auth/login" -ContentType "application/json" -Body (@{
  email="jadisselantaki@hallowayassociates.com"; password="change-me-now"
} | ConvertTo-Json)
# If seed used different OPERATOR_EMAIL, use that.

$h = @{ Authorization = "Bearer $($login.token)"; "Content-Type"="application/json" }
$campaigns = Invoke-RestMethod "$base/api/campaigns" -Headers $h
$c = $campaigns.items | Select-Object -First 1
Invoke-RestMethod -Method POST -Uri "$base/api/campaigns/$($c.id)/start" -Headers $h -Body "{}"
Invoke-RestMethod -Method POST -Uri "$base/api/outbox/process" -Headers $h -Body "{}"
$reply = Invoke-RestMethod -Method POST -Uri "$base/api/replies/manual" -Headers $h -Body (@{
  leadId=$inbound.leadId; rawText="Oui je suis intéressé, on peut faire un appel ?"
} | ConvertTo-Json)
# expect classification interested
```

---

## Run log — 2026-10-31

| # | Result | Notes |
|---|--------|-------|
| 1 | **PASS** | Docker Postgres/Redis healthy; `GET /api/health` ok |
| 2 | **PASS** | `website_form` lead + pipeline `new_reply` + operator notification |
| 3 | **PASS** | Seeded « Coiffeurs Grèce » + attach inbound lead |
| 4 | **PASS** | Start → process → `dry_run_sent` (caps/suppressions enforced) |
| 5 | **PASS** | Manual reply → `interested` → pipeline **hot** |
| 6 | **PASS** | Suppression create + public unsubscribe HTTP 200 |
| 7 | **PASS** | `npm run build` marketing OK; carte QR → `/audit` |

**Overall: PASS** — dry-run unify path verified.

Login after seed: `jadisselantaki@hallowayassociates.com` / `change-me-now` (from `server/.env`).
