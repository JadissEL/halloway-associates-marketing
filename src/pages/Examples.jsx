import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import { Portrait } from '../components/Photo'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import '../components/Photo.css'

const cases = [
  {
    title: 'Atelier Coupe — salon',
    city: 'Quartier centre',
    before: 'Bio Instagram + SMS. Appels manqués le samedi.',
    after: 'Site + demandes de créneaux. Lien partagé en story et sur la vitrine.',
    demo: '/demos/salon',
    sticker: 'sticker-pink',
    photo: images.niches.salon.src,
    portrait: images.niches.salon.portrait,
    person: 'Léa M.',
    role: 'Gérante',
  },
  {
    title: 'Café des Arcades',
    city: 'Centre-ville',
    before: 'Facebook page morte, menu PDF illisible sur mobile.',
    after: 'Page claire, horaires, réservation de table, Google-ready.',
    demo: '/demos/cafe',
    sticker: 'sticker-lime',
    photo: images.niches.cafe.src,
    portrait: images.niches.cafe.portrait,
    person: 'Sofia R.',
    role: 'Propriétaire',
  },
  {
    title: 'Cabinet Lemaire',
    city: 'Périphérie affaires',
    before: 'Site WordPress lourd, formulaire cassé.',
    after: 'Présence sobre, prise de RDV discrète, confiance immédiate.',
    demo: '/demos/avocat',
    sticker: 'sticker-violet',
    photo: images.niches.avocat.src,
    portrait: images.niches.avocat.portrait,
    person: 'Thomas L.',
    role: 'Avocat',
  },
  {
    title: 'FlashCourse Livraison',
    city: 'Zone urbaine',
    before: 'WhatsApp seul, zéro crédibilité pour les commerces partenaires.',
    after: 'Page pro + formulaire devis. Utilisée en signature mail.',
    demo: '/demos/livreur',
    sticker: 'sticker-pink',
    photo: images.niches.livreur.src,
    portrait: images.niches.livreur.portrait,
    person: 'Karim B.',
    role: 'Fondateur',
  },
  {
    title: 'Maya — créatrice',
    city: `En ligne + ${brand.city}`,
    before: 'Linktree saturé, collabs perdues dans les DMs.',
    after: 'Offres payantes (collab, guidance, meets) + media kit — DMs filtrés.',
    demo: '/demos/createur',
    sticker: 'sticker-lime',
    photo: images.niches.createur.src,
    portrait: images.niches.createur.portrait,
    person: 'Maya D.',
    role: 'Créatrice',
  },
]

export default function Examples() {
  return (
    <>
      <Seo
        title={`Exemples | ${brand.name}`}
        description="Études de cas réalistes et démos niche pour salons, cafés, cabinets."
      />
      <section className="section">
        <div className="container">
          <p className="label">Preuves</p>
          <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>Exemples & niches</h1>
          <p style={{ maxWidth: '50ch', marginTop: '0.75rem' }}>
            Cas fictifs mais réalistes — photos de métiers réels, démos cliquables.
          </p>

          <div className="grid-2" style={{ marginTop: '2rem' }}>
            {cases.map((c) => (
              <article key={c.title} className="panel case-card">
                <div className="case-card__media">
                  <img src={c.photo} alt="" />
                </div>
                <div className="case-card__body">
                  <div className="case-card__person">
                    <Portrait src={c.portrait} alt={`Portrait — ${c.person}`} />
                    <div>
                      <strong>{c.person}</strong>
                      <p className="mono" style={{ margin: 0, fontSize: '0.8rem' }}>{c.role}</p>
                    </div>
                    <span className={`sticker ${c.sticker}`} style={{ marginLeft: 'auto' }}>{c.city}</span>
                  </div>
                  <h2 className="display" style={{ fontSize: '1.5rem' }}>{c.title}</h2>
                  <p><strong>Avant :</strong> {c.before}</p>
                  <p><strong>Après :</strong> {c.after}</p>
                  <Link to={c.demo}>Voir la démo →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
