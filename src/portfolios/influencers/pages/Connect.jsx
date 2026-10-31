import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { isClerkEnabled } from '../../../lib/clerk'
import SocialConnect from '../components/SocialConnect'
import { connectUser, getUserSession } from '../lib/session'

export default function InfluencerConnect() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const existing = getUserSession()
  const clerkOn = isClerkEnabled()
  const next = params.get('next') || '/portfolios/influencers/account'
  const [form, setForm] = useState({
    name: existing?.name || '',
    email: existing?.email || '',
    role: existing?.role || 'fan',
  })
  const [error, setError] = useState('')

  function onChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    try {
      connectUser(form)
      navigate(next.startsWith('/') ? next : '/portfolios/influencers/account')
    } catch (err) {
      setError(err.message || 'Could not connect')
    }
  }

  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Account</p>
      <h1 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', margin: 0 }}>
        Connect to book &amp; message
      </h1>
      <p style={{ maxWidth: '52ch', color: 'var(--inf-muted)' }}>
        Clients connect with <strong>Gmail</strong> or <strong>LinkedIn</strong> (Clerk)
        {clerkOn ? '' : ' — add VITE_CLERK_PUBLISHABLE_KEY to enable'}
        , or use email below. Required before contact or booking.
      </p>

      <div className="inf-grid inf-grid--2" style={{ marginTop: '1.75rem', alignItems: 'start' }}>
        {clerkOn ? (
          <SocialConnect nextPath={next.startsWith('/') ? next : '/portfolios/influencers/account'} />
        ) : (
          <div className="inf-card">
            <p className="inf-label">Clerk (Gmail + LinkedIn)</p>
            <h2 className="display" style={{ fontSize: '1.25rem' }}>
              Not configured yet
            </h2>
            <p style={{ color: 'var(--inf-muted)' }}>
              Set <code>VITE_CLERK_PUBLISHABLE_KEY</code> in <code>.env</code>, then enable Google and
              LinkedIn in the Clerk Dashboard. See{' '}
              <code>docs/CLERK_INFLUENCER_AUTH.md</code>.
            </p>
          </div>
        )}

        <form className="inf-form inf-card" onSubmit={onSubmit}>
          <p className="inf-label">Email connect (always available)</p>
          {error ? (
            <p className="inf-banner" style={{ background: 'rgba(232,90,140,0.2)' }}>
              {error}
            </p>
          ) : null}
          <label>
            Name
            <input name="name" required value={form.name} onChange={onChange} />
          </label>
          <label>
            Email
            <input name="email" type="email" required value={form.email} onChange={onChange} />
          </label>
          <label>
            I am
            <select name="role" value={form.role} onChange={onChange}>
              <option value="fan">Fan / individual</option>
              <option value="brand">Brand / agency</option>
              <option value="creator">Fellow creator</option>
            </select>
          </label>
          <button className="inf-btn inf-btn--lime" type="submit">
            {existing ? 'Update & continue' : 'Connect with email'}
          </button>
          <p style={{ fontSize: '0.85rem', color: 'var(--inf-muted)' }}>
            Creator? <Link to="/portfolios/influencers/creator/login">Creator dashboard login</Link>
          </p>
        </form>
      </div>
    </main>
  )
}
