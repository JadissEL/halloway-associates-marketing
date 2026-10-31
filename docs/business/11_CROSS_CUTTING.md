# 11 — Cross-cutting (legal posture, risk, roadmap, decisions)

| Meta | Value |
|------|--------|
| **Purpose** | Legal/compliance awareness, risk register, gated roadmap, open decisions log. |
| **Owner role** | Founder / CEO |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |
| **Non-goals** | Formal legal opinion; unlocking outreach; implementing all mitigations at once. |

---

## Legal / compliance posture (informational)

| Area | Posture |
|------|---------|
| Commercial | Written proposal + milestones; CGV stubs on site → lawyer before scale |
| Privacy | Forms collect min data; privacy page stub; no resale |
| Outreach law | GDPR / ePrivacy / CAN-SPAM awareness; unsubscribe + suppressions in OS |
| While switch OFF | No cold live send = lower regulatory exposure |

Not legal advice — confirm locally (`{{CITY}}` / FR / EL).

---

## Risk register + controls

| Risk | Impact | Control |
|------|--------|---------|
| Accidental live outbound | High | `LAUNCH_SWITCH` OFF + `DRY_RUN=true` |
| Scope creep kills margin | High | SOPs 03–06 + change orders |
| Unpaid work | High | Deposit before build |
| Brand/config drift | Med | Single `brand.json` |
| Legal stub insufficiency | Med | Pre-client legal checklist |
| Founder burnout | High | WIP cap 3 + weekly review |
| Cheap-competitor race | Med | Refuse bottom pricing (philosophy) |
| Client asset delays | Med | Clock pause rule |

---

## Roadmap (gated)

```text
1 Structure     ← docs/business (this OS)           [IN PROGRESS / largely done]
2 Quality       ← docs/QUALITY_AUDIT.md             [done prior gate]
3 Unify/Deploy  ← production brand site             [founder]
4 Delivery Factory ← SOPs + niche skins practiced   [next]
5 Outreach unlock ← LAUNCH_SWITCH ON only           [LOCKED]
```

### Explicit locks (must match INDEX)

Until founder unlocks [`LAUNCH_SWITCH.md`](LAUNCH_SWITCH.md):

- ❌ Live cold email sending  
- ❌ Paid outbound amplification  
- ❌ Mass social DMs  
- ❌ Cold SMS/WhatsApp  
- ✅ Structure, templates, SOPs, financial planning, dry-run readiness  

---

## Open decisions log

**Canonical list:** [`14_OPEN_DECISIONS.md`](14_OPEN_DECISIONS.md) (includes `STRUCTURE_PARTIAL` verdict).  
Do not duplicate long tables here — update file 14 only.
