import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'marineBoat',
  title: 'Marine — Båt',
  type: 'document',
  groups: [
    { name: 'info',  title: 'Informasjon', default: true },
    { name: 'specs', title: 'Spesifikasjonar'            },
    { name: 'media', title: 'Bilete & galleri'           },
  ],
  fields: [
    defineField({ name: 'modelName', title: 'Modellnamn',               type: 'string', group: 'info', validation: (R) => R.required() }),
    defineField({ name: 'slug',      title: 'Slug (URL)',               type: 'slug',   group: 'info', options: { source: 'modelName' }, validation: (R) => R.required() }),
    defineField({
      name: 'brand', title: 'Merke / Serie', type: 'string', group: 'info',
      options: { list: [
        { value: 'summerfun', title: 'Hasle Summerfun' },
        { value: 'silver',    title: 'Silver Boats'    },
        { value: 'linder',    title: 'Linder'          },
        { value: 'other',     title: 'Anna'            },
      ]},
    }),
    defineField({ name: 'order',     title: 'Rekkefølgje (lågast = øvst)', type: 'number', group: 'info', initialValue: 10 }),
    defineField({
      name: 'featuredOnHomepage', title: 'Vis på framside',
      type: 'boolean', group: 'info', initialValue: false,
      description: 'Slå på for å vise båten i "Utvalde produkt" på framsida.',
    }),
    defineField({ name: 'tagline',   title: 'Slagord',                  type: 'string', group: 'info' }),
    defineField({ name: 'body',      title: 'Beskriving',               type: 'text',   group: 'info', rows: 6 }),
    defineField({ name: 'priceFrom', title: 'Pris frå (kr)',            type: 'string', group: 'info', description: 'T.d. "239 000"' }),
    defineField({ name: 'priceFull', title: 'Full pris / berre båt',   type: 'string', group: 'info', description: 'Alternativ pris, t.d. utan motor' }),

    defineField({
      name: 'batSpecs', title: 'Spesifikasjonar', type: 'object', group: 'specs',
      fields: [
        defineField({ name: 'lengde',        title: 'Lengde',             type: 'string' }),
        defineField({ name: 'breidde',       title: 'Breidde',            type: 'string' }),
        defineField({ name: 'djupgang',      title: 'Djupgang',           type: 'string' }),
        defineField({ name: 'vektUtenMotor', title: 'Vekt (utan motor)',  type: 'string' }),
        defineField({ name: 'maxPersonar',   title: 'Maks personar',      type: 'string' }),
        defineField({ name: 'tilraaddMotor', title: 'Tilrådd motor',      type: 'string' }),
        defineField({ name: 'maxMotor',      title: 'Maks motor',         type: 'string' }),
        defineField({ name: 'skrog',         title: 'Skrogmateriale',     type: 'string' }),
        defineField({ name: 'ceKlasse',      title: 'CE-klasse',          type: 'string' }),
        defineField({ name: 'serie',         title: 'Modellserie',        type: 'string' }),
      ],
    }),

    defineField({
      name: 'image', title: 'Hovudbilete', type: 'image', group: 'media',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery', title: 'Galleri', type: 'array', group: 'media',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
  ],

  preview: {
    select: { title: 'modelName', subtitle: 'brand', media: 'image' },
    prepare({ title, subtitle, media }) {
      const b: Record<string, string> = { summerfun: 'Hasle Summerfun', silver: 'Silver Boats', linder: 'Linder', other: 'Anna' };
      return { title: title || 'Ukjent', subtitle: b[subtitle] ?? subtitle, media };
    },
  },
});
