import { useEffect, useMemo, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { brand } from '../../../lib/brand'
import { creator } from '../data'

export default function InfluencerCard() {
  const canvasRef = useRef(null)
  const [copied, setCopied] = useState(false)

  const bookUrl = useMemo(() => {
    if (typeof window !== 'undefined' && window.location?.origin) {
      return `${window.location.origin}/portfolios/influencers/offers`
    }
    return `${brand.siteUrl}/portfolios/influencers/offers`
  }, [])

  useEffect(() => {
    if (!canvasRef.current) return
    QRCode.toCanvas(canvasRef.current, bookUrl, {
      width: 96,
      margin: 1,
      color: { dark: '#12121a', light: '#ffffff' },
    }).catch(() => {})
  }, [bookUrl])

  async function copyDigital() {
    try {
      await navigator.clipboard.writeText(bookUrl)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <main className="inf-wrap inf-section">
      <p className="inf-label">Business card</p>
      <h1 className="display" style={{ fontSize: '2rem', margin: 0 }}>
        A card people can actually use
      </h1>
      <p style={{ color: 'var(--inf-muted)', maxWidth: '48ch' }}>
        Print it, or share the link. The QR opens my booking page.
      </p>

      <div className="inf-grid inf-grid--2" style={{ marginTop: '1.5rem', alignItems: 'start' }}>
        <div className="inf-card-print">
          <div>
            <p className="inf-label" style={{ margin: 0 }}>
              {creator.handle}
            </p>
            <h2 className="display" style={{ fontSize: '1.75rem', margin: '0.25rem 0' }}>
              {creator.name}
            </h2>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>{creator.tagline}</p>
            <p className="inf-price" style={{ marginTop: '0.75rem' }}>
              Book → {bookUrl.replace(/^https?:\/\//, '')}
            </p>
          </div>
          <canvas ref={canvasRef} className="qr" aria-label="QR code to booking" />
        </div>

        <div className="inf-card">
          <p className="inf-label">Share</p>
          <h2 className="display" style={{ fontSize: '1.35rem' }}>
            Link for phones
          </h2>
          <p style={{ color: 'var(--inf-muted)', wordBreak: 'break-all' }}>{bookUrl}</p>
          <div className="inf-actions" style={{ marginTop: '0.75rem' }}>
            <button type="button" className="inf-btn" onClick={copyDigital}>
              {copied ? 'Copied' : 'Copy link'}
            </button>
            <a className="inf-btn inf-btn--ghost" href={bookUrl}>
              Open offers
            </a>
          </div>
        </div>
      </div>

      <div className="inf-actions inf-no-print" style={{ marginTop: '1.25rem' }}>
        <button type="button" className="inf-btn inf-btn--lime" onClick={() => window.print()}>
          Print / save PDF
        </button>
      </div>
    </main>
  )
}
