# 10 — Design

| Meta | Value |
|------|--------|
| **Purpose** | Brand + client-delivery design quality bar and review checklist. |
| **Owner role** | Delivery / web production |
| **Last updated** | 2026-10-31 |
| **Status** | `active` |
| **Non-goals** | New visual identity; emoji decoration; mobile-app chrome on desktop. |

---

## Brand system summary

| Aspect | Principle |
|--------|-----------|
| Purpose | Trust + clarity for local SMBs |
| Visual | Lavender field, cream panels, ink borders, sticker labels (typo), Bodoni + Outfit + mono |
| Voice | Concrete, calm, French-first |
| Do | Real photos, serious line icons, desktop-first |
| Don’t | Purple SaaS gradients, fake metrics, emoji spam, Inter-only generic |

**Implementation:** `src/styles/tokens.css`, `public/logo.svg`, `src/components/Icons.jsx`, `public/images/`, `config/brand.json` COLORS/FONTS.

---

## Client delivery quality bar

- Desktop ≥1024px feels like a platform  
- Mobile/tablet intentional structure change  
- Contrast readable; focus-visible; labeled forms  
- Performance: compressed images; no huge unused JS  
- One primary CTA per view  

---

## Template strategy by niche

```text
Shared skeleton (hero, services, booking form, CTA band, footer CTA to studio)
  + niche skin (copy, colors tint, photos, icons)
```

Demos: salon · café · avocat · livreur = reference skins.

---

## Artifact standards

| Artifact | Standard |
|----------|----------|
| Client site | Kit checklist + design review |
| Demo | Links back to audit CTA |
| Carte | 85×55 print + digital QR |
| One-pager PDF | From outreach/public HTML print |
| Proposal | Written scope + price + milestones |

---

## Design review checklist (before handoff)

- [ ] Brand name / client name clear in first viewport  
- [ ] Promise + one CTA  
- [ ] Services + prices or “à partir de”  
- [ ] Contact / WhatsApp / booking works (success state tested)  
- [ ] Desktop multi-column where appropriate  
- [ ] Mobile no broken overflow  
- [ ] Images real & weighted reasonably  
- [ ] Icons line-based (no emoji)  
- [ ] Legal/footer links if studio-owned page  
- [ ] Passes “would I show this as reference?”  

**Debt:** No automated visual regression yet — manual checklist is the bar.
