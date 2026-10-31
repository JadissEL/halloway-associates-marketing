import { Link, useSearchParams } from 'react-router-dom'
import { creator, offers } from '../data'

export default function InfluencerSuccess() {
  const [params] = useSearchParams()
  const offer = offers.find((o) => o.id === params.get('offer'))
  const ref = params.get('ref') || '—'

  return (
    <main className="inf-wrap inf-section">
      <div className="inf-banner inf-banner--ok" style={{ maxWidth: 560 }}>
        <p className="inf-label">You’re in</p>
        <h1 className="display" style={{ fontSize: '2rem', margin: '0.25rem 0 0.75rem' }}>
          Thanks — I got your request
        </h1>
        <p>
          {offer ? (
            <>
              <strong>{offer.name}</strong>
              {' · '}
            </>
          ) : null}
          Ref <code>{ref}</code>
        </p>
        <p>
          I’ll follow up at the email you used. This demo used a practice payment — nothing was
          charged.
        </p>
        <p style={{ marginBottom: 0 }}>
          Want to tweak something? Message me from your space anytime.
        </p>
      </div>
      <div className="inf-actions">
        <Link className="inf-btn" to="/portfolios/influencers/account">
          Open my space
        </Link>
        <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/offers">
          Book something else
        </Link>
        <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers">
          Back to {creator.name.split(' ')[0]}
        </Link>
      </div>
    </main>
  )
}
