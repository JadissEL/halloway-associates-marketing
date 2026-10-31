import Seo from '../components/Seo'
import { brand } from '../lib/brand'

/**
 * Minimal studio bridge for niche share mode.
 * No ICP gallery — commercials must not land prospects on 100 niches.
 */
export default function BuiltBy() {
  return (
    <>
      <Seo
        title={`Built by ${brand.name}`}
        description={`${brand.name} builds niche digital portfolios. Contact ${brand.contactEmail}.`}
      />
      <main
        style={{
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          padding: '2rem',
          background: 'var(--lp-lavender, #b8a9c4)',
          color: 'var(--lp-ink, #1a1a2e)',
          fontFamily: 'Outfit, system-ui, sans-serif',
        }}
      >
        <div
          style={{
            maxWidth: 440,
            width: '100%',
            padding: '2rem',
            background: 'var(--lp-cream, #f7f3eb)',
            border: '3px solid var(--lp-ink, #1a1a2e)',
          }}
        >
          <p
            style={{
              fontSize: '0.72rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              margin: 0,
              opacity: 0.7,
            }}
          >
            Site product
          </p>
          <h1
            style={{
              fontFamily: 'Bodoni Moda, Georgia, serif',
              fontSize: 'clamp(1.75rem, 4vw, 2.25rem)',
              margin: '0.5rem 0',
            }}
          >
            {brand.name}
          </h1>
          <p style={{ lineHeight: 1.5, margin: '0 0 1.25rem' }}>
            We build niche digital portfolios — one métier at a time. You&apos;re looking at a
            sample for a single niche, not our full catalog.
          </p>
          <p style={{ margin: '0 0 1.5rem' }}>
            <a href={`mailto:${brand.contactEmail}`} style={{ fontWeight: 600 }}>
              {brand.contactEmail}
            </a>
          </p>
          <p style={{ fontSize: '0.85rem', opacity: 0.75, margin: 0 }}>
            If you were sent this link by a Halloway commercial, reply to them — or write us above.
          </p>
          {/* Deliberately no link to /kits or /pour-qui */}
          <p style={{ marginTop: '1.5rem', fontSize: '0.8rem' }}>
            <button
              type="button"
              onClick={() => window.history.back()}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                color: 'inherit',
                cursor: 'pointer',
                textDecoration: 'underline',
                font: 'inherit',
              }}
            >
              ← Back to the demo
            </button>
          </p>
        </div>
      </main>
    </>
  )
}
