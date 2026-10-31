import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import RequireCreator from '../../components/RequireCreator'
import { disconnectCreator, getCreatorSession, listDirectoryUsers } from '../../lib/session'
import { loadRequests, updateRequestStatus } from '../../lib/bookingStore'
import { loadMessages, markMessage } from '../../lib/messageStore'
import { getFlagshipNiche } from '../../../../lib/niches'
import { creator, offers, sampleRequests } from '../../data'

const tools = [
  { to: '/portfolios/influencers/creator', end: true, label: 'Overview' },
  { to: '/portfolios/influencers/creator/requests', label: 'Requests' },
  { to: '/portfolios/influencers/creator/messages', label: 'Messages' },
  { to: '/portfolios/influencers/creator/clients', label: 'Clients' },
  { to: '/portfolios/influencers/creator/offers', label: 'Offers' },
  { to: '/portfolios/influencers/creator/calendar', label: 'Calendar' },
  { to: '/portfolios/influencers/creator/analytics', label: 'Analytics' },
  { to: '/portfolios/influencers/creator/settings', label: 'Settings' },
]

export function CreatorShell() {
  const nav = useNavigate()
  const session = getCreatorSession()

  function signOut() {
    disconnectCreator()
    nav('/portfolios/influencers/creator/login')
  }

  return (
    <RequireCreator>
      <main className="inf-wrap inf-section">
        <div className="inf-section__head">
          <div>
            <p className="inf-label">Creator OS · {session?.email}</p>
            <h1 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', margin: 0 }}>
              {creator.name} dashboard
            </h1>
          </div>
          <button type="button" className="inf-btn inf-btn--ghost inf-no-print" onClick={signOut}>
            Sign out
          </button>
        </div>
        <div className="inf-dash">
          <aside className="inf-dash__side">
            <p className="inf-label">Tools</p>
            {tools.map((t) => (
              <NavLink key={t.to} to={t.to} end={t.end}>
                {t.label}
              </NavLink>
            ))}
            <p className="inf-label" style={{ marginTop: '1rem' }}>
              Public site
            </p>
            <Link to="/portfolios/influencers">Landing</Link>
            <Link to="/portfolios/influencers/card">Business card</Link>
            <Link to="/portfolios/influencers/links">Link hub</Link>
          </aside>
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </RequireCreator>
  )
}

export function CreatorOverview() {
  const requests = loadRequests()
  const messages = loadMessages().filter((m) => m.status === 'unread')
  const clients = listDirectoryUsers()
  const niche = getFlagshipNiche()
  const ai = niche?.ai_services || []
  const tp = niche?.third_party_connections || []

  return (
    <div style={{ display: 'grid', gap: '1rem' }}>
      <div className="inf-stats">
        <div>
          <strong>{requests.length}</strong>
          <span>Local requests</span>
        </div>
        <div>
          <strong>{messages.length}</strong>
          <span>Unread msgs</span>
        </div>
        <div>
          <strong>{clients.length}</strong>
          <span>Connected users</span>
        </div>
      </div>
      <div className="inf-grid inf-grid--2">
        <article className="inf-card">
          <h3 className="display" style={{ fontSize: '1.25rem' }}>
            Today&apos;s focus
          </h3>
          <ul className="inf-list">
            <li>Reply to paid requests first</li>
            <li>Archive tire-kickers without payment</li>
            <li>Share link-in-bio → offers</li>
          </ul>
        </article>
        <article className="inf-card">
          <h3 className="display" style={{ fontSize: '1.25rem' }}>
            Quick links
          </h3>
          <div className="inf-actions">
            <Link className="inf-btn" to="/portfolios/influencers/creator/requests">
              Inbox
            </Link>
            <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/creator/messages">
              Messages
            </Link>
          </div>
        </article>
      </div>

      <section className="inf-card inf-addons">
        <p className="inf-label">Platform roadmap · Halloway add-ons</p>
        <h3 className="display" style={{ fontSize: '1.35rem', margin: '0.25rem 0 0.5rem' }}>
          AI + third parties for this niche
        </h3>
        <p style={{ color: 'var(--inf-muted)', maxWidth: '62ch', marginTop: 0 }}>
          Scoped for creators: each module includes why it helps the business. Demo kit shows the
          funnel; these are proposal-ready upgrades.
        </p>
        <div className="inf-addons__grid">
          <div>
            <p className="inf-label">AI services ({ai.length})</p>
            <ul className="inf-addon-list">
              {ai.map((a) => (
                <li key={a.id}>
                  <strong>{a.name}</strong>
                  <span>{a.plus}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="inf-label">Connections ({tp.length})</p>
            <ul className="inf-addon-list">
              {tp.map((t) => (
                <li key={t.id}>
                  <strong>{t.name}</strong>
                  <span>{t.plus}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}

export function CreatorRequests() {
  const [local, setLocal] = useState([])
  useEffect(() => setLocal(loadRequests()), [])

  const rows = useMemo(
    () => [
      ...local.map((r) => ({
        id: r.id,
        from: r.name,
        email: r.email,
        offer: r.offerName,
        budget: r.budget || `€${r.amount}`,
        status: r.status,
        goal: r.goal,
      })),
      ...sampleRequests,
    ],
    [local],
  )

  return (
    <div className="inf-card" style={{ overflowX: 'auto' }}>
      <h2 className="display" style={{ fontSize: '1.35rem' }}>
        Booking requests
      </h2>
      <table className="inf-table">
        <thead>
          <tr>
            <th>From</th>
            <th>Email</th>
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
              <td>{r.email || '—'}</td>
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
              <td style={{ maxWidth: 180 }}>{r.goal}</td>
              <td>
                {String(r.id).startsWith('local_') ? (
                  <button
                    type="button"
                    className="inf-btn inf-btn--ghost"
                    style={{ padding: '0.3rem 0.5rem', fontSize: '0.75rem' }}
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
  )
}

export function CreatorMessages() {
  const [list, setList] = useState([])
  useEffect(() => setList(loadMessages()), [])

  return (
    <div className="inf-card">
      <h2 className="display" style={{ fontSize: '1.35rem' }}>
        Message inbox
      </h2>
      <p style={{ color: 'var(--inf-muted)' }}>Only from email-connected users.</p>
      {list.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {list.map((m) => (
            <li
              key={m.id}
              style={{ borderBottom: '1px solid rgba(18,18,26,0.08)', padding: '0.85rem 0' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <strong>
                  {m.fromName} &lt;{m.fromEmail}&gt;
                </strong>
                <span className={`inf-pill ${m.status === 'unread' ? 'inf-pill--pending' : 'inf-pill--new'}`}>
                  {m.status}
                </span>
              </div>
              <div className="inf-label">{m.subject}</div>
              <p>{m.body}</p>
              {m.status === 'unread' ? (
                <button
                  type="button"
                  className="inf-btn inf-btn--ghost"
                  style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                  onClick={() => setList(markMessage(m.id, 'read'))}
                >
                  Mark read
                </button>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export function CreatorClients() {
  const clients = listDirectoryUsers()
  return (
    <div className="inf-card" style={{ overflowX: 'auto' }}>
      <h2 className="display" style={{ fontSize: '1.35rem' }}>
        Connected clients / fans
      </h2>
      <p style={{ color: 'var(--inf-muted)' }}>Anyone who connected with email on this kit.</p>
      {clients.length === 0 ? (
        <p>No connections yet.</p>
      ) : (
        <table className="inf-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Last seen</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((c) => (
              <tr key={c.email}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.role}</td>
                <td>{new Date(c.lastSeen).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export function CreatorOffers() {
  return (
    <div className="inf-card">
      <h2 className="display" style={{ fontSize: '1.35rem' }}>
        Offer catalog
      </h2>
      <p style={{ color: 'var(--inf-muted)' }}>Edit prices in <code>data.js</code> for this kit demo.</p>
      <ul className="inf-list">
        {offers.map((o) => (
          <li key={o.id}>
            <strong>{o.name}</strong> — {o.priceLabel}
          </li>
        ))}
      </ul>
      <Link className="inf-btn" style={{ marginTop: '1rem' }} to="/portfolios/influencers/offers">
        View public offers
      </Link>
    </div>
  )
}

export function CreatorCalendar() {
  return (
    <div className="inf-card">
      <h2 className="display" style={{ fontSize: '1.35rem' }}>
        Calendar
      </h2>
      <p className="inf-banner">
        Placeholder for Cal.com / Google Calendar embed. Set <code>creator.calUrl</code> in data.js.
      </p>
      {creator.calUrl ? (
        <a className="inf-btn" href={creator.calUrl} target="_blank" rel="noreferrer">
          Open calendar
        </a>
      ) : (
        <p style={{ color: 'var(--inf-muted)' }}>No calendar URL configured.</p>
      )}
    </div>
  )
}

export function CreatorAnalytics() {
  const requests = loadRequests()
  const paid = requests.filter((r) => r.status === 'paid').length
  return (
    <div className="inf-card">
      <h2 className="display" style={{ fontSize: '1.35rem' }}>
        Analytics (placeholder)
      </h2>
      <div className="inf-stats">
        <div>
          <strong>{paid}</strong>
          <span>Paid (local)</span>
        </div>
        <div>
          <strong>{listDirectoryUsers().length}</strong>
          <span>Connected</span>
        </div>
        <div>
          <strong>—</strong>
          <span>Page views</span>
        </div>
      </div>
      <p style={{ color: 'var(--inf-muted)' }}>Wire Umami / GA4 / Stripe revenue in production.</p>
    </div>
  )
}

export function CreatorSettings() {
  return (
    <div className="inf-card">
      <h2 className="display" style={{ fontSize: '1.35rem' }}>
        Settings
      </h2>
      <p>
        Profile fields live in <code>src/portfolios/influencers/data.js</code> for this kit.
      </p>
      <ul className="inf-list">
        <li>Name: {creator.name}</li>
        <li>Public email: {creator.email}</li>
        <li>Currency: {creator.currency}</li>
        <li>Stripe test mode: {creator.stripeTestMode ? 'on' : 'off'}</li>
      </ul>
    </div>
  )
}
