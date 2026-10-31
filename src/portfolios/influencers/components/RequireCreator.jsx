import { Link, useLocation } from 'react-router-dom'
import { getCreatorSession } from '../lib/session'

export default function RequireCreator({ children }) {
  const session = getCreatorSession()
  const location = useLocation()

  if (session) return children

  const next = encodeURIComponent(location.pathname + location.search)

  return (
    <div className="inf-card" style={{ maxWidth: 480, margin: '2rem auto' }}>
      <p className="inf-label">Creator access</p>
      <h2 className="display" style={{ fontSize: '1.5rem', margin: '0.25rem 0 0.75rem' }}>
        Sign in to your creator dashboard
      </h2>
      <p style={{ color: 'var(--inf-muted)' }}>
        Manage requests, messages, clients, and tools. Demo: use kit PIN from README.
      </p>
      <Link className="inf-btn" to={`/portfolios/influencers/creator/login?next=${next}`}>
        Creator login
      </Link>
    </div>
  )
}
