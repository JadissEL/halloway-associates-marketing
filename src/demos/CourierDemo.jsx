import Seo from '../components/Seo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { DemoTopbar, DemoBooking, DemoWantThis } from './DemoShell'
import '../components/Photo.css'

const offers = [
  { name: 'Course urbaine', price: 'à partir de 12 €' },
  { name: 'Livraison commerces', price: 'forfait jour' },
  { name: 'Devis express', price: 'réponse sous 2 h' },
  { name: 'Zone étendue', price: 'sur devis' },
]

export default function CourierDemo() {
  const hero = images.niches.livreur
  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#b8c0c9' }}>
      <Seo title={`FlashCourse — démo livreur | ${brand.name}`} description="Démo page livreur / coursier avec devis." />
      <DemoTopbar name="Livreur / coursier" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-pink">B2B & particuliers</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>FlashCourse</h1>
              <p style={{ fontSize: '1.15rem', maxWidth: '34ch' }}>
                Livraison pro, devis en un tap — une page crédible pour vos partenaires commerces.
              </p>
              <p className="mono">{brand.city} · {brand.phone}</p>
            </div>
            <DemoBooking title="Demander un devis" />
          </div>
        </div>
      </header>
      <section className="demo-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <img
            src={hero.portrait}
            alt="Portrait livreur"
            width={56}
            height={56}
            style={{ objectFit: 'cover', border: '2px solid var(--lp-ink)' }}
          />
          <div>
            <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>Offres</h2>
            <p className="mono" style={{ margin: 0 }}>Karim — fondateur</p>
          </div>
        </div>
        <div className="demo-services">
          {offers.map((s) => (
            <article key={s.name} className="demo-card">
              <span className="lp-icon-badge" aria-hidden><Icon name="van" size={18} /></span>
              <h3 className="display" style={{ fontSize: '1.35rem', marginTop: '0.65rem' }}>{s.name}</h3>
              <p className="mono">{s.price}</p>
            </article>
          ))}
        </div>
      </section>
      <DemoWantThis />
    </div>
  )
}
