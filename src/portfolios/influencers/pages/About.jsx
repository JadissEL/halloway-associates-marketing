import { Link } from 'react-router-dom'
import { creator, kitMeta } from '../data'

export default function InfluencerAbout() {
  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">About</p>
      <h1 className="display" style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', margin: 0 }}>
        {creator.name}
      </h1>
      <p className="inf-hero__tag">{creator.tagline}</p>
      <div className="inf-grid inf-grid--2" style={{ marginTop: '2rem', alignItems: 'start' }}>
        <img
          src={creator.portrait}
          alt=""
          style={{ width: '100%', border: '2px solid var(--inf-ink)', objectFit: 'cover', aspectRatio: '4/5' }}
        />
        <div>
          <p>{creator.bio}</p>
          <p>
            <strong>Based:</strong> {creator.location}
          </p>
          <p>
            <strong>Handle:</strong> {creator.handle}
          </p>
          <div className="inf-actions">
            <Link className="inf-btn inf-btn--lime" to="/portfolios/influencers/connect">
              Connect with email
            </Link>
            <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/offers">
              See offers
            </Link>
          </div>
          <p className="inf-label" style={{ marginTop: '2rem' }}>
            Site kit by {kitMeta.studio}
          </p>
        </div>
      </div>
    </main>
  )
}
