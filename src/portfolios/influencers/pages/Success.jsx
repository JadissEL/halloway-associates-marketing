import { Link, useSearchParams } from 'react-router-dom'
import { offers } from '../data'

export default function InfluencerSuccess() {
  const [params] = useSearchParams()
  const offer = offers.find((o) => o.id === params.get('offer'))
  const ref = params.get('ref') || '—'

  return (
    <main className="inf-wrap inf-section">
      <div className="inf-banner inf-banner--ok" style={{ maxWidth: 560 }}>
        <p className="inf-label">Confirmed · demo checkout</p>
        <h1 className="display" style={{ fontSize: '2rem', margin: '0.25rem 0 0.75rem' }}>
          Request received
        </h1>
        <p>
          {offer ? (
            <>
              Offer: <strong>{offer.name}</strong>.{' '}
            </>
          ) : null}
          Ref: <code>{ref}</code>
        </p>
        <p>
          Payment recorded as <strong>Stripe test / mock</strong> (<code>pi_test_*</code>). No live
          charge in this kit demo. A production install swaps this step for real Stripe Checkout.
        </p>
        <p style={{ marginBottom: 0 }}>
          Unserious requests without payment never reach the creator inbox.
        </p>
      </div>
      <div className="inf-actions">
        <Link className="inf-btn" to="/portfolios/influencers/account">
          Open my dashboard
        </Link>
        <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/offers">
          Book another offer
        </Link>
        <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers">
          Back to site
        </Link>
      </div>
    </main>
  )
}
