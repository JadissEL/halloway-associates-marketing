import Seo from '../components/Seo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { DemoTopbar, DemoBooking, DemoWantThis } from './DemoShell'
import '../components/Photo.css'

const services = [
  { name: 'Coupe homme', price: 'à partir de 25 €', icon: 'scissors' },
  { name: 'Coupe + barbe', price: 'à partir de 35 €', icon: 'scissors' },
  { name: 'Coloration', price: 'sur devis', icon: 'check' },
  { name: 'Brushing', price: 'à partir de 28 €', icon: 'check' },
  { name: 'Soin cheveux', price: 'à partir de 20 €', icon: 'care' },
  { name: 'Enfant', price: 'à partir de 18 €', icon: 'scissors' },
]

export default function SalonDemo() {
  const hero = images.niches.salon
  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#c9b8c4' }}>
      <Seo title={`Atelier Coupe — démo salon | ${brand.name}`} description="Démo site salon / barbier avec réservation." />
      <DemoTopbar name="Salon / barbier" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-pink">Ouvert Mar–Sam</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>Atelier Coupe</h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '32ch' }}>
                Coupe, barbe, couleur — réservez en ligne, sans jouer au téléphone.
              </p>
              <p className="mono">12 rue des Lilas · {brand.city} · {brand.phone}</p>
            </div>
            <DemoBooking title="Réserver un créneau" />
          </div>
        </div>
      </header>
      <section className="demo-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <img
            src={hero.portrait}
            alt="Portrait styliste"
            width={56}
            height={56}
            style={{ objectFit: 'cover', border: '2px solid var(--lp-ink)' }}
          />
          <div>
            <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>Services</h2>
            <p className="mono" style={{ margin: 0 }}>Avec Léa — styliste</p>
          </div>
        </div>
        <div className="demo-services">
          {services.map((s) => (
            <article key={s.name} className="demo-card">
              <span className="lp-icon-badge" aria-hidden><Icon name={s.icon} size={18} /></span>
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
