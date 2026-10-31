import { Link } from 'react-router-dom'
import { creator, offers, testimonials } from '../data'

export default function InfluencerHome() {
  return (
    <main>
      <section className="inf-wrap inf-hero">
        <div className="inf-rise">
          <p className="inf-label">{creator.handle}</p>
          <h1 className="display">{creator.name}</h1>
          <p className="inf-hero__tag">{creator.tagline}</p>
          <p className="inf-hero__bio">{creator.bio}</p>
          <p className="inf-label inf-hero__place">{creator.location}</p>
          <div className="inf-actions">
            <Link className="inf-btn inf-btn--lime" to="/portfolios/influencers/connect">
              Say hi
            </Link>
            <Link className="inf-btn" to="/portfolios/influencers/offers">
              Book a session
            </Link>
            <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/media-kit">
              Media kit
            </Link>
          </div>
          <p className="inf-label inf-hero__hint">
            Drop your email once — then you can message and book from your space
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
        <div className="inf-hero__visual inf-rise inf-rise--late">
          <img className="inf-hero__photo" src={creator.hero} alt={creator.name} />
        </div>
      </section>

      <section className="inf-wrap inf-section inf-platforms">
        <p className="inf-label">Where I show up</p>
        <ul className="inf-platform-row">
          {creator.platforms.map((p) => (
            <li key={p.id}>
              <strong>{p.label}</strong>
              <span>{p.detail}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="inf-wrap inf-section">
        <div className="inf-section__head">
          <div>
            <p className="inf-label">Why book here</p>
            <h2 className="display inf-h2">My DMs stay for friends. Work lives here.</h2>
          </div>
        </div>
        <div className="inf-grid inf-grid--3">
          {creator.highlights.map((h) => (
            <article key={h.title} className="inf-card inf-card--soft">
              <h3 className="display inf-card__title">{h.title}</h3>
              <p style={{ margin: 0 }}>{h.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="inf-wrap inf-section">
        <div className="inf-section__head">
          <div>
            <p className="inf-label">With me</p>
            <h2 className="display inf-h2">A few ways we can work together</h2>
          </div>
          <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/offers">
            See everything
          </Link>
        </div>
        <div className="inf-grid inf-grid--offers">
          {offers.slice(0, 3).map((o) => (
            <article key={o.id} className="inf-card">
              <p className="inf-label">{o.duration}</p>
              <h3 className="display">{o.name}</h3>
              <p className="inf-price">{o.priceLabel}</p>
              <p className="inf-card__blurb">{o.blurb}</p>
              <Link className="inf-btn" style={{ marginTop: '1rem' }} to={`/portfolios/influencers/book/${o.id}`}>
                Request this
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="inf-wrap inf-section">
        <p className="inf-label">Kind words</p>
        <div className="inf-grid inf-grid--2">
          {testimonials.map((t) => (
            <blockquote key={t.by} className="inf-card inf-quote" style={{ margin: 0 }}>
              <p>“{t.quote}”</p>
              <footer className="inf-label">— {t.by}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="inf-wrap inf-section">
        <div className="inf-close">
          <div>
            <p className="inf-label">Ready when you are</p>
            <h2 className="display inf-h2">Pick something that fits — I’ll take it from there.</h2>
            <p className="inf-close__text">
              Brands, fans, fellow creators — same door. Tell me what you need and we’ll see if the
              timing works.
            </p>
          </div>
          <div className="inf-actions">
            <Link className="inf-btn inf-btn--lime" to="/portfolios/influencers/offers">
              Browse offers
            </Link>
            <Link className="inf-btn inf-btn--ghost" to="/portfolios/influencers/contact">
              Just message me
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
