/** Local photo assets — realistic faces & business atmospheres (Unsplash, stored in /public/images) */
export const images = {
  hero: {
    src: '/images/hero-portrait.jpg',
    alt: 'Professionnelle confiante dans un environnement de travail',
  },
  founder: {
    src: '/images/founder.jpg',
    alt: 'Portrait du fondateur — remplacer par votre photo',
  },
  workspace: {
    src: '/images/workspace.jpg',
    alt: 'Équipe en collaboration autour d’un écran',
  },
  meeting: {
    src: '/images/client-meeting.jpg',
    alt: 'Réunion client en face à face',
  },
  audit: {
    src: '/images/audit-meeting.jpg',
    alt: 'Échange professionnel autour d’un ordinateur',
  },
  phone: {
    src: '/images/phone-booking.jpg',
    alt: 'Réservation depuis un téléphone',
  },
  niches: {
    salon: {
      src: '/images/salon-stylist.jpg',
      portrait: '/images/salon-portrait.jpg',
      alt: 'Styliste au travail dans un salon',
    },
    cafe: {
      src: '/images/cafe-barista.jpg',
      portrait: '/images/cafe-portrait.jpg',
      alt: 'Barista dans un café de quartier',
    },
    avocat: {
      src: '/images/lawyer-office.jpg',
      portrait: '/images/lawyer-portrait.jpg',
      alt: 'Avocat en cabinet',
    },
    livreur: {
      src: '/images/courier.jpg',
      portrait: '/images/courier-portrait.jpg',
      alt: 'Livreur professionnel',
    },
    createur: {
      src: '/images/creator.jpg',
      portrait: '/images/creator.jpg',
      alt: 'Créatrice de contenu',
    },
    service: {
      src: '/images/service-local.jpg',
      portrait: '/images/service-local.jpg',
      alt: 'Professionnel de santé / service local',
    },
  },
}

export const nicheCards = [
  {
    id: 'createur',
    title: 'Influenceurs / créateurs',
    text: 'Flagship : offres payantes (collab, guidance, meets) — filtre les DMs non sérieux.',
    image: images.niches.createur,
    icon: 'camera',
  },
  {
    id: 'salon',
    title: 'Salons & barbiers',
    text: 'Les clients veulent réserver sans jouer au téléphone.',
    image: images.niches.salon,
    icon: 'scissors',
  },
  {
    id: 'cafe',
    title: 'Cafés & restos',
    text: 'Menu, horaires, contact — clairs, pas enterrés dans Instagram.',
    image: images.niches.cafe,
    icon: 'cup',
  },
  {
    id: 'avocat',
    title: 'Avocats & notaires',
    text: 'Une présence sérieuse qui inspire confiance dès le premier clic.',
    image: images.niches.avocat,
    icon: 'scale',
  },
  {
    id: 'livreur',
    title: 'Livreurs',
    text: 'Devis / demande en un tap, image pro pour B2B et particuliers.',
    image: images.niches.livreur,
    icon: 'van',
  },
  {
    id: 'service',
    title: 'Services locaux',
    text: '100 niches documentées — filtrez sur Pour qui.',
    image: images.niches.service,
    icon: 'pin',
  },
]
