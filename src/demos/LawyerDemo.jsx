import Seo from '../components/Seo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { DemoTopbar, DemoBooking, DemoWantThis } from './DemoShell'
import '../components/Photo.css'

const areas = [
  { name: 'Droit des affaires', price: 'Consultation sur RDV' },
  { name: 'Droit de la famille', price: 'Consultation sur RDV' },
  { name: 'Immobilier', price: 'Consultation sur RDV' },
  { name: 'Conseil entreprises', price: 'Forfait possible' },
]

export default function LawyerDemo() {
  const hero = images.niches.avocat
  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#aeb6c9' }}>
      <Seo title={`Cabinet Lemaire — démo avocat | ${brand.name}`} description="Démo cabinet d’avocat sober et bookable." />
      <DemoTopbar name="Cabinet d’avocat" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-violet">Cabinet indépendant</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>Cabinet Lemaire</h1>
              <p style={{ fontSize: '1.15rem', maxWidth: '36ch' }}>
                Une présence claire et digne de confiance. Demandez un premier entretien
                sans formulaire cassé ni site daté.
              </p>
              <p className="mono">Sur rendez-vous · {brand.city} · {brand.email}</p>
            </div>
            <DemoBooking title="Demander un entretien" />
          </div>
        </div>
      </header>
      <section className="demo-section">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <img
            src={hero.portrait}
            alt="Portrait avocat"
            width={56}
            height={56}
            style={{ objectFit: 'cover', border: '2px solid var(--lp-ink)' }}
          />
          <div>
            <h2 className="display" style={{ fontSize: '2rem', margin: 0 }}>Domaines</h2>
            <p className="mono" style={{ margin: 0 }}>Me Thomas Lemaire</p>
          </div>
        </div>
        <div className="demo-services">
          {areas.map((s) => (
            <article key={s.name} className="demo-card">
              <span className="lp-icon-badge" aria-hidden><Icon name="scale" size={18} /></span>
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
