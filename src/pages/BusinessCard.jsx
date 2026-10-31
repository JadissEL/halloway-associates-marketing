import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import Seo from '../components/Seo'
import { Portrait } from '../components/Photo'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import './BusinessCard.css'
import '../components/Photo.css'

export default function BusinessCard() {
  const canvasRef = useRef(null)
  const [url, setUrl] = useState('')

  useEffect(() => {
    const target = brand.absoluteUrl('/audit')
    setUrl(target)
    if (canvasRef.current) {
      QRCode.toCanvas(canvasRef.current, target, {
        width: 160,
        margin: 1,
        color: { dark: '#1A1A2E', light: '#F7F3EB' },
      })
    }
  }, [])

  return (
    <>
      <Seo
        title={`Carte de visite | ${brand.name}`}
        description="Carte digitale + version print 85×55 mm avec QR vers l’audit."
      />
      <section className="section">
        <div className="container">
          <p className="label">Carte de visite</p>
          <h1 className="display" style={{ fontSize: 'var(--text-3xl)' }}>Digitale & print</h1>
          <p style={{ maxWidth: '48ch' }}>
            Partagez cette page. Pour le print : ouvrez « Version imprimable » → Imprimer → PDF
            (format 85×55 mm).
          </p>

          <div className="card-digital panel" style={{ marginTop: '2rem' }}>
            <div className="card-digital__front">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Portrait src={images.founder.src} alt={images.founder.alt} />
                <img src="/logo.svg" alt="" width={40} height={40} style={{ border: '2px solid var(--lp-ink)' }} />
              </div>
              <h2 className="display" style={{ marginTop: '1rem' }}>{brand.name}</h2>
              <p>{brand.tagline}</p>
              <p className="mono" style={{ marginTop: '1rem' }}>
                {brand.founderName} · Founder
              </p>
            </div>
            <div className="card-digital__back">
              {brand.phone ? <p className="mono">{brand.phone}</p> : null}
              <p className="mono">{brand.email}</p>
              {brand.instagram ? <p className="mono">{brand.instagram}</p> : null}
              <p className="mono">{url || brand.absoluteUrl('/audit')}</p>
              <canvas ref={canvasRef} className="card-qr" aria-label="QR code audit" />
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a className="btn" href="/card/print.html" target="_blank" rel="noreferrer">
              Version imprimable 85×55 mm
            </a>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigator.clipboard?.writeText(window.location.href)}
            >
              Copier le lien carte
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
