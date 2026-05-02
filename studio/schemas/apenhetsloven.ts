import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'apenhetsloven',
  title: 'Åpenhetsloven',
  type: 'document',
  fields: [
    defineField({ name: 'introText', title: 'Introduksjonstekst', type: 'text', rows: 4 }),
    defineField({
      name: 'sections', title: 'Seksjonar', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'heading', title: 'Overskrift', type: 'string' }),
          defineField({ name: 'body',    title: 'Brødtekst',  type: 'text', rows: 5 }),
          defineField({ name: 'bullets', title: 'Punktliste', type: 'array', of: [{ type: 'string' }] }),
        ],
        preview: { select: { title: 'heading' } },
      }],
    }),
    defineField({ name: 'updatedAt', title: 'Sist oppdatert', type: 'date' }),
  ],
  preview: { prepare: () => ({ title: 'Åpenhetsloven' }) },
});
