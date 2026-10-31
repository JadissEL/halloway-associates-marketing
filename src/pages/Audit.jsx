import Seo from '../components/Seo'
import LeadForm from '../components/LeadForm'
import Photo from '../components/Photo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import '../components/Photo.css'

export default function Audit() {
  return (
    <>
      <Seo
        title={`Audit gratuit 15 min | ${brand.name}`}
        description="Audit présence en ligne gratuit pour salons, cafés, avocats, livreurs et services locaux."
      />
      <section className="section">
        <div className="container grid-2" style={{ alignItems: 'start' }}>
          <div>
            <span className="sticker sticker-lime anim-stamp">Lead magnet</span>
            <h1 className="display" style={{ fontSize: 'var(--text-3xl)', marginTop: '1rem' }}>
              Audit gratuit 15 minutes
            </h1>
            <p style={{ marginTop: '1rem', fontSize: '1.15rem' }}>
              Je vous montre <strong>3 choses</strong> qui vous coûtent probablement des clients —
              site, Google, Instagram / contact.
            </p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {[
                ['search', 'Adapté à votre niche (salon, café, avocat…)'],
                ['calendar', 'Réponse sous 24 h'],
                ['check', 'Pas de hard sell : observations utiles d’abord'],
              ].map(([icon, text]) => (
                <li key={text} style={{ display: 'flex', gap: '0.65rem', alignItems: 'center', marginBottom: '0.55rem' }}>
                  <span className="lp-icon-badge" style={{ width: 34, height: 34 }} aria-hidden>
                    <Icon name={icon} size={16} />
                  </span>
                  {text}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '1.25rem' }}>
              <Photo src={images.audit.src} alt={images.audit.alt} ratio="16/10" />
            </div>
            <p className="mono" style={{ marginTop: '1rem' }}>
              Zone : {brand.city}
            </p>
          </div>
          <LeadForm type="audit" submitLabel="Réserver mon audit gratuit" />
        </div>
      </section>
    </>
  )
}
