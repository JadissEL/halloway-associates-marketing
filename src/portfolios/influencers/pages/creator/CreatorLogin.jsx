import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { connectCreator, CREATOR_DEMO_PIN, getCreatorSession } from '../../lib/session'
import { creator } from '../../data'

export default function CreatorLogin() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const existing = getCreatorSession()
  const [email, setEmail] = useState(existing?.email || creator.email)
  const [pin, setPin] = useState('')
  const [error, setError] = useState('')

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      connectCreator({ email, pin })
      const next = params.get('next') || '/portfolios/influencers/creator'
      navigate(next.startsWith('/') ? next : '/portfolios/influencers/creator')
    } catch (err) {
      setError(err.message || 'Login failed')
    }
  }

  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Creator</p>
      <h1 className="display" style={{ fontSize: '2rem', margin: 0 }}>
        Dashboard login
      </h1>
      <p style={{ color: 'var(--inf-muted)', maxWidth: '48ch' }}>
        Kit demo auth. Production: magic link / Clerk / OTP. Demo PIN:{' '}
        <code>{CREATOR_DEMO_PIN}</code> · email <code>{creator.email}</code>
      </p>
      <form className="inf-form" style={{ marginTop: '1.5rem' }} onSubmit={onSubmit}>
        {error ? <p className="inf-banner" style={{ background: 'rgba(232,90,140,0.2)' }}>{error}</p> : null}
        <label>
          Creator email
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <label>
          PIN
          <input type="password" required value={pin} onChange={(e) => setPin(e.target.value)} autoComplete="current-password" />
        </label>
        <button className="inf-btn" type="submit">
          Enter dashboard
        </button>
        <Link to="/portfolios/influencers">← Public site</Link>
      </form>
    </main>
  )
}
