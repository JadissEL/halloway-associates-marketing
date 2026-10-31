import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import LeadForm from '../components/LeadForm'
import Photo from '../components/Photo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import '../components/Photo.css'

export default function Contact() {
  const wa = (brand.phone || '').replace(/[^\d+]/g, '')
  const ig = (brand.instagram || '').replace('@', '')
  const calUrl = (import.meta.env.VITE_CAL_URL || '').trim()
  return (
    <>
      <Seo
        title={`Contact | ${brand.name}`}
        description={`Écrivez à ${brand.email}. Audit gratuit 15 minutes — ${brand.siteUrl}`}
      />
      <section className="section">
        <div className="container grid-2">
          <div>
            <p className="label">Contact</p>
            <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>Écrivons-nous</h1>
            <div style={{ margin: '1.25rem 0' }}>
              <Photo
                src={images.founder.src}
                alt={images.founder.alt}
                ratio="1/1"
                objectPosition="center top"
                className="contact-founder"
              />
            </div>
            <p>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Icon name="check" size={16} /> Email :
              </span>{' '}
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
              <br />
              Site :{' '}
              <a href={brand.siteUrl} target="_blank" rel="noreferrer">
                {brand.siteUrl.replace(/^https:\/\//, '')}
              </a>
              {brand.phone ? (
                <>
                  <br />
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                    <Icon name="phone" size={16} /> Tél / WhatsApp :
                  </span>{' '}
                  <a href={`tel:${brand.phone}`}>{brand.phone}</a>
                </>
              ) : null}
              {ig ? (
                <>
                  <br />
                  Instagram :{' '}
                  <a href={`https://instagram.com/${ig}`}>{brand.instagram}</a>
                </>
              ) : null}
            </p>
            <p className="panel-soft" style={{ padding: '1rem', marginTop: '1.25rem' }}>
              <span className="label">Calendrier</span>
              <br />
              {calUrl ? (
                <a className="btn btn-secondary" href={calUrl} target="_blank" rel="noreferrer" style={{ marginTop: '0.75rem' }}>
                  Réserver un créneau (Cal.com)
                </a>
              ) : (
                <>Placeholder — set <code>VITE_CAL_URL</code> (Cal.com free). En attendant : audit via formulaire.</>
              )}
            </p>
            {wa ? (
              <p style={{ marginTop: '1rem' }}>
                <a
                  className="btn btn-secondary"
                  href={`https://wa.me/${wa}?text=${encodeURIComponent(`Bonjour, je souhaite un audit ${brand.name}.`)}`}
                >
                  WhatsApp
                </a>
              </p>
            ) : null}
            <p style={{ marginTop: '1.5rem' }}>
              <Link to="/audit">Préférez la page audit dédiée →</Link>
            </p>
          </div>
          <LeadForm type="contact" submitLabel="Envoyer le message" />
        </div>
      </section>
    </>
  )
}
