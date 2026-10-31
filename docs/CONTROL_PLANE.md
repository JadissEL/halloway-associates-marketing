# CONTROL PLANE — single source of control

| Meta | Value |
|------|--------|
| **Purpose** | Prevent multi-agent collisions; define canonical paths and rules. |
| **Owner** | Main / founding agent + Founder |
| **Last updated** | 2026-10-31 (portfolio pivot) |
| **Status** | `active` |

**Read this before changing the repo.** Companion: [`AGENTS.md`](../AGENTS.md) · Audit: [`AUDIT_MULTI_AGENT.md`](AUDIT_MULTI_AGENT.md)

Governing set: [`IDENTITY.md`](IDENTITY.md) · [`ARCHITECTURE.md`](ARCHITECTURE.md) · [`INTEGRATIONS.md`](INTEGRATIONS.md) · [`KNOWN_CONFLICTS_RESOLVED.md`](KNOWN_CONFLICTS_RESOLVED.md)

---

## Freeze (always)

- Outreach / live cold email: **LOCKED** — [`business/LAUNCH_SWITCH.md`](business/LAUNCH_SWITCH.md) = `OFF`
- Preserve > Extend > Optimize
- No second brand config, no second marketing app, no second outbound stack
- No secrets in git

---

## Ownership boundaries

| Area | Canonical path | Rule |
|------|----------------|------|
| **Primary product** | `src/portfolios/<niche>/` | Niche Digital Portfolios — start influencers |
| Portfolio system doc | `docs/PORTFOLIO_SYSTEM.md` | How niches are added |
| Studio shell (thin) | Root routes `/`, `/kits`, contact | Not the main product — gallery + consulting |
| Public kit assets | `public/portfolios/<niche>/` | Templates, printables |
| Legacy demos | `src/demos/` | Secondary; creator redirects to portfolio |
| Outbound OS | `outbound-os/` | Dry-run default; sending locked |
| Shared brand | `config/brand.json` (+ `config/niches.json`) | **Only** identity SoT |
| Business OS docs | `docs/business/` | Strategy/SOPs/ICP |
| Agent rules | `AGENTS.md` + `.cursor/rules/halloway-control.mdc` | Mandatory |
| Quarantine | `_archive/` | Prefer archive over silent delete |

**Still one Vite app** at repo root — do not scaffold `/apps/studio-site` as a second app.

---

## Target shape (actual)

```
/
  src/portfolios/      ← PRIMARY: niche kits (influencers live)
  src/pages/           thin studio shell pages
  public/portfolios/   kit templates / printables
  config/              brand.json, niches.json
  docs/PORTFOLIO_SYSTEM.md
  outbound-os/         outreach OS (dry-run)
  _archive/
```

Do not invent parallel Vite apps for the same job.

---

## Ports (local)

| App | Port |
|-----|------|
| Marketing | 5173 |
| Outbound UI | 5174 |
| Outbound API | 3001 |

---

## Doc precedence (when docs disagree)

1. `docs/CONTROL_PLANE.md` + `docs/IDENTITY.md`  
2. `config/brand.json`  
3. `docs/business/00_INDEX.md`  
4. Root `README.md`  
5. Historical notes (`IDENTITY_FIX.md`, `_archive/`, changelogs)  

---

## Future agents — hard rules

1. Read CONTROL_PLANE + IDENTITY first  
2. Don’t create a second app for an existing job  
3. Don’t invent a second brand file  
4. Don’t enable outreach / `DRY_RUN=false`  
5. Touch only your lane unless fixing build breakage  
6. Log major decisions in [`KNOWN_CONFLICTS_RESOLVED.md`](KNOWN_CONFLICTS_RESOLVED.md)  

---

## Decision log pointer

Ongoing conflict resolutions: [`KNOWN_CONFLICTS_RESOLVED.md`](KNOWN_CONFLICTS_RESOLVED.md)  
Business open decisions: [`business/14_OPEN_DECISIONS.md`](business/14_OPEN_DECISIONS.md)  
Takeover status: **CONTROL_ESTABLISHED** (2026-10-31) — `npm run verify` exit 0.  
Outreach still **OFF**.
