import { Link } from 'react-router-dom'
import { creator } from '../data'

const faqs = [
  {
    q: 'Why do I need email to contact?',
    a: 'So unserious anonymous DMs never hit the inbox. Connected users get a dashboard for requests and messages.',
  },
  {
    q: 'How do bookings work?',
    a: 'Connect → choose an offer → intake → Stripe test payment → confirmation. Live clients use real Stripe + calendar.',
  },
  {
    q: 'Can brands still email directly?',
    a: `Prefer the Contact form or Collab offer after connecting. Public mailbox ${creator.email} is optional per client.`,
  },
  {
    q: 'Where is my user dashboard?',
    a: 'After connect: /portfolios/influencers/account — your requests and sent messages.',
  },
]

export default function InfluencerFaq() {
  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">FAQ</p>
      <h1 className="display" style={{ fontSize: '2rem', margin: 0 }}>
        Common questions
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
          Connect with email
        </Link>
        <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/contact">
          Contact
        </Link>
      </div>
    </main>
  )
}
