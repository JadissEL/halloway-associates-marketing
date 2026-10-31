import { Link } from 'react-router-dom'
import { creator, packages } from '../data'

export default function InfluencerMediaKit() {
  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">For brands</p>
      <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>
        Media kit
      </h1>
      <p style={{ maxWidth: '56ch', color: 'var(--inf-muted)' }}>
        Who I reach, what I make, and how to book — all on one page.
      </p>

      <div className="inf-grid inf-grid--2" style={{ marginTop: '2rem' }}>
        <img src={creator.portrait} alt="" style={{ width: '100%', border: '2px solid var(--inf-ink)', objectFit: 'cover', aspectRatio: '4/5' }} />
        <div>
          <div className="inf-stats">
            {creator.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
          <h2 className="display" style={{ fontSize: '1.5rem', marginTop: '1.5rem' }}>
            About the audience
          </h2>
          <p>{creator.aboutLong || creator.bio}</p>
          <p>{creator.location}</p>
          <h2 className="display" style={{ fontSize: '1.5rem' }}>
            Typical rates
          </h2>
          <ul className="inf-list">
            {packages.map((p) => (
              <li key={p.id}>
                {p.name}: {p.price} — {p.note}
              </li>
            ))}
          </ul>
          <Link className="inf-btn" style={{ marginTop: '1rem' }} to="/portfolios/influencers/offers">
            Start a collab
          </Link>
        </div>
      </div>

      <p className="inf-banner" style={{ marginTop: '2rem' }}>
        Prefer a printable rate card?{' '}
        <a href="/portfolios/influencers/templates/rate-card.md" target="_blank" rel="noreferrer">
          Download the short version
        </a>
      </p>
    </main>
  )
}
