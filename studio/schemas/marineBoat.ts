import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'marineBoat',
  title: 'Båt',
  type: 'document',
  fields: [
    defineField({ name: 'modelName',    title: 'Modellnamn',    type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'slug',         title: 'Slug',          type: 'slug', options: { source: 'modelName' }, validation: (R) => R.required() }),
    defineField({ name: 'order',        title: 'Sorteringsrekkefølge', type: 'number', initialValue: 10 }),
    defineField({ name: 'length',       title: 'Lengde',        type: 'string' }),
    defineField({ name: 'persons',      title: 'Maks personar', type: 'string' }),
    defineField({ name: 'motorOptions', title: 'Motor',         type: 'string' }),
    defineField({ name: 'priceFrom',    title: 'Pris frå (kr)', type: 'string' }),
    defineField({ name: 'image',        title: 'Hovudbilete',   type: 'image', options: { hotspot: true } }),
    defineField({
      name: 'gallery', title: 'Galleri',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({ name: 'body',         title: 'Produkttekst',  type: 'text', rows: 8 }),
    defineField({
      name: 'specsTable', title: 'Spesifikasjonar (JSON)',
      type: 'text', rows: 6,
      description: 'JSON-objekt med nøkkel/verdi-par, t.d. {"Lengde":"3,65 m","Vekt":"80 kg"}',
    }),
  ],
  preview: {
    select: { title: 'modelName', subtitle: 'length', media: 'image' },
  },
});
