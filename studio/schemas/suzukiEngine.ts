import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'suzukiEngine',
  title: 'Marine — Suzuki Motor',
  type: 'document',
  groups: [
    { name: 'info',  title: 'Informasjon', default: true },
    { name: 'media', title: 'Bilete'                     },
  ],
  fields: [
    defineField({ name: 'modelName', title: 'Modellnamn',               type: 'string', group: 'info', validation: (R) => R.required(), description: 'T.d. DF9.9B / DF90A / DF150AP' }),
    defineField({ name: 'slug',      title: 'Slug (URL)',               type: 'slug',   group: 'info', options: { source: 'modelName' }, validation: (R) => R.required() }),
    defineField({ name: 'hp',        title: 'Hestekrefter',             type: 'string', group: 'info', description: 'T.d. 9,9 hk / 90 hk' }),
    defineField({ name: 'type',      title: 'Motortype / teknologi',    type: 'string', group: 'info', description: 'T.d. EFI · Lean Burn / DOHC · 4-takt' }),
    defineField({ name: 'priceFrom', title: 'Pris frå (kr)',            type: 'string', group: 'info', description: 'Berre tal, t.d. 18 900' }),
    defineField({ name: 'inStock',   title: 'På lager',                 type: 'boolean', group: 'info', initialValue: true }),
    defineField({ name: 'description', title: 'Kort beskriving',        type: 'text',   group: 'info', rows: 4 }),
    defineField({ name: 'order',     title: 'Rekkefølgje (lågast = øvst)', type: 'number', group: 'info', initialValue: 10 }),
    defineField({
      name: 'featuredOnHomepage', title: 'Vis på framside',
      type: 'boolean', group: 'info', initialValue: false,
      description: 'Slå på for å vise motoren i "Utvalde produkt" på framsida.',
    }),
    defineField({
      name: 'image', title: 'Produktbilete', type: 'image', group: 'media',
      options: { hotspot: true },
      description: 'Bilete av motoren — helst på kvit/transparent bakgrunn.',
    }),
  ],
  preview: {
    select: { title: 'modelName', subtitle: 'hp', media: 'image', id: '_id' },
    prepare: ({ title, subtitle, media, id }) => {
      const dot = (id as string)?.startsWith('drafts.') ? '🔴' : '🟢';
      return { title: `${dot} ${title || 'Ukjent'}`, subtitle: subtitle ?? '', media };
    },
  },
});
