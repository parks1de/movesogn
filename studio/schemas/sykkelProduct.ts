import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sykkelProduct',
  title: 'El-mobilitet — Produkt',
  type: 'document',
  groups: [
    { name: 'info',   title: 'Informasjon',      default: true },
    { name: 'specs',  title: 'Spesifikasjonar'                 },
    { name: 'media',  title: 'Bilete & galleri'                },
  ],
  fields: [
    defineField({ name: 'name',     title: 'Produktnamn',              type: 'string', group: 'info',  validation: (R) => R.required() }),
    defineField({ name: 'slug',     title: 'Slug (URL)',               type: 'slug',   group: 'info',  options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({
      name: 'category', title: 'Kategori', type: 'string', group: 'info',
      options: { list: [
        { value: 'sykkel',       title: 'El-sykkel (Merida / Peugeot)' },
        { value: 'scooter',      title: 'El-moped / Scooter (NIU)' },
        { value: 'sparkesykkel', title: 'Sparkesykkel (NIU)' },
      ]},
      validation: (R) => R.required(),
    }),
    defineField({ name: 'order',    title: 'Rekkefølgje (lågast = øvst)', type: 'number', group: 'info', initialValue: 10 }),
    defineField({
      name: 'featuredOnHomepage', title: 'Vis på framside',
      type: 'boolean', group: 'info', initialValue: false,
      description: 'Slå på for å vise produktet i "Utvalde produkt" på framsida.',
    }),
    defineField({ name: 'tagline',   title: 'Slagord',                  type: 'string', group: 'info',  description: 'Éi setning på produktdetaljsida' }),
    defineField({ name: 'shortDesc', title: 'Kort skildring',           type: 'text',   group: 'info',  rows: 3 }),
    defineField({ name: 'body',      title: 'Produkttekst',             type: 'text',   group: 'info',  rows: 6, description: 'Bruk tom linje for nytt avsnitt' }),
    defineField({ name: 'priceFrom', title: 'Pris frå',                type: 'string', group: 'info',  description: 'T.d. "24 990" eller "Kontakt oss"' }),
    defineField({ name: 'priceNote', title: 'Prisnote',                 type: 'string', group: 'info',  description: 'T.d. "inkl. batteri"' }),
    defineField({ name: 'techSpecs', title: 'Tekniske spesifikasjonar', type: 'text',   group: 'specs', rows: 8, description: 'Fritekst frå import — flytt til strukturerte felt etter kvart' }),

    // Specs — shown per category, each with a customisable section headline
    defineField({
      name: 'scooterSpecs', title: 'Spesifikasjonar — El-moped', type: 'object', group: 'specs',
      hidden: ({ document }) => document?.category !== 'scooter',
      fields: [
        defineField({ name: 'tittel',     title: 'Specs-overskrift', type: 'string', description: 'Overskrift på nettsida, t.d. "Tekniske data"' }),
        defineField({ name: 'rekkevidde', title: 'Rekkevidde',       type: 'string' }),
        defineField({ name: 'motor',      title: 'Motor',            type: 'string' }),
        defineField({ name: 'toppfart',   title: 'Toppfart',         type: 'string' }),
        defineField({ name: 'ladetid',    title: 'Ladetid',          type: 'string' }),
        defineField({ name: 'vekt',       title: 'Vekt',             type: 'string' }),
        defineField({ name: 'maxLast',    title: 'Maks last',        type: 'string' }),
        defineField({ name: 'batteri',    title: 'Batteri',          type: 'string' }),
        defineField({ name: 'sertifikat', title: 'Sertifikat',       type: 'string' }),
      ],
    }),
    defineField({
      name: 'sykkelSpecs', title: 'Spesifikasjonar — El-sykkel', type: 'object', group: 'specs',
      hidden: ({ document }) => document?.category !== 'sykkel',
      fields: [
        defineField({ name: 'tittel',      title: 'Specs-overskrift', type: 'string', description: 'Overskrift på nettsida, t.d. "Teknisk spesifikasjon"' }),
        defineField({ name: 'rekkevidde',  title: 'Rekkevidde',       type: 'string' }),
        defineField({ name: 'motor',       title: 'Motor',            type: 'string', description: 'T.d. "Shimano EP8, 85 Nm"' }),
        defineField({ name: 'driv',        title: 'Driv',             type: 'string', description: 'T.d. "Shimano Deore 12-gir"' }),
        defineField({ name: 'batteri',     title: 'Batteri',          type: 'string' }),
        defineField({ name: 'vekt',        title: 'Vekt',             type: 'string' }),
        defineField({ name: 'ramme',       title: 'Ramme',            type: 'string' }),
        defineField({ name: 'hjulstorleik', title: 'Hjulstorleik',   type: 'string' }),
        defineField({ name: 'brems',       title: 'Brems',            type: 'string' }),
        defineField({ name: 'fjoring',     title: 'Fjøring',          type: 'string', description: 'T.d. "Full-suspension, 160mm"' }),
      ],
    }),
    defineField({
      name: 'sparkesykkelSpecs', title: 'Spesifikasjonar — Sparkesykkel', type: 'object', group: 'specs',
      hidden: ({ document }) => document?.category !== 'sparkesykkel',
      fields: [
        defineField({ name: 'tittel',      title: 'Specs-overskrift', type: 'string', description: 'Overskrift på nettsida, t.d. "Teknisk spesifikasjon"' }),
        defineField({ name: 'rekkevidde',  title: 'Rekkevidde',       type: 'string' }),
        defineField({ name: 'motor',       title: 'Motor',            type: 'string' }),
        defineField({ name: 'toppfart',    title: 'Toppfart',         type: 'string' }),
        defineField({ name: 'ladetid',     title: 'Ladetid',          type: 'string' }),
        defineField({ name: 'vekt',        title: 'Vekt',             type: 'string' }),
        defineField({ name: 'hjulstorleik', title: 'Hjulstorleik',   type: 'string' }),
        defineField({ name: 'brems',       title: 'Brems',            type: 'string' }),
        defineField({ name: 'foldbar',     title: 'Foldbar',          type: 'boolean', initialValue: true }),
      ],
    }),

    // Media
    defineField({
      name: 'image', title: 'Hovudbilete', type: 'image', group: 'media',
      options: { hotspot: true },
      description: 'Produktfoto — helst på kvit/transparent bakgrunn, 1:1.',
    }),
    defineField({
      name: 'gallery', title: 'Galleri', type: 'array', group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],

  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image', id: '_id' },
    prepare({ title, subtitle, media, id }) {
      const cat: Record<string, string> = { sykkel: 'El-sykkel', scooter: 'El-moped', sparkesykkel: 'Sparkesykkel' };
      const dot = (id as string)?.startsWith('drafts.') ? '🔴' : '🟢';
      return { title: `${dot} ${title || 'Ukjent'}`, subtitle: cat[subtitle] ?? subtitle, media };
    },
  },
});
