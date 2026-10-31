import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Photo from '../components/Photo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import '../components/Photo.css'

const steps = [
  {
    n: '01',
    title: 'Audit',
    text: '15 minutes : site, Google, Instagram. On liste 3 freins concrets à la conversion.',
    icon: 'search',
  },
  {
    n: '02',
    title: 'Build',
    text: 'Brief rapide (logo, services, horaires). On assemble un kit adapté à votre niche.',
    icon: 'build',
  },
  {
    n: '03',
    title: 'Launch',
    text: 'Relecture, mise en ligne, QR + carte, textes Google Business. Vous partagez le lien.',
    icon: 'launch',
  },
  {
    n: '04',
    title: 'Care',
    text: 'Option mensuelle : petites retouches, nouveaux services, textes saisonniers.',
    icon: 'care',
  },
]

export default function HowItWorks() {
  return (
    <>
      <Seo
        title={`Méthode | ${brand.name}`}
        description="Audit → Build → Launch → Care. Une usine MVP pour commerces locaux."
      />
      <section className="section">
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <p className="label">Process</p>
              <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>Comment ça marche</h1>
              <p style={{ maxWidth: '48ch', marginTop: '0.75rem' }}>
                Pas une agence opaque. Un parcours clair, des livrables tangibles, {brand.promiseDays}.
              </p>
            </div>
            <Photo src={images.audit.src} alt={images.audit.alt} ratio="4/3" />
          </div>

          <div className="grid-2">
            {steps.map((s) => (
              <article key={s.n} className="panel" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <span className="lp-icon-badge" aria-hidden>
                    <Icon name={s.icon} size={20} />
                  </span>
                  <p className="mono" style={{ fontSize: '1.1rem', margin: 0 }}>{s.n}</p>
                </div>
                <h2 className="display" style={{ fontSize: '1.85rem', marginTop: '0.75rem' }}>{s.title}</h2>
                <p style={{ marginTop: '0.75rem' }}>{s.text}</p>
              </article>
            ))}
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link className="btn" to="/audit">Démarrer par l’audit</Link>
            <Link className="btn btn-secondary" to="/intake">Déjà client ? Brief intake</Link>
          </div>
        </div>
      </section>
    </>
  )
}
