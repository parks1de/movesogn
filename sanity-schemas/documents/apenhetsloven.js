export const apenhetsloven = {
  name: 'apenhetsloven',
  title: 'Åpenhetsloven',
  type: 'document',
  fields: [
    {
      name: 'introText',
      title: 'Introduksjonstekst',
      type: 'text',
      rows: 4,
      description: 'Kort introduksjon øvst på sida.',
    },
    {
      name: 'sections',
      title: 'Seksjonar',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'heading', title: 'Overskrift', type: 'string' },
            { name: 'body',    title: 'Brødtekst',  type: 'text', rows: 5 },
            {
              name: 'bullets',
              title: 'Punktliste (valfri)',
              type: 'array',
              of: [{ type: 'string' }],
            },
          ],
          preview: { select: { title: 'heading' } },
        },
      ],
    },
    {
      name: 'updatedAt',
      title: 'Sist oppdatert',
      type: 'date',
      description: 'Dato for siste revisjon av åpenhetsloven-rapporten.',
    },
  ],
  preview: {
    prepare: () => ({ title: 'Åpenhetsloven' }),
  },
};
