import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { brand } from '../lib/brand'
import './SiteHeader.css'

const links = [
  { to: '/kits', label: 'Kits' },
  { to: '/portfolios/influencers', label: 'Influencers' },
  { to: '/offre', label: 'Consulting' },
  { to: '/contact', label: 'Contact' },
]

export default function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <Link to="/" className="site-header__brand" onClick={() => setOpen(false)}>
          <img src="/logo.svg" alt="" width={36} height={36} />
          <span className="site-header__name">{brand.name}</span>
        </Link>

        <nav className={`site-header__nav ${open ? 'is-open' : ''}`} aria-label="Principal">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
          <Link
            className="btn btn-lime site-header__cta"
            to="/portfolios/influencers"
            onClick={() => setOpen(false)}
          >
            See influencer kit
          </Link>
        </nav>

        <button
          type="button"
          className="site-header__burger"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
