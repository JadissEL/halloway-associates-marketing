import Seo from '../../components/Seo'
import { brand } from '../../lib/brand'

function Shell({ title, children }) {
  return (
    <>
      <Seo title={`${title} | ${brand.name}`} description={`${title} — ${brand.name}`} />
      <section className="section">
        <div className="container panel" style={{ padding: '2rem', maxWidth: 800 }}>
          <h1 className="display" style={{ fontSize: 'var(--text-2xl)' }}>{title}</h1>
          <div style={{ marginTop: '1.25rem' }}>{children}</div>
        </div>
      </section>
    </>
  )
}

export function MentionsLegales() {
  return (
    <Shell title="Mentions légales">
      <p><strong>Éditeur :</strong> {brand.name} — {brand.founderName}</p>
      <p><strong>Origine :</strong> {brand.origin} · {brand.city}</p>
      <p><strong>Site :</strong> <a href={brand.siteUrl}>{brand.siteUrl}</a></p>
      <p><strong>Contact :</strong> <a href={`mailto:${brand.email}`}>{brand.email}</a>
        {brand.phone ? ` · ${brand.phone}` : ''}
      </p>
      <p><strong>Hébergeur :</strong> Vercel Inc. (ou votre hébergeur)</p>
      <p><strong>SIRET / RCS :</strong> à compléter</p>
      <p>Studio de services numériques (présence digitale & consulting). Pas de marketplace.</p>
    </Shell>
  )
}

export function Confidentialite() {
  return (
    <Shell title="Politique de confidentialité">
      <p>
        Les formulaires (audit, contact, intake) collectent nom, entreprise, coordonnées et
        informations de projet afin de répondre à votre demande.
      </p>
      <p>
        Base légale : intérêt légitime / mesures précontractuelles. Durée : le temps du suivi
        commercial, puis suppression ou archivage limité.
      </p>
      <p>
        Droits RGPD : accès, rectification, effacement — écrivez à {brand.email}.
      </p>
      <p>Pas de revente de données. Analytics : à déclarer si vous en activez.</p>
    </Shell>
  )
}

export function CGV() {
  return (
    <Shell title="Conditions générales de vente">
      <p>
        Prestations de conception de présence digitale ({brand.packageName}), applications,
        sessions de consulting, et options associées (care plan, add-ons).
      </p>
      <p>
        Devis écrit avant engagement. Acompte et solde selon devis. Délai indicatif {brand.promiseDays}
        sous réserve de réception du brief complet.
      </p>
      <p>
        Le client fournit contenus et droits sur les médias. {brand.name} conserve le droit de
        présenter le travail (sauf NDA).
      </p>
      <p>Litiges : droit français. Texte placeholder — faire valider par un conseil.</p>
    </Shell>
  )
}
