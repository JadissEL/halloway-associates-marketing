import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { allNiches, getFlagshipNiche, getNicheById } from '../lib/niches'

const kits = [
  {
    id: 'influencers',
    nicheId: 'influencers',
    title: 'Influencers / creators',
    status: 'live',
    blurb: 'Branded site + paid offers + booking + media kit + card + dashboard. Flagship proof.',
    to: '/portfolios/influencers',
    image: images.niches.createur,
  },
  {
    id: 'salons',
    nicheId: 'hair_salons',
    title: 'Hair salons & barbers',
    status: 'next',
    blurb: 'Booking-first local kit — coming next in the portfolio system.',
    to: null,
    image: images.niches.salon,
  },
  {
    id: 'cafes',
    nicheId: 'restaurants',
    title: 'Cafés & restaurants',
    status: 'next',
    blurb: 'Menu, hours, contact, reservations — queued after influencers.',
    to: null,
    image: images.niches.cafe,
  },
]

export default function Kits() {
  const flagship = getFlagshipNiche()

  return (
    <>
      <Seo
        title={`Digital Portfolios / Kits | ${brand.name}`}
        description="Productized digital kits per niche — influencers live; AI + third-party add-ons scoped per métier."
      />
      <section className="section">
        <div className="container">
          <p className="label">Product line</p>
          <h1 className="display" style={{ fontSize: 'var(--text-3xl)', maxWidth: '18ch' }}>
            Niche Digital Portfolios
          </h1>
          <p style={{ maxWidth: '56ch', marginTop: '0.75rem' }}>
            {brand.name} builds complete digital product sets for business niches — sites, booking,
            cards, templates — plus optional <strong>AI modules</strong> and{' '}
            <strong>third-party connections</strong> scoped per métier ({allNiches.length} niches in
            the ICP). Mission: {brand.mission}.
          </p>
          <p style={{ marginTop: '0.75rem' }}>
            <Link to="/pour-qui">Browse AI + connexions by niche →</Link>
          </p>

          <div className="grid-2" style={{ marginTop: '2.5rem', gap: '1.5rem' }}>
            {kits.map((k) => {
              const niche = getNicheById(k.nicheId) || (k.id === 'influencers' ? flagship : null)
              const aiN = niche?.ai_services?.length || 0
              const tpN = niche?.third_party_connections?.length || 0
              return (
                <article key={k.id} className="panel" style={{ padding: 0, overflow: 'hidden' }}>
                  <img
                    src={k.image.src}
                    alt={k.image.alt}
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ padding: '1.25rem' }}>
                    <p className="label">{k.status === 'live' ? 'Live kit' : 'Coming next'}</p>
                    <h2 className="display" style={{ fontSize: '1.5rem', margin: '0.25rem 0' }}>
                      {k.title}
                    </h2>
                    <p style={{ color: 'var(--lp-muted)' }}>{k.blurb}</p>
                    {niche ? (
                      <p className="mono" style={{ fontSize: '0.8rem', margin: '0.5rem 0 1rem' }}>
                        Scoped catalog: {aiN} AI · {tpN} third-party (with business upside)
                      </p>
                    ) : null}
                    {k.to ? (
                      <Link className="btn" to={k.to}>
                        Open influencer portfolio
                      </Link>
                    ) : (
                      <span className="sticker">In queue</span>
                    )}
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
