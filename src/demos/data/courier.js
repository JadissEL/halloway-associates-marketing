export const courierMeta = {
  name: 'FlashCourse',
  tagline: 'Local last-mile — quote, dispatch, live track, proof of delivery.',
  sla: 'Urban SLA · typical ETA window 45–90 min',
}

export const courierNav = [
  { id: 'zones', label: 'Zones & rates' },
  { id: 'quote', label: 'Quote' },
  { id: 'track', label: 'Track' },
  { id: 'pod', label: 'POD' },
  { id: 'dispatch', label: 'Dispatch' },
  { id: 'driver', label: 'Driver' },
  { id: 'b2b', label: 'B2B' },
  { id: 'faq', label: 'FAQ' },
]

export const courierRates = [
  { zone: 'Centre-ville', window: 'Same day', price: 'from 12 €', note: 'Bike / scooter' },
  { zone: 'Périphérie', window: 'Same day', price: 'from 18 €', note: 'Van available' },
  { zone: 'B2B multi-drop', window: 'Scheduled', price: 'Day forfait', note: 'Route batch' },
  { zone: 'Express <60 min', window: 'Priority', price: '+40%', note: 'Subject to capacity' },
]

export const courierJobs = [
  { id: 'FC-1042', stop: 'Pharmacy → Clinic', driver: 'Amina', status: 'En route', eta: '14 min' },
  { id: 'FC-1043', stop: 'Atelier → Client', driver: 'Nikos', status: 'Pickup', eta: '—' },
  { id: 'FC-1044', stop: '3-stop retail', driver: 'Unassigned', status: 'Queued', eta: '—' },
]

export const courierPod = {
  job: 'FC-1039',
  recipient: 'M. Papadopoulos',
  signed: '✓ Signature captured',
  photo: '✓ Doorstep photo',
  geo: '37.9838° N · 23.7275° E',
  time: '14:22 local',
}

export const courierFaq = [
  {
    q: 'How does tracking work?',
    a: 'Share a live link after dispatch. SMS at pickup, en route, and delivered + POD.',
  },
  {
    q: 'Failed delivery?',
    a: 'Exception flow: attempt logged, photo if refused/absent, reschedule or return to depot.',
  },
  {
    q: 'Insurance?',
    a: 'Demo quotes include declared value up to policy limit — full kit wires carrier cover.',
  },
]
