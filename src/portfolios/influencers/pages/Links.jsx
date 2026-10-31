import { Link } from 'react-router-dom'
import { creator, linkHub } from '../data'

export default function InfluencerLinks() {
  return (
    <main className="inf-wrap inf-section" style={{ textAlign: 'center' }}>
      <img
        src={creator.portrait}
        alt=""
        width={88}
        height={88}
        style={{ borderRadius: '50%', border: '2px solid var(--inf-ink)', objectFit: 'cover' }}
      />
      <h1 className="display" style={{ fontSize: '2rem', margin: '0.75rem 0 0.25rem' }}>
        {creator.name}
      </h1>
      <p className="inf-label">{creator.handle} · link-in-bio hub</p>
      <p style={{ maxWidth: '36ch', margin: '0.75rem auto 1.5rem', color: 'var(--inf-muted)' }}>
        {creator.tagline}
      </p>
      <div className="inf-links">
        {linkHub.map((l) =>
          l.to ? (
            <Link key={l.id} to={l.to}>
              {l.label}
            </Link>
          ) : (
            <a key={l.id} href={l.href} className={l.id === 'studio' ? 'ghost' : undefined} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          ),
        )}
      </div>
    </main>
  )
}
