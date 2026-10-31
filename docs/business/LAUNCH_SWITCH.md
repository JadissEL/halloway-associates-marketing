# LAUNCH SWITCH — Acquisition control

| Meta | Value |
|------|--------|
| **Purpose** | Single kill-switch for all acquisition outbound. One place to check before any send. |
| **Owner role** | Founder / CEO (only person who may flip to ON) |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |
| **Non-goals** | Partial unlocks (“just 10 emails”); silent enabling via env alone without this file. |

---

## Current state

```
SWITCH = OFF
```

| Mode | Meaning |
|------|---------|
| **OFF** (now) | No live cold email, no paid outbound amp, no mass DMs, no cold SMS/WhatsApp. Dry-run OS OK. |
| **ON** | Founder dated signature below + GTM checklist complete. |

Mirrored flags (must match this file):

- `outreach/LAUNCH_STATUS.md`
- `outbound-os/LAUNCH_STATUS.md`

Canonical switch = **this file** only.

Technical default: Outbound OS `DRY_RUN=true` until switch ON **and** env deliberately set.

---

## Unlock protocol (when ready)

1. Complete [`11_CROSS_CUTTING.md`](11_CROSS_CUTTING.md) readiness + financial gates in [`04_FINANCIAL.md`](04_FINANCIAL.md).  
2. Complete soft GTM checklist (identity, legal min, delivery SOPs tested).  
3. Set `SWITCH = ON` below with date + initials.  
4. Update mirrored LAUNCH_STATUS files.  
5. Only then change OS send mode / start campaigns.

### Unlock record (blank until used)

```
SWITCH = OFF
Unlocked by: _______________
Date: _______________
Scope: ( ) soft manual only  ( ) outbound dry-run campaigns  ( ) live email
Notes: _______________
```

---

## While OFF — still allowed

- Edit sequences/templates  
- Dry-run worker / seed data  
- Manual audits with warm network contacts  
- Improve site, demos, carte, SOPs, finance model  
