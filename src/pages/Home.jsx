import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Photo from '../components/Photo'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import './Home.css'
import '../components/Photo.css'

export default function Home() {
  return (
    <>
      <Seo
        title={`${brand.name} — Digital Portfolios for businesses`}
        description={`${brand.mission}. We build niche digital product kits — start with influencers. Consulting available.`}
      />
      <section className="home-hero">
        <div className="container home-hero__grid">
          <div className="home-hero__copy anim-rise">
            <p className="label">Greek startup · Digital product studio</p>
            <h1 className="home-hero__brand">{brand.name}</h1>
            <p className="home-hero__tagline">Digital Portfolios for every niche</p>
            <p className="home-hero__lead">
              {brand.mission}. We don’t just talk about presence — we ship{' '}
              <strong>ready kits</strong> (site, booking, card, templates) businesses can run.
              Consulting sessions available.
            </p>
            <div className="home-hero__ctas">
              <Link className="btn" to="/portfolios/influencers">
                See Influencer Portfolio
              </Link>
              <Link className="btn btn-secondary" to="/kits">
                All kits
              </Link>
            </div>
            <div className="home-hero__stickers">
              <span className="sticker sticker-pink anim-stamp">Flagship: Influencers</span>
              <span className="sticker sticker-lime">100 niches roadmap</span>
              <span className="sticker sticker-violet">EN · consulting</span>
            </div>
          </div>
          <div className="home-hero__visual anim-rise" style={{ animationDelay: '0.12s' }}>
            <Photo
              src={images.niches.createur.src}
              alt={images.niches.createur.alt}
              ratio="4/5"
              objectPosition="center top"
            />
          </div>
        </div>
      </section>

      <section className="section home-strip">
        <div className="container home-strip__inner panel">
          <p className="label">What we sell</p>
          <p className="home-strip__text">
            Productized <strong>Niche Digital Portfolios</strong> — starting with influencers who need
            paid access funnels instead of DM chaos — then salons, cafés, and the rest of the library.
          </p>
          <Link to="/portfolios/influencers/offers" className="btn btn-secondary">
            Open creator offers demo
          </Link>
        </div>
      </section>

      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'center', gap: '2rem' }}>
          <div>
            <p className="label">Proof</p>
            <h2 className="display" style={{ fontSize: 'var(--text-3xl)' }}>
              Influencer kit is live
            </h2>
            <p style={{ maxWidth: '48ch' }}>
              Website, offer catalog, Stripe-test booking flow, media kit, link-in-bio, creator
              dashboard, carte + QR, legal stubs, and customization README — the template for every
              niche we add next.
            </p>
            <div className="home-hero__ctas" style={{ marginTop: '1.25rem' }}>
              <Link className="btn" to="/portfolios/influencers">
                Enter portfolio
              </Link>
              <Link className="btn btn-secondary" to="/contact">
                Consulting / contact
              </Link>
            </div>
          </div>
          <Photo src={images.phone.src} alt={images.phone.alt} ratio="4/3" />
        </div>
      </section>

      <section className="section">
        <div className="container panel" style={{ padding: '1.75rem' }}>
          <p className="label">Studio</p>
          <p style={{ margin: 0, maxWidth: '60ch' }}>
            Short version: we are {brand.name}. Email{' '}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>. Markets:{' '}
            {brand.targetMarkets.slice(0, 6).join(', ')}…
          </p>
        </div>
      </section>
    </>
  )
}
