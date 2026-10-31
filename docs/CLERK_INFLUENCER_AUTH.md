# Clerk — Gmail & LinkedIn for influencer kit clients

| Meta | Value |
|------|--------|
| **Purpose** | Let fans/brands connect with Google (Gmail) or LinkedIn via Clerk. |
| **Where** | `/portfolios/influencers/connect` |
| **Package** | `@clerk/react` |
| **Env** | `VITE_CLERK_PUBLISHABLE_KEY` (never put secret key in Vite) |

## 1. Create / open a Clerk application

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)  
2. Create an application (or reuse one)  
3. Copy the **Publishable key** (`pk_test_…` or `pk_live_…`)

## 2. Local env

In repo root `.env` (from `.env.example`):

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxx
```

Restart `npm run dev`.

## 3. Enable social providers (required for Gmail + LinkedIn)

Dashboard → **User & authentication** → **Social connections**:

| Provider | Clerk strategy used in kit | Status (HallowayAsoociates / development) |
|----------|----------------------------|-------------------------------------------|
| **Google** | `oauth_google` | **Enabled** |
| **LinkedIn** | `oauth_linkedin` | **Enabled** (OIDC needs custom client — not used) |

**App:** `app_3JCJAEhXxnZR51qzI3DTqVaN51D` · instance `dear-stingray-7040` · key in `.env` as `VITE_CLERK_PUBLISHABLE_KEY`

Follow Clerk’s prompts to create OAuth clients in Google Cloud / LinkedIn Developer Portal and paste Client ID + Secret into Clerk.

Also allow redirect URLs for local + prod, e.g.:

- `http://localhost:5173/portfolios/influencers/sso-callback`
- `https://hallowayassociates.com/portfolios/influencers/sso-callback`

## 4. What the kit does

- **Connect page:** Google + LinkedIn buttons (+ Clerk modal for other methods)  
- **SSO callback:** `/portfolios/influencers/sso-callback`  
- **Sync:** Clerk user email/name → kit session (`connectUser`) for booking/contact/user dashboard  
- **Fallback:** plain email connect still works without Clerk  

## 5. Production

- Use `pk_live_…` on Vercel  
- Same Google/LinkedIn apps with production redirect URLs  
- Do **not** expose `CLERK_SECRET_KEY` to the frontend (only needed if you add a backend later)

## 6. Creator dashboard

Creator login remains kit PIN/email for now (`nova-demo`). Optionally later: restrict Clerk org roles for creator vs client.
