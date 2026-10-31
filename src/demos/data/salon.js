export const salonMeta = {
  name: 'Atelier Coupe',
  tagline: 'Coupe, barbe, couleur — book online, keep the chair full.',
  city: null, // filled from brand at render
  address: '12 rue des Lilas',
  hours: 'Tue–Sat 09:00–19:00 · Sun–Mon closed',
  phone: null,
  depositNote: '30% deposit on colour & long services · free cancel ≥24h',
}

export const salonNav = [
  { id: 'services', label: 'Services' },
  { id: 'team', label: 'Team' },
  { id: 'book', label: 'Book' },
  { id: 'waitlist', label: 'Waitlist' },
  { id: 'portal', label: 'Client' },
  { id: 'staff', label: 'Staff' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'policies', label: 'Policies' },
  { id: 'faq', label: 'FAQ' },
]

export const salonServices = [
  { id: 'coupe', name: 'Coupe homme', duration: '30 min', price: '25 €', deposit: '—', icon: 'scissors' },
  { id: 'barbe', name: 'Coupe + barbe', duration: '45 min', price: '35 €', deposit: '—', icon: 'scissors' },
  { id: 'couleur', name: 'Coloration', duration: '120 min', price: 'from 65 €', deposit: '20 €', icon: 'check' },
  { id: 'brush', name: 'Brushing', duration: '40 min', price: '28 €', deposit: '—', icon: 'check' },
  { id: 'soin', name: 'Soin cheveux', duration: '35 min', price: '20 €', deposit: '—', icon: 'care' },
  { id: 'enfant', name: 'Enfant', duration: '25 min', price: '18 €', deposit: '—', icon: 'scissors' },
  { id: 'balayage', name: 'Balayage', duration: '150 min', price: 'from 90 €', deposit: '30 €', icon: 'check' },
  { id: 'pack', name: 'Package — 5 coupes', duration: '—', price: '110 €', deposit: 'prepaid', icon: 'calendar' },
]

export const salonTeam = [
  { name: 'Léa', role: 'Stylist · colour', slots: 'Tue–Fri', bio: 'Balayage & corrective colour.' },
  { name: 'Marco', role: 'Barber', slots: 'Wed–Sat', bio: 'Fades, beard design, walk-ins.' },
  { name: 'Nina', role: 'Stylist', slots: 'Thu–Sat', bio: 'Cuts & blowouts — any available chair.' },
]

export const salonSlots = ['10:00', '10:30', '11:15', '14:00', '15:30', '17:00', '18:15']

export const salonWaitlist = [
  { name: 'Walk-in #3', wait: '~25 min', chair: 'Marco' },
  { name: 'Sofia R.', wait: 'Next cancel', chair: 'Léa · colour' },
  { name: 'Walk-in #4', wait: '~40 min', chair: 'Any' },
]

export const salonDay = [
  { time: '10:00', client: 'Alex M.', service: 'Coupe + barbe', status: 'Checked in' },
  { time: '10:45', client: '—', service: 'Buffer / cleanup', status: 'Open' },
  { time: '11:15', client: 'Camille', service: 'Brushing', status: 'Confirmed' },
  { time: '14:00', client: 'Deposit held', service: 'Balayage · Léa', status: 'Deposit ✓' },
]

export const salonFaq = [
  {
    q: 'Do I need a deposit?',
    a: 'Colour and long services hold a card deposit. Cuts under 45 min can book without deposit.',
  },
  {
    q: 'Can I join a waitlist?',
    a: 'Yes — walk-in queue for barbers, and cancel-fill waitlist for colour appointments.',
  },
  {
    q: 'Reminders?',
    a: 'Email at booking + SMS 24h and 2h before (opt-in). Reply C to confirm, STOP to opt out.',
  },
]
