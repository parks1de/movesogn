import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sykkelProduct',
  title: 'Sykkel / Moped',
  type: 'document',

  groups: [
    { name: 'content', title: 'Innhald',         default: true },
    { name: 'specs',   title: 'Spesifikasjonar'               },
    { name: 'media',   title: 'Bilete'                        },
    { name: 'meta',    title: 'Meta'                          },
  ],

  fields: [
    defineField({ name: 'name',     title: 'Modellnamn',  type: 'string', group: 'content', validation: (R) => R.required() }),
    defineField({ name: 'slug',     title: 'Slug (URL)',  type: 'slug',   group: 'meta',    options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({
      name: 'category', title: 'Kategori', type: 'string', group: 'meta',
      options: { list: [
        { value: 'sykkel',       title: 'El-sykkel (Merida)' },
        { value: 'scooter',      title: 'El-moped / Scooter (NIU)' },
        { value: 'sparkesykkel', title: 'Sparkesykkel (NIU)' },
      ]},
      validation: (R) => R.required(),
    }),
    defineField({ name: 'order',     title: 'Sorteringsrekkefølge',  type: 'number',  group: 'meta',    initialValue: 10 }),
    defineField({ name: 'priceFrom', title: 'Pris frå',              type: 'string',  group: 'content', description: 'T.d. "24 990" eller "Kontakt oss"' }),
    defineField({ name: 'priceNote', title: 'Pristillegg / merknad', type: 'string',  group: 'content', description: 'T.d. kampanjepris eller lagerstatus' }),
    defineField({ name: 'shortDesc', title: 'Kortskildring (kort)',  type: 'string',  group: 'content', description: 'Vises på produktkortet i lista' }),
    defineField({ name: 'body',      title: 'Produkttekst (lang)',   type: 'text',    group: 'content', rows: 6 }),
    defineField({ name: 'rangeKm',   title: 'Rekkevidde (km)',       type: 'string',  group: 'specs' }),
    defineField({ name: 'motorW',    title: 'Motor',                 type: 'string',  group: 'specs', description: 'T.d. "Shimano EP8, 85 Nm"' }),
    defineField({ name: 'weight',    title: 'Vekt (kg)',             type: 'string',  group: 'specs' }),
    defineField({ name: 'techSpecs', title: 'Tekniske spesifikasjonar', type: 'text', group: 'specs', rows: 8, description: 'Fritekst — kvar linje: Nøkkel: Verdi' }),
    defineField({ name: 'image',     title: 'Hovudbilete (URL)',     type: 'string',  group: 'media', description: 'Lim inn biletkobla (https://…)' }),
    defineField({
      name: 'gallery', title: 'Galleri (URL-ar)',
      type: 'array', group: 'media',
      of: [{ type: 'string' }],
      description: 'Legg til fleire bileter (URL-ar)',
    }),
  ],

  preview: {
    select: { title: 'name', subtitle: 'priceFrom', cat: 'category' },
    prepare({ title, subtitle, cat }) {
      const catLabel: Record<string, string> = { sykkel: 'El-sykkel', scooter: 'Scooter', sparkesykkel: 'Sparkesykkel' };
      return {
        title: title || 'Ukjent',
        subtitle: [catLabel[cat] ?? cat, subtitle ? `kr ${subtitle}` : ''].filter(Boolean).join(' — '),
      };
    },
  },
});
