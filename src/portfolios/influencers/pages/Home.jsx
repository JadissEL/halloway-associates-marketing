import { Link } from 'react-router-dom'
import { creator, offers, testimonials } from '../data'

export default function InfluencerHome() {
  return (
    <main>
      <section className="inf-wrap inf-hero">
        <div>
          <p className="inf-label">Creator digital portfolio · EN</p>
          <h1 className="display">{creator.name}</h1>
          <p className="inf-hero__tag">{creator.tagline}</p>
          <p style={{ maxWidth: '42ch', marginTop: '1rem' }}>{creator.bio}</p>
          <p className="inf-label" style={{ marginTop: '1rem' }}>
            {creator.location}
          </p>
          <div className="inf-actions">
            <Link className="inf-btn inf-btn--lime" to="/portfolios/influencers/connect">
              Connect with email
            </Link>
            <Link className="inf-btn" to="/portfolios/influencers/offers">
              Book paid access
            </Link>
            <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/media-kit">
              Media kit
            </Link>
          </div>
          <p className="inf-label" style={{ marginTop: '1rem' }}>
            Email required for contact & booking — then use your user dashboard
          </p>
          <div className="inf-stats">
            {creator.stats.map((s) => (
              <div key={s.label}>
                <strong>{s.value}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <img className="inf-hero__photo" src={creator.hero} alt={creator.name} />
      </section>

      <section className="inf-wrap inf-section">
        <div className="inf-section__head">
          <div>
            <p className="inf-label">Why this product</p>
            <h2 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', margin: 0 }}>
              Serious people pay. Inbox chaos drops.
            </h2>
          </div>
        </div>
        <div className="inf-grid inf-grid--3">
          {[
            'Filter unserious DMs with structured booking + payment',
            'Fans and brands buy access to your time under your brand',
            'Fewer page-managers just to schedule — one clear funnel',
          ].map((t) => (
            <article key={t} className="inf-card">
              <p style={{ margin: 0 }}>{t}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inf-wrap inf-section">
        <div className="inf-section__head">
          <div>
            <p className="inf-label">Featured offers</p>
            <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>
              Ways to work with me
            </h2>
          </div>
          <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/offers">
            All offers
          </Link>
        </div>
        <div className="inf-grid inf-grid--offers">
          {offers.slice(0, 3).map((o) => (
            <article key={o.id} className="inf-card">
              <p className="inf-label">{o.duration}</p>
              <h3 className="display">{o.name}</h3>
              <p className="inf-price">{o.priceLabel}</p>
              <p style={{ color: 'var(--inf-muted)', fontSize: '0.95rem' }}>{o.blurb}</p>
              <Link className="inf-btn" style={{ marginTop: '1rem' }} to={`/portfolios/influencers/book/${o.id}`}>
                Request
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="inf-wrap inf-section">
        <p className="inf-label">Social proof</p>
        <div className="inf-grid inf-grid--2">
          {testimonials.map((t) => (
            <blockquote key={t.by} className="inf-card" style={{ margin: 0 }}>
              <p style={{ fontSize: '1.1rem' }}>“{t.quote}”</p>
              <footer className="inf-label">— {t.by}</footer>
            </blockquote>
          ))}
        </div>
      </section>
    </main>
  )
}
