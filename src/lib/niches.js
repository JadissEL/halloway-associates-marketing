/**
 * Machine-readable ICP library — source: config/niches.json
 */
import data from '../../config/niches.json'

export const nichesCatalog = data
export const nicheCategories = data.categories
export const allNiches = data.niches
export const flagshipNicheId = data.flagship_id

export function getFlagshipNiche() {
  return allNiches.find((n) => n.id === flagshipNicheId) || allNiches[0]
}

export function getNicheById(id) {
  return allNiches.find((n) => n.id === id) || null
}

export function getNichesByCategory(categoryId) {
  if (!categoryId || categoryId === 'all') return allNiches
  return allNiches.filter((n) => n.category === categoryId)
}

export function getBeachheadNiches() {
  return allNiches.filter((n) => n.priority_flag === 'beachhead' || n.priority_flag === 'flagship')
}

export function categoryLabel(categoryId, lang = 'fr') {
  const c = nicheCategories.find((x) => x.id === categoryId)
  if (!c) return categoryId
  return lang === 'en' ? c.label_en : c.label_fr
}
