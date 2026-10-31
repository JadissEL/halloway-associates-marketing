import { creator, kitMeta } from '../data'

export default function InfluencerLegal() {
  return (
    <main className="inf-wrap inf-section" style={{ maxWidth: 720 }}>
      <p className="inf-label">The fine print</p>
      <h1 className="display" style={{ fontSize: '2rem' }}>
        How booking works with me
      </h1>
      <p style={{ color: 'var(--inf-muted)', maxWidth: '52ch' }}>
        Plain-language notes for this sample site. A live client version gets reviewed by their
        counsel for their country.
      </p>
      <div className="inf-card" style={{ display: 'grid', gap: '1rem', marginTop: '1.25rem' }}>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>1. What you’re booking</h2>
          <p>
            Sessions, collaborations, and meets sold here are private services from {creator.name} —
            not employment, and not a subscription unless we say so.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>2. Payments &amp; cancellations</h2>
          <p>
            A deposit may hold your date. Refund windows depend on the offer. Card payments go through
            Stripe; chargebacks follow the card networks.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>3. Content &amp; likeness</h2>
          <p>
            Brand work needs a short usage-rights note before we publish. Please don’t record a meet
            or call without asking first.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>4. Privacy</h2>
          <p>
            I use your intake details to fulfill the booking and reply to you. Live sites add the
            privacy wording required where the creator sells.
          </p>
        </section>
        <section>
          <h2 style={{ fontSize: '1.1rem' }}>5. This site</h2>
          <p>
            Built with {kitMeta.studio} ({kitMeta.studioEmail}). Company / VAT fields belong to the
            creator’s operating entity.
          </p>
        </section>
      </div>
    </main>
  )
}
