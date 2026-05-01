import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'timelineEntry',
  title: 'Tidslinje',
  type: 'document',
  fields: [
    defineField({ name: 'year',        title: 'År / Tidspunkt (t.d. "1984" eller "I dag")', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'headline',    title: 'Overskrift', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Beskriving', type: 'text', rows: 4 }),
    defineField({ name: 'order',       title: 'Rekkefølge', type: 'number', initialValue: 10 }),
  ],
  preview: {
    select: { title: 'year', subtitle: 'headline' },
  },
});
