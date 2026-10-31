/**
 * Site-wide brand identity — reads config/brand.json, overridable via VITE_* env.
 * Canonical public values: Halloway Associates · https://hallowayassociates.com
 */
import brandConfig from '../../config/brand.json'

const env = typeof import.meta !== 'undefined' ? import.meta.env || {} : {}

function pick(envKey, jsonKey, fallback = '') {
  const fromEnv = env[envKey]
  if (typeof fromEnv === 'string' && fromEnv.trim()) return fromEnv.trim()
  const fromJson = brandConfig[jsonKey]
  if (fromJson !== undefined && fromJson !== null && fromJson !== '') return fromJson
  return fallback
}

/** Canonical site origin — no trailing slash */
export const SITE_URL = String(
  pick('VITE_SITE_URL', 'SITE_URL', 'https://hallowayassociates.com'),
).replace(/\/+$/, '')

export const CONTACT_EMAIL = pick(
  'VITE_CONTACT_EMAIL',
  'CONTACT_EMAIL',
  'jadisselantaki@hallowayassociates.com',
)

export const COMPANY_NAME = pick('VITE_COMPANY_NAME', 'COMPANY_NAME', 'Halloway Associates')

const defaultPricing = {
  currency: 'EUR',
  kitMin: 790,
  kitMax: 1490,
  starterMin: 790,
  starterMax: 1490,
  bookingAddOn: 300,
  depositPercent: 50,
  remainderPercent: 50,
  deliveryDaysMin: 7,
  deliveryDaysMax: 14,
  careMin: 49,
  careMax: 99,
  careEditsPerMonth: 3,
  consultingSessionEur: 150,
  consultingDurationMin: 45,
  consultingLabel: 'Consulting session (45 min)',
  consultingLabelFr: 'Session consulting (45 min)',
  consultingPlaceholder: true,
  maxDiscountPercent: 15,
}

export const brand = {
  name: COMPANY_NAME,
  siteUrl: SITE_URL,
  tagline: brandConfig.TAGLINE,
  taglineEn: brandConfig.TAGLINE_EN,
  mission: brandConfig.MISSION,
  missionFr: brandConfig.MISSION_FR,
  origin: brandConfig.ORIGIN,
  offers: brandConfig.OFFERS,
  offersFr: brandConfig.OFFERS_FR,
  productLine: brandConfig.PRODUCT_LINE || 'Niche Digital Portfolios',
  flagshipProductName: brandConfig.FLAGSHIP_PRODUCT_NAME || 'Influencer Digital Kit',
  flagshipProductNameFr: brandConfig.FLAGSHIP_PRODUCT_NAME_FR || 'Kit Digital Influenceur',
  flagshipPath: brandConfig.FLAGSHIP_PORTFOLIO_PATH || '/portfolios/influencers',
  commercialLock: brandConfig.COMMERCIAL_LOCK || '',
  pitch: `${brandConfig.MISSION_FR}. ${COMPANY_NAME} (${brandConfig.ORIGIN}) propose (1) des portfolios digitaux par niche — flagship ${brandConfig.FLAGSHIP_PRODUCT_NAME_FR || 'Kit Digital Influenceur'} — et (2) des sessions de consulting.`,
  pitchEn: `${brandConfig.MISSION}. ${COMPANY_NAME} (${brandConfig.ORIGIN}) offers (1) Niche Digital Portfolios — flagship ${brandConfig.FLAGSHIP_PRODUCT_NAME || 'Influencer Digital Kit'} — and (2) consulting sessions.`,
  founderName: pick('VITE_FOUNDER_NAME', 'FOUNDER_NAME', 'Jadiss Elantaki'),
  city: pick('VITE_CITY', 'CITY_FR', brandConfig.CITY_FR || 'Athènes'),
  cityEn: brandConfig.CITY || 'Athens',
  hqCountry: brandConfig.HQ_COUNTRY || 'Greece',
  beachhead: brandConfig.BEACHHEAD || {
    country: 'Greece',
    city: 'Athens',
    outreach_languages: ['en', 'el'],
  },
  /** Active first-wave countries only */
  targetMarketsActive: Array.isArray(brandConfig.TARGET_MARKETS_ACTIVE)
    ? brandConfig.TARGET_MARKETS_ACTIVE
    : ['Greece'],
  /** Later — not active for outreach */
  targetMarketsLater: Array.isArray(brandConfig.TARGET_MARKETS_LATER)
    ? brandConfig.TARGET_MARKETS_LATER
    : [],
  /** Full addressable list (active ∪ later) — reference only */
  targetMarkets: Array.isArray(brandConfig.TARGET_MARKETS)
    ? brandConfig.TARGET_MARKETS
    : ['Greece'],
  kitScope: brandConfig.KIT_SCOPE || { included: [], not_included: [] },
  email: CONTACT_EMAIL,
  phone: pick('VITE_PHONE', 'PHONE', ''),
  instagram: pick('VITE_INSTAGRAM', 'INSTAGRAM', ''),
  currency: brandConfig.CURRENCY || 'EUR',
  primaryLang: brandConfig.PRIMARY_LANG || 'fr',
  packageName: brandConfig.PACKAGE_NAME_FR || brandConfig.PACKAGE_NAME,
  packageNameEn: brandConfig.PACKAGE_NAME,
  siret: brandConfig.SIRET || '',
  legalForm: brandConfig.LEGAL_FORM || '',
  promiseDays: brandConfig.PROMISE_DAYS || '7–14 jours',
  pricing: { ...defaultPricing, ...(brandConfig.PRICING || {}) },
  ctaPrimary: brandConfig.CTA_PRIMARY || 'Réserver mon audit',
  ctaSecondary: brandConfig.CTA_SECONDARY || 'Voir les exemples',
  logoPath: brandConfig.LOGO_PATH || '/logo.svg',
  colors: brandConfig.COLORS || {},
  fonts: brandConfig.FONTS || {},
  /** Absolute public URL helper (path should start with /) */
  absoluteUrl(path = '/') {
    const p = path.startsWith('/') ? path : `/${path}`
    return `${SITE_URL}${p}`
  },
}

/** Featured beachheads for forms / nav — full library in config/niches.json */
export const niches = [
  { id: 'createur', label: 'Créateurs & influenceurs', en: 'Creators & influencers', icon: 'camera' },
  { id: 'salon', label: 'Salons & barbiers', en: 'Hair & beauty', icon: 'scissors' },
  { id: 'cafe', label: 'Cafés & restaurants', en: 'Cafés & restaurants', icon: 'cup' },
  { id: 'avocat', label: 'Avocats & notaires', en: 'Lawyers & notaries', icon: 'scale' },
  { id: 'livreur', label: 'Livreurs & coursiers', en: 'Couriers', icon: 'van' },
  { id: 'service', label: 'Services locaux (autres)', en: 'Other local services', icon: 'pin' },
]
