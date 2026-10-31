import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RequireUser from '../../components/RequireUser'
import { disconnectUser, getUserSession } from '../../lib/session'
import { loadRequests } from '../../lib/bookingStore'
import { messagesForUser } from '../../lib/messageStore'
import { creator } from '../../data'

function Panel() {
  const user = getUserSession()
  const [, setTick] = useState(0)
  const requests = loadRequests().filter((r) => r.email === user.email)
  const messages = messagesForUser(user.email)

  function signOut() {
    disconnectUser()
    window.location.assign('/portfolios/influencers/connect')
  }

  return (
    <div className="inf-dash">
      <aside className="inf-dash__side">
        <p className="inf-label">My space</p>
        <p style={{ fontWeight: 600, margin: '0 0 0.5rem' }}>{user.name}</p>
        <p style={{ fontSize: '0.85rem', color: 'var(--inf-muted)', margin: 0 }}>{user.email}</p>
        <p className="inf-label" style={{ marginTop: '1rem' }}>
          Joined as {user.role}
        </p>
        <Link to="/portfolios/influencers/offers">Book something</Link>
        <Link to="/portfolios/influencers/contact">Message {creator.name.split(' ')[0]}</Link>
        <Link to="/portfolios/influencers/connect">Update my details</Link>
        <button type="button" className="inf-btn inf-btn--ghost" style={{ marginTop: '1rem', width: '100%' }} onClick={signOut}>
          Sign out
        </button>
      </aside>

      <div style={{ display: 'grid', gap: '1.25rem' }}>
        <section className="inf-card">
          <p className="inf-label">Overview</p>
          <h2 className="display" style={{ fontSize: '1.5rem', margin: 0 }}>
            Hi, {user.name}
          </h2>
          <p style={{ color: 'var(--inf-muted)' }}>
            Your bookings and messages with {creator.name} live here.
          </p>
          <div className="inf-stats">
            <div>
              <strong>{requests.length}</strong>
              <span>Requests</span>
            </div>
            <div>
              <strong>{messages.length}</strong>
              <span>Messages</span>
            </div>
            <div>
              <strong>{user.role}</strong>
              <span>Type</span>
            </div>
          </div>
        </section>

        <section className="inf-card" style={{ overflowX: 'auto' }}>
          <h3 className="display" style={{ fontSize: '1.25rem' }}>
            Your requests
          </h3>
          {requests.length === 0 ? (
            <p style={{ color: 'var(--inf-muted)' }}>
              Nothing yet. <Link to="/portfolios/influencers/offers">See what’s open</Link>
            </p>
          ) : (
            <table className="inf-table">
              <thead>
                <tr>
                  <th>Offer</th>
                  <th>Status</th>
                  <th>Payment</th>
                  <th>Goal</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((r) => (
                  <tr key={r.id}>
                    <td>{r.offerName}</td>
                    <td>
                      <span className="inf-pill inf-pill--paid">{r.status}</span>
                    </td>
                    <td>
                      <code style={{ fontSize: '0.75rem' }}>{r.paymentId || '—'}</code>
                    </td>
                    <td>{r.goal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <section className="inf-card">
          <h3 className="display" style={{ fontSize: '1.25rem' }}>
            Messages
          </h3>
          {messages.length === 0 ? (
            <p style={{ color: 'var(--inf-muted)' }}>
              No messages yet. <Link to="/portfolios/influencers/contact">Say hello</Link>
            </p>
          ) : (
            <ul className="inf-list" style={{ listStyle: 'none', padding: 0 }}>
              {messages.map((m) => (
                <li key={m.id} style={{ marginBottom: '0.75rem', borderBottom: '1px solid rgba(18,18,26,0.08)', paddingBottom: '0.75rem' }}>
                  <strong>{m.subject}</strong>
                  <div className="inf-label">{new Date(m.createdAt).toLocaleString()}</div>
                  <p style={{ margin: '0.35rem 0 0' }}>{m.body}</p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  )
}

export default function UserDashboard() {
  const [, setTick] = useState(0)
  useEffect(() => {
    const onStorage = () => setTick((t) => t + 1)
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Your space</p>
      <h1 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', margin: '0 0 1rem' }}>
        Welcome back
      </h1>
      <RequireUser intent="open your space">
        <Panel />
      </RequireUser>
    </main>
  )
}
