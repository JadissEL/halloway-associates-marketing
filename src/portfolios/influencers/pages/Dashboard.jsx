import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { sampleRequests } from '../data'
import { loadRequests, updateRequestStatus } from '../lib/bookingStore'

export default function InfluencerDashboard() {
  const [local, setLocal] = useState([])

  useEffect(() => {
    setLocal(loadRequests())
  }, [])

  const rows = [
    ...local.map((r) => ({
      id: r.id,
      from: r.name,
      offer: r.offerName,
      budget: r.budget || `€${r.amount}`,
      status: r.status,
      goal: r.goal,
    })),
    ...sampleRequests,
  ]

  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Creator dashboard (kit mock)</p>
      <h1 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', margin: 0 }}>
        Requests inbox
      </h1>
      <p style={{ color: 'var(--inf-muted)', maxWidth: '56ch' }}>
        Live installs connect this to your DB / Stripe webhooks. Demo merges sample rows with local
        bookings from this browser.
      </p>

      <div className="inf-dash" style={{ marginTop: '1.5rem' }}>
        <aside className="inf-dash__side">
          <p className="inf-label">Navigate</p>
          <Link to="/portfolios/influencers/offers">Offers</Link>
          <Link to="/portfolios/influencers/media-kit">Media kit</Link>
          <Link to="/portfolios/influencers/card">Business card</Link>
          <Link to="/kits">Studio kits index</Link>
          <p className="inf-label" style={{ marginTop: '1rem' }}>
            Analytics placeholder
          </p>
          <p style={{ fontSize: '0.85rem', margin: 0 }}>Views · conversion · revenue — wire Plausible/Umami later.</p>
        </aside>

        <div className="inf-card" style={{ overflowX: 'auto' }}>
          <table className="inf-table">
            <thead>
              <tr>
                <th>From</th>
                <th>Offer</th>
                <th>Budget</th>
                <th>Status</th>
                <th>Goal</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td>{r.from}</td>
                  <td>{r.offer}</td>
                  <td>{r.budget}</td>
                  <td>
                    <span
                      className={`inf-pill ${
                        r.status === 'paid' ? 'inf-pill--paid' : r.status === 'new' ? 'inf-pill--new' : 'inf-pill--pending'
                      }`}
                    >
                      {r.status}
                    </span>
                  </td>
                  <td style={{ maxWidth: 220 }}>{r.goal}</td>
                  <td>
                    {String(r.id).startsWith('local_') && r.status !== 'archived' ? (
                      <button
                        type="button"
                        className="inf-btn inf-btn--ghost"
                        style={{ padding: '0.35rem 0.6rem', fontSize: '0.75rem' }}
                        onClick={() => setLocal(updateRequestStatus(r.id, 'archived'))}
                      >
                        Archive
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
