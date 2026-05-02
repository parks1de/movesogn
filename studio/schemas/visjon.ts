import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'visjon',
  title: 'Visjon',
  type: 'document',
  fields: [
    defineField({ name: 'heroTagline',    title: 'Hero-tagline',       type: 'string' }),
    defineField({ name: 'missionHeading', title: 'Formål — overskrift', type: 'string' }),
    defineField({
      name: 'missionBody', title: 'Formål — tekst', type: 'array',
      of: [{ type: 'text' }],
      description: 'Eitt avsnitt per element',
    }),
    defineField({
      name: 'milestones', title: 'Milepælar', type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'year', title: 'År / Etikett', type: 'string' }),
          defineField({ name: 'text', title: 'Tekst',        type: 'text', rows: 2 }),
        ],
        preview: { select: { title: 'year', subtitle: 'text' } },
      }],
    }),
  ],
  preview: { prepare: () => ({ title: 'Visjon' }) },
});
