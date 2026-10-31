/**
 * Influencer Digital Portfolio — sample client "Nova Vale"
 * Customize this file for a real creator delivery.
 */
export const kitMeta = {
  slug: 'influencers',
  niche: 'Influencers / creators',
  nicheFr: 'Influenceurs / créateurs',
  version: '1.1.0',
  lang: 'en',
  studio: 'Halloway Associates',
  studioUrl: 'https://hallowayassociates.com',
  studioEmail: 'jadisselantaki@hallowayassociates.com',
}

export const creator = {
  name: 'Nova Vale',
  handle: '@novavale',
  tagline: 'Lifestyle · brand work · building in public',
  bio: "I'm Nova — Athens-based creator. Brands book collabs here; if you'd rather skip the DM roulette for a call, a lesson, or a meet-up, pick a slot below.",
  aboutLong:
    "I make lifestyle and creator-business content from Athens, and I work with brands that actually care how their product shows up. Off-camera I help other creators untangle positioning, offers, and the boring ops that keep a channel alive. This site is where serious asks land — so Instagram stays for the people I already know.",
  location: 'Athens · open to remote',
  email: 'book@novavale.example', // replace per client
  portrait: '/images/creator.jpg',
  hero: '/images/creator.jpg',
  calUrl: 'https://cal.com/jadiss-el-antaki-igubeb/30min',
  stripeTestMode: true,
  currency: 'EUR',
  stats: [
    { label: 'Followers', value: '180k+' },
    { label: 'Engagement', value: '4.2%' },
    { label: 'Focus', value: 'Lifestyle & biz' },
  ],
  platforms: [
    { id: 'ig', label: 'Instagram', detail: '142k' },
    { id: 'yt', label: 'YouTube', detail: '28k' },
    { id: 'tt', label: 'TikTok', detail: '31k' },
    { id: 'nl', label: 'Newsletter', detail: '6.4k' },
  ],
  highlights: [
    { title: 'Brand days', text: 'Product stories, reels, and honest usage rights — written down before we shoot.' },
    { title: 'Creator chats', text: 'Short paid calls when you want a second brain on your offer or content system.' },
    { title: 'In real life', text: 'A few meet & greet slots each month in Athens or on video.' },
  ],
}

export const offers = [
  {
    id: 'collab',
    name: 'Brand collab',
    price: 450,
    priceLabel: 'from €450',
    duration: 'Brief + deliverables',
    icon: 'camera',
    blurb: 'Tell me the brief and budget up front so we know if it’s a fit before we hop on a call.',
    includes: ['Quick fit check', 'Usage rights chat', 'Clear timeline'],
  },
  {
    id: 'guidance',
    name: '1:1 guidance (45 min)',
    price: 120,
    priceLabel: '€120',
    duration: '45 minutes',
    icon: 'check',
    blurb: 'A focused call on positioning, monetization, or how you run content week to week.',
    includes: ['Video call', 'Short prep form', 'Notes after'],
  },
  {
    id: 'meet',
    name: 'Meet & greet',
    price: 80,
    priceLabel: '€80',
    duration: '30–40 min',
    icon: 'calendar',
    blurb: 'A few slots a month — pay to reserve so the time stays real for both of us.',
    includes: ['Confirmed time', 'In person or video', 'Simple house rules'],
  },
  {
    id: 'lesson',
    name: 'Private lesson',
    price: 90,
    priceLabel: 'from €90',
    duration: '60 minutes',
    icon: 'launch',
    blurb: 'We pick a skill and a goal, then work through it live at your pace.',
    includes: ['Goal check-in', 'Live session', 'Replay as an add-on'],
  },
  {
    id: 'mentoring',
    name: '4-week mentoring',
    price: 680,
    priceLabel: '€680',
    duration: '4 weeks',
    icon: 'care',
    blurb: 'Weekly calls plus light check-ins in between — for people already building.',
    includes: ['4 × 45 min calls', 'Async chat window', 'Priority booking'],
  },
]

export const packages = [
  { id: 'starter', name: 'Single session', price: '€90–150', note: 'Lesson or guidance call' },
  { id: 'pro', name: 'Brand collab', price: '€450+', note: 'Deliverables + rights' },
  { id: 'retain', name: 'Mentoring month', price: '€680', note: 'Four weeks together' },
]

export const testimonials = [
  {
    quote: 'Finally a clear path instead of another “hey can we chat?” in Instagram. We sent the brief, paid the deposit, and moved.',
    by: 'Maya · brand lead, beauty',
  },
  {
    quote: 'Booked a guidance call in a couple of minutes. Felt like booking with a person, not filling a corporate form.',
    by: 'Alex · fellow creator',
  },
]

export const linkHub = [
  { id: 'book', label: 'Book something', to: '/portfolios/influencers/offers' },
  { id: 'media', label: 'Media kit for brands', to: '/portfolios/influencers/media-kit' },
  { id: 'ig', label: 'Instagram', href: 'https://instagram.com/' },
  { id: 'yt', label: 'YouTube', href: 'https://youtube.com/' },
  { id: 'studio', label: 'Site by Halloway Associates', href: 'https://hallowayassociates.com' },
]

/** Demo inbox for creator dashboard */
export const sampleRequests = [
  {
    id: 'r1',
    from: 'Lumen Cosmetics',
    offer: 'Brand collab',
    budget: '€800',
    status: 'new',
    goal: 'Launch reel + story package in May',
  },
  {
    id: 'r2',
    from: 'Jordan Lee',
    offer: '1:1 guidance (45 min)',
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
