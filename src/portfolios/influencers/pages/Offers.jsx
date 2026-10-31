import { Link } from 'react-router-dom'
import { offers, packages } from '../data'

export default function InfluencerOffers() {
  return (
    <main className="inf-wrap inf-section">
      <div className="inf-section__head">
        <div>
          <p className="inf-label">Offer catalog</p>
          <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>
            Paid access to my time
          </h1>
          <p style={{ maxWidth: '52ch', color: 'var(--inf-muted)' }}>
            Collaborations, guidance, meets, lessons. Payment / deposit before confirmation
            (Stripe test mode in this kit demo).
          </p>
        </div>
      </div>

      <div className="inf-grid inf-grid--offers">
        {offers.map((o) => (
          <article key={o.id} className="inf-card">
            <p className="inf-label">{o.duration}</p>
            <h2 className="display" style={{ fontSize: '1.5rem' }}>
              {o.name}
            </h2>
            <p className="inf-price">{o.priceLabel}</p>
            <p>{o.blurb}</p>
            <ul className="inf-list">
              {o.includes.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
            <Link className="inf-btn" style={{ marginTop: '1rem' }} to={`/portfolios/influencers/book/${o.id}`}>
              Book / request
            </Link>
          </article>
        ))}
      </div>

      <section style={{ marginTop: '3rem' }}>
        <p className="inf-label">Packages</p>
        <div className="inf-grid inf-grid--3">
          {packages.map((p) => (
            <div key={p.id} className="inf-card">
              <h3 className="display" style={{ fontSize: '1.25rem' }}>
                {p.name}
              </h3>
              <p className="inf-price">{p.price}</p>
              <p style={{ color: 'var(--inf-muted)', margin: 0 }}>{p.note}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
