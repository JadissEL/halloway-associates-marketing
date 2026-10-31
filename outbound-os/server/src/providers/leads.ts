export type DiscoveredLead = {
  businessName: string;
  niche: string;
  city: string;
  website?: string;
  email?: string;
  phone?: string;
  instagram?: string;
  googleMapsUrl?: string;
  publicListingUrl?: string;
  source: string;
};

const PREFIXES: Record<string, string[]> = {
  salon: ["Studio", "Salon", "Atelier", "Barber", "Coiffure"],
  lawyer: ["Cabinet", "Me", "Étude", "Avocats"],
  cafe: ["Café", "Bistrot", "Brasserie", "Restaurant"],
  courier: ["Express", "Livraison", "Courses", "Flash"],
  influencer: ["Studio", "Créa", "Media", "Agence"],
};

const NAMES = [
  "Martin",
  "Dupont",
  "Bernard",
  "Petit",
  "Robert",
  "Richard",
  "Durand",
  "Leroy",
  "Moreau",
  "Simon",
  "Laurent",
  "Lefebvre",
  "Michel",
  "Garcia",
  "David",
  "Bertrand",
  "Roux",
  "Vincent",
  "Fournier",
  "Morel",
];

function slugify(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function nicheKey(niche: string): string {
  const n = niche.toLowerCase();
  if (/coiff|barb|salon|hair/.test(n)) return "salon";
  if (/avocat|lawyer|jur/.test(n)) return "lawyer";
  if (/café|cafe|restau|bistrot|coffee/.test(n)) return "cafe";
  if (/coursier|courier|livr/.test(n)) return "courier";
  if (/influ|créat|creat|content/.test(n)) return "influencer";
  return "salon";
}

export function mockDiscoverLeads(niche: string, city: string, count = 20): DiscoveredLead[] {
  const key = nicheKey(niche);
  const prefixes = PREFIXES[key] ?? PREFIXES.salon!;
  const leads: DiscoveredLead[] = [];
  for (let i = 0; i < count; i++) {
    const prefix = prefixes[i % prefixes.length]!;
    const name = NAMES[i % NAMES.length]!;
    const businessName = `${prefix} ${name}`;
    const slug = slugify(`${businessName}-${city}-${i}`);
    const hasWebsite = i % 3 !== 0;
    const hasEmail = i % 4 !== 0;
    leads.push({
      businessName,
      niche,
      city,
      website: hasWebsite ? `https://www.${slug}.fr` : undefined,
      email: hasEmail ? `contact@${slug}.fr` : undefined,
      phone: `+33 4 ${String(70 + (i % 20)).padStart(2, "0")} ${String(10 + i).padStart(2, "0")} ${String(20 + i).padStart(2, "0")} ${String(30 + i).padStart(2, "0")}`,
      instagram: i % 2 === 0 ? `@${slugify(businessName)}` : undefined,
      googleMapsUrl: `https://maps.google.com/?q=${encodeURIComponent(`${businessName} ${city}`)}`,
      publicListingUrl: `https://maps.google.com/?q=${encodeURIComponent(`${businessName} ${city}`)}`,
      source: "mock_discover",
    });
  }
  return leads;
}

export function mockEnrichLead(lead: {
  businessName: string;
  city: string;
  website?: string | null;
  email?: string | null;
  phone?: string | null;
  instagram?: string | null;
}) {
  const slug = slugify(`${lead.businessName}-${lead.city}`);
  return {
    website: lead.website || `https://www.${slug}.fr`,
    email: lead.email || `hello@${slug}.fr`,
    phone: lead.phone || "+33 4 78 00 00 00",
    instagram: lead.instagram || `@${slugify(lead.businessName)}`,
    enrichmentJson: {
      provider: "mock",
      enrichedAt: new Date().toISOString(),
      websiteQuality: lead.website ? "existing" : "missing_before",
      notes: lead.website
        ? "Site détecté — opportunité de modernisation"
        : "Pas de site clair — fort signal Kit présence digitale",
    },
  };
}
