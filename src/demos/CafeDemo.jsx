import Seo from '../components/Seo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { DemoTopbar, DemoBooking, DemoWantThis } from './DemoShell'
import '../components/Photo.css'

const menu = [
  { name: 'Espresso', price: '2,50 €' },
  { name: 'Cappuccino', price: '3,80 €' },
  { name: 'Formule déjeuner', price: '14 €' },
  { name: 'Pâtisserie du jour', price: '4,50 €' },
  { name: 'Brunch week-end', price: '22 €' },
  { name: 'Thé signature', price: '4 €' },
]

export default function CafeDemo() {
  const hero = images.niches.cafe
  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#b7c4b0' }}>
      <Seo title={`Café des Arcades — démo | ${brand.name}`} description="Démo café / restaurant réservable." />
      <DemoTopbar name="Café / restaurant" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-lime">Table & à emporter</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>Café des Arcades</h1>
              <p style={{ fontSize: '1.2rem', maxWidth: '34ch' }}>
                Café de quartier, cuisine simple, horaires clairs — réservez votre table en un tap.
              </p>
              <p className="mono">Lun–Dim 8h–19h · Place du Marché · {brand.city}</p>
            </div>
            <DemoBooking title="Réserver une table" />
          </div>
        </div>
      </header>
      <section className="demo-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <img
            src={hero.portrait}
            alt="Portrait barista"
            width={56}
            height={56}
            style={{ objectFit: 'cover', border: '2px solid var(--lp-ink)' }}
          />
          <div>
            <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>Carte</h2>
            <p className="mono" style={{ margin: 0 }}>Préparé par Sofia</p>
          </div>
        </div>
        <div className="demo-services">
          {menu.map((s) => (
            <article key={s.name} className="demo-card">
              <span className="lp-icon-badge" aria-hidden><Icon name="cup" size={18} /></span>
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
