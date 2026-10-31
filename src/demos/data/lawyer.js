export const lawyerMeta = {
  name: 'Cabinet Lemaire',
  attorney: 'Me Thomas Lemaire',
  bar: 'Barreau de [ville] · Independent practice',
  tagline: 'Clear practice areas, secure intake, client portal — trust first.',
}

export const lawyerNav = [
  { id: 'domains', label: 'Practice areas' },
  { id: 'team', label: 'Attorney' },
  { id: 'intake', label: 'Intake' },
  { id: 'book', label: 'Consult' },
  { id: 'portal', label: 'Portal' },
  { id: 'fees', label: 'Fees' },
  { id: 'confidentiality', label: 'Confidentiality' },
  { id: 'faq', label: 'FAQ' },
]

export const lawyerAreas = [
  {
    name: 'Droit des affaires',
    blurb: 'Contracts, company formation, shareholder disputes, commercial negotiations.',
  },
  {
    name: 'Droit de la famille',
    blurb: 'Divorce, custody, succession planning — discreet, structured intake.',
  },
  {
    name: 'Immobilier',
    blurb: 'Purchase/sale advice, leases, co-ownership, construction issues.',
  },
  {
    name: 'Conseil entreprises',
    blurb: 'Retainer packages for SMEs — monthly legal hygiene + priority slots.',
  },
]

export const lawyerFees = [
  { item: 'First consult (45 min)', price: '150 €' },
  { item: 'Hourly rate', price: 'from 220 €' },
  { item: 'SME monthly retainer', price: 'from 450 € / mo' },
  { item: 'Fixed-fee packages', price: 'Quoted after intake' },
]

export const lawyerPortal = {
  matters: [
    { id: '2026-041', title: 'Lease review — Arcades SARL', status: 'Active' },
    { id: '2026-038', title: 'Shareholder pact draft', status: 'Awaiting docs' },
  ],
  messages: [
    { from: 'Cabinet', text: 'Please upload the signed NDA to continue.', when: 'Today 09:12' },
    { from: 'You', text: 'Uploaded · file NDA-v2.pdf', when: 'Today 10:04' },
  ],
  invoices: [
    { id: 'INV-882', label: 'Retainer March', amount: '450 €', status: 'Due' },
    { id: 'INV-871', label: 'Consult 12 Mar', amount: '150 €', status: 'Paid' },
  ],
}

export const lawyerFaq = [
  {
    q: 'Does sending the form create an attorney–client relationship?',
    a: 'No. Relationship begins only after conflict clearance and written engagement.',
  },
  {
    q: 'Is the portal secure?',
    a: 'Demo shows encrypted messaging + document slots, role-based staff access, and audit-friendly logs.',
  },
]
