# AUDIT — multi-agent reconcilation

| Meta | Value |
|------|--------|
| **Purpose** | Inventory + conflict scan after parallel Cursor agents. |
| **Owner** | Main controlling agent |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |

---

## A) Tree map

| App / package | Path | Entry / scripts | Status |
|---------------|------|-----------------|--------|
| Marketing site | `/` (`src`, `public`, Vite) | `npm run dev` · `build` | **OK** |
| Outbound monorepo | `outbound-os/` | workspaces web+server | **OK** |
| Outbound API | `outbound-os/server` | Fastify · Prisma · worker | **OK** |
| Outbound UI | `outbound-os/web` | Vite :5174 | **OK** |
| Brand config | `config/brand.json`, `niches.json` | imported by site + OS | **OK** |
| Business docs | `docs/business/` | docs only | **OK** |
| Outreach templates | `outreach/` | docs only, send locked | **OK** |
| Legacy business drafts | `_archive/business-legacy-2026-10-31/` | quarantined | **ORPHAN→ARCHIVED** |
| Empty `card/` | `_archive/card-empty/` | print lives in `public/card/` | **ORPHAN→ARCHIVED** |

### Env

| File | Role |
|------|------|
| `.env.example` / `.env` | Marketing Vite |
| `outbound-os/.env.example` / `.env` + `server/.env` | OS API |

### DB / Docker

- `outbound-os/docker-compose.yml` — Postgres `:5433`, Redis  
- Prisma under `outbound-os/server/prisma/`  
- DB name still `localpresence_outbound` (**internal leftover**, intentional)

---

## B) Conflict scan

| Collision | Finding | Mark |
|-----------|---------|------|
| Brand configs | Single `config/brand.json` + OS `brandConfig.ts` reader | **OK** (aligned) |
| Dual business doc trees | `business/*` vs `docs/business/*` | **DUPLICATE** → archived legacy |
| README truths | Multiple historical trackers | **DUPLICATE** → CONTROL_PLANE precedence |
| Auth systems | OS JWT only; site has CRM PIN | **OK** (separate) |
| Email providers | dry-run / Resend / SMTP in OS | **OK** (gated) |
| LocalPresence strings | Internal npm/DB/health only | **OK** (documented) |
| Public LocalPresence | Cleared per IDENTITY_FIX | **OK** |
| ICP files | `config/niches.json` + `docs/business/ICP_*` | **OK** (config + docs) |
| Empty card/ | vs `public/card/` | **ORPHAN** → archived |
| package name OS | `localpresence-outbound-os` | **OK** (internal) |

---

## C) Health checks (2026-10-31)

| Check | Result |
|-------|--------|
| Marketing `npm run build` | **OK** |
| OS `npm run lint` (server+web tsc) | **OK** |
| OS `npm run build` | **OK** |
| OS `npm test` | **OK** 13/13 |
| Marketing lint/typecheck scripts | **UNKNOWN** (no eslint script at root — debt) |
| Full Docker E2E this run | **UNKNOWN** (not re-run; see E2E_VERIFY.md) |
| `npm run verify` (Phase 5) | **OK** (exit 0, 2026-10-31) |

---

## Area scorecard

| Area | Mark |
|------|------|
| Marketing runtime | OK |
| Outbound OS runtime | OK |
| Brand identity public | OK |
| Business docs | OK (canonical `docs/business`) |
| Legacy duplicate docs | ARCHIVED |
| Outreach lock | OK (OFF) |
| Root agent control | OK after this pass (`AGENTS.md` + CONTROL_PLANE) |
