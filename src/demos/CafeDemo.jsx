import { useMemo, useState } from 'react'
import Seo from '../components/Seo'
import { Icon } from '../components/Icons'
import { brand } from '../lib/brand'
import { images } from '../lib/images'
import { DemoTopbar, DemoWantThis } from './DemoShell'
import {
  DemoNav,
  DemoSection,
  DemoGrid,
  DemoPanel,
  DemoSuccess,
  DemoChecklist,
  DemoTable,
  DemoLegalFoot,
} from './DemoKit'
import {
  cafeMeta,
  cafeNav,
  cafeMenu,
  cafeFilters,
  cafeEvents,
  cafeKitchen,
  cafeReviews,
  cafeFaq,
} from './data/cafe'
import '../components/Photo.css'

function ReserveForm() {
  const [done, setDone] = useState(false)
  if (done) {
    return (
      <DemoSuccess title="Table held 15 minutes" onReset={() => setDone(false)}>
        <p>Confirmation SMS + email. Groups of 6+ would request a card hold in production.</p>
      </DemoSuccess>
    )
  }
  return (
    <form
      className="demo-card demo-form"
      onSubmit={(e) => {
        e.preventDefault()
        setDone(true)
      }}
    >
      <p className="label">Reserve a table</p>
      <input required name="name" placeholder="Name" />
      <input required name="phone" placeholder="Phone" />
      <input required type="date" name="date" />
      <select required name="time" defaultValue="">
        <option value="" disabled>
          Time
        </option>
        {['12:00', '12:30', '13:00', '19:00', '19:30', '20:15'].map((t) => (
          <option key={t}>{t}</option>
        ))}
      </select>
      <select required name="party" defaultValue="2">
        {[1, 2, 3, 4, 5, 6, 8].map((n) => (
          <option key={n} value={n}>
            {n} guests
          </option>
        ))}
      </select>
      <textarea name="notes" rows={2} placeholder="Occasion / accessibility needs" />
      <label className="demo-check">
        <input type="checkbox" required /> I accept the reservation / no-show policy
      </label>
      <button className="btn" type="submit">
        Confirm reservation
      </button>
    </form>
  )
}

function OrderCart({ items }) {
  const [cart, setCart] = useState([])
  const [done, setDone] = useState(false)
  const total = cart.reduce((sum, id) => {
    const row = items.find((i) => i.id === id)
    return sum + (row ? parseFloat(String(row.price).replace(',', '.')) || 0 : 0)
  }, 0)

  if (done) {
    return (
      <DemoSuccess title="Order #187 queued" onReset={() => { setDone(false); setCart([]) }}>
        <p>Kitchen ticket created · pickup ETA ~12 min · payment SCA stub in production.</p>
      </DemoSuccess>
    )
  }

  return (
    <div className="demo-split">
      <DemoPanel>
        <p className="label">Tap to add</p>
        <ul className="demo-order-list">
          {items.slice(0, 6).map((item) => (
            <li key={item.id}>
              <button type="button" className="demo-linkish" onClick={() => setCart((c) => [...c, item.id])}>
                + {item.name}
              </button>
              <span className="mono">{item.price}</span>
            </li>
          ))}
        </ul>
      </DemoPanel>
      <form
        className="demo-card demo-form"
        onSubmit={(e) => {
          e.preventDefault()
          if (cart.length) setDone(true)
        }}
      >
        <p className="label">Cart · takeaway</p>
        <p>{cart.length ? `${cart.length} item(s)` : 'Empty — add from the menu'}</p>
        <p className="mono">Est. {total.toFixed(2).replace('.', ',')} €</p>
        <input required name="name" placeholder="Name for pickup" />
        <input required name="phone" placeholder="Phone" />
        <select name="when" defaultValue="asap">
          <option value="asap">ASAP</option>
          <option value="30">In 30 min</option>
          <option value="60">In 60 min</option>
        </select>
        <button className="btn" type="submit" disabled={!cart.length}>
          Place order
        </button>
      </form>
    </div>
  )
}

export default function CafeDemo() {
  const hero = images.niches.cafe
  const [filter, setFilter] = useState('all')
  const menu = useMemo(() => {
    if (filter === 'all') return cafeMenu
    if (filter === 'milk-free') return cafeMenu.filter((m) => !m.allergens.includes('milk'))
    return cafeMenu.filter((m) => m.tags.includes(filter))
  }, [filter])

  return (
    <div className="demo-root" style={{ ['--demo-bg']: '#b7c4b0' }}>
      <Seo
        title={`${cafeMeta.name} — café platform demo | ${brand.name}`}
        description="Café/restaurant platform: menu with allergens, reservations, ordering, loyalty, kitchen."
      />
      <DemoTopbar name="Café / restaurant" shareSlug="cafes" />
      <header className="demo-hero-photo">
        <img src={hero.src} alt={hero.alt} />
        <div className="demo-hero-photo__veil" />
        <div className="demo-hero-photo__content">
          <div className="demo-hero-photo__inner">
            <div>
              <span className="sticker sticker-lime">Platform demo · café</span>
              <h1 className="display" style={{ marginTop: '1rem' }}>
                {cafeMeta.name}
              </h1>
              <p style={{ fontSize: '1.15rem', maxWidth: '38ch' }}>{cafeMeta.tagline}</p>
              <p className="mono">
                {cafeMeta.address} · {brand.city} · {brand.phone}
              </p>
              <p className="mono">{cafeMeta.hours}</p>
              <DemoChecklist
                items={[
                  'HTML menu + allergen / dietary filters',
                  'Table reservations',
                  'Takeaway order + kitchen tickets',
                  'Loyalty & events',
                ]}
              />
            </div>
            <div style={{ display: 'grid', gap: '0.5rem' }}>
              <a className="btn btn-lime" href="#menu">
                View menu
              </a>
              <a className="btn" href="#reserve">
                Reserve
              </a>
            </div>
          </div>
        </div>
      </header>

      <DemoNav title={cafeMeta.name} items={cafeNav} />

      <DemoSection
        id="menu"
        label="Carte"
        title="Menu with dietary filters"
        lead="HTML menu (not a PDF) — filter vegan, vegetarian, gluten-free, or hide milk."
      >
        <div className="demo-filter-bar">
          {cafeFilters.map((f) => (
            <button
              key={f}
              type="button"
              className={filter === f ? 'btn' : 'btn btn-secondary'}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
        <DemoGrid cols={3}>
          {menu.map((item) => (
            <DemoPanel key={item.id}>
              <span className="lp-icon-badge" aria-hidden>
                <Icon name="cup" size={18} />
              </span>
              <p className="mono" style={{ margin: '0.5rem 0 0', fontSize: '0.75rem' }}>
                {item.cat}
              </p>
              <h3 className="display" style={{ fontSize: '1.25rem', margin: '0.2rem 0' }}>
                {item.name}
              </h3>
              <p className="mono">{item.price}</p>
              <p style={{ fontSize: '0.8rem', margin: '0.35rem 0 0' }}>
                {item.tags.length ? item.tags.join(' · ') : '—'}
                {item.allergens.length ? ` · contains: ${item.allergens.join(', ')}` : ''}
              </p>
            </DemoPanel>
          ))}
        </DemoGrid>
      </DemoSection>

      <DemoSection id="reserve" label="Tables" title="Reservations">
        <div className="demo-split">
          <ReserveForm />
          <DemoPanel>
            <p className="label">Floor rules</p>
            <DemoChecklist
              items={[
                'Hold 15 minutes past booking time',
                'Party size drives table map (stub)',
                'Card hold for large groups',
                'Reminder −24h by SMS/email',
              ]}
            />
          </DemoPanel>
        </div>
      </DemoSection>

      <DemoSection id="order" label="Takeaway" title="Online order" lead="Cart → payment SCA → kitchen ticket.">
        <OrderCart items={cafeMenu} />
      </DemoSection>

      <DemoSection id="events" label="Extra" title="Events & private hire">
        <DemoGrid cols={3}>
          {cafeEvents.map((ev) => (
            <DemoPanel key={ev.title}>
              <h3 className="display" style={{ fontSize: '1.2rem', margin: 0 }}>
                {ev.title}
              </h3>
              <p className="mono">{ev.when}</p>
              <p>{ev.note}</p>
            </DemoPanel>
          ))}
        </DemoGrid>
      </DemoSection>

      <DemoSection id="loyalty" label="Retention" title="Loyalty stamps">
        <DemoPanel>
          <p>
            Digital punch card: <strong>7 / 10</strong> — next espresso free.
          </p>
          <p className="mono">Gift voucher balance: 25 € · birthday offer queued</p>
        </DemoPanel>
      </DemoSection>

      <DemoSection id="kitchen" label="Ops" title="Kitchen tickets" lead="Staff stream — status moves with the ticket.">
        <DemoTable
          columns={[
            { key: 'ticket', label: 'Ticket' },
            { key: 'items', label: 'Items' },
            { key: 'status', label: 'Status' },
            { key: 'eta', label: 'ETA' },
          ]}
          rows={cafeKitchen}
        />
      </DemoSection>

      <DemoSection id="reviews" label="Social proof" title="Reviews">
        <DemoGrid cols={2}>
          {cafeReviews.map((r) => (
            <DemoPanel key={r.who}>
              <p style={{ fontStyle: 'italic' }}>&ldquo;{r.text}&rdquo;</p>
              <p className="mono">— {r.who}</p>
            </DemoPanel>
          ))}
        </DemoGrid>
      </DemoSection>

      <DemoSection id="faq" label="FAQ" title="Common questions">
        {cafeFaq.map((f) => (
          <DemoPanel key={f.q} style={{ marginBottom: '0.75rem' }}>
            <h3 className="display" style={{ fontSize: '1.15rem', margin: 0 }}>
              {f.q}
            </h3>
            <p>{f.a}</p>
          </DemoPanel>
        ))}
      </DemoSection>

      <DemoLegalFoot>
        <p className="mono">
          Privacy · allergens disclaimer · {brand.name} hospitality demo.
        </p>
        <p style={{ fontSize: '0.85rem' }}>
          Research: restaurant website must-haves (menu, order, reserve, NAP, allergens) —
          docs/DEMO_NICHE_RESEARCH.md.
        </p>
      </DemoLegalFoot>

      <DemoWantThis shareSlug="cafes" />
    </div>
  )
}
