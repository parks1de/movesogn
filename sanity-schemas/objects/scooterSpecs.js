// Spesifikasjonar — El-moped (NIU scooter)
// Add to your Sanity Studio schema: schemaTypes.push(scooterSpecs)
export const scooterSpecs = {
  name: 'scooterSpecs',
  title: 'Spesifikasjonar — El-moped',
  type: 'object',
  fields: [
    {
      name: 'rekkevidde',
      title: 'Rekkevidde',
      type: 'string',
      description: 'Maks rekkevidde per lading. Eks: 70 km',
      placeholder: '70 km',
    },
    {
      name: 'motor',
      title: 'Motor',
      type: 'string',
      description: 'Motoreffekt i watt. Eks: 1 500 W',
      placeholder: '1 500 W',
    },
    {
      name: 'toppfart',
      title: 'Toppfart',
      type: 'string',
      description: 'Avgrensa toppfart. Eks: 45 km/t',
      placeholder: '45 km/t',
    },
    {
      name: 'ladetid',
      title: 'Ladetid',
      type: 'string',
      description: 'Timar frå tom til full. Eks: 4–5 t',
      placeholder: '4–5 t',
    },
    {
      name: 'vekt',
      title: 'Vekt',
      type: 'string',
      description: 'Kjøretøyvekt i kg. Eks: 70 kg',
      placeholder: '70 kg',
    },
    {
      name: 'maxLast',
      title: 'Maks last',
      type: 'string',
      description: 'Tillaten totalvekt (utan kjøretøy). Eks: 100 kg',
      placeholder: '100 kg',
    },
    {
      name: 'batteri',
      title: 'Batteri',
      type: 'string',
      description: 'Spenning og type. Eks: 60V Li-ion',
      placeholder: '60V Li-ion',
    },
    {
      name: 'sertifikat',
      title: 'Krav til sertifikat',
      type: 'string',
      description: 'Kva sertifikat krevjast. Eks: AM (moped) / A1',
      placeholder: 'AM (moped)',
    },
  ],
  preview: {
    select: { title: 'motor', subtitle: 'rekkevidde' },
    prepare: ({ title, subtitle }) => ({
      title: title ? `Motor: ${title}` : 'Spesifikasjonar',
      subtitle: subtitle ? `Rekkevidde: ${subtitle}` : '',
    }),
  },
};
