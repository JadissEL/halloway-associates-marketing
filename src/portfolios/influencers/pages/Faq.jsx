import { Link } from 'react-router-dom'
import { creator } from '../data'

const faqs = [
  {
    q: 'Why do you ask for my email first?',
    a: 'So random anonymous pings don’t pile up. Once you’re in, you get a small dashboard for messages and bookings.',
  },
  {
    q: 'How does booking work?',
    a: 'Leave your email → pick what you want → short intake → pay a deposit → you’re confirmed. Live clients use real Stripe and calendar.',
  },
  {
    q: 'Can brands still email me directly?',
    a: `Prefer the contact form or a collab request after connecting. ${creator.email} is optional and set per creator.`,
  },
  {
    q: 'Where do I see my requests?',
    a: 'After you connect: My space — your bookings and messages live there.',
  },
]

export default function InfluencerFaq() {
  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">FAQ</p>
      <h1 className="display" style={{ fontSize: '2rem', margin: 0 }}>
        Things people ask
      </h1>
      <div className="inf-grid" style={{ marginTop: '1.5rem', gap: '1rem' }}>
        {faqs.map((f) => (
          <article key={f.q} className="inf-card">
            <h2 style={{ fontSize: '1.1rem', margin: '0 0 0.5rem' }}>{f.q}</h2>
            <p style={{ margin: 0, color: 'var(--inf-muted)' }}>{f.a}</p>
          </article>
        ))}
      </div>
      <div className="inf-actions" style={{ marginTop: '1.5rem' }}>
        <Link className="inf-btn" to="/portfolios/influencers/connect">
          Say hi
        </Link>
        <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/contact">
          Message me
        </Link>
      </div>
    </main>
  )
}
