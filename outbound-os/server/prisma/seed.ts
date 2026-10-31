import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../src/lib/password.js";
import { mockDiscoverLeads } from "../src/providers/leads.js";
import { brandDefaults } from "../src/lib/brandConfig.js";

const prisma = new PrismaClient();

const b = brandDefaults();
const CITY = process.env.CITY || b.city || "Grèce";
const BRAND = process.env.BRAND || b.brand;
const FOUNDER = process.env.FOUNDER_NAME || b.founderName;
const EMAIL = process.env.CONTACT_EMAIL || b.contactEmail;
const PHONE = process.env.CONTACT_PHONE || b.contactPhone || "";


type SeqDef = {
  name: string;
  niche: string;
  description: string;
  steps: Array<{ order: number; delayDays: number; subject: string; body: string; subjectB?: string }>;
};

const sequences: SeqDef[] = [
  {
    name: "Salon / Coiffeur FR",
    niche: "salon",
    description: "Séquence 4 emails pour salons et barbers",
    steps: [
      {
        order: 1,
        delayDays: 0,
        subject: "{{BUSINESS_NAME}} — site & réservation à {{CITY}}",
        subjectB: "Une présence locale plus claire pour {{BUSINESS_NAME}} ?",
        body: `Bonjour,\n\nJe m'appelle {{FOUNDER_NAME}} de {{BRAND}}. {{WEBSITE_NOTE}} beaucoup de salons à {{CITY}} perdent des clients faute d'un site simple avec prise de RDV.\n\nOn livre un Kit présence digitale (site + contact/booking) clé en main.\n\nÇa vous parle d'en parler 10 minutes ?\n\n{{FOUNDER_NAME}}\n{{EMAIL}} · {{PHONE}}`,
      },
      {
        order: 2,
        delayDays: 3,
        subject: "Exemple concret pour {{BUSINESS_NAME}}",
        body: `Bonjour,\n\nPetit exemple : un salon comparable à {{CITY}} a clarifié ses services et ouvert les réservations en ligne en moins de 2 semaines.\n\nSi utile, je peux vous montrer une maquette adaptée à {{BUSINESS_NAME}}.\n\n{{FOUNDER_NAME}} — {{BRAND}}`,
      },
      {
        order: 3,
        delayDays: 4,
        subject: "Audit gratuit (15 min)",
        body: `Bonjour,\n\nJe propose un audit gratuit de votre présence en ligne (Google, Instagram, site).\n\nAucun engagement — juste un diagnostic clair pour {{BUSINESS_NAME}}.\n\nUn créneau vous arrange cette semaine ?\n\n{{FOUNDER_NAME}}`,
      },
      {
        order: 4,
        delayDays: 5,
        subject: "Je ferme le dossier ?",
        body: `Bonjour,\n\nJe ne veux pas vous importuner. Si le timing n'est pas le bon pour {{BUSINESS_NAME}}, dites-le-moi et je classe le dossier.\n\nSinon, je reste dispo pour un échange court.\n\n{{FOUNDER_NAME}} — {{BRAND}}`,
      },
    ],
  },
  {
    name: "Avocat / Cabinet FR",
    niche: "lawyer",
    description: "Séquence cabinets d'avocats",
    steps: [
      {
        order: 1,
        delayDays: 0,
        subject: "Site cabinet — crédibilité & prises de contact",
        body: `Bonjour,\n\n{{WEBSITE_NOTE}} les cabinets à {{CITY}} qui convertissent le mieux ont une page claire (domaines, prise de contact, confiance).\n\n{{BRAND}} livre un Kit présence digitale sobre et conforme aux attentes professionnelles.\n\nPuis-je vous envoyer 2 exemples ?\n\n{{FOUNDER_NAME}}\n{{EMAIL}}`,
      },
      {
        order: 2,
        delayDays: 3,
        subject: "2 exemples pour {{BUSINESS_NAME}}",
        body: `Bonjour,\n\nJe peux préparer une proposition courte pour {{BUSINESS_NAME}} : structure des pages, formulaire sécurisé, et suivi des demandes.\n\nSouhaitez-vous un aperçu sans engagement ?\n\n{{FOUNDER_NAME}}`,
      },
      {
        order: 3,
        delayDays: 4,
        subject: "Audit présence en ligne (cabinets)",
        body: `Bonjour,\n\nUn audit de 15 minutes permet de voir ce qui freine les prises de contact sur votre présence actuelle.\n\nIntéressé(e) pour {{BUSINESS_NAME}} ?\n\n{{FOUNDER_NAME}} — {{BRAND}}`,
      },
      {
        order: 4,
        delayDays: 5,
        subject: "Dernier message",
        body: `Bonjour,\n\nJe classe le sujet de mon côté sauf si vous souhaitez avancer. Merci pour votre temps.\n\n{{FOUNDER_NAME}}`,
      },
    ],
  },
  {
    name: "Café / Restaurant FR",
    niche: "cafe",
    description: "Séquence cafés et restaurants",
    steps: [
      {
        order: 1,
        delayDays: 0,
        subject: "{{BUSINESS_NAME}} à {{CITY}} — menu & contact en ligne",
        body: `Bonjour,\n\n{{WEBSITE_NOTE}} un site simple (carte, horaires, contact, réservation) aide beaucoup les établissements locaux.\n\nOn s'occupe de tout avec le Kit présence digitale.\n\nUn échange rapide vous intéresse ?\n\n{{FOUNDER_NAME}} — {{BRAND}}\n{{PHONE}}`,
      },
      {
        order: 2,
        delayDays: 3,
        subject: "Ce que ça change concrètement",
        body: `Bonjour,\n\nPour {{BUSINESS_NAME}} : page claire, bouton d'appel / réservation, et présence cohérente avec Google.\n\nJe peux vous montrer une démo en 10 minutes.\n\n{{FOUNDER_NAME}}`,
      },
      {
        order: 3,
        delayDays: 4,
        subject: "Proposition légère",
        body: `Bonjour,\n\nSouhaitez-vous une proposition chiffrée en EUR pour un site + contact, livré clé en main ?\n\n{{FOUNDER_NAME}} — {{EMAIL}}`,
      },
      {
        order: 4,
        delayDays: 5,
        subject: "Je vous laisse tranquille ?",
        body: `Bonjour,\n\nDernier message de ma part. Si le moment n'est pas bon, aucun souci — vous pouvez répondre « plus tard ».\n\n{{FOUNDER_NAME}}`,
      },
    ],
  },
  {
    name: "Coursier / Livraison FR",
    niche: "courier",
    description: "Séquence livreurs et coursiers",
    steps: [
      {
        order: 1,
        delayDays: 0,
        subject: "Demande de course en 1 clic — {{CITY}}",
        body: `Bonjour,\n\nPour {{BUSINESS_NAME}}, un site + formulaire de demande de course réduit les allers-retours WhatsApp et professionnalise l'image.\n\n{{WEBSITE_NOTE}} on peut livrer ça rapidement.\n\nOK pour 10 minutes ?\n\n{{FOUNDER_NAME}} — {{BRAND}}`,
      },
      {
        order: 2,
        delayDays: 3,
        subject: "Tunnel simple pour vos clients",
        body: `Bonjour,\n\nZone, créneau, contact : un parcours court augmente les demandes sérieuses.\n\nJe peux vous envoyer un schéma pour {{BUSINESS_NAME}}.\n\n{{FOUNDER_NAME}}`,
      },
      {
        order: 3,
        delayDays: 4,
        subject: "Audit gratuit",
        body: `Bonjour,\n\nAudit gratuit de votre présence actuelle — 15 minutes, sans engagement.\n\n{{FOUNDER_NAME}} · {{PHONE}}`,
      },
      {
        order: 4,
        delayDays: 5,
        subject: "Clôture",
        body: `Bonjour,\n\nJe ferme le suivi de mon côté. Répondez si vous voulez reprendre plus tard.\n\n{{FOUNDER_NAME}}`,
      },
    ],
  },
  {
    name: "Influencer Digital Kit EN",
    niche: "influencer",
    description:
      "Doctrine docs/OUTREACH_FOLLOWUPS.md — 5 touches (pain/product/proof/contrast/breakup). Dry-run until LAUNCH ON. Mirror: outreach/emails/EN-influencer.md + outreach/followups/",
    steps: [
      {
        order: 1,
        delayDays: 0,
        subject: "your DMs vs paid booking",
        body: `Hi {{BUSINESS_NAME}},\n\nCreators often lose serious collabs in DMs — or pay someone just to filter — while the audience is already there.\n\n{{WEBSITE_NOTE}}\n\nHalloway's Influencer Digital Kit is a branded booking page where fans pay for collab, guidance, meet, or lessons.\n\nOpen to a quick look?\nhttps://hallowayassociates.com/portfolios/influencers\n\n{{FOUNDER_NAME}}\nDigital kits that turn attention into booked, paid time.\n{{BRAND}}\n{{EMAIL}}\nhttps://hallowayassociates.com`,
      },
      {
        order: 2,
        delayDays: 3,
        subject: "collab / lessons booking page",
        body: `Hi,\n\nDifferent angle: this isn't a brochure site. It's paid access — collab, guidance, meet, lesson. Intake → pay → your dashboard.\n\nWhich should fans pay for first?\nhttps://hallowayassociates.com/portfolios/influencers/offers\n\n{{FOUNDER_NAME}}\nDigital kits that turn attention into booked, paid time.\n{{BRAND}}\n{{EMAIL}}\nhttps://hallowayassociates.com`,
      },
      {
        order: 3,
        delayDays: 3,
        subject: "2-min kit walkthrough",
        body: `Hi,\n\nDemo: offers → connect → book → success → dashboards. Includes site, paid booking, media kit, link hub, carte + QR.\n\nWorth 15 minutes to map it to your offers?\nhttps://hallowayassociates.com/portfolios/influencers\n\n{{FOUNDER_NAME}}\nDigital kits that turn attention into booked, paid time.\n{{BRAND}}\n{{EMAIL}}\nhttps://hallowayassociates.com`,
      },
      {
        order: 4,
        delayDays: 3,
        subject: "managers vs owned booking",
        body: `Hi,\n\nSome creators hire inbox managers or pay platforms while DMs already bring demand. The kit owns scheduling/payment for collab / guidance / meet / lessons — relationships stay yours.\n\nWant price band (€790–€1,490) + what's included?\nhttps://hallowayassociates.com/audit\n\n{{FOUNDER_NAME}}\nDigital kits that turn attention into booked, paid time.\n{{BRAND}}\n{{EMAIL}}\nhttps://hallowayassociates.com`,
      },
      {
        order: 5,
        delayDays: 4,
        subject: "should I close this out?",
        body: `Hi,\n\nI'll close this on my side so I'm not noise. If useful later, reply yes or: https://hallowayassociates.com/audit\n\nEither way — all the best.\n\n{{FOUNDER_NAME}}\n{{BRAND}}\n{{EMAIL}}\nhttps://hallowayassociates.com`,
      },
    ],
  },
];

async function main() {
  console.info("Seeding Halloway Associates Outbound OS…");

  await prisma.notification.deleteMany();
  await prisma.pipelineItem.deleteMany();
  await prisma.reply.deleteMany();
  await prisma.outboxMessage.deleteMany();
  await prisma.campaignLead.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.sequenceStep.deleteMany();
  await prisma.sequence.deleteMany();
  await prisma.lead.deleteMany();
  await prisma.suppression.deleteMany();
  await prisma.auditLog.deleteMany();
  await prisma.mailbox.deleteMany();
  await prisma.workspaceSettings.deleteMany();
  await prisma.user.deleteMany();

  const password = process.env.OPERATOR_PASSWORD || "change-me-now";
  const user = await prisma.user.create({
    data: {
      email: (process.env.OPERATOR_EMAIL || "jadisselantaki@hallowayassociates.com").toLowerCase(),
      name: FOUNDER,
      passwordHash: hashPassword(password),
    },
  });

  await prisma.workspaceSettings.create({
    data: {
      brand: BRAND,
      founderName: FOUNDER,
      contactEmail: EMAIL,
      contactPhone: PHONE,
      defaultCity: CITY,
      dryRun: true,
      warmUpMode: true,
      maxEmailsPerDay: 40,
    },
  });

  const mailbox = await prisma.mailbox.create({
    data: {
      fromName: `${FOUNDER} · ${BRAND}`,
      fromEmail: EMAIL.includes("@") ? EMAIL : "jadisselantaki@hallowayassociates.com",
      provider: "dry_run",
      dailyCap: 40,
      warmUp: true,
    },
  });

  const createdSequences = [];
  for (const seq of sequences) {
    const s = await prisma.sequence.create({
      data: {
        name: seq.name,
        niche: seq.niche,
        locale: "fr",
        description: seq.description,
        steps: {
          create: seq.steps.map((st) => ({
            order: st.order,
            delayDays: st.delayDays,
            subjectTemplate: st.subject,
            bodyTemplate: st.body,
            subjectB: st.subjectB,
            channel: "email",
          })),
        },
      },
    });
    createdSequences.push(s);
  }

  const niches = [
    { niche: "salon", label: "coiffeur" },
    { niche: "lawyer", label: "avocat" },
    { niche: "cafe", label: "café" },
    { niche: "courier", label: "coursier" },
    { niche: "influencer", label: "créateur" },
  ];

  const allLeads = [];
  for (const n of niches) {
    const batch = mockDiscoverLeads(n.label, CITY, 10);
    for (const lead of batch) {
      const created = await prisma.lead.create({
        data: {
          businessName: lead.businessName,
          niche: n.niche,
          city: lead.city,
          website: lead.website,
          email: lead.email,
          phone: lead.phone,
          instagram: lead.instagram,
          googleMapsUrl: lead.googleMapsUrl,
          publicListingUrl: lead.publicListingUrl,
          source: "seed",
          collectedAt: new Date(),
          status: lead.email ? "enriched" : "new",
        },
      });
      allLeads.push(created);
    }
  }

  const salonSeq = createdSequences.find((s) => s.niche === "salon")!;
  const salonLeads = allLeads.filter((l) => l.niche === "salon" && l.email).slice(0, 8);

  const campaign = await prisma.campaign.create({
    data: {
      name: `Coiffeurs ${CITY} — exemple`,
      niche: "salon",
      city: CITY,
      status: "paused",
      dailyLimit: 15,
      mailboxId: mailbox.id,
      sequenceId: salonSeq.id,
      startAt: new Date(),
      leads: {
        create: salonLeads.map((l) => ({ leadId: l.id, status: "pending" })),
      },
    },
  });

  await prisma.suppression.createMany({
    data: [
      { type: "email", value: "noreply@example.com", reason: "seed_sample" },
      { type: "domain", value: "spamtrap.test", reason: "seed_sample" },
      { type: "email", value: "do-not-contact@blocked.local", reason: "seed_sample" },
    ],
  });

  await prisma.auditLog.create({
    data: {
      actorId: user.id,
      actorEmail: user.email,
      action: "seed.completed",
      meta: {
        leads: allLeads.length,
        sequences: createdSequences.length,
        campaignId: campaign.id,
      },
    },
  });

  console.info(`Seed OK: user=${user.email} password=${password}`);
  console.info(`Mailbox dry-run: ${mailbox.fromEmail}`);
  console.info(`Leads: ${allLeads.length}, campaign paused: ${campaign.name}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
