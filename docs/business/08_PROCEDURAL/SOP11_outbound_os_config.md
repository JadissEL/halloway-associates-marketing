# SOP-11 — Outbound OS tooling setup (**configuration only**)

| Meta | Value |
|------|--------|
| **Purpose** | Keep OS ready in dry-run; never unlock send from this SOP. |
| **Owner role** | Growth systems · CEO holds switch |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |
| **Non-goals** | Live campaigns; paid amplification; mass DM. |

**Trigger:** New machine / redeploy / quarterly readiness check  
**Inputs:** `outbound-os/.env.example`, Docker  
**Outputs:** Health OK + dry-run badge visible  
**SLA:** Config complete in &lt; half-day  

### Steps
1. Confirm `docs/business/LAUNCH_SWITCH.md` = **OFF**  
2. `cp .env.example .env` (+ `server/.env`)  
3. `DRY_RUN=true`, `EMAIL_PROVIDER=dry-run`  
4. `npm run db:up && db:migrate && db:seed`  
5. Start API + worker + UI (:3001 / :5174)  
6. Login operator · verify dry-run badge  
7. Optional: process outbox dry-run on seed campaign (**do not** set running+live)  
8. Document any missing keys (Resend/OpenAI) as optional  

### Quality bar
No message leaves provider; suppressions + unsubscribe still present in templates.

### Failure modes
- Setting `DRY_RUN=false` “just to test” with real list  
- Confusing marketing port 5173 with OS 5174  
