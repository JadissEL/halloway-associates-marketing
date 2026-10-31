# Pre-GTM readiness checklist (before outreach unlock)

| Meta | Value |
|------|--------|
| **Purpose** | GO / NO-GO before founder may unlock cold outreach. |
| **Owner** | Founder / CEO (unlock) · Agent (audit only) |
| **Last run** | 2026-10-31 |
| **Verdict file** | [`../../PRE_GTM_VERDICT.md`](../../PRE_GTM_VERDICT.md) |
| **Non-goals** | Agent flipping `LAUNCH_SWITCH`; live sends. |

**PASS only if every hard gate below is PASS.** Soft notes do not block.

---

## Hard gates

| # | Gate | Evidence | Result |
|---|------|----------|--------|
| 1 | `INFLUENCER_KIT_READY` | [`docs/INFLUENCER_KIT_READY.md`](../../INFLUENCER_KIT_READY.md) | **PASS** |
| 2 | `OFFER_BEACHHEAD_LOCKED` | [`docs/business/OFFER_AND_BEACHHEAD.md`](../OFFER_AND_BEACHHEAD.md) · `config/brand.json` | **PASS** |
| 3 | Identity correct on important surfaces | brand.json · site · kit · outreach signature = Halloway Associates · hallowayassociates.com · jadisselantaki@… | **PASS** |
| 4 | Outbound OS dry-run works **or** documented equivalent | `DRY_RUN=true` · [`E2E_VERIFY.md`](../../E2E_VERIFY.md) · unit tests suppressions/scheduler/classifier | **PASS** |
| 5 | Suppressions + unsubscribe exist | OS `suppression` model/routes · `GET /api/public/unsubscribe` · seed + tests | **PASS** |
| 6 | SPF/DKIM/DMARC **plan** documented (sending still off) | [`docs/EMAIL_DNS_PLAN.md`](../../EMAIL_DNS_PLAN.md) · [`GO_LIVE_CHECKLIST.md`](../../GO_LIVE_CHECKLIST.md) | **PASS** |
| 7 | Legal stubs — studio site + booking kit | `/mentions-legales` `/confidentialite` `/cgv` · `/portfolios/influencers/legal` | **PASS** |
| 8 | Sales copy matches Influencer Digital Kit | [`docs/OUTREACH_COPY_INFLUENCERS.md`](../../OUTREACH_COPY_INFLUENCERS.md) | **PASS** |
| 9 | `LAUNCH_SWITCH` still **LOCKED** until founder types UNLOCK | [`LAUNCH_SWITCH.md`](../LAUNCH_SWITCH.md) = OFF · mirrors OFF | **PASS** |

**Run outcome →** [`docs/PRE_GTM_VERDICT.md`](../../PRE_GTM_VERDICT.md) = `READY_TO_UNLOCK_OUTREACH` (switch not flipped).

---

## Soft (non-blocking)

| Item | Notes |
|------|--------|
| Phone / Instagram empty | D2 open — networking later |
| Legal entity / SIRET | D3 open — stubs OK for gate |
| Production deploy | Optional for copy/dry-run gate |
| Secondary local niche email sequences | Still older framing; flagship = influencer files |
| Live SPF/DKIM published | **Not** required while sending OFF — plan only |

---

## Unlock rule

Agents **must not** set `SWITCH = ON`.  
Only the founder, after reading `PRE_GTM_VERDICT.md` = `READY_TO_UNLOCK_OUTREACH`, types unlock into `LAUNCH_SWITCH.md` per that file’s protocol.
