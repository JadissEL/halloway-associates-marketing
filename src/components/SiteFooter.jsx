import { Link } from 'react-router-dom'
import { brand } from '../lib/brand'
import './SiteFooter.css'

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div>
          <p className="label">Studio</p>
          <p className="site-footer__brand display">{brand.name}</p>
          <p className="site-footer__tag">Niche Digital Portfolios + consulting</p>
          <p className="mono" style={{ marginTop: '1rem' }}>
            {brand.city} ·{' '}
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            {' · '}
            <a href={brand.siteUrl}>{brand.siteUrl.replace(/^https:\/\//, '')}</a>
          </p>
        </div>
        <div>
          <p className="label">Product</p>
          <ul>
            <li><Link to="/kits">Kits index</Link></li>
            <li><Link to="/portfolios/influencers">Influencer portfolio</Link></li>
            <li><Link to="/contact">Consulting / contact</Link></li>
            <li><Link to="/audit">Audit 15 min</Link></li>
          </ul>
        </div>
        <div>
          <p className="label">Proof & demos</p>
          <ul>
            <li><Link to="/portfolios/influencers/offers">Creator offers</Link></li>
            <li><Link to="/demos/salon">Salon (legacy demo)</Link></li>
            <li><Link to="/demos/cafe">Café (legacy demo)</Link></li>
            <li><Link to="/pour-qui">100 niches library</Link></li>
          </ul>
        </div>
        <div>
          <p className="label">Legal</p>
          <ul>
            <li><Link to="/mentions-legales">Mentions légales</Link></li>
            <li><Link to="/confidentialite">Confidentialité</Link></li>
            <li><Link to="/cgv">CGV</Link></li>
          </ul>
        </div>
      </div>
      <div className="container site-footer__bottom">
        <span className="mono">© {new Date().getFullYear()} {brand.name}</span>
        <span className="sticker sticker-pink anim-stamp">Kits first</span>
      </div>
    </footer>
  )
}
