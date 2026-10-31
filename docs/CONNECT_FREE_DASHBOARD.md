# Free-tier dashboard pastes (API cannot return these)

Permanent skip: **Namecheap · Ahrefs · G2 · n8n-local** (Hunter vaulted; Supabase inventoried — Neon remains DB SoT; both Free projects paused)

Paste values into **`.secrets/TOKENS.env`** only (gitignored). Do not commit.

| # | Service | Action | Vault keys |
|---|---------|--------|------------|
| 1 | **Stripe** (CLEANCOLAB) | Open [Test API keys](https://dashboard.stripe.com/test/apikeys) → reveal/copy Publishable + Secret | `STRIPE_PUBLISHABLE_KEY`, `VITE_STRIPE_PK`, `STRIPE_SECRET_KEY` |
| 2 | **Sentry** | Org [shopthebarber](https://shopthebarber.sentry.io) → New project `halloway-web` (React) → Client Keys → DSN | `SENTRY_DSN`, `VITE_SENTRY_DSN` |
| 3 | **Cal.com** | [Event types](https://cal.com/event-types) → create **Intro / Discovery** (30m) → copy public link | `VITE_CAL_URL` |
| 4 | **Formspree** | [Forms](https://formspree.io/forms) → New form → copy form id | `VITE_FORMSPREE_ID` |
| 5 | **Clerk** | [Dashboard](https://dashboard.clerk.com) → **Halloway Associates** → API Keys → Secret | `CLERK_SECRET_KEY` (publishable already in vault) |
| 6 | **Slack** (optional) | Channel → Apps → Incoming Webhooks → copy URL | `SLACK_WEBHOOK_URL` |

## Already connected (this pass)

- Clerk app **Halloway Associates** — `CLERK_PUBLISHABLE_KEY` / `VITE_CLERK_PUBLISHABLE_KEY`
- Google Sheets CRM — `GOOGLE_SHEETS_LEADS_ID` / URL
- Resend, Neon, Vercel IDs, Cloudflare zone, Notion + Linear (MCP)

## Deferred

- Vercel **deploy** — only when you ask
- Outreach — keep `DRY_RUN=true`
