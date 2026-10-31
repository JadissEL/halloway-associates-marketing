# Known limitations (ranked)

Honest leftover risks after the quality gate. Not a backlog of new features.

## P1 — before real-world use

1. **`PHONE` / `INSTAGRAM` empty** in `config/brand.json` — fill before print carte / contact surfaces show them.  
2. **Forms without Formspree or `VITE_OUTBOUND_API_URL`** only store leads in browser `localStorage` (`/admin/leads`) — fine for demo; not multi-device CRM. When API URL is set, failures are **not** silent.  
3. **Outbound OS needs Docker Postgres** for full smoke. Unit tests pass without DB.  
4. **Legal stubs** — lawyer review before paid clients.  
5. **Live email / OpenAI** require keys; default dry-run + mock classifier by design.

## P2 — polish / scale

1. Marketing is JS (not TS); no ESLint script at root yet.  
2. Images are JPEG ~2.4 MB total — consider WebP/AVIF + width srcsets later.  
3. Admin CRM PIN is client-side only (security-through-obscurity).  
4. Outbound auth is single operator password (not SSO / 2FA).  
5. Google Places discovery remains mock when key absent.  
6. Webhook secret empty in **dev** allows unauthenticated webhook posts (prod requires secret).  
7. Carte print PDF is browser print-to-PDF (not a generated binary PDF library).  
8. Marketing Playwright E2E not automated (API smoke + docs/E2E_VERIFY.md cover unify path).

## Explicit non-goals (still)

- Bulk scrape / CAPTCHA bypass / Instantly  
- WhatsApp / SMS cold blasts  
- Marketplace / Stripe checkout on marketing MVP  
- Client-site factory (Prompt 4)
