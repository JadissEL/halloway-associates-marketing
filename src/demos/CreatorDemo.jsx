import { useState } from 'react'
import Seo from '../components/Seo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { DemoTopbar, DemoWantThis } from './DemoShell'
import '../components/Photo.css'

const offers = [
  { name: 'Demande de collab marque', price: 'à partir de 150 €', note: 'Brief structuré — filtre les non-sérieux', icon: 'camera' },
  { name: 'Session guidance 45 min', price: '120 €', note: 'Conseil 1:1 sur votre niche', icon: 'check' },
  { name: 'Meet & greet / café', price: '80 €', note: 'Créneau limité, paiement avant', icon: 'calendar' },
  { name: 'Leçon / tutoriel privé', price: 'à partir de 90 €', note: 'Objectif + niveau en intake', icon: 'launch' },
  { name: 'Pack mentoring 4 semaines', price: 'sur devis', note: 'Consulting packaging inclus optionnel', icon: 'care' },
  { name: 'Media kit + brief sponsor', price: 'inclus page', note: 'Preuves, niches, CTA unique', icon: 'search' },
]

export default function CreatorDemo() {
  const hero = images.niches.createur
  const [ok, setOk] = useState(false)

  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#b8a9c4' }}>
      <Seo
        title={`Maya Studio — démo créateur | ${brand.name}`}
        description="Démo influenceur : offres payantes, booking collab, moins de DMs."
      />
      <DemoTopbar name="Créateur / influenceur" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-pink">Flagship niche</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>Maya Studio</h1>
              <p style={{ fontSize: '1.15rem', maxWidth: '34ch' }}>
                Collabs, guidance, meets et leçons — payés et structurés.
                Plus de DMs qui volent votre journée.
              </p>
              <p className="mono">
                {brand.name} · {brand.siteUrl.replace(/^https?:\/\//, '')}
              </p>
            </div>
            <form
              className="demo-card demo-form"
              onSubmit={(e) => {
                e.preventDefault()
                setOk(true)
              }}
            >
              {ok ? (
                <div className="form-status success">
                  <p className="label">Demande reçue</p>
                  <p>Merci — créneau / brief confirmé (démo). Les non-sérieux ne passent plus sans paiement / formulaire.</p>
                </div>
              ) : (
                <>
                  <h3 className="display" style={{ fontSize: '1.35rem' }}>Réserver / demander</h3>
                  <input required name="name" placeholder="Votre nom / marque" />
                  <input required name="email" type="email" placeholder="Email pro" />
                  <select name="offer" defaultValue="" required>
                    <option value="" disabled>Type d’accès</option>
                    <option>Collab marque</option>
                    <option>Guidance 45 min</option>
                    <option>Meet & greet</option>
                    <option>Leçon privée</option>
                    <option>Pack mentoring</option>
                  </select>
                  <textarea name="brief" rows={3} placeholder="Brief (budget, dates, objectif)" required />
                  <p className="mono" style={{ fontSize: '0.75rem', margin: 0 }}>
                    Démo : en prod, acompte / paiement avant confirmation.
                  </p>
                  <button className="btn" type="submit">Envoyer la demande</button>
                </>
              )}
            </form>
          </div>
        </div>
      </header>
      <section className="demo-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <img
            src={hero.portrait}
            alt="Portrait créatrice"
            width={56}
            height={56}
            style={{ objectFit: 'cover', border: '2px solid var(--lp-ink)' }}
          />
          <div>
            <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>Offres payantes</h2>
            <p className="mono" style={{ margin: 0 }}>Accès au temps — pas à l’inbox</p>
          </div>
        </div>
        <div className="demo-services">
          {offers.map((s) => (
            <article key={s.name} className="demo-card">
              <span className="lp-icon-badge" aria-hidden><Icon name={s.icon} size={18} /></span>
              <h3 className="display" style={{ fontSize: '1.25rem', marginTop: '0.65rem' }}>{s.name}</h3>
              <p className="mono">{s.price}</p>
              <p style={{ fontSize: '0.9rem', color: 'var(--lp-muted)', marginTop: '0.35rem' }}>{s.note}</p>
            </article>
          ))}
        </div>
      </section>
      <DemoWantThis />
    </div>
  )
}
