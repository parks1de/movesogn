import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'marineBoat',
  title: 'Båt',
  type: 'document',

  groups: [
    { name: 'content', title: 'Innhald',  default: true },
    { name: 'specs',   title: 'Teknisk'               },
    { name: 'motor',   title: 'Motor'                 },
    { name: 'media',   title: 'Bilete'                },
    { name: 'meta',    title: 'Meta'                  },
  ],

  fields: [
    defineField({ name: 'modelName',    title: 'Modellnamn',          type: 'string',  group: 'content', validation: (R) => R.required() }),
    defineField({ name: 'slug',         title: 'Slug (URL)',           type: 'slug',    group: 'meta',    options: { source: 'modelName' }, validation: (R) => R.required() }),
    defineField({ name: 'order',        title: 'Sorteringsrekkefølge', type: 'number',  group: 'meta',    initialValue: 10 }),
    defineField({ name: 'priceFrom',    title: 'Pris frå (kr)',        type: 'string',  group: 'content' }),
    defineField({ name: 'priceNote',    title: 'Pristillegg / merknad', type: 'string', group: 'content' }),
    defineField({ name: 'shortDesc',    title: 'Kortskildring',        type: 'string',  group: 'content' }),
    defineField({ name: 'body',         title: 'Produkttekst',         type: 'text',    group: 'content', rows: 8 }),
    defineField({ name: 'length',       title: 'Lengde',               type: 'string',  group: 'specs' }),
    defineField({ name: 'persons',      title: 'Maks personar',        type: 'string',  group: 'specs' }),
    defineField({ name: 'weight',       title: 'Vekt',                 type: 'string',  group: 'specs' }),
    defineField({ name: 'techSpecs',    title: 'Tekniske spesifikasjonar', type: 'text', group: 'specs', rows: 8, description: 'Fritekst — kvar linje: Nøkkel: Verdi' }),
    defineField({ name: 'standardEquipment', title: 'Standardutstyr', type: 'text',    group: 'specs', rows: 5 }),
    defineField({ name: 'motorOptions', title: 'Motoralternativ',      type: 'string',  group: 'motor' }),
    defineField({ name: 'motorTitle',   title: 'Motor — tittel',       type: 'string',  group: 'motor' }),
    defineField({ name: 'motorDesc',    title: 'Motor — skildring',    type: 'text',    group: 'motor', rows: 4 }),
    defineField({ name: 'image',        title: 'Hovudbilete (URL)',     type: 'string',  group: 'media' }),
    defineField({
      name: 'gallery', title: 'Galleri (URL-ar)',
      type: 'array', group: 'media',
      of: [{ type: 'string' }],
    }),
  ],

  preview: {
    select: { title: 'modelName', subtitle: 'priceFrom', length: 'length' },
    prepare({ title, subtitle, length }) {
      return {
        title: title || 'Ukjent',
        subtitle: [length, subtitle ? `kr ${subtitle}` : ''].filter(Boolean).join(' — '),
      };
    },
  },
});
