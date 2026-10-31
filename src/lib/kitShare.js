/**
 * Commercial share mode — prospect sees ONE niche kit, not the studio gallery.
 * Activated by /p/:slug entry (session) or ?share=1 on a kit URL.
 */
export const KIT_SHARE_KEY = 'ha_kit_share'

export function activateKitShare(slug) {
  try {
    sessionStorage.setItem(KIT_SHARE_KEY, slug)
  } catch {
    /* private mode */
  }
}

export function clearKitShare() {
  try {
    sessionStorage.removeItem(KIT_SHARE_KEY)
  } catch {
    /* ignore */
  }
}

export function getActiveKitShare() {
  try {
    return sessionStorage.getItem(KIT_SHARE_KEY) || null
  } catch {
    return null
  }
}

export function isKitShareActive(slug) {
  if (typeof window === 'undefined') return false
  const q = new URLSearchParams(window.location.search)
  if (q.get('share') === '1' || q.get('share') === 'true') return true
  const active = getActiveKitShare()
  if (!active) return false
  if (!slug) return true
  return active === slug
}
