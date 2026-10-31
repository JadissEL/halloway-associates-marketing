import { creator, kitMeta } from '../data'

export default function InfluencerLegal() {
  return (
    <main className="inf-wrap inf-section" style={{ maxWidth: 720 }}>
      <p className="inf-label">Legal stubs — customize per client jurisdiction</p>
      <h1 className="display" style={{ fontSize: '2rem' }}>
        Booking terms (placeholder)
      </h1>
      <div className="inf-card" style={{ display: 'grid', gap: '1rem' }}>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>1. Nature of services</h2>
          <p>
            Sessions, collaborations, and meets sold via this site are private services offered by{' '}
            {creator.name}. This page is a stub for counsel review — not legal advice.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>2. Payments & cancellations</h2>
          <p>
            Deposits may be non-refundable after a stated window. Stripe processes cards; chargebacks
            follow card network rules. Replace with client-specific policy.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>3. Content & likeness</h2>
          <p>
            Brand collabs require a separate usage-rights agreement. Fans may not record meets without
            written consent.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>4. Privacy</h2>
          <p>
            Intake data is used to fulfill bookings. Add GDPR/CCPA language for the client’s markets
            ({kitMeta.studio} target markets include EU, UK, US, MENA, APAC).
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>5. Studio</h2>
          <p>
            Site product kit by {kitMeta.studio} — {kitMeta.studioEmail}. Operating entity fields
            (VAT, company number) go here per client.
          </p>
        </section>
      </div>
    </main>
  )
}
