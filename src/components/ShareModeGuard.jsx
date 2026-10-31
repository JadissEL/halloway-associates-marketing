import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { activateKitShare, isKitShareActive } from '../lib/kitShare'
import { getPortfolioKit } from '../lib/portfolios'

/**
 * Keeps share mode alive while browsing a niche studioPath after /p/:slug.
 */
export default function ShareModeGuard({ slug, children }) {
  const location = useLocation()
  const [, setTick] = useState(0)

  useEffect(() => {
    const q = new URLSearchParams(location.search)
    if (q.get('share') === '1' || q.get('share') === 'true') {
      activateKitShare(slug)
      setTick((t) => t + 1)
    }
  }, [location.search, slug])

  return children
}

export function useShareMode(slug) {
  const location = useLocation()
  const [active, setActive] = useState(() => isKitShareActive(slug))

  useEffect(() => {
    const q = new URLSearchParams(location.search)
    if (q.get('share') === '1' || q.get('share') === 'true') {
      activateKitShare(slug)
    }
    setActive(isKitShareActive(slug))
  }, [location.search, location.pathname, slug])

  const kit = getPortfolioKit(slug)
  return { shareMode: active, kit }
}
