import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sykkelProduct',
  title: 'Sykkel / Moped',
  type: 'document',
  fields: [
    defineField({ name: 'name',     title: 'Namn',      type: 'string',   validation: (R) => R.required() }),
    defineField({ name: 'slug',     title: 'Slug',      type: 'slug',     options: { source: 'name' }, validation: (R) => R.required() }),
    defineField({
      name: 'category', title: 'Kategori', type: 'string',
      options: { list: [
        { value: 'sykkel',       title: 'Merida El-sykkel' },
        { value: 'scooter',      title: 'NIU Moped' },
        { value: 'sparkesykkel', title: 'Sparkesykkel' },
      ]},
      validation: (R) => R.required(),
    }),
    defineField({ name: 'order',     title: 'Sorteringsrekkefølge', type: 'number', initialValue: 10 }),
    defineField({ name: 'rangeKm',   title: 'Rekkevidde (km)',      type: 'string' }),
    defineField({ name: 'motorW',    title: 'Motor (W)',             type: 'string' }),
    defineField({ name: 'weight',    title: 'Vekt (kg)',             type: 'string' }),
    defineField({ name: 'priceFrom', title: 'Pris frå (t.d. 24 990 eller "Kontakt oss")', type: 'string' }),
    defineField({ name: 'image',     title: 'Hovudbilete',          type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery', title: 'Galleri',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'body', title: 'Produkttekst', type: 'text', rows: 6 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', media: 'image' },
  },
});
