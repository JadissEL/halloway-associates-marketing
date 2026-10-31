import registry from '../../config/portfolios.json'
import { brand } from './brand'

export const SHARE_PREFIX = registry.sharePathPrefix || '/p'

export function listPortfolioKits() {
  return registry.kits || []
}

export function getPortfolioKit(slug) {
  return listPortfolioKits().find((k) => k.slug === slug) || null
}

/** Absolute URL commercials should paste for a niche (isolated share entry). */
export function portfolioShareUrl(slug, origin) {
  const kit = getPortfolioKit(slug)
  if (!kit) return null
  const base = (origin || brand.siteUrl || '').replace(/\/$/, '')
  return `${base}${kit.sharePath}`
}

export function livePortfolioKits() {
  return listPortfolioKits().filter((k) => k.status === 'live' || k.status === 'demo')
}
