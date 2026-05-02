export const visjon = {
  name: 'visjon',
  title: 'Visjon',
  type: 'document',
  fields: [
    {
      name: 'heroTagline',
      title: 'Hero-tagline',
      type: 'string',
      description: 'Kort setning under overskrifta i hero.',
    },
    {
      name: 'missionHeading',
      title: 'Formål — overskrift',
      type: 'string',
    },
    {
      name: 'missionBody',
      title: 'Formål — tekst',
      type: 'array',
      of: [{ type: 'text' }],
      description: 'Eitt avsnitt per element.',
    },
    {
      name: 'milestones',
      title: 'Milepælar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'year', title: 'År / Etikett', type: 'string' },
            { name: 'text', title: 'Tekst',         type: 'text', rows: 2 },
          ],
          preview: { select: { title: 'year', subtitle: 'text' } },
        },
      ],
    },
  ],
  preview: {
    prepare: () => ({ title: 'Visjon' }),
  },
};
