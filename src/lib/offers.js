/**
 * Commercial offers SoT — config/offers.json
 * Aligns with docs/business/OFFERS_AND_DISCOUNTS.md
 */
import offersConfig from '../../config/offers.json'
import { brand } from './brand'

export const offersCatalog = offersConfig

export function getTiers() {
  return offersConfig.tiers || []
}

export function getRecommendedTier() {
  return getTiers().find((t) => t.recommended) || getTiers()[1] || getTiers()[0]
}

export function getTierById(id) {
  return getTiers().find((t) => t.id === id) || null
}

export function getAddons() {
  return offersConfig.addons || []
}

export function getCarePlans() {
  return offersConfig.care_plans || []
}

export function getConsulting() {
  return offersConfig.consulting || []
}

export function getPublicDisplay() {
  return offersConfig.public_display || { mode: 'show_from', recommended_tier_id: 'pro' }
}

export function getDepositPercent() {
  return offersConfig.deposit_percent_default ?? brand.pricing?.depositPercent ?? 50
}

export function getKitFromPrice() {
  const mins = getTiers().map((t) => t.price_band_min ?? t.price_eur)
  return Math.min(...mins, brand.pricing?.kitMin ?? 790)
}

export function getKitToPrice() {
  const maxes = getTiers().map((t) => t.price_band_max ?? t.price_eur)
  return Math.max(...maxes, brand.pricing?.kitMax ?? 1490)
}

export function formatTierPublicPrice(tier) {
  const mode = getPublicDisplay().mode
  if (mode === 'show_exact' && tier.price_eur != null) return `€${tier.price_eur}`
  if (mode === 'show_audit_only') return 'Quote after audit'
  const from = tier.price_band_min ?? tier.price_eur
  return `from €${from}`
}

export function getFlagshipProduct() {
  return offersConfig.flagship_product || {
    name: brand.flagshipProductName,
    path: brand.flagshipPath,
  }
}

export function getDiscountStackCap() {
  return offersConfig.discount_stack_cap_percent ?? 20
}

export function getPilotBeachhead() {
  return offersConfig.pilot_beachhead || { enabled: false, slots_remaining: 0 }
}
