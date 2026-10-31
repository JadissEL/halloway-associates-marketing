import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Kits from './pages/Kits'
import Offer from './pages/Offer'
import WhoFor from './pages/WhoFor'
import HowItWorks from './pages/HowItWorks'
import Examples from './pages/Examples'
import Pricing from './pages/Pricing'
import About from './pages/About'
import Contact from './pages/Contact'
import Audit from './pages/Audit'
import Intake from './pages/Intake'
import BusinessCard from './pages/BusinessCard'
import AdminLeads from './pages/AdminLeads'
import BuiltBy from './pages/BuiltBy'
import ShareEntry from './pages/ShareEntry'
import { MentionsLegales, Confidentialite, CGV } from './pages/legal/LegalPages'
import SalonDemo from './demos/SalonDemo'
import CafeDemo from './demos/CafeDemo'
import LawyerDemo from './demos/LawyerDemo'
import CourierDemo from './demos/CourierDemo'
import InfluencerLayout from './portfolios/influencers/InfluencerLayout'
import InfluencerHome from './portfolios/influencers/pages/Home'
import InfluencerOffers from './portfolios/influencers/pages/Offers'
import InfluencerBook from './portfolios/influencers/pages/Book'
import InfluencerSuccess from './portfolios/influencers/pages/Success'
import InfluencerMediaKit from './portfolios/influencers/pages/MediaKit'
import InfluencerLinks from './portfolios/influencers/pages/Links'
import InfluencerCard from './portfolios/influencers/pages/Card'
import InfluencerLegal from './portfolios/influencers/pages/Legal'
import InfluencerConnect from './portfolios/influencers/pages/Connect'
import InfluencerContact from './portfolios/influencers/pages/Contact'
import InfluencerAbout from './portfolios/influencers/pages/About'
import InfluencerFaq from './portfolios/influencers/pages/Faq'
import InfluencerSsoCallback from './portfolios/influencers/pages/SsoCallback'
import UserDashboard from './portfolios/influencers/pages/account/UserDashboard'
import CreatorLogin from './portfolios/influencers/pages/creator/CreatorLogin'
import { isClerkEnabled } from './lib/clerk'
import {
  CreatorShell,
  CreatorOverview,
  CreatorRequests,
  CreatorMessages,
  CreatorClients,
  CreatorOffers,
  CreatorCalendar,
  CreatorAnalytics,
  CreatorSettings,
} from './portfolios/influencers/pages/creator/CreatorDashboard'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="kits" element={<Kits />} />
          <Route path="portfolios" element={<Navigate to="/kits" replace />} />
          <Route path="offre" element={<Offer />} />
          <Route path="pour-qui" element={<WhoFor />} />
          <Route path="methode" element={<HowItWorks />} />
          <Route path="exemples" element={<Examples />} />
          <Route path="tarifs" element={<Pricing />} />
          <Route path="a-propos" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="audit" element={<Audit />} />
          <Route path="intake" element={<Intake />} />
          <Route path="carte" element={<BusinessCard />} />
          <Route path="admin/leads" element={<AdminLeads />} />
          <Route path="mentions-legales" element={<MentionsLegales />} />
          <Route path="confidentialite" element={<Confidentialite />} />
          <Route path="cgv" element={<CGV />} />
        </Route>

        <Route path="portfolios/influencers" element={<InfluencerLayout />}>
          <Route index element={<InfluencerHome />} />
          <Route path="about" element={<InfluencerAbout />} />
          <Route path="offers" element={<InfluencerOffers />} />
          <Route path="book/:offerId" element={<InfluencerBook />} />
          <Route path="success" element={<InfluencerSuccess />} />
          <Route path="media-kit" element={<InfluencerMediaKit />} />
          <Route path="links" element={<InfluencerLinks />} />
          <Route path="card" element={<InfluencerCard />} />
          <Route path="legal" element={<InfluencerLegal />} />
          <Route path="faq" element={<InfluencerFaq />} />
          <Route path="connect" element={<InfluencerConnect />} />
          <Route path="contact" element={<InfluencerContact />} />
          <Route path="account" element={<UserDashboard />} />
          {isClerkEnabled() ? (
            <Route path="sso-callback" element={<InfluencerSsoCallback />} />
          ) : null}
          <Route path="dashboard" element={<Navigate to="/portfolios/influencers/creator" replace />} />
          <Route path="creator/login" element={<CreatorLogin />} />
          <Route path="creator" element={<CreatorShell />}>
            <Route index element={<CreatorOverview />} />
            <Route path="requests" element={<CreatorRequests />} />
            <Route path="messages" element={<CreatorMessages />} />
            <Route path="clients" element={<CreatorClients />} />
            <Route path="offers" element={<CreatorOffers />} />
            <Route path="calendar" element={<CreatorCalendar />} />
            <Route path="analytics" element={<CreatorAnalytics />} />
            <Route path="settings" element={<CreatorSettings />} />
          </Route>
        </Route>

        <Route path="demos/createur" element={<Navigate to="/portfolios/influencers" replace />} />
        <Route path="demos/salon" element={<SalonDemo />} />
        <Route path="demos/cafe" element={<CafeDemo />} />
        <Route path="demos/avocat" element={<LawyerDemo />} />
        <Route path="demos/livreur" element={<CourierDemo />} />

        {/* Commercial share entries — one niche only (no studio gallery) */}
        <Route path="p/:slug" element={<ShareEntry />} />
        <Route path="built-by" element={<BuiltBy />} />
      </Routes>
    </BrowserRouter>
  )
}
