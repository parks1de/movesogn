// Document type: sykkelProduct
// Import and add all four spec objects to your Studio schema first.
import { scooterSpecs }      from '../objects/scooterSpecs.js';
import { sykkelSpecs }       from '../objects/sykkelSpecs.js';
import { sparkesykkelSpecs } from '../objects/sparkesykkelSpecs.js';

export const sykkelProduct = {
  name: 'sykkelProduct',
  title: 'Produkt — El-mobilitet',
  type: 'document',
  groups: [
    { name: 'info',  title: 'Informasjon', default: true },
    { name: 'specs', title: 'Spesifikasjonar' },
    { name: 'media', title: 'Bilete & galleri' },
  ],
  fields: [
    // ── Grunninfo ──────────────────────────────────────────
    {
      name: 'name',
      title: 'Produktnamn',
      type: 'string',
      group: 'info',
      description: 'Eks: NIU NQi Sport',
      validation: (R) => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'info',
      options: { source: 'name', maxLength: 64 },
      validation: (R) => R.required(),
    },
    {
      name: 'category',
      title: 'Kategori',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'El-moped (scooter)',   value: 'scooter'      },
          { title: 'El-sykkel (Merida)',   value: 'sykkel'       },
          { title: 'Sparkesykkel (NIU)',   value: 'sparkesykkel' },
        ],
        layout: 'radio',
      },
      validation: (R) => R.required(),
    },
    {
      name: 'tagline',
      title: 'Slagord / tagline',
      type: 'string',
      group: 'info',
      description: 'Éi setning som skil dette produktet ut. Eks: Best rekkevidde i klassen.',
    },
    {
      name: 'body',
      title: 'Beskriving',
      type: 'text',
      group: 'info',
      rows: 6,
      description: 'Bruk to linjeskift (tom linje) for nytt avsnitt.',
    },
    {
      name: 'priceFrom',
      title: 'Pris frå',
      type: 'string',
      group: 'info',
      description: 'Berre tal, utan "kr" og ",–". Eks: 24 990. Skriv "Kontakt oss" viss ingen fast pris.',
      placeholder: '24 990',
    },
    {
      name: 'order',
      title: 'Rekkefølgje (lågast = øvst)',
      type: 'number',
      group: 'info',
      initialValue: 10,
    },

    // ── Spesifikasjonar — vises basert på kategori ─────────
    {
      name: 'scooterSpecs',
      title: 'Spesifikasjonar',
      type: 'scooterSpecs',
      group: 'specs',
      hidden: ({ document }) => document?.category !== 'scooter',
    },
    {
      name: 'sykkelSpecs',
      title: 'Spesifikasjonar',
      type: 'sykkelSpecs',
      group: 'specs',
      hidden: ({ document }) => document?.category !== 'sykkel',
    },
    {
      name: 'sparkesykkelSpecs',
      title: 'Spesifikasjonar',
      type: 'sparkesykkelSpecs',
      group: 'specs',
      hidden: ({ document }) => document?.category !== 'sparkesykkel',
    },

    // ── Bilete ─────────────────────────────────────────────
    {
      name: 'image',
      title: 'Hovudbilde (produktfoto)',
      type: 'image',
      group: 'media',
      description: 'Produktfoto, helst på kvit/transparent bakgrunn. Bruk 1:1 beskjering.',
      options: {
        hotspot: true,
        metadata: ['palette'],
        storeOriginalFilename: true,
      },
    },
    {
      name: 'gallery',
      title: 'Galleri (fleire bilete)',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Last opp fleire produktbilete. Første bilde i lista er øvst i galleriet.',
    },
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: { scooter: 'El-moped', sykkel: 'El-sykkel', sparkesykkel: 'Sparkesykkel' }[subtitle] ?? subtitle,
      media,
    }),
  },
};

// Register object schemas too (add these to your schemaTypes array):
export { scooterSpecs, sykkelSpecs, sparkesykkelSpecs };
