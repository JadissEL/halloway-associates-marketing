import { Link, useLocation } from 'react-router-dom'
import { getUserSession } from '../lib/session'

export default function RequireUser({ children, intent = 'continue' }) {
  const session = getUserSession()
  const location = useLocation()

  if (session) return children

  const next = encodeURIComponent(location.pathname + location.search)

  return (
    <div className="inf-card" style={{ maxWidth: 480, margin: '2rem auto' }}>
      <p className="inf-label">Email required</p>
      <h2 className="display" style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>
        Connect with email to {intent}
      </h2>
      <p style={{ color: 'var(--inf-muted)' }}>
        No anonymous DMs. Connect once — then book, message, and manage your requests from your
        dashboard.
      </p>
      <Link className="inf-btn inf-btn--lime" to={`/portfolios/influencers/connect?next=${next}`}>
        Connect with email
      </Link>
    </div>
  )
}
