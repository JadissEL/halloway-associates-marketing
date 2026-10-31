/**
 * Enrich config/niches.json with AI services + third-party connections
 * and business "plus" explanations for each niche.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const path = join(root, 'config', 'niches.json')
const data = JSON.parse(readFileSync(path, 'utf8'))

function ai(id, name, name_fr, plus, plus_fr) {
  return { id, name, name_fr, plus, plus_fr }
}
function tp(id, name, plus, plus_fr) {
  return { id, name, plus, plus_fr }
}

const BASE_AI = [
  ai(
    'smart_intake',
    'Smart intake / lead qualification',
    'Intake intelligent / qualification',
    'Filters unserious inquiries before they waste staff time.',
    'Filtre les demandes non sérieuses avant qu’elles coûtent du temps.',
  ),
  ai(
    'auto_reply',
    'AI first-response assistant',
    'Assistant de première réponse',
    'Answers FAQs 24/7 so opportunities are not lost after hours.',
    'Répond aux FAQ 24/7 — moins d’opportunités perdues hors horaires.',
  ),
  ai(
    'content_assist',
    'Content & offer copy assistant',
    'Assistant contenu & offres',
    'Keeps menus, bios, and offers fresh without hiring a full-time writer.',
    'Menus, bios et offres à jour sans rédacteur à temps plein.',
  ),
  ai(
    'insight_digest',
    'Weekly AI performance digest',
    'Digest IA hebdomadaire',
    'Shows what converts so the owner improves the platform, not guesses.',
    'Montre ce qui convertit — décisions basées sur les données.',
  ),
]

const BASE_TP = [
  tp(
    'stripe',
    'Stripe / payments',
    'Collect deposits and fees online — fewer no-shows, clearer cashflow.',
    'Acomptes et paiements en ligne — moins de no-shows, trésorerie claire.',
  ),
  tp(
    'calendar',
    'Cal.com / Google Calendar',
    'Bookings land on a real calendar — less double-booking chaos.',
    'Les RDV atterrissent dans un vrai calendrier — moins de doubles bookings.',
  ),
  tp(
    'email_sms',
    'Transactional email / SMS (Resend, Twilio)',
    'Automatic confirmations and reminders cut no-shows.',
    'Confirmations et rappels automatiques réduisent les absences.',
  ),
  tp(
    'analytics',
    'Umami / GA4 analytics',
    'See which pages and offers drive real demand.',
    'Voir quelles pages et offres génèrent la vraie demande.',
  ),
  tp(
    'maps',
    'Google Business / Maps',
    'Local discovery feeds into a bookable site, not just a dead listing.',
    'La découverte locale mène à un site réservable, pas une fiche morte.',
  ),
]

/** Category-specific extras */
const BY_CATEGORY = {
  creators_media: {
    ai: [
      ai('dm_triage', 'DM / collab triage AI', 'Triage IA des DMs / collabs', 'Ranks brand and fan requests by budget/fit so creators monetize attention.', 'Classe les demandes par budget/fit — monétiser l’attention sans noyer l’inbox.'),
      ai('media_kit_gen', 'Media-kit draft AI', 'Brouillon media kit IA', 'Faster rate cards and kits for brand deals.', 'Media kits et grilles tarifaires plus rapides pour les deals.'),
      ai('audience_packaging', 'Audience packaging advisor', 'Conseiller packaging audience', 'Suggests priced offers from what the audience already asks for.', 'Propose des offres tarifées à partir de ce que l’audience demande déjà.'),
    ],
    tp: [
      tp('clerk', 'Clerk (Google / LinkedIn login)', 'Serious clients self-identify — no anonymous spam contact.', 'Clients sérieux s’identifient — plus de contact anonyme spam.'),
      tp('instagram', 'Instagram / Meta link-in-bio sync', 'Social traffic lands on owned booking, not rented apps only.', 'Le trafic social atterrit sur votre booking, pas seulement des apps louées.'),
      tp('youtube', 'YouTube / podcast embeds', 'Proof and content stay on-brand next to paid offers.', 'Preuves et contenus restent sous votre marque à côté des offres.'),
    ],
  },
  beauty_wellness: {
    ai: [
      ai('style_match', 'Style / service recommender', 'Reco style / prestation', 'Clients pick faster; higher ticket add-ons.', 'Choix plus rapide ; upsells plus naturels.'),
      ai('no_show_predict', 'No-show risk hints', 'Indices de risque no-show', 'Suggest deposits or reminders for risky slots.', 'Suggère acompte ou rappel sur créneaux risqués.'),
      ai('gallery_tag', 'Portfolio auto-tagging', 'Auto-tag portfolio', 'Faster matching of looks to bookable services.', 'Relie plus vite les looks aux prestations réservables.'),
    ],
    tp: [
      tp('instagram', 'Instagram gallery', 'IG looks convert to bookings on your site.', 'Les looks IG convertissent en RDV sur votre site.'),
      tp('square_pos', 'Square / POS (optional)', 'In-shop sales and online bookings stay aligned.', 'Ventes en salon et résas en ligne restent alignées.'),
    ],
  },
  health: {
    ai: [
      ai('symptom_triage', 'Pre-visit questionnaire AI', 'Questionnaire pré-visite IA', 'Better prep, shorter admin calls (not medical diagnosis).', 'Meilleure préparation, moins d’admin (pas un diagnostic médical).'),
      ai('recall_assist', 'Recall / follow-up drafts', 'Brouillons de rappels', 'Keeps care plans moving without manual chase.', 'Fait avancer le suivi sans relances manuelles.'),
    ],
    tp: [
      tp('hipaa_note', 'Secure forms / document vault', 'Trust and compliance posture for sensitive intakes.', 'Confiance et conformité pour les intakes sensibles.'),
      tp('zoom', 'Zoom / Meet telehealth link', 'Remote sessions without WhatsApp chaos.', 'Séances à distance sans chaos WhatsApp.'),
    ],
  },
  professional: {
    ai: [
      ai('matter_intake', 'Matter / case intake AI', 'Intake dossier IA', 'Clients arrive structured; lawyers save billable screening time.', 'Clients structurés ; moins de temps de screening non facturable.'),
      ai('clause_draft', 'Document outline assistant', 'Assistant trames de documents', 'Faster first drafts of common letters (lawyer reviews).', 'Premiers jets plus rapides (relecture humaine obligatoire).'),
    ],
    tp: [
      tp('docu_sign', 'DocuSign / e-signature', 'Close engagement letters without courier delay.', 'Signer les lettres de mission sans délai courrier.'),
      tp('accounting', 'Accounting export (CSV / Pennylane)', 'Cleaner billing handoff.', 'Passage facturation plus propre.'),
    ],
  },
  home_trade: {
    ai: [
      ai('quote_assist', 'Photo-to-quote assistant', 'Devis assisté par photo', 'Faster estimates from job photos; win jobs before competitors.', 'Devis plus rapides via photos — gagner le chantier avant les autres.'),
      ai('route_hint', 'Job clustering hints', 'Indices de regroupement chantiers', 'Fewer wasted trips between sites.', 'Moins de trajets perdus entre chantiers.'),
    ],
    tp: [
      tp('whatsapp_business', 'WhatsApp Business API (opt-in)', 'Clients already message there — confirmations stay official.', 'Les clients y écrivent déjà — confirmations officielles.'),
      tp('maps_jobs', 'Maps + job pins', 'Clients see coverage; crews navigate faster.', 'Zone de couverture claire ; équipes plus efficaces.'),
    ],
  },
  auto: {
    ai: [
      ai('service_advisor', 'Service advisor chatbot', 'Chat conseiller entretien', 'Explains oil/brake packages; books the bay.', 'Explique les forfaits ; réserve le pont.'),
      ai('parts_suggest', 'Parts / upsell suggestions', 'Suggestions pièces / upsell', 'Higher average ticket with transparent options.', 'Panier moyen plus élevé, options transparentes.'),
    ],
    tp: [
      tp('fleet', 'Fleet / CRM CSV sync', 'Workshops serving fleets keep accounts tidy.', 'Ateliers flotte : comptes clients tenus.'),
    ],
  },
  education: {
    ai: [
      ai('lesson_plan', 'Lesson outline AI', 'Plan de cours IA', 'Tutors prep faster; students get clearer agendas.', 'Tuteurs plus rapides ; élèves avec agenda clair.'),
      ai('progress_notes', 'Progress note drafts', 'Brouillons notes de progression', 'Parents see value; retention rises.', 'Les parents voient la valeur ; meilleure rétention.'),
    ],
    tp: [
      tp('zoom', 'Zoom / classroom link', 'Online lessons without fragile Zoom links in DMs.', 'Cours en ligne sans liens fragiles dans les DMs.'),
      tp('stripe_course', 'Stripe for course packs', 'Sell multi-session packs upfront.', 'Vendre des packs de séances d’avance.'),
    ],
  },
  creative_events: {
    ai: [
      ai('moodboard', 'Brief / moodboard assistant', 'Assistant brief / moodboard', 'Clients clarify taste faster; fewer revision loops.', 'Le goût client se clarifie plus vite ; moins de retouches.'),
      ai('shot_list', 'Shot-list / run-of-show AI', 'AI shot-list / déroulé', 'Events run tighter; less day-of chaos.', 'Événements plus cadrés ; moins de chaos le jour J.'),
    ],
    tp: [
      tp('dropbox', 'Dropbox / Drive galleries', 'Deliverables shared professionally.', 'Livrables partagés pro.'),
      tp('contracts', 'Contract templates + e-sign', 'Protect scope before the shoot.', 'Protéger le scope avant le shoot.'),
    ],
  },
  food_hospitality: {
    ai: [
      ai('menu_rewrite', 'Menu & allergen helper', 'Aide menu & allergènes', 'Clearer menus convert walk-ins and tourists.', 'Menus plus clairs — convertit passants et touristes.'),
      ai('review_reply', 'Review reply drafts', 'Brouillons réponses avis', 'Reputation managed without hours on Google.', 'Réputation gérée sans heures sur Google.'),
    ],
    tp: [
      tp('delivery', 'Delivery marketplace deep-links (optional)', 'Own brand still primary; marketplaces as channel.', 'Votre marque reste centrale ; marketplaces en canal.'),
      tp('reservations', 'Table reservation widget', 'Fill covers without phone-only booking.', 'Remplir la salle sans résa téléphone seule.'),
    ],
  },
  logistics: {
    ai: [
      ai('eta_assist', 'ETA / status message AI', 'Messages ETA / statut IA', 'Customers stop calling “where is my order?”', 'Moins d’appels “où est ma commande ?”.'),
      ai('zone_pricing', 'Zone pricing suggestions', 'Suggestions tarifs par zone', 'Protect margins on far jobs.', 'Protéger la marge sur les courses lointaines.'),
    ],
    tp: [
      tp('maps_live', 'Maps / routing', 'Faster routes, fewer empty km.', 'Trajets plus courts, moins de km à vide.'),
      tp('whatsapp_status', 'WhatsApp status updates', 'Clients get proof of pickup/delivery.', 'Preuves de prise en charge / livraison.'),
    ],
  },
  pets: {
    ai: [
      ai('pet_profile', 'Pet profile assistant', 'Fiche animal assistée', 'Safer boarding/grooming with clearer needs captured.', 'Garde/toilettage plus sûrs avec besoins mieux captés.'),
      ai('rebook', 'Rebook reminders AI', 'Rappels de rebooking IA', 'Recurring revenue for groom/vet visits.', 'Revenus récurrents toilettage / véto.'),
    ],
    tp: [
      tp('photo_before_after', 'Photo before/after gallery', 'Proof sells the next appointment.', 'La preuve vend le prochain RDV.'),
    ],
  },
  fitness: {
    ai: [
      ai('program_draft', 'Program draft AI', 'Brouillon programme IA', 'Coaches onboard clients faster.', 'Les coachs onboardent plus vite.'),
      ai('form_check_notes', 'Session note assistant', 'Assistant notes de séance', 'Continuity between sessions builds results and retention.', 'Continuité entre séances = résultats + rétention.'),
    ],
    tp: [
      tp('wearables', 'Wearable / CSV import (optional)', 'Progress visible → renewals.', 'Progrès visibles → reconductions.'),
      tp('stripe_membership', 'Stripe memberships', 'Predictable monthly revenue.', 'Revenu mensuel prévisible.'),
    ],
  },
  retail: {
    ai: [
      ai('product_desc', 'Product description AI', 'Descriptions produits IA', 'Catalog goes live faster; better SEO.', 'Catalogue en ligne plus vite ; meilleur SEO.'),
      ai('size_guide', 'Size / fit Q&A bot', 'Bot guide tailles', 'Fewer returns; higher checkout confidence.', 'Moins de retours ; plus de confiance au paiement.'),
    ],
    tp: [
      tp('shopify', 'Shopify / stock sync (optional)', 'Inventory truth across channels.', 'Stock cohérent multi-canal.'),
      tp('instagram_shop', 'IG shopping links', 'Social discovery → owned checkout.', 'Découverte sociale → checkout à vous.'),
    ],
  },
  travel_space: {
    ai: [
      ai('guest_faq', 'Guest FAQ AI', 'FAQ voyageurs IA', 'Less host messaging load; better reviews.', 'Moins de charge messaging ; meilleurs avis.'),
      ai('upsell_stay', 'Stay upsell suggestions', 'Upsells séjour', 'Airport transfers, late checkout, experiences.', 'Transfers, late checkout, expériences.'),
    ],
    tp: [
      tp('airbnb_ical', 'iCal / Airbnb sync', 'Avoid double bookings across channels.', 'Éviter les doubles résas multi-canal.'),
      tp('smart_lock', 'Smart-lock / access codes (optional)', 'Self check-in scales hosts.', 'Check-in autonome pour scaler.'),
    ],
  },
  b2b_freelance: {
    ai: [
      ai('proposal_draft', 'Proposal draft AI', 'Brouillon proposition IA', 'Close retainers faster with clear scopes.', 'Closer des retainers plus vite avec scopes clairs.'),
      ai('invoice_nudge', 'Invoice / follow-up drafts', 'Relances facture IA', 'Get paid without awkward chasing.', 'Être payé sans relances gênantes.'),
    ],
    tp: [
      tp('notion', 'Notion / client portal', 'Shared workspace looks premium.', 'Espace partagé premium.'),
      tp('stripe_invoices', 'Stripe invoicing', 'Professional billing on the site.', 'Facturation pro depuis le site.'),
    ],
  },
  tech_energy: {
    ai: [
      ai('diagnostic_tree', 'Diagnostic question tree', 'Arbre diagnostic', 'Customers self-qualify before the visit.', 'Le client se qualifie avant la visite.'),
      ai('warranty_notes', 'Warranty / job notes AI', 'Notes garantie / chantier IA', 'Cleaner history for callbacks.', 'Historique plus propre pour les retours.'),
    ],
    tp: [
      tp('iot_status', 'Device / meter status embeds (optional)', 'Transparency builds trust for energy/repair brands.', 'Transparence = confiance énergie / réparation.'),
    ],
  },
  community: {
    ai: [
      ai('member_match', 'Member / service matcher', 'Matching membres / services', 'Hubs route people to the right offer faster.', 'Les hubs orientent plus vite vers la bonne offre.'),
      ai('event_copy', 'Event copy assistant', 'Assistant copy événements', 'Fill seats with less marketing effort.', 'Remplir les places avec moins d’effort marketing.'),
    ],
    tp: [
      tp('newsletter', 'Newsletter (Loops / Brevo)', 'Own the audience beyond social algorithms.', 'Posséder l’audience hors algorithmes.'),
      tp('discord', 'Discord / community link', 'Engagement between purchases.', 'Engagement entre les achats.'),
    ],
  },
}

/** Niche-specific overlays (merged on top) */
const BY_ID = {
  influencers: {
    ai: [
      ai('collab_score', 'Collab seriousness scorer', 'Score sérieux collab', 'Brands with budget rise; tire-kickers drop — protects creator time.', 'Les marques avec budget montent ; les tire-kickers descendent — protège le temps créateur.'),
      ai('rate_advisor', 'Rate & package advisor', 'Conseiller tarifs & packs', 'Prices access to time like a product, not a random DM quote.', 'Tarife l’accès au temps comme un produit, pas un devis DM.'),
      ai('fan_faq', 'Fan FAQ bot on the site', 'Bot FAQ fans sur le site', 'Cuts repetitive questions before paid booking.', 'Coupe les questions répétitives avant le booking payant.'),
    ],
    tp: [
      tp('clerk', 'Clerk — Gmail & LinkedIn login', 'Only identified people contact or book — inbox stays clean.', 'Seules des personnes identifiées contactent/réservent — inbox propre.'),
      tp('stripe', 'Stripe Checkout / deposits', 'Payment before access filters unserious demand.', 'Paiement avant accès = filtre anti non-sérieux.'),
      tp('cal', 'Cal.com scheduling', 'Paid sessions land on the creator calendar automatically.', 'Les séances payées atterrissent sur le calendrier créateur.'),
      tp('social_oembeds', 'IG / TikTok / YT embeds', 'Proof of audience sits next to offers — brands trust faster.', 'La preuve d’audience à côté des offres — confiance marques.'),
    ],
  },
  hair_salons: {
    ai: [ai('lookbook_match', 'Lookbook → service matcher', 'Lookbook → prestation', 'Guests book the right service first time — less chair time waste.', 'Le bon service dès la 1re résa — moins de temps chaise perdu.')],
    tp: [tp('instagram', 'Instagram gallery sync', 'Social looks become bookable CTAs.', 'Les looks sociaux deviennent des CTA réservables.')],
  },
  barbershops: {
    ai: [ai('barber_match', 'Barber preference AI', 'Préférence barbier IA', 'Regulars rebook their barber; loyalty rises.', 'Les réguliers reprennent “leur” barbier — fidélité.')],
    tp: [],
  },
  cafes: {
    ai: [ai('menu_localise', 'Menu bilingual helper', 'Aide menu bilingue', 'Tourists and locals both understand — more covers.', 'Touristes et locaux comprennent — plus de couverts.')],
    tp: [tp('reservations', 'Reservation widget', 'Tables fill without Instagram DMs.', 'Tables remplies sans DMs Instagram.')],
  },
  restaurants: {
    ai: [ai('menu_localise', 'Menu bilingual helper', 'Aide menu bilingue', 'Tourists and locals both understand — more covers.', 'Touristes et locaux comprennent — plus de couverts.')],
    tp: [tp('reservations', 'Reservation widget', 'Tables fill without Instagram DMs.', 'Tables remplies sans DMs Instagram.')],
  },
  lawyers: {
    ai: [ai('conflict_check_prompt', 'Intake conflict prompts', 'Prompts conflit d’intérêts', 'Safer onboarding before the first call.', 'Onboarding plus sûr avant le 1er appel.')],
    tp: [tp('docu_sign', 'E-signature', 'Engagement letters signed same day.', 'Lettres de mission signées le jour même.')],
  },
  couriers: {
    ai: [ai('quote_distance', 'Distance quote assistant', 'Devis distance IA', 'Instant ballpark quotes win B2B clients.', 'Devis indicatif instantané — gagne des clients B2B.')],
    tp: [tp('maps_live', 'Live maps / tracking link', 'Clients stop calling for status.', 'Moins d’appels de statut.')],
  },
}

function uniqById(arr) {
  const seen = new Set()
  return arr.filter((x) => {
    if (seen.has(x.id)) return false
    seen.add(x.id)
    return true
  })
}

data.version = 2
data.enrichment = {
  updated: '2026-10-31',
  fields: ['ai_services', 'third_party_connections'],
  note: 'Each item includes plus / plus_fr — business upside of adding it to the niche platform.',
}

data.niches = data.niches.map((n) => {
  const cat = BY_CATEGORY[n.category] || { ai: [], tp: [] }
  const ov = BY_ID[n.id] || { ai: [], tp: [] }
  return {
    ...n,
    ai_services: uniqById([...BASE_AI, ...cat.ai, ...(ov.ai || [])]),
    third_party_connections: uniqById([...BASE_TP, ...cat.tp, ...(ov.tp || [])]),
  }
})

writeFileSync(path, JSON.stringify(data, null, 2) + '\n', 'utf8')
const sample = data.niches[0]
console.log(
  'enriched',
  data.niches.length,
  'niches; influencers AI=',
  sample.ai_services.length,
  'TP=',
  sample.third_party_connections.length,
)
