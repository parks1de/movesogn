import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Nettstadinformasjon',
  type: 'document',
  fields: [
    defineField({
      name: 'openingHours',
      title: 'Opningstider',
      type: 'object',
      fields: [
        { name: 'weekdays',    title: 'Kvardagar',              type: 'string', initialValue: '07.30–16.00' },
        { name: 'saturday',    title: 'Laurdag',                type: 'string', initialValue: '10.00–13.00' },
        { name: 'saturdayNote', title: 'Merknad laurdag',       type: 'string', initialValue: 'Sommartid' },
        { name: 'sunday',      title: 'Sundag',                 type: 'string', initialValue: 'Stengt' },
      ],
    }),
  ],
  __experimental_actions: ['update', 'publish'],
});
