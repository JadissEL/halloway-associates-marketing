# Email authentication plan (SPF / DKIM / DMARC)

| Meta | Value |
|------|--------|
| **Purpose** | Document how sending domain will be authenticated **before** live outreach. |
| **Sending today** | **OFF** — `LAUNCH_SWITCH=OFF` · `DRY_RUN=true` |
| **Last updated** | 2026-10-31 |
| **Status** | Plan only — records **not** required until unlock |

---

## Provider

Default path: **Resend** (already in Integrations / free-tier path). Fallback: SMTP mailbox.

From identity (when live): align with `config/brand.json` — prefer a dedicated subdomain (e.g. `hello@mail.hallowayassociates.com` or provider-recommended) so apex web DNS stays clean.

## Records to publish (when founder unlocks)

| Record | Intent |
|--------|--------|
| **SPF** | TXT on sending domain/subdomain: `v=spf1 include:… ~all` (exact value from Resend/SMTP docs) |
| **DKIM** | CNAME(s) Resend (or SMTP) provides — publish before first live send |
| **DMARC** | TXT `_dmarc.…` start `v=DMARC1; p=none; rua=mailto:jadisselantaki@hallowayassociates.com` then tighten to `quarantine`/`reject` after warm-up |
| **Unsubscribe** | Public `UNSUBSCRIBE_BASE_URL` → Outbound OS `GET /api/public/unsubscribe` (must be HTTPS in prod) |

## Warm-up (first campaign)

- One niche × one city (Athens · influencers)  
- Cap **10–20**/day  
- Monitor bounces + unsubscribes daily week 1  

## Gate

Do **not** set `DRY_RUN=false` until:

1. This plan’s SPF + DKIM + DMARC are live and verified (MXToolbox / provider dashboard)  
2. [`GO_LIVE_CHECKLIST.md`](GO_LIVE_CHECKLIST.md) boxes for sending domain are checked  
3. Founder unlocks [`docs/business/LAUNCH_SWITCH.md`](business/LAUNCH_SWITCH.md) with dated signature  

While OFF: dry-run templates may include unsubscribe links; no provider send.
