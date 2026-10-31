# INTEGRATIONS — status board

| Meta | Value |
|------|--------|
| **Purpose** | What’s connected vs stubbed (free-tier first). |
| **Owner** | Founder / Growth systems hat |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |
| **Non-goals** | Buying paid tools; enabling live outbound. |
| **Full catalog (~90)** | [`INTEGRATIONS_CATALOG.md`](INTEGRATIONS_CATALOG.md) |
| **Machine status** | [`../config/integrations.status.json`](../config/integrations.status.json) |

## Snapshot (runtime product)

| Integration | Status | Notes |
|-------------|--------|-------|
| Brand JSON | **Connected** | `config/brand.json` |
| Vite marketing | **Connected** | root |
| Vercel project | **Connected** | `halloway-associates` |
| Neon project | **Connected** | `halloway-associates` (wire `DATABASE_URL`) |
| Form → OS inbound-lead | **Optional** | `VITE_OUTBOUND_API_URL` |
| Formspree / Tally | **Stub** | free form ids |
| Outbound dry-run | **Connected** | default |
| Resend / Brevo / SMTP | **Stub** | live locked |
| OpenAI classifier | **Mock** | key optional (paid) |
| Google Places | **Mock** | key optional |
| Redis/BullMQ | **Optional** | `SYNC_JOBS=true` |
| Cal.com / Calendly | **Stub** | `VITE_CAL_URL` |
| Clerk (Gmail + LinkedIn) | **Connected** | App `HallowayAsoociates`; Google + LinkedIn on; `VITE_CLERK_PUBLISHABLE_KEY` in `.env` |
| Stripe | **Stub** | Test UX in kit; keys optional |
| Analytics (GA4/Umami/Plausible/Clarity/PostHog) | **Signup** | free tiers |
| Ops (Notion/Linear/Slack/Discord/Telegram/n8n) | **Signup** | free tiers |
| Delivery (Sanity/Cloudinary/GBP) | **Signup** | free tiers |
| MCP tools | **Dev-time** | not runtime product |
| Instantly / Apify / DM bots | **Locked** | Layer 3–4 |

Outreach amplification / Instantly / mass DM: **forbidden** while LAUNCH_SWITCH OFF.

**Counts:** see `catalogCount` in `config/integrations.status.json` (target ≥90 including locked).
