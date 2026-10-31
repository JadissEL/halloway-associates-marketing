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

**Namecheap · Ahrefs · G2** (Hunter inventoried; Supabase MCP ready — Neon remains DB SoT). **n8n-local is installed** (see below).

**GitHub:** PAT saved globally (User env + `~\.cursor\mcp.secrets.env` + `~\.secrets\TOKENS.env` + project vault). MCP via `github-mcp-bridge.ps1` — **all Cursor projects**.

## Cross-project MCP

User-level `~\.cursor\mcp.json` + Cursor Plugins OAuth already apply to every workspace. Doc: `~\.cursor\CROSS_PROJECT_MCP.md`.

## Agent constraint

**No computer control** — MCP/API + vault pastes only; no desktop automation.

## Connected

MCP: Vercel, Neon, Cloudflare, Render, Clerk, Stripe, Resend, Sentry, Notion, Linear, Slack, Google suite, Canva, Postiz, Descript, Firebase, Readwise, X, YouTube, Bird, Restream, Upwork, Treg, Ryze, Apollo, Tavily, Chrome DevTools, Cursor Origin, Twilio docs, Prisma, …

Infra: Cloudflare DNS → Vercel · Resend domain verified · Neon URL in vault · Linear project + Notion draft

## Supabase Halloway DB password (founder correction 2026-10-31)

- Password **`XCDXCD963j3j++`** is **Supabase Halloway** (`qzqgjwxaoyczseyzgtrp`), **not Neon**
- Vaulted permanently: `SUPABASE_DB_PASSWORD`, `SUPABASE_HALLOWAY_DB_PASSWORD`, `HALLOWAY_DB_PASSWORD` (+ User env + `~\.secrets\supabase-halloway-db.env`)
- URLs: `SUPABASE_DATABASE_URL` (direct `:5432`), `SUPABASE_DATABASE_URL_POOLER` (`:6543`) — `+` encoded `%2B%2B`
- Host reachable: `db.qzqgjwxaoyczseyzgtrp.supabase.co:5432`

## Neon (Prisma SoT — password still needed)

- Host `ep-solitary-math-aklnr0jh` kept in `DATABASE_URL` / `NEON_DATABASE_URL` with placeholder `NEON_PASSWORD_NEEDED`
- Do **not** reuse the Supabase password for Neon — paste real Neon password when reconnecting

## Newly connected (2026-10-31 cont.)

- **Clerk** app `Halloway Associates` (dev) — publishable + **secret** in vault (`CLERK_SECRET_KEY`); catalog `config/clerk.catalog.json`
- **Google Sheets** CRM — [Leads & Pipeline](https://docs.google.com/spreadsheets/d/1hDfHR7apIscKn14cCW7J2hqkYQA5nMfd2IZahDmd9oY/edit)
- **Formspree** Free — form `xdkwrwwg` (AntaY Contact Form) → vault; catalog `config/formspree.catalog.json`
- Linear **JAD-7** + Notion connections page updated
- Walkthrough: `docs/CONNECT_FREE_DASHBOARD.md`

## Stripe (MCP + founder paste 2026-10-31)

- Account `acct_1P3rXpRq6QrLno3V` (CLEANCOLAB, live)
- **Publishable** `pk_live_…` → vault `STRIPE_PUBLISHABLE_KEY` / `VITE_STRIPE_PK` (+ User env)
- **Restricted** `rk_live_…` → vault `STRIPE_SECRET_KEY` / `STRIPE_RESTRICTED_KEY` (+ User env + `~\.cursor\mcp.json`)
- Catalog: Starter/Pro/Authority + Pro deposit 50% + Consulting 45m — see `config/stripe.catalog.json`
- Payment links: Pro full + Pro deposit in vault

## Namecheap (Chrome DevTools 2026-10-31)

- Logged in as **jadiss333** (session elantaki.dijadiss@gmail.com)
- **API access DENIED** (qualification: $50 balance / 20 domains / $50 spend) → Namecheap MCP stays broken until that clears
- Domains: `hallowayassociates.com` (ACTIVE → 2027-06-14), `shopthebarber.app`
- NS Custom DNS → `beau.ns.cloudflare.com` / `paityn.ns.cloudflare.com` (matches Cloudflare)
- SoT: `config/namecheap.catalog.json` — DNS ops stay on **Cloudflare MCP**, not Namecheap API

## Cal.com (Chrome DevTools 2026-10-31)

- User `jadiss-el-antaki-igubeb` — public https://cal.com/jadiss-el-antaki-igubeb
- **Primary:** https://cal.com/jadiss-el-antaki-igubeb/30min → `VITE_CAL_URL` (vault + `.env` + influencer kit `data.js`)
- Catalog: `config/cal.catalog.json`

## Ahrefs (Chrome DevTools 2026-10-31)

- **Free plan** — MCP/API returns `Insufficient plan` (no API key to store)
- Projects: Halloway `10623275`, ShopTheBarber `10623274`
- Snapshot hallowayassociates.com: DR **0**, UR **0**, organic **0**; ref domains **711** (mostly nofollow); backlinks ~1.2K; crawled pages **71**
- Catalog: `config/ahrefs.catalog.json`

## Sentry (MCP + Chrome DevTools 2026-10-31)

- Org **shopthebarber** (US) — team `shopthebarber`
- Created project **halloway-web** (`4512348414214144`, React) — DSN in vault as `SENTRY_DSN` / `VITE_SENTRY_DSN`
- Keys UI verified: https://shopthebarber.sentry.io/settings/projects/halloway-web/keys/
- Catalog: `config/sentry.catalog.json` (no DSN in git)

## Clerk (MCP + Chrome DevTools 2026-10-31)

- Canonical: **Halloway Associates** `app_3LRHaNDwmtkvuOg1F00XngYtibl` / `ins_3LRHaN1Cc3doPPZ7A3LLLyO6Gv4` (dev)
- FAPI: `https://clean-vervet-9406.clerk.accounts.dev`
- Vault: `CLERK_PUBLISHABLE_KEY`, `VITE_CLERK_PUBLISHABLE_KEY`, `CLERK_SECRET_KEY`
- Ignore typo app **HallowayAsoociates** (`app_3JCJAEhXxnZR51qzI3DTqVaN51D`)
- Catalog: `config/clerk.catalog.json` (no secrets in git)

## Formspree (Chrome DevTools 2026-10-31)

- Account **elantaki.dijadiss@gmail.com** — **Free** (0/50 submissions); no API key
- Form **AntaY Contact Form** id `xdkwrwwg` → `https://formspree.io/f/xdkwrwwg`
- Notify: `antayco.info@gmail.com` · Formshield on · CAPTCHA off · enabled
- Vault: `VITE_FORMSPREE_ID`, `FORMSPREE_ENDPOINT` (+ plan/notify metadata)
- Catalog: `config/formspree.catalog.json`

## Hunter (Chrome DevTools 2026-10-31)

- Account **elantaki.dijadiss@gmail.com** — **Free**; team `7430313`
- Credits **50/50**, searches **50**, verifications **100** — reset **2026-11-24**
- API key vaulted → `HUNTER_API_KEY` (`.secrets`, `.env`, `outbound-os/.env`, `outbound-os/server/.env`)
- MCP URL `https://mcp.hunter.io/mcp` — Cursor plugin still **needsAuth** (OAuth skipped this session)
- Catalog: `config/hunter.catalog.json`
- **Still to set:** approve Hunter MCP OAuth in Cursor; wire outbound-os lead discover to API (stub only today); optional mailbox slot for Sequences

## Supabase (MCP authenticated 2026-10-31)

- Org **JadissEL's Org** — Free
- **Halloway** Active/Healthy · ref `qzqgjwxaoyczseyzgtrp` · eu-west-3 Nano · `https://qzqgjwxaoyczseyzgtrp.supabase.co`
- Cursor MCP `user-supabase` **authenticated** (scoped to that project_ref)
- Vault: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_PUBLISHABLE_KEY`, **`SUPABASE_DB_PASSWORD`** / `SUPABASE_DATABASE_URL*` (+ Vite mirrors)
- Public tables: none yet · no migrations
- Legacy paused: ShopTheBarber (unrestorable), BACMA (resumable to 2027-04-14)
- Marketing Prisma SoT still **Neon** unless you switch a feature to Supabase
- Catalog: `config/supabase.catalog.json`
- **Still optional:** paste `SUPABASE_SERVICE_ROLE_KEY` (server-only) from API Keys UI; paste real **Neon** DB password if Prisma needs Neon again

## n8n local (npm + editor 2026-10-31)

- Installed globally: **n8n 2.45.7** (`npm install -g n8n@latest`)
- Running: `http://127.0.0.1:5678` — start via `%USERPROFILE%\.n8n\start.ps1` (loads `env.ps1`)
- Owner: `jadisselantaki@hallowayassociates.com` — password vault `N8N_OWNER_PASSWORD`
- **MCP enabled** via env (`N8N_MCP_MANAGED_BY_ENV` + `N8N_MCP_ACCESS_ENABLED`) — status Enabled
- MCP URL `http://localhost:5678/mcp-server/http` — token vault `N8N_MCP_TOKEN` (+ User env); Cursor server `n8n-local` (supergateway)
- REST API key label **Halloway Cursor** (never expires) → vault `N8N_API_KEY`
- Catalog: `config/n8n.catalog.json`
- **Cursor:** reload MCP / restart IDE so `N8N_MCP_TOKEN` User env is visible to `n8n-local`

## Still open (dashboard paste)

1. Hunter MCP OAuth in Cursor (API key already vaulted)
2. Optional Supabase `service_role` key (server-only) if needed
3. Reload Cursor MCP for `n8n-local` after this session
4. Deploy — only when you ask






