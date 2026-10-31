import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import RequireUser from '../components/RequireUser'
import { creator, offers } from '../data'
import { saveRequest } from '../lib/bookingStore'
import { getUserSession } from '../lib/session'

function BookFlow({ offer }) {
  const navigate = useNavigate()
  const user = getUserSession()
  const [step, setStep] = useState('intake')
  const [form, setForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || 'fan',
    budget: '',
    goal: '',
    dates: '',
  })

  useEffect(() => {
    if (!user) return
    setForm((f) => ({
      ...f,
      name: f.name || user.name,
      email: user.email,
      role: user.role || f.role,
    }))
  }, [user])

  function onChange(e) {
    const { name, value } = e.target
    setForm((f) => ({ ...f, [name]: value }))
  }

  function submitIntake(e) {
    e.preventDefault()
    setStep('pay')
  }

  function simulateStripe() {
    const saved = saveRequest({
      ...form,
      email: user.email,
      name: form.name || user.name,
      offerId: offer.id,
      offerName: offer.name,
      amount: offer.price,
      currency: creator.currency,
      status: 'paid',
      paymentId: `pi_test_${Date.now().toString(36)}`,
      mode: 'stripe_test_simulated',
    })
    navigate(`/portfolios/influencers/success?ref=${saved.id}&offer=${offer.id}`)
  }

  return (
    <>
      {creator.calUrl ? (
        <p className="inf-banner" style={{ marginTop: '1rem' }}>
          Calendar: <a href={creator.calUrl}>{creator.calUrl}</a>
        </p>
      ) : (
        <p className="inf-banner" style={{ marginTop: '1rem' }}>
          Cal.com placeholder — set <code>creator.calUrl</code> in kit data.js.
        </p>
      )}

      {step === 'intake' && (
        <form className="inf-form" style={{ marginTop: '1.5rem' }} onSubmit={submitIntake}>
          <p className="inf-banner">
            Booking as <strong>{user.email}</strong> ·{' '}
            <Link to="/portfolios/influencers/connect">change account</Link>
          </p>
          <label>
            Your name / brand
            <input name="name" required value={form.name} onChange={onChange} />
          </label>
          <label>
            Email (locked to connected account)
            <input name="email" type="email" required value={user.email} readOnly />
          </label>
          <label>
            I am
            <select name="role" value={form.role} onChange={onChange}>
              <option value="fan">Fan / individual</option>
              <option value="brand">Brand / agency</option>
              <option value="creator">Fellow creator</option>
            </select>
          </label>
          <label>
            Budget (EUR)
            <input name="budget" required placeholder={`e.g. ${offer.price}`} value={form.budget} onChange={onChange} />
          </label>
          <label>
            Goal
            <textarea name="goal" rows={4} required value={form.goal} onChange={onChange} />
          </label>
          <label>
            Preferred dates / timezone
            <input name="dates" value={form.dates} onChange={onChange} placeholder="Optional" />
          </label>
          <button className="inf-btn" type="submit">
            Continue to payment
          </button>
          <Link to="/portfolios/influencers/offers">Back to offers</Link>
        </form>
      )}

      {step === 'pay' && (
        <div style={{ marginTop: '1.5rem', maxWidth: 480 }}>
          <div className="inf-card">
            <p className="inf-label">Stripe test / mock checkout</p>
            <h2 className="display" style={{ fontSize: '1.5rem' }}>
              Pay {offer.priceLabel}
            </h2>
            <p style={{ color: 'var(--inf-muted)' }}>
              Connected as <strong>{user.email}</strong>. This kit demo runs a{' '}
              <strong>clear mock path</strong> (no Stripe keys required): saves a paid request with{' '}
              <code>pi_test_*</code>, then opens the success page. Live installs replace this button
              with Stripe Checkout (test mode keys).
            </p>
            <button className="inf-btn inf-btn--lime" type="button" onClick={simulateStripe}>
              Complete mock payment
            </button>
            <button
              className="inf-btn inf-btn--ghost"
              type="button"
              style={{ marginLeft: '0.5rem' }}
              onClick={() => setStep('intake')}
            >
              Edit intake
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default function InfluencerBook() {
  const { offerId } = useParams()
  const offer = useMemo(() => offers.find((o) => o.id === offerId) || offers[0], [offerId])

  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Booking / request</p>
      <h1 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', margin: '0 0 0.5rem' }}>
        {offer.name}
      </h1>
      <p className="inf-price">{offer.priceLabel}</p>
      <RequireUser intent="book this offer">
        <BookFlow offer={offer} />
      </RequireUser>
    </main>
  )
}
