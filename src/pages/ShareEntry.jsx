import { useEffect } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import Seo from '../components/Seo'
import { brand } from '../lib/brand'
import { activateKitShare } from '../lib/kitShare'
import { getPortfolioKit } from '../lib/portfolios'

/**
 * Commercial entry: /p/:slug → arms share mode, then opens ONLY that niche.
 * Prospects never land on /kits or the 100-niche ICP gallery from this path.
 */
export default function ShareEntry() {
  const { slug } = useParams()
  const kit = getPortfolioKit(slug)

  useEffect(() => {
    if (kit) activateKitShare(kit.slug)
  }, [kit])

  if (!kit) {
    return (
      <main style={{ padding: '3rem 1.5rem', maxWidth: 520, margin: '0 auto' }}>
        <Seo title={`Unknown portfolio | ${brand.name}`} />
        <h1>This share link isn&apos;t set up yet</h1>
        <p>Ask your Halloway contact for the correct niche link.</p>
        <p>
          <a href={`mailto:${brand.contactEmail}`}>{brand.contactEmail}</a>
        </p>
      </main>
    )
  }

  return <Navigate to={`${kit.studioPath}?share=1`} replace />
}
