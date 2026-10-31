# ICP library — 100 niches + influencer flagship

**Company:** Halloway Associates · **https://hallowayassociates.com** · **jadisselantaki@hallowayassociates.com**  
**Machine-readable source:** [`config/niches.json`](../../config/niches.json) (v2)  
**Site consumer:** `src/lib/niches.js` → `/pour-qui` (expand row = AI + third parties)  
**Enrich script:** `scripts/enrich-niches-ai-integrations.mjs`

Outreach / cold campaigns remain **LOCKED**.

---

## Platform add-ons (every niche)

Each of the 100 niches now includes:

| Field | Meaning |
|-------|---------|
| `ai_services[]` | AI features we can add to their kit/platform |
| `third_party_connections[]` | Integrations (Stripe, Cal, Clerk, Maps, …) |
| `plus` / `plus_fr` | **How that addition helps the business** |

**Shared base (all niches):** smart intake, AI first-response, content assist, weekly digest · Stripe, calendar, email/SMS, analytics, Maps/GBP.  
**Plus category packs** (beauty, legal, food, logistics, …) and **niche overlays** (e.g. influencers: collab scorer, Clerk Gmail/LinkedIn, Cal.com).

Re-run enrichment after editing category templates:
`node scripts/enrich-niches-ai-integrations.mjs`

---

## Flagship deep dive — Influencers / creators

### Problem

Influencers receive thousands of emails/DMs from people who are not serious about paying for their time. They hire page managers just to manage appointments. They pay platforms to acquire clients even though they already have attention and demand. They lose serious opportunities because they cannot respond to everyone.

### Solution (Halloway)

We enable influencers to run a **branded site/app** where people **pay directly for access to their time and offers**, including:

- Collaboration requests (brands/creators)
- Guidance / advisory sessions
- Meet-the-influencer experiences
- Lessons / coaching / tutorials
- Any paid 1:1 or packaged interaction they want to sell

**Two offers apply:**

1. **Digital Presence Kit** — site/app, offer pages, booking/intake under their brand  
2. **Consulting sessions** — how to package and price their time  

### Outcomes

- Unserious traffic filtered by paid booking / structured requests  
- Less dependency on inbox managers for first-line scheduling  
- Less dependency on paid “client acquisition” platforms when demand already exists  
- Fewer missed high-value opportunities  
- Clear monetization of existing audience  
- Professional calendar, intake, and offer pages under their brand  

**Demo:** [`/demos/createur`](../../src/demos/CreatorDemo.jsx) · **Beachhead note:** influencers + 1–2 local service niches (salon / café or avocat).

---

## Categories (site filters)

| Category id | FR |
|-------------|-----|
| creators_media | Créateurs & médias |
| beauty_wellness | Beauté & bien-être |
| health | Santé & thérapies |
| professional | Services professionnels |
| home_trade | Maison & artisans |
| auto | Auto & mobilité |
| education | Éducation & coaching |
| creative_events | Créatif & événements |
| food_hospitality | Food & hospitality |
| logistics | Logistique & terrain |
| pets | Animaux |
| fitness | Fitness & sports |
| retail | Retail & mode |
| travel_space | Voyage & espaces |
| b2b_freelance | B2B & freelances |
| tech_energy | Tech, réparation & énergie |
| community | Communauté & multi-services |

`priority_flag`: `flagship` | `beachhead` | `standard`

---

## Full list (1–100)

> Full `how_we_help` / `example_offers` live in JSON. Summary below.

1. **Influencers/creators** — flagship — paid booking for collabs, guidance, meets, lessons  
2. Hair salons — booking, services/prices, less IG-DM  
3. Barbershops — chair booking, modern presence  
4. Beauty salons — menus + booking + deposits  
5. Nail studios — slots, artist choice, portfolio  
6. Spas/wellness — packages + appointments  
7. Massage therapists — booking + intake  
8. Personal trainers — sessions/packages  
9. Yoga/Pilates instructors — schedules + booking  
10. Physiotherapists — appointments + trust  
11. Dentists — appointment requests  
12. Orthodontists — consult booking  
13. Private dermatologists — consult + clinic site  
14. Psychologists/therapists — confidential intake  
15. Life coaches — paid sessions  
16. Business coaches — content → paid call  
17. Lawyers — consult by practice area  
18. Notaries — appointments + checklists  
19. Accountants/tax advisors — seasonal booking  
20. Financial advisors — consult + trust  
21. Real estate agents — viewing booking  
22. Property managers — request flows  
23. Architects — inquiry + portfolio  
24. Interior designers — portfolio + paid consult  
25. Construction contractors — quotes + gallery  
26. Electricians — fast contact/booking  
27. Plumbers — emergency CTA + booking  
28. HVAC techs — maintenance + appointments  
29. Auto repair shops — service booking  
30. Car detailers — packages + gallery  
31. Driving schools — lesson booking  
32. Tutors — lesson booking  
33. Small language schools — trial booking  
34. Music teachers — scheduler + intake  
35. Photographers — shoot booking + portfolio  
36. Videographers — shoot/event inquiry  
37. Wedding planners — intake + packages  
38. DJs/entertainers — date holds + packages  
39. Caterers — event inquiry + menus  
40. Bakeries — orders/preorders  
41. Cafés — menu/events/catering  
42. Restaurants — reservations + private dining  
43. Food trucks — schedule + catering  
44. Cloud kitchens — owned brand beyond marketplaces  
45. Couriers/delivery — quotes, zones, B2B  
46. Logistics freelancers — pickup + B2B  
47. Cleaning services — recurring booking  
48. Laundry/dry cleaning — pickup + pricing  
49. Pest control — inspection booking  
50. Landscapers — seasonal packages  
51. Florists — orders + events  
52. Pet groomers — pet intake + appointments  
53. Small vet clinics — appointment requests  
54. Dog trainers — sessions/packages  
55. Fitness studios — class packs + membership  
56. Martial arts schools — trial + programs  
57. Dance studios — registration + schedule  
58. Tattoo studios — consult + portfolios  
59. Piercing studios — appointments + pricing  
60. Opticians — eye-test booking  
61. Independent pharmacies — services/hours  
62. Medical aesthetics — treatments + consult  
63. Chiropractors — booking + education  
64. Nutritionists — paid consults  
65. Private chefs — event/menu booking  
66. Sommeliers — tasting/event booking  
67. Stylists/image consultants — paid sessions  
68. Indie fashion boutiques — appointment shopping  
69. Jewelry makers — custom + fittings  
70. Handymen — job requests + scheduling  
71. Movers — quotes + inventory  
72. Small storage — inquiries + unit info  
73. Boutique hotels — more direct bookings  
74. Airbnb co-hosts/cleaners — host onboarding  
75. Independent travel agents — trip consult  
76. Tour guides — tour + private hire  
77. Event venues — availability + packages  
78. Coworking spaces — tours + membership  
79. Print shops — quote upload  
80. Marketing freelancers — productized + paid calls  
81. Small web freelancers/agencies — discovery booking  
82. PR consultants — media kit + briefings  
83. Recruiters/HR boutiques — client intake  
84. Translation services — request forms  
85. Admin/document services — appointments  
86. Insurance brokers — quotes + appointments  
87. Mortgage brokers — consult + doc intake  
88. Startup founders (personal brand) — advisory slots  
89. Podcast hosts — guest booking + paid AMA  
90. Course creators — sales site + high-ticket calls  
91. Pro community managers — paid office hours  
92. Esports/gaming coaches — lessons + intake  
93. Phone repair shops — repair booking  
94. Bike/scooter repair — service booking  
95. Solar/energy installers — survey + quote  
96. Security installers — site survey  
97. Wedding photo/video teams — date hold + packages  
98. Funeral homes — dignified info + request UX  
99. NGOs/local associations — volunteer/donation/contact  
100. Family multi-service SMEs — one hub for services + booking + consulting path  

---

## Beachhead (strategy)

Until GTM unlock: prioritize **influencers (flagship)** + **salon/barber** + **café/restaurant** (or avocat) as example local niches. Full library informs copy, demos roadmap, and future outbound segments — **no live sending**.
