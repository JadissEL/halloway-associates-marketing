/**
 * Influencer Digital Portfolio — sample client "Nova Vale"
 * Customize this file for a real creator delivery.
 */
export const kitMeta = {
  slug: 'influencers',
  niche: 'Influencers / creators',
  nicheFr: 'Influenceurs / créateurs',
  version: '1.0.0',
  lang: 'en',
  studio: 'Halloway Associates',
  studioUrl: 'https://hallowayassociates.com',
  studioEmail: 'jadisselantaki@hallowayassociates.com',
}

export const creator = {
  name: 'Nova Vale',
  handle: '@novavale',
  tagline: 'Strategy · lifestyle · creator business',
  bio: 'I help brands and fans get real access — collaborations, guidance, and lessons — without drowning my DMs.',
  location: 'Athens · remote worldwide',
  email: 'book@novavale.example', // replace per client
  portrait: '/images/creator.jpg',
  hero: '/images/creator.jpg',
  calUrl: '', // e.g. https://cal.com/your-handle
  stripeTestMode: true,
  currency: 'EUR',
  stats: [
    { label: 'Audience', value: '180k+' },
    { label: 'Avg. eng.', value: '4.2%' },
    { label: 'Niches', value: 'Lifestyle · biz' },
  ],
}

export const offers = [
  {
    id: 'collab',
    name: 'Brand collaboration',
    price: 450,
    priceLabel: 'from €450',
    duration: 'Brief + deliverables',
    icon: 'camera',
    blurb: 'Structured collab request. Brands self-qualify with budget and brief.',
    includes: ['Intake + brand fit check', 'Usage rights discussion', 'Timeline agreement'],
  },
  {
    id: 'guidance',
    name: 'Guidance session (45 min)',
    price: 120,
    priceLabel: '€120',
    duration: '45 minutes',
    icon: 'check',
    blurb: '1:1 advice on creator business, positioning, or content systems.',
    includes: ['Video call', 'Prep form', 'Notes after'],
  },
  {
    id: 'meet',
    name: 'Meet & greet',
    price: 80,
    priceLabel: '€80',
    duration: '30–40 min',
    icon: 'calendar',
    blurb: 'Limited slots. Payment first — serious fans only.',
    includes: ['Confirmed time slot', 'Location or video', 'House rules'],
  },
  {
    id: 'lesson',
    name: 'Private lesson / tutorial',
    price: 90,
    priceLabel: 'from €90',
    duration: '60 minutes',
    icon: 'launch',
    blurb: 'Skill session tailored to level and goal.',
    includes: ['Goal intake', 'Live session', 'Replay optional add-on'],
  },
  {
    id: 'mentoring',
    name: '4-week mentoring pack',
    price: 680,
    priceLabel: '€680',
    duration: '4 weeks',
    icon: 'care',
    blurb: 'Weekly calls + async check-ins. Serious operators only.',
    includes: ['4 × 45 min calls', 'Async chat window', 'Priority booking'],
  },
]

export const packages = [
  { id: 'starter', name: 'Starter access', price: '€90–150', note: 'Single session or lesson' },
  { id: 'pro', name: 'Pro collab', price: '€450+', note: 'Brand deliverables + rights' },
  { id: 'retain', name: 'Mentoring', price: '€680', note: '4-week pack' },
]

export const testimonials = [
  {
    quote: 'We stopped cold-DMing. The intake + deposit filtered tire-kickers overnight.',
    by: 'Brand lead · beauty',
  },
  {
    quote: 'Booked a guidance call in two minutes. Felt like a real product, not a link dump.',
    by: 'Creator peer',
  },
]

export const linkHub = [
  { id: 'book', label: 'Book / request access', to: '/portfolios/influencers/offers' },
  { id: 'media', label: 'Media kit', to: '/portfolios/influencers/media-kit' },
  { id: 'ig', label: 'Instagram', href: 'https://instagram.com/' },
  { id: 'yt', label: 'YouTube', href: 'https://youtube.com/' },
  { id: 'studio', label: 'Built by Halloway Associates', href: 'https://hallowayassociates.com' },
]

/** Demo inbox for creator dashboard */
export const sampleRequests = [
  {
    id: 'r1',
    from: 'Lumen Cosmetics',
    offer: 'Brand collaboration',
    budget: '€800',
    status: 'new',
    goal: 'Launch reel + story package in May',
  },
  {
    id: 'r2',
    from: 'Jordan Lee',
    offer: 'Guidance session (45 min)',
    budget: '€120',
    status: 'paid',
    goal: 'Monetize newsletter audience',
  },
  {
    id: 'r3',
    from: 'Sam K.',
    offer: 'Meet & greet',
    budget: '€80',
    status: 'pending_payment',
    goal: 'Athens meetup',
  },
]
