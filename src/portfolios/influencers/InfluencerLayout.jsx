import { useEffect, useState } from 'react'
import { NavLink, Outlet, Link } from 'react-router-dom'
import Seo from '../../components/Seo'
import { creator, kitMeta } from './data'
import { getCreatorSession, getUserSession } from './lib/session'
import './kit.css'

const nav = [
  { to: '/portfolios/influencers', end: true, label: 'Home' },
  { to: '/portfolios/influencers/about', label: 'About' },
  { to: '/portfolios/influencers/offers', label: 'Offers' },
  { to: '/portfolios/influencers/media-kit', label: 'Media kit' },
  { to: '/portfolios/influencers/contact', label: 'Contact' },
  { to: '/portfolios/influencers/faq', label: 'FAQ' },
  { to: '/portfolios/influencers/links', label: 'Links' },
]

function NavItems({ user, creatorSession, onNavigate }) {
  return (
    <>
      {nav.map((item) => (
        <NavLink key={item.to} to={item.to} end={item.end} onClick={onNavigate}>
          {item.label}
        </NavLink>
      ))}
      {user ? (
        <NavLink to="/portfolios/influencers/account" onClick={onNavigate}>
          My dashboard
        </NavLink>
      ) : (
        <NavLink to="/portfolios/influencers/connect" onClick={onNavigate}>
          Connect
        </NavLink>
      )}
      {creatorSession ? (
        <NavLink to="/portfolios/influencers/creator" onClick={onNavigate}>
          Creator
        </NavLink>
      ) : (
        <NavLink to="/portfolios/influencers/creator/login" onClick={onNavigate}>
          Creator login
        </NavLink>
      )}
    </>
  )
}

export default function InfluencerLayout() {
  const [user, setUser] = useState(null)
  const [creatorSession, setCreatorSession] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const sync = () => {
      setUser(getUserSession())
      setCreatorSession(getCreatorSession())
    }
    sync()
    window.addEventListener('storage', sync)
    const id = setInterval(sync, 800)
    return () => {
      window.removeEventListener('storage', sync)
      clearInterval(id)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <div className="inf-root">
      <Seo
        title={`${creator.name} — book paid access | ${kitMeta.studio}`}
        description={creator.bio}
      />
      <header className="inf-top">
        <Link to="/portfolios/influencers" className="inf-top__brand" onClick={closeMenu}>
          <img src={creator.portrait} alt="" />
          <div>
            <strong>{creator.name}</strong>
            <div className="inf-label" style={{ margin: 0 }}>
              {creator.handle}
            </div>
          </div>
        </Link>
        <nav className="inf-top__nav" aria-label="Creator portfolio">
          <NavItems user={user} creatorSession={creatorSession} />
        </nav>
        <div className="inf-top__end">
          <Link className="inf-top__studio" to="/" onClick={closeMenu}>
            {kitMeta.studio}
          </Link>
          <button
            type="button"
            className="inf-top__burger"
            aria-expanded={menuOpen}
            aria-controls="inf-mobile-nav"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span className="sr-only">{menuOpen ? 'Close menu' : 'Open menu'}</span>
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>
      {menuOpen ? (
        <nav id="inf-mobile-nav" className="inf-top__mobile" aria-label="Creator portfolio mobile">
          <NavItems user={user} creatorSession={creatorSession} onNavigate={closeMenu} />
        </nav>
      ) : null}
      <Outlet />
      <footer className="inf-wrap inf-footer">
        <div>
          <strong>{creator.name}</strong> · Digital portfolio by{' '}
          <a href={kitMeta.studioUrl}>{kitMeta.studio}</a>
        </div>
        <div>
          <Link to="/portfolios/influencers/legal">Legal</Link>
          {' · '}
          <Link to="/portfolios/influencers/card">Card</Link>
          {' · '}
          <Link to="/portfolios/influencers/connect">Connect email</Link>
        </div>
      </footer>
    </div>
  )
}
