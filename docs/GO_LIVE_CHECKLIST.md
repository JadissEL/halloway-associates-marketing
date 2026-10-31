# Go-live checklist — first real campaign

**Live send stays disabled** (`DRY_RUN=true`) until every box below is checked.  
First campaign = **ONE niche + ONE city only**. Warm-up: **10–20 emails/day**.

Explicit non-goals: **no** Instagram/LinkedIn auto-DM, **no** cold SMS/WhatsApp blasts.

---

## Domain & DNS

- [ ] Production marketing domain live (`SITE_URL` / `VITE_SITE_URL`)
- [ ] HTTPS valid (Vercel or equivalent)
- [ ] API hostname stable; CORS includes marketing + OS UI origins
- [ ] Carte QR points to `{{SITE_URL}}/audit` (verify print + digital)

## Sending domain (email)

- [ ] Dedicated sending domain or subdomain (e.g. `mail.` / `hello@`)
- [ ] **SPF** published
- [ ] **DKIM** published (Resend/SMTP provider)
- [ ] **DMARC** published (start `p=none`, then tighten)
- [ ] From name/email match OS Mailbox + brand.json
- [ ] Unsubscribe URL reachable publicly (`UNSUBSCRIBE_BASE_URL`)

## Product / compliance

- [ ] Legal pages linked (Mentions, Confidentialité, CGV) — lawyer review for paid clients
- [ ] Suppressions seeded / tested (unsubscribe → never re-contact)
- [ ] Workspace: warm-up ON, daily cap 10–20
- [ ] `WEBHOOK_SECRET` set in production
- [ ] Operator password + JWT secret changed from defaults
- [ ] Form → OS inbound verified on production URLs

## Campaign readiness

- [ ] ICP niche chosen (one only for first wave)
- [ ] City chosen (one only)
- [ ] Sequence FR reviewed in OS (aligned with `outreach/emails/FR-sequences.md`)
- [ ] Leads have consent/source metadata (`website_form` / `csv` / `discover_mock` / `manual`)
- [ ] Dry-run E2E passed ([`E2E_VERIFY.md`](E2E_VERIFY.md))
- [ ] Founder available for human pipeline (Hot replies same day)

## Flip to live (only after all above)

1. Set `DRY_RUN=false` and `EMAIL_PROVIDER=resend` (or smtp) on API + worker  
2. Confirm mailbox provider ≠ dry_run  
3. Start **paused** campaign → spot-check 1 personalized preview → start  
4. Monitor bounces/unsubscribes daily for week 1  

If any box is unchecked → keep **BLOCKED** for live send; dry-run OK.
