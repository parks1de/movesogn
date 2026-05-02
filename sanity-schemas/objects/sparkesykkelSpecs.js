// Spesifikasjonar — El-sparkesykkel (NIU KQi)
// Add to your Sanity Studio schema: schemaTypes.push(sparkesykkelSpecs)
export const sparkesykkelSpecs = {
  name: 'sparkesykkelSpecs',
  title: 'Spesifikasjonar — Sparkesykkel',
  type: 'object',
  fields: [
    {
      name: 'rekkevidde',
      title: 'Rekkevidde',
      type: 'string',
      description: 'Maks rekkevidde per lading. Eks: 50 km',
      placeholder: '50 km',
    },
    {
      name: 'motor',
      title: 'Motor',
      type: 'string',
      description: 'Motoreffekt i watt. Eks: 300 W',
      placeholder: '300 W',
    },
    {
      name: 'toppfart',
      title: 'Toppfart',
      type: 'string',
      description: 'Avgrensa toppfart. Eks: 25 km/t',
      placeholder: '25 km/t',
    },
    {
      name: 'ladetid',
      title: 'Ladetid',
      type: 'string',
      description: 'Timar frå tom til full. Eks: 5–6 t',
      placeholder: '5–6 t',
    },
    {
      name: 'vekt',
      title: 'Vekt',
      type: 'string',
      description: 'Vekt i kg. Eks: 16 kg',
      placeholder: '16 kg',
    },
    {
      name: 'hjulstorleik',
      title: 'Hjulstorleik',
      type: 'string',
      description: 'Hjuldiameter. Eks: 10"',
      placeholder: '10"',
    },
    {
      name: 'brems',
      title: 'Brems',
      type: 'string',
      description: 'Bremstype. Eks: Skivebrems front og bak / V-brems',
      placeholder: 'Skivebrems front og bak',
    },
    {
      name: 'foldbar',
      title: 'Foldbar',
      type: 'boolean',
      description: 'Er sparkesykkelen foldbar for transport?',
      initialValue: true,
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
