import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Photo from '../components/Photo'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import '../components/Photo.css'

export default function About() {
  return (
    <>
      <Seo
        title={`À propos | ${brand.name}`}
        description={`${brand.origin}. ${brand.missionFr}`}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <p className="label">Studio</p>
          <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>À propos</h1>

          <div className="about-photo-row">
            <Photo
              src={images.founder.src}
              alt={images.founder.alt}
              ratio="1/1"
              objectPosition="center top"
            />
            <div>
              <p style={{ fontSize: '1.15rem' }}>
                <strong>{brand.name}</strong> est une {brand.origin.toLowerCase()} fondée par{' '}
                <strong>{brand.founderName}</strong> ({brand.city}).
              </p>
              <p>
                Mission : {brand.missionFr}. We ship <strong>Niche Digital Portfolios</strong>{' '}
                (Influencers live) plus consulting — not a brochure-first agency site.
              </p>
              <p>
                <Link to="/portfolios/influencers">Open influencer kit →</Link>
              </p>
              <p className="mono" style={{ fontSize: '0.85rem', color: 'var(--lp-muted)' }}>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
                {' · '}
                <a href={brand.siteUrl}>{brand.siteUrl.replace(/^https:\/\//, '')}</a>
              </p>
            </div>
          </div>

          <p>{brand.pitch}</p>
          <blockquote
            className="panel"
            style={{ padding: '1.25rem', margin: '2rem 0', fontFamily: 'var(--font-display)', fontSize: '1.35rem' }}
          >
            « Une bio Instagram n’est pas un site. Les clients appellent, puis oublient. »
          </blockquote>

          <Photo src={images.meeting.src} alt={images.meeting.alt} ratio="21/9" />
          <p style={{ marginTop: '1.5rem' }}>
            <Link className="btn" to="/contact">Parler au studio</Link>
          </p>
        </div>
      </section>
    </>
  )
}
