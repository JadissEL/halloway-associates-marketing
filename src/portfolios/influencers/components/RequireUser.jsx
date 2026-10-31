import { Link, useLocation } from 'react-router-dom'
import { getUserSession } from '../lib/session'

export default function RequireUser({ children, intent = 'continue' }) {
  const session = getUserSession()
  const location = useLocation()

  if (session) return children

  const next = encodeURIComponent(location.pathname + location.search)

  return (
    <div className="inf-card" style={{ maxWidth: 480, margin: '2rem auto' }}>
      <p className="inf-label">Quick step</p>
      <h2 className="display" style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>
        Leave your email to {intent}
      </h2>
      <p style={{ color: 'var(--inf-muted)' }}>
        One time — then you can message, book, and check your requests from your space.
      </p>
      <Link className="inf-btn inf-btn--lime" to={`/portfolios/influencers/connect?next=${next}`}>
        Continue with email
      </Link>
    </div>
  )
}
