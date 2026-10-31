# Definition of Done — repo health

| Meta | Value |
|------|--------|
| **Purpose** | Gate for `CONTROL_ESTABLISHED` vs `CONTROL_PARTIAL`. |
| **Owner** | Main controlling agent + Founder |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |

Run: `npm run verify` (or `node scripts/verify-project.mjs`).

---

## Checklist

| # | Criterion | Evidence |
|---|-----------|----------|
| 1 | Inventory + conflict report written | `docs/AUDIT_MULTI_AGENT.md` |
| 2 | Critical apps build (or failures scoped) | `npm run verify` builds marketing + outbound-os |
| 3 | One canonical identity | `config/brand.json` + `docs/IDENTITY.md` |
| 4 | Duplicate apps/configs resolved or archived | `_archive/` · no second site/OS/brand |
| 5 | Root README is the only quickstart | `README.md` |
| 6 | CONTROL_PLANE + AGENTS.md match reality | those files + Cursor rule |
| 7 | Outreach locked | `docs/business/LAUNCH_SWITCH.md` = OFF · dry-run |
| 8 | ICP: one data file + docs render | `config/niches.json` (100) + `docs/business/ICP_100_NICHES.md` |
| 9 | Env strategy documented | `docs/ARCHITECTURE.md` § Env |
| 10 | Handoff produced for other agents | end of takeover chat / CONTROL_PLANE |

**CONTROL_ESTABLISHED** = all rows pass + `npm run verify` exit 0.  
**CONTROL_PARTIAL** = any fail or known P0 risk open.

---

## Non-goals (never required for this gate)

- Live outreach / paid APIs  
- Full redesign  
- Renaming internal `localpresence_*` package/DB strings  
