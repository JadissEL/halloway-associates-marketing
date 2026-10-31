import { Fragment, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Seo from '../components/Seo'
import Photo from '../components/Photo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import {
  allNiches,
  nicheCategories,
  getFlagshipNiche,
  getNichesByCategory,
  categoryLabel,
} from '../lib/niches'
import '../components/Photo.css'
import './WhoFor.css'

export default function WhoFor() {
  const flagship = getFlagshipNiche()
  const [category, setCategory] = useState('all')
  const [q, setQ] = useState('')
  const [openId, setOpenId] = useState(null)

  const filtered = useMemo(() => {
    let list = getNichesByCategory(category)
    const needle = q.trim().toLowerCase()
    if (needle) {
      list = list.filter((n) => {
        const aiHit = (n.ai_services || []).some(
          (a) =>
            a.name.toLowerCase().includes(needle) ||
            a.name_fr.toLowerCase().includes(needle) ||
            a.plus.toLowerCase().includes(needle) ||
            a.plus_fr.toLowerCase().includes(needle),
        )
        const tpHit = (n.third_party_connections || []).some(
          (t) =>
            t.name.toLowerCase().includes(needle) ||
            t.plus.toLowerCase().includes(needle) ||
            t.plus_fr.toLowerCase().includes(needle),
        )
        return (
          n.name.toLowerCase().includes(needle) ||
          n.name_fr.toLowerCase().includes(needle) ||
          n.how_we_help_fr.toLowerCase().includes(needle) ||
          n.example_offers.some((o) => o.toLowerCase().includes(needle)) ||
          aiHit ||
          tpHit
        )
      })
    }
    return list
  }, [category, q])

  return (
    <>
      <Seo
        title={`Pour qui | ${brand.name}`}
        description={`Influenceurs (flagship), salons, cafés, avocats et 100 niches — Kit présence digitale + consulting.`}
      />
      <section className="section">
        <div className="container">
          <div className="grid-2 who-hero" style={{ alignItems: 'center', marginBottom: '2.5rem' }}>
            <div>
              <p className="label">ICP · 100 niches</p>
              <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>C’est pour vous si…</h1>
              <ul style={{ maxWidth: '48ch', marginTop: '1rem' }}>
                <li>Vous avez déjà des clients, du passage ou une audience</li>
                <li>Site faible / absent, ou présence Instagram seule</li>
                <li>Des demandes se perdent dans les DMs / WhatsApp</li>
                <li>Vous voulez monétiser le temps et paraître sérieux</li>
              </ul>
              <p style={{ marginTop: '1rem', maxWidth: '52ch', color: 'var(--lp-muted)' }}>
                Deux façons de travailler avec {brand.name} : le{' '}
                <strong>{brand.packageName}</strong> (site / apps / booking) et des{' '}
                <strong>sessions de consulting</strong> pour packager et pricer votre offre.
              </p>
            </div>
            <Photo src={images.workspace.src} alt={images.workspace.alt} ratio="4/3" />
          </div>

          {/* Flagship influencers */}
          <article className="panel who-flagship">
            <div className="who-flagship__grid">
              <div>
                <span className="sticker sticker-pink">Flagship</span>
                <h2 className="display" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.35rem)', marginTop: '0.75rem' }}>
                  {flagship.name_fr}
                </h2>
                <p className="label" style={{ marginTop: '0.5rem' }}>Influencers / creators</p>
                <p style={{ marginTop: '1rem', maxWidth: '58ch' }}>
                  Des milliers de DMs peu sérieux. Des community managers juste pour les RDV.
                  Des plateformes payantes alors que l’attention existe déjà. Des opportunités
                  haut de gamme perdues faute de réponse.
                </p>
                <p style={{ marginTop: '0.75rem', maxWidth: '58ch' }}>
                  {brand.name} vous donne un <strong>site / app de marque</strong> où les gens{' '}
                  <strong>paient pour accéder à votre temps</strong> : collabs, guidance, meets,
                  leçons, packs 1:1 — avec intake et calendrier professionnels.
                </p>
                <ul className="who-flagship__outcomes">
                  <li>Filtrer le bruit via booking / demandes structurées</li>
                  <li>Moins de dépendance aux inbox managers en première ligne</li>
                  <li>Monétiser l’audience existante sous votre marque</li>
                  <li>Consulting optionnel : packager et pricer votre temps</li>
                </ul>
                <div className="who-flagship__addons">
                  <p className="label">
                    Sur la plateforme · {(flagship.ai_services || []).length} IA ·{' '}
                    {(flagship.third_party_connections || []).length} connexions
                  </p>
                  <div className="who-addon-grid who-addon-grid--compact">
                    <ul className="who-addon-list">
                      {(flagship.ai_services || []).slice(0, 4).map((a) => (
                        <li key={a.id}>
                          <strong>{a.name_fr}</strong>
                          <span>{a.plus_fr}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="who-addon-list">
                      {(flagship.third_party_connections || []).slice(0, 4).map((t) => (
                        <li key={t.id}>
                          <strong>{t.name}</strong>
                          <span>{t.plus_fr}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="mono" style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>
                    Liste complète dans la bibliothèque ci-dessous (ligne Influenceurs).
                  </p>
                </div>
                <div className="who-flagship__ctas">
                  <Link className="btn" to="/audit">Audit créateur — 15 min</Link>
                  <Link className="btn btn-secondary" to="/portfolios/influencers">Ouvrir le kit flagship</Link>
                  <Link className="btn btn-secondary" to="/offre">Kit + consulting</Link>
                </div>
              </div>
              <Photo
                src={images.niches.createur.src}
                alt={images.niches.createur.alt}
                ratio="4/5"
                objectPosition="center top"
              />
            </div>
          </article>

          <div className="who-markets" style={{ margin: '2rem 0 2.5rem' }}>
            <p className="label">Beachhead · première vague</p>
            <p style={{ maxWidth: '62ch', marginTop: '0.5rem' }}>
              <strong>
                {brand.cityEn}, {brand.hqCountry}
              </strong>{' '}
              · niche {brand.beachhead?.niche_label || 'Influencers'} · langues outreach (quand
              déverrouillé) : {(brand.beachhead?.outreach_languages || ['en', 'el']).join(' + ').toUpperCase()}
              . Actif : {(brand.targetMarketsActive || ['Greece']).join(' · ')}.
            </p>
            <p style={{ maxWidth: '62ch', marginTop: '0.5rem', color: 'var(--lp-muted)' }}>
              Marchés <strong>plus tard</strong> (pas actifs) :{' '}
              {(brand.targetMarketsLater || []).join(' · ')}.
            </p>
          </div>

          {/* Beachhead strip */}
          <div className="who-beachhead">
            <p className="label">Beachheads locaux (exemples)</p>
            <div className="who-beachhead__row">
              {[
                { id: 'salon', label: 'Salons & barbiers', to: '/demos/salon', icon: 'scissors' },
                { id: 'cafe', label: 'Cafés & restos', to: '/demos/cafe', icon: 'cup' },
                { id: 'avocat', label: 'Avocats', to: '/demos/avocat', icon: 'scale' },
                { id: 'livreur', label: 'Coursiers', to: '/demos/livreur', icon: 'van' },
              ].map((b) => (
                <Link key={b.id} className="panel-soft who-beachhead__card" to={b.to}>
                  <span className="lp-icon-badge" aria-hidden>
                    <Icon name={b.icon} size={18} />
                  </span>
                  <span>{b.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Browse 100 */}
          <div className="who-library">
            <div className="who-library__head">
              <div>
                <p className="label">Bibliothèque ICP</p>
                <h2 className="display" style={{ fontSize: 'var(--text-2xl)' }}>
                  {allNiches.length} métiers — filtrables
                </h2>
                <p style={{ color: 'var(--lp-muted)', maxWidth: '56ch' }}>
                  Pour chaque métier : kit digital + <strong>services IA</strong> possibles +{' '}
                  <strong>connexions tierces</strong> (paiements, calendrier, login…) — et le{' '}
                  <em>plus business</em> de chaque ajout. Cliquez une ligne pour détail.
                </p>
              </div>
              <input
                className="who-library__search"
                type="search"
                placeholder="Niche, IA, Stripe, calendrier…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                aria-label="Rechercher une niche ou un add-on"
              />
            </div>

            <div className="who-library__filters" role="tablist" aria-label="Catégories">
              <button
                type="button"
                className={category === 'all' ? 'is-active' : ''}
                onClick={() => setCategory('all')}
              >
                Toutes ({allNiches.length})
              </button>
              {nicheCategories.map((c) => {
                const count = allNiches.filter((n) => n.category === c.id).length
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={category === c.id ? 'is-active' : ''}
                    onClick={() => setCategory(c.id)}
                  >
                    {c.label_fr} ({count})
                  </button>
                )
              })}
            </div>

            <div className="who-library__table-wrap">
              <table className="who-library__table">
                <thead>
                  <tr>
                    <th>Niche</th>
                    <th>Catégorie</th>
                    <th>Comment on aide</th>
                    <th>IA / connexions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((n) => {
                    const open = openId === n.id
                    const aiCount = n.ai_services?.length || 0
                    const tpCount = n.third_party_connections?.length || 0
                    return (
                      <Fragment key={n.id}>
                        <tr
                          data-priority={n.priority_flag}
                          className={open ? 'is-open' : ''}
                          style={{ cursor: 'pointer' }}
                          onClick={() => setOpenId(open ? null : n.id)}
                        >
                          <td>
                            <strong>{n.name_fr}</strong>
                            {n.priority_flag === 'flagship' && (
                              <span className="sticker sticker-pink" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>
                                Flagship
                              </span>
                            )}
                            {n.priority_flag === 'beachhead' && (
                              <span className="sticker sticker-lime" style={{ marginLeft: '0.5rem', fontSize: '0.65rem' }}>
                                Beachhead
                              </span>
                            )}
                            <div className="mono" style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                              {n.name}
                            </div>
                          </td>
                          <td>{categoryLabel(n.category)}</td>
                          <td>{n.how_we_help_fr}</td>
                          <td>
                            <span className="mono" style={{ fontSize: '0.8rem' }}>
                              {aiCount} IA · {tpCount} connexions {open ? '▲' : '▼'}
                            </span>
                          </td>
                        </tr>
                        {open ? (
                          <tr className="who-library__detail">
                            <td colSpan={4}>
                              <div className="who-addon-grid">
                                <div>
                                  <p className="label">Services IA sur leur plateforme</p>
                                  <ul className="who-addon-list">
                                    {(n.ai_services || []).map((a) => (
                                      <li key={a.id}>
                                        <strong>{a.name_fr}</strong>
                                        <span>{a.plus_fr}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <p className="label">Connexions tierces</p>
                                  <ul className="who-addon-list">
                                    {(n.third_party_connections || []).map((t) => (
                                      <li key={t.id}>
                                        <strong>{t.name}</strong>
                                        <span>{t.plus_fr}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                              <p className="mono" style={{ fontSize: '0.75rem', marginTop: '0.75rem' }}>
                                Offres type : {n.example_offers.slice(0, 4).join(' · ')}
                              </p>
                            </td>
                          </tr>
                        ) : null}
                      </Fragment>
                    )
                  })}
                </tbody>
              </table>
              {!filtered.length && (
                <p className="who-library__empty">Aucun résultat — élargissez le filtre.</p>
              )}
            </div>
          </div>

          <p style={{ marginTop: '2rem' }}>
            <Link className="btn" to="/audit">Audit gratuit pour mon activité</Link>
          </p>
        </div>
      </section>
    </>
  )
}
