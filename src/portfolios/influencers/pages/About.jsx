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
          className="inf-about__photo"
        />
        <div>
          <p>{creator.aboutLong || creator.bio}</p>
          <p>
            Based in {creator.location}. You can find me as {creator.handle} on the usual platforms.
          </p>
          <ul className="inf-platform-row inf-platform-row--stack">
            {creator.platforms.map((p) => (
              <li key={p.id}>
                <strong>{p.label}</strong>
                <span>{p.detail}</span>
              </li>
            ))}
          </ul>
          <div className="inf-actions">
            <Link className="inf-btn inf-btn--lime" to="/portfolios/influencers/connect">
              Say hi
            </Link>
            <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/offers">
              See how we can work
            </Link>
          </div>
          <p className="inf-label" style={{ marginTop: '2rem' }}>
            Site by {kitMeta.studio}
          </p>
        </div>
      </div>
    </main>
  )
}
