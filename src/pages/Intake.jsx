import Seo from '../components/Seo'
import IntakeForm from '../components/IntakeForm'
import Photo from '../components/Photo'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import '../components/Photo.css'

export default function Intake() {
  return (
    <>
      <Seo
        title={`Brief client (intake) | ${brand.name}`}
        description={`Formulaire d’intake : logo, services, horaires, couleurs — pour démarrer votre ${brand.packageName}.`}
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 900 }}>
          <div className="grid-2" style={{ alignItems: 'center', marginBottom: '1.75rem' }}>
            <div>
              <p className="label">Parcours client</p>
              <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>Brief d’intake</h1>
              <p style={{ marginTop: '0.75rem' }}>
                Après accord, ce formulaire collecte logo, photos, services et horaires
                pour construire et lancer.
              </p>
            </div>
            <Photo src={images.workspace.src} alt={images.workspace.alt} ratio="4/3" />
          </div>
          <IntakeForm />
        </div>
      </section>
    </>
  )
}
