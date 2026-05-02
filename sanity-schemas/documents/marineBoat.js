// Document type: marineBoat
// Import batSpecs object too: import { batSpecs } from '../objects/batSpecs.js'
import { batSpecs } from '../objects/batSpecs.js';

export const marineBoat = {
  name: 'marineBoat',
  title: 'Produkt — Båt',
  type: 'document',
  groups: [
    { name: 'info',  title: 'Informasjon', default: true },
    { name: 'specs', title: 'Spesifikasjonar' },
    { name: 'media', title: 'Bilete & galleri' },
  ],
  fields: [
    // ── Grunninfo ──────────────────────────────────────────
    {
      name: 'modelName',
      title: 'Modellnamn',
      type: 'string',
      group: 'info',
      description: 'Eks: Hasle Summerfun / Silver Beaver BR',
      validation: (R) => R.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'info',
      options: { source: 'modelName', maxLength: 64 },
      validation: (R) => R.required(),
    },
    {
      name: 'brand',
      title: 'Merke / Serie',
      type: 'string',
      group: 'info',
      options: {
        list: [
          { title: 'Hasle Summerfun',  value: 'summerfun'  },
          { title: 'Silver Boats',     value: 'silver'     },
          { title: 'Suzuki Båtmotor',  value: 'suzuki'     },
          { title: 'Anna',             value: 'other'      },
        ],
        layout: 'radio',
      },
    },
    {
      name: 'tagline',
      title: 'Slagord / tagline',
      type: 'string',
      group: 'info',
      description: 'Éi setning som skil modellen ut. Eks: CE-godkjent for norske farvatn.',
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
      description: 'Berre tal, utan "kr" og ",–". Eks: 65 900',
      placeholder: '65 900',
    },
    {
      name: 'order',
      title: 'Rekkefølgje (lågast = øvst)',
      type: 'number',
      group: 'info',
      initialValue: 10,
    },

    // ── Spesifikasjonar ────────────────────────────────────
    {
      name: 'batSpecs',
      title: 'Spesifikasjonar',
      type: 'batSpecs',
      group: 'specs',
    },

    // ── Bilete ─────────────────────────────────────────────
    {
      name: 'image',
      title: 'Hovudbilde (heltbilde)',
      type: 'image',
      group: 'media',
      description: 'Sett hotspot i midten av motivet.',
      options: { hotspot: true },
      validation: (R) => R.required(),
    },
    {
      name: 'gallery',
      title: 'Galleri (fleire bilete)',
      type: 'array',
      group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Last opp 5–15 bilete for galleriet.',
    },
  ],
  preview: {
    select: { title: 'modelName', subtitle: 'brand', media: 'image' },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle: { summerfun: 'Hasle Summerfun', silver: 'Silver Boats', suzuki: 'Suzuki' }[subtitle] ?? subtitle,
      media,
    }),
  },
};

export { batSpecs };
