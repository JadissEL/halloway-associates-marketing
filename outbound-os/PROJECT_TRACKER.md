# PROJECT_TRACKER — Halloway Associates Outbound OS

## Summary

Sovereign outbound operations MVP for Halloway Associates (https://hallowayassociates.com — digital presence + consulting). Find → enrich → sequence → send (dry-run/live) → classify replies → human pipeline. Compliance-first. Contact: jadisselantaki@hallowayassociates.com.

## Architecture

- Frontend: React + Vite + TS + Tailwind + React Query (desktop-first sidebar)
- Backend: Fastify + Zod + Prisma + PostgreSQL
- Jobs: BullMQ + Redis with sync fallback (`SYNC_JOBS`)
- Email: dry-run / Resend / SMTP providers
- AI: OpenAI-compatible with heuristic mock fallback

## Completed actions

| Date | Action |
|------|--------|
| 2026-10-31 | Scaffolded `outbound-os/` monorepo (web + server + docker-compose) |
| 2026-10-31 | Prisma schema, migration, seed (50 leads, 5 FR sequences, dry-run mailbox) |
| 2026-10-31 | Auth, CRUD APIs, worker, suppressions, caps, reply classifier, pipeline |
| 2026-10-31 | Desktop UI: dashboard, leads, campaigns, sequences, pipeline, suppressions, settings |
| 2026-10-31 | Unit tests + Playwright smoke + README + OUTREACH_COPY.md |

## Open / risks

- Live email/AI need operator keys; degrade to mock/dry-run by design
- Google Places real provider not wired (mock discover only) — interface ready
- Instantly/Smartlead: not implemented (explicit non-goal stubs optional later)

## Verification (local)

- `npm test` — 13/13 unit tests
- `npm run lint` (web + server tsc) — clean
- Docker compose Postgres+Redis up; migrate+seed OK
- API dry-run: start campaign → outbox `dry_run_sent` → manual reply `interested` → pipeline hot=1

## Prompt log

- 2026-10-31: Autonomous E2E build of Outbound OS MVP in Marketing workspace under `outbound-os/` (preserve marketing site).
- 2026-10-31: Brand identity defaults aligned to Halloway Associates (env/seed/login/docs); dry-run unchanged.

