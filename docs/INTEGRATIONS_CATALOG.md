# Integrations catalog — Halloway Associates (free-first)

**Policy:** official API → MCP → controlled crawler. Scraping last resort. **Outreach live = LOCKED** until `docs/business/LAUNCH_SWITCH.md` + `docs/GO_LIVE_CHECKLIST.md`.

**Status legend:** `connected` · `stubbed` · `signup` · `locked` · `n/a-free` · `manual`

**Counts (this file):** ~90 platforms catalogued · ~25 Layer-1/2 actionable free · rest stubbed/locked until revenue.  
Machine status: [`config/integrations.status.json`](../config/integrations.status.json) · board: [`INTEGRATIONS.md`](INTEGRATIONS.md).

---

## Layer 1 — Connect soon (free)

| # | Tool | Why | Env / connect | Status |
|---|------|-----|---------------|--------|
| 1 | **Vercel** | Marketing + client sites | MCP / dashboard · project `halloway-associates` | `connected` |
| 2 | **GitHub** | Repo, Actions CI | MCP + git remote | `signup` |
| 3 | **Neon** | Postgres OS | `DATABASE_URL` · project `halloway-associates` | `connected` |
| 4 | **Cloudflare** | DNS, CDN, Turnstile, R2, Tunnel | Dashboard | `signup` |
| 5 | **Resend** | Transactional email | `RESEND_API_KEY` | `stubbed` |
| 6 | **Cal.com** | Audit + consulting | `VITE_CAL_URL` | `signup` |
| 7 | **Clerk** | Future portals (JWT today) | MCP OK · `CLERK_*` | `stubbed` |
| 8 | **Sentry** | Errors | `SENTRY_DSN` `VITE_SENTRY_DSN` | `signup` |
| 9 | **Registrar** | hallowayassociates.com | Namecheap / CF Registrar | `signup` |
| 10 | **UptimeRobot** | Uptime | Dashboard | `signup` |
| 11 | **Google Search Console** | SEO index | Dashboard OAuth | `signup` |
| 12 | **GA4** or **Umami** / **Plausible** | Analytics | script / self-host | `signup` |
| 13 | **Google Business Profile** | Local SEO demos/clients | Dashboard | `signup` |
| 14 | **GitHub Actions** | CI verify/build | `.github/workflows` | `signup` |
| 15 | **Let’s Encrypt** | TLS (via Vercel/CF) | automatic | `connected` (via host) |

Local free: Docker Postgres + `SYNC_JOBS=true` (no Upstash).

---

## Layer 2 — Stub adapters now (free / free-to-connect / credits)

| # | Tool | Env | Status | Notes |
|---|------|-----|--------|-------|
| 16 | **Render** | dashboard | `signup` | OS API free tier; workspace ready |
| 17 | **Fly.io** | `FLY_*` | `signup` | Alt API host |
| 18 | **Upstash Redis** | `REDIS_URL` | `stubbed` | Prefer `SYNC_JOBS=true` |
| 19 | **Stripe** (+ Portal / Payment Links) | `STRIPE_*` `VITE_STRIPE_PK` | `stubbed` | Test mode free |
| 20 | **PayPal** | `PAYPAL_*` | `stubbed` | Alt deposits |
| 21 | **OpenAI** | `OPENAI_API_KEY` | `stubbed` | **Paid** — mock without key |
| 22 | **Google Places** | `GOOGLE_PLACES_API_KEY` | `stubbed` | Credits |
| 23 | **Mapbox** | `VITE_MAPBOX_TOKEN` | `signup` | Free tier |
| 24 | **Hunter.io** | `HUNTER_API_KEY` | `stubbed` | Limited free |
| 25 | **Apollo.io** | `APOLLO_API_KEY` | `stubbed` | Limited free |
| 26 | **Formspree** | `VITE_FORMSPREE_ID` | `stubbed` | Forms |
| 27 | **Tally** / **Fillout** | `VITE_TALLY_URL` | `signup` | Free forms alt |
| 28 | **Slack** | `SLACK_WEBHOOK_URL` | `stubbed` | Alerts |
| 29 | **Discord** | `DISCORD_WEBHOOK_URL` | `stubbed` | Free alerts alt |
| 30 | **Telegram Bot** | `TELEGRAM_BOT_TOKEN` `TELEGRAM_CHAT_ID` | `stubbed` | Free ops pings |
| 31 | **Better Stack** | dashboard | `signup` | Logs + uptime |
| 32 | **PostHog** | `VITE_POSTHOG_KEY` | `signup` | Product analytics free |
| 33 | **Microsoft Clarity** | script | `signup` | Free session heatmaps |
| 34 | **GTM** | `VITE_GTM_ID` | `signup` | Tag hub |
| 35 | **Meta Pixel** | `VITE_META_PIXEL_ID` | `signup` | Ads later |
| 36 | **LinkedIn Insight Tag** | `VITE_LI_PARTNER_ID` | `signup` | B2B |
| 37 | **Brevo** | `BREVO_API_KEY` | `stubbed` | Free email/CRM lite |
| 38 | **Loops.so** | `LOOPS_API_KEY` | `stubbed` | Product email |
| 39 | **Notion** | `NOTION_TOKEN` | `signup` | ICP / SOPs · MCP |
| 40 | **Linear** | `LINEAR_API_KEY` | `signup` | Tasks · MCP |
| 41 | **Airtable** | `AIRTABLE_*` | `signup` | Lead mirror |
| 42 | **Google Sheets** | service account | `signup` | Lead export |
| 43 | **HubSpot free CRM** | `HUBSPOT_TOKEN` | `signup` | Optional CRM |
| 44 | **n8n** (self-host) | URL | `signup` | Free automation |
| 45 | **Make.com** | webhook | `signup` | Free tier |
| 46 | **Zapier** | webhook | `signup` | Free tier |
| 47 | **Pipedream** | `PIPEDREAM_*` | `signup` | Free workflows |
| 48 | **Crisp** / **Tawk.to** | widget id | `signup` | Free chat |
| 49 | **Loom** | links | `manual` | Async demos |
| 50 | **Zoom** / **Google Meet** | OAuth later | `signup` | Calls |
| 51 | **Calendly** | `VITE_CALENDLY_URL` | `signup` | Alt to Cal.com |
| 52 | **Cloudinary** | `CLOUDINARY_*` | `signup` | Client images |
| 53 | **Uploadcare** | `UPLOADCARE_PUBLIC_KEY` | `signup` | Uploads |
| 54 | **Sanity** | `SANITY_*` | `signup` | Client CMS free |
| 55 | **Baserow** / **NocoDB** | URL | `signup` | Free Airtable-like |
| 56 | **Unsplash** / **Pexels** | `UNSPLASH_ACCESS_KEY` | `signup` | Demo imagery |
| 57 | **Brandfetch** / **Logo.dev** | `BRANDFETCH_API_KEY` | `signup` | Client logos |
| 58 | **Figma** | MCP / links | `signup` | Design |
| 59 | **Canva** | manual | `signup` | One-pagers |
| 60 | **Buffer** / **Postiz** | API later | `signup` | Social schedule (manual send) |
| 61 | **Google Postmaster** | dashboard | `signup` | Domain reputation |
| 62 | **MXToolbox** / **DMARC analyzer** | web | `signup` | SPF/DKIM/DMARC |
| 63 | **Bing Webmaster** | dashboard | `signup` | Alt index |
| 64 | **PageSpeed** / **Lighthouse CI** | Actions | `signup` | Perf |
| 65 | **Playwright** | local/CI | `connected` (tooling) | E2E |
| 66 | **Doppler** / **Infisical** | optional | `signup` | Secrets (free tier) |
| 67 | **Bitwarden** | vault | `manual` | Creds |
| 68 | **Tailscale** / **CF Tunnel** | — | `signup` | Secure local tunnels |
| 69 | **ngrok** | `NGROK_AUTHTOKEN` | `signup` | Webhook testing |
| 70 | **Wave** / Excel | export | `signup` | Invoices MVP |
| 71 | **PayPal.Me** / Wise | links | `manual` | Soft collect |
| 72 | **DocuSign** / **Dropbox Sign** | later | `signup` | Limited free e-sign |
| 73 | **Tavily** / Brave Search | `TAVILY_API_KEY` | `signup` | Research MCP |
| 74 | **Context7** | MCP | `connected` (dev) | Lib docs |
| 75 | **SerpAPI** | `SERPAPI_KEY` | `stubbed` | Credits; research |
| 76 | **Dropcontact** | `DROPCONTACT_API_KEY` | `stubbed` | EU enrichment trial |
| 77 | **Kaspr** | — | `stubbed` | EU trial |
| 78 | **Algolia** / Meilisearch | later | `signup` | Site search free tier |
| 79 | **Plausible** | `VITE_PLAUSIBLE_DOMAIN` | `signup` | Privacy analytics |
| 80 | **Umami** | self-host URL | `signup` | Free self-host |
| 81 | **Highlight.io** / LogRocket free | DSN | `signup` | Session replay free tier |
| 82 | **Axiom** / Grafana Cloud | — | `signup` | Logs free tier |
| 83 | **hCaptcha** / **Turnstile** | site keys | `signup` | Forms anti-bot |
| 84 | **iubenda** / open cookie banner | code | `signup` | Consent draft |
| 85 | **Termly** / privacy generators | manual → lawyer | `manual` | Draft only |
| 86 | **Have I Been Pwned** | API key optional | `signup` | Breach hygiene |
| 87 | **SSL Labs** / securityheaders.com | web | `manual` | Hardening checks |
| 88 | **IndexNow** | key file | `signup` | Fast index Bing/Yandex |
| 89 | **Beehiiv** / Substack | later | `signup` | Founder newsletter |
| 90 | **ConvertKit** free | later | `signup` | Email list |

---

## Layer 3 — After first clients / unlock (mostly paid)

| Tool | Status |
|------|--------|
| Instantly / Smartlead / Lemlist | `locked` |
| Amazon SES / Postmark at scale | `locked` |
| Clay / Clearbit / People Data Labs | `locked` |
| Mailwarm / dedicated warmup | `locked` |
| OpenRouter / Anthropic at volume | `n/a-free` |
| Whisper / Deepgram | `locked` |
| Customer.io / Intercom paid | `locked` |
| SoftOne / Greek accounting SaaS | `signup` when invoicing |
| AADE / VAT process | `manual` + accountant |

---

## Layer 4 — Policy-gated (do not use for growth)

| Tool | Status | Rule |
|------|--------|------|
| Apify Actors (Maps/IG public) | `locked` | Research only · GDPR |
| Bright Data | `locked` | Cost · overkill |
| Phantombuster / Expandi / Waalaxy | `locked` | Ban risk |
| CAPTCHA farms / inbox scrape / shady dumps | `locked` | Forbidden |
| Meta Graph / LinkedIn API cold spam | `locked` | Prefer human + OS copy |

---

## By job (quick index)

| Job | Platforms |
|-----|-----------|
| **Host / data** | Vercel, Render, Fly, Neon, Upstash, Cloudflare, GitHub, Actions |
| **Auth / email / calendar / pay** | Clerk/JWT, Resend, Brevo, Loops, Cal.com, Calendly, Stripe, PayPal |
| **AI** | OpenAI stub, Context7, Tavily; Anthropic/OpenRouter later |
| **Leads** | Places stub, Hunter/Apollo stub, Dropcontact, CSV, Sheets, mock discover |
| **Outreach** | Outbound OS dry-run only; sequencers locked |
| **CRM / ops** | OS, Notion, Linear, HubSpot free, Airtable, Slack/Discord/Telegram, n8n/Make/Zapier |
| **Delivery** | Vercel, Sanity, Cloudinary, Formspree/Tally, Umami/Plausible/GA4, GBP |
| **Consulting** | Cal.com, Meet/Zoom, Loom, Stripe Payment Links, Notion notes |
| **Design / brand** | Figma, Canva, Unsplash/Pexels, Brandfetch, Google Fonts, QR in-repo |
| **Compliance / money** | Cookie banner, Termly drafts, Wave, Wise, lawyer review |
| **Observability** | Sentry, UptimeRobot, Better Stack, Clarity, PostHog, Lighthouse |

---

## MCP worth enabling in Cursor

| Priority | MCP | Status |
|----------|-----|--------|
| P0 | Vercel, Neon, GitHub, Render | Vercel/Neon/Render OK · GitHub re-auth |
| P1 | Stripe, Clerk, Notion, Linear, Context7 | Stripe/Clerk OK |
| P2 | Resend (if available), Cloudflare, Sentry | signup |
| P3 | Apify / Bright Data / Tavily | research only |

---

## Env stubs (add to local `.env` — never commit secrets)

See [`.env.example`](../.env.example) and [`outbound-os/.env.example`](../outbound-os/.env.example). New catalog stubs:

```bash
# Marketing
VITE_CAL_URL= VITE_CALENDLY_URL= VITE_FORMSPREE_ID= VITE_TALLY_URL=
VITE_STRIPE_PK= VITE_SENTRY_DSN= VITE_MAPBOX_TOKEN=
VITE_POSTHOG_KEY= VITE_GTM_ID= VITE_META_PIXEL_ID= VITE_LI_PARTNER_ID=
VITE_PLAUSIBLE_DOMAIN=

# Outbound / ops
DATABASE_URL= REDIS_URL= SYNC_JOBS=true DRY_RUN=true
RESEND_API_KEY= BREVO_API_KEY= LOOPS_API_KEY=
OPENAI_API_KEY= GOOGLE_PLACES_API_KEY= HUNTER_API_KEY= APOLLO_API_KEY=
DROPCONTACT_API_KEY= SERPAPI_KEY= TAVILY_API_KEY=
STRIPE_SECRET_KEY= STRIPE_PUBLISHABLE_KEY= PAYPAL_CLIENT_ID=
SLACK_WEBHOOK_URL= DISCORD_WEBHOOK_URL= TELEGRAM_BOT_TOKEN= TELEGRAM_CHAT_ID=
SENTRY_DSN= NOTION_TOKEN= LINEAR_API_KEY= HUBSPOT_TOKEN=
CLOUDINARY_URL= SANITY_PROJECT_ID=
```

---

## Founder order (free only)

1. Neon `DATABASE_URL` → OS  
2. GitHub → Vercel project + domain (Cloudflare DNS)  
3. Resend verify domain (keep dry-run)  
4. Cal.com → `VITE_CAL_URL`  
5. Search Console + Umami/Plausible/GA4 + UptimeRobot  
6. Sentry + Stripe **test**  
7. Notion/Linear for ops  
8. Crisp/Tawk + Loom templates  
9. **Stop** — do not unlock Layer 3–4 or live send  

---

## Related

- [`DEPLOY.md`](DEPLOY.md) · [`GO_LIVE_CHECKLIST.md`](GO_LIVE_CHECKLIST.md) · [`INTEGRATIONS.md`](INTEGRATIONS.md) · [`IDENTITY_FIX.md`](IDENTITY_FIX.md)
