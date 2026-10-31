export const cafeMeta = {
  name: 'Café des Arcades',
  tagline: 'Neighbourhood café — menu, reserve, order, loyalty.',
  address: 'Place du Marché',
  hours: 'Mon–Sun 08:00–19:00 · Kitchen 11:30–15:00 & 18:00–21:30 Fri–Sat',
}

export const cafeNav = [
  { id: 'menu', label: 'Menu' },
  { id: 'reserve', label: 'Reserve' },
  { id: 'order', label: 'Order' },
  { id: 'events', label: 'Events' },
  { id: 'loyalty', label: 'Loyalty' },
  { id: 'kitchen', label: 'Kitchen' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
]

export const cafeMenu = [
  { id: '1', cat: 'Coffee', name: 'Espresso', price: '2,50 €', tags: [], allergens: [] },
  { id: '2', cat: 'Coffee', name: 'Cappuccino', price: '3,80 €', tags: ['vegetarian'], allergens: ['milk'] },
  { id: '3', cat: 'Brunch', name: 'Formule déjeuner', price: '14 €', tags: [], allergens: ['gluten', 'eggs'] },
  { id: '4', cat: 'Pastry', name: 'Pâtisserie du jour', price: '4,50 €', tags: ['vegetarian'], allergens: ['gluten', 'milk', 'eggs'] },
  { id: '5', cat: 'Brunch', name: 'Brunch week-end', price: '22 €', tags: [], allergens: ['gluten', 'milk', 'eggs'] },
  { id: '6', cat: 'Tea', name: 'Thé signature', price: '4 €', tags: ['vegan'], allergens: [] },
  { id: '7', cat: 'Savoury', name: 'Bowl quinoa & légumes', price: '12 €', tags: ['vegan', 'gluten-free'], allergens: [] },
  { id: '8', cat: 'Savoury', name: 'Croque monsieur', price: '9,50 €', tags: [], allergens: ['gluten', 'milk'] },
  { id: '9', cat: 'Drinks', name: 'Jus pressé', price: '5 €', tags: ['vegan'], allergens: [] },
]

export const cafeFilters = ['all', 'vegan', 'vegetarian', 'gluten-free', 'milk-free']

export const cafeEvents = [
  { title: 'Live acoustic Friday', when: 'Fri 20:00', note: 'Reservations preferred' },
  { title: 'Private hire — back room', when: 'Up to 20 guests', note: 'Deposit 50 €' },
  { title: 'Brunch tasting', when: 'First Sun / month', note: 'Ticketed' },
]

export const cafeKitchen = [
  { ticket: '#184', items: '2× Cappuccino · 1× Bowl quinoa', status: 'Preparing', eta: '4 min' },
  { ticket: '#185', items: 'Brunch week-end ×2', status: 'Queued', eta: '12 min' },
  { ticket: '#186', items: 'Croque + jus', status: 'Ready', eta: 'Pickup' },
]

export const cafeReviews = [
  { who: 'Elena', text: 'Allergen tags on the menu saved us — clear and fast order.' },
  { who: 'Yannis', text: 'Booked a table in two taps. Kitchen tickets actually move.' },
]

export const cafeFaq = [
  {
    q: 'Allergens?',
    a: 'Filter the menu or expand each dish. Always tell staff of severe allergies — traces possible.',
  },
  {
    q: 'No-show on reservations?',
    a: 'Tables held 15 minutes. Groups of 6+ may require a card hold.',
  },
]
