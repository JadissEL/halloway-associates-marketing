# Auth queue — free-tier (deploy deferred)

## Secrets vault (permanent, local)

| File | Git | Contents |
|------|-----|----------|
| **`.secrets/TOKENS.env`** | **ignored** | Resend key, Neon `DATABASE_URL`, JWT, webhook, Vercel/CF IDs, placeholders |
| `.secrets/README.md` | tracked | How to use vault |
| `config/TOKENS.env.example` | tracked | Empty template |
| `docs/SECRETS.md` | tracked | Policy |

Runtime mirrors (also ignored): `.env`, `outbound-os/.env`, `outbound-os/server/.env` — synced with Resend + Neon + JWT.

## Permanent skip (this Marketing repo)

**Hunter · Namecheap · Ahrefs · G2 · Supabase · n8n-local**

**GitHub:** PAT saved globally (User env + `~\.cursor\mcp.secrets.env` + `~\.secrets\TOKENS.env` + project vault). MCP via `github-mcp-bridge.ps1` — **all Cursor projects**.

## Cross-project MCP

User-level `~\.cursor\mcp.json` + Cursor Plugins OAuth already apply to every workspace. Doc: `~\.cursor\CROSS_PROJECT_MCP.md`.

## Agent constraint

**No computer control** — MCP/API + vault pastes only; no desktop automation.

## Connected

MCP: Vercel, Neon, Cloudflare, Render, Clerk, Stripe, Resend, Sentry, Notion, Linear, Slack, Google suite, Canva, Postiz, Descript, Firebase, Readwise, X, YouTube, Bird, Restream, Upwork, Treg, Ryze, Apollo, Tavily, Chrome DevTools, Cursor Origin, Twilio docs, Prisma, …

Infra: Cloudflare DNS → Vercel · Resend domain verified · Neon URL in vault · Linear project + Notion draft

## Newly connected (2026-10-31 cont.)

- **Clerk** app `Halloway Associates` (dev) — publishable key in vault; secret still from dashboard
- **Google Sheets** CRM — [Leads & Pipeline](https://docs.google.com/spreadsheets/d/1hDfHR7apIscKn14cCW7J2hqkYQA5nMfd2IZahDmd9oY/edit)
- **Formspree** `https://formspree.io/f/xdkwrwwg` → vault + `.env` (confirmed)
- Linear **JAD-7** + Notion connections page updated
- Walkthrough: `docs/CONNECT_FREE_DASHBOARD.md`

## Still open (free — dashboard paste)

1. Cal.com → `VITE_CAL_URL` (login open in browser)
2. Sentry DSN → create `halloway-web` under shopthebarber
3. Stripe test keys (CLEANCOLAB) → vault
4. Clerk secret key → vault
5. Deploy — only when you ask
