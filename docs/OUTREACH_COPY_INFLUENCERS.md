# Outreach copy — Influencer Digital Kit

| Meta | Value |
|------|--------|
| **Status** | **LOCKED** — copy only · no sending |
| **Product sold** | **Halloway Influencer Digital Kit** — paid booking for collab / guidance / meet / lessons; stop inbox chaos |
| **Not sold** | “We build marketing websites for our agency” |
| **Identity** | Jadiss Elantaki · Halloway Associates · jadisselantaki@hallowayassociates.com · https://hallowayassociates.com |
| **Demo** | https://hallowayassociates.com/portfolios/influencers |
| **Commercial** | [`docs/business/OFFER_AND_BEACHHEAD.md`](business/OFFER_AND_BEACHHEAD.md) |
| **Launch** | [`docs/business/LAUNCH_SWITCH.md`](business/LAUNCH_SWITCH.md) = **OFF** |
| **Follow-up doctrine** | [`OUTREACH_FOLLOWUPS.md`](OUTREACH_FOLLOWUPS.md) |
| **Cheat sheet** | [`FOLLOWUP_CHEATSHEET.md`](FOLLOWUP_CHEATSHEET.md) |
| **Last updated** | 2026-10-31 |

---

## Asset map

| Asset | Path |
|-------|------|
| **Follow-up doctrine** | [`OUTREACH_FOLLOWUPS.md`](OUTREACH_FOLLOWUPS.md) |
| **Cheat sheet** | [`FOLLOWUP_CHEATSHEET.md`](FOLLOWUP_CHEATSHEET.md) |
| Follow-up templates (§10) | [`outreach/followups/influencers/`](../outreach/followups/influencers/) |
| OS follow-up ops | [`outbound-os/docs/FOLLOWUP_OPS.md`](../outbound-os/docs/FOLLOWUP_OPS.md) |
| Audit script (15 min scorecard) | [`outreach/audit-checklist.md`](../outreach/audit-checklist.md) |
| 5-email sequence EN | [`outreach/emails/EN-influencer.md`](../outreach/emails/EN-influencer.md) |
| 5-email sequence FR | [`outreach/emails/FR-influencer.md`](../outreach/emails/FR-influencer.md) |
| DMs + LinkedIn/IG blurbs | [`outreach/dms/influencer.md`](../outreach/dms/influencer.md) · [`followups/dm/`](../outreach/followups/dm/) |
| One-pager (md) | [`outreach/one-pager.md`](../outreach/one-pager.md) |
| One-pager (print HTML) | [`public/outreach/one-pager.html`](../public/outreach/one-pager.html) |
| Proposal | [`outreach/proposal-template.md`](../outreach/proposal-template.md) |
| Social captions / blurbs | [`outreach/social/launch-captions.md`](../outreach/social/launch-captions.md) |
| Outbound OS seed (5 steps) | `outbound-os/server/prisma/seed.ts` niche `influencer` |
| OS copy pointer | [`outbound-os/docs/OUTREACH_COPY.md`](../outbound-os/docs/OUTREACH_COPY.md) |

---

## Positioning (use everywhere)

**One sentence:**  
Halloway ships the **Influencer Digital Kit** so creators turn attention into **paid access** — collabs, guidance, meets, lessons — instead of inbox chaos.

**Proof path:** `/portfolios/influencers` → offers → connect → book → success → dashboards.

**CTA:** Free 15-min audit → https://hallowayassociates.com/audit

---

## Sequence skeleton (E1–E5) — doctrine

1. **Pain** — DMs / unpaid time  
2. **Product** — which offer fans pay for first  
3. **Proof** — demo walkthrough  
4. **Contrast** — managers/platforms vs owned booking  
5. **Breakup** — close the loop  

Cadence, branches, statuses: [`OUTREACH_FOLLOWUPS.md`](OUTREACH_FOLLOWUPS.md).  
Languages when live: **EN + EL** (FR for bilingual / studio).

---

## Compliance (hard)

- No live send until `LAUNCH_SWITCH = ON`  
- No auto-DM Instagram / LinkedIn  
- No cold SMS / WhatsApp blasts  
- Always human personalization (1 observation)  
- Unsubscribe / opt-out when email systems go live  

---

## Re-seed Outbound OS (dry-run)

After pulling this copy, locally (does **not** send):

```bash
cd outbound-os/server
# ensure DRY_RUN / launch OFF
npm run db:seed
```

Confirm sequence name **Influencer Digital Kit EN** appears in OS → Sequences. Edit live only in dry-run UI; keep `outreach/emails/*-influencer.md` as human SoT.
