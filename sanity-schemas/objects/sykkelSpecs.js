// Spesifikasjonar — El-sykkel (Merida)
// Add to your Sanity Studio schema: schemaTypes.push(sykkelSpecs)
export const sykkelSpecs = {
  name: 'sykkelSpecs',
  title: 'Spesifikasjonar — El-sykkel',
  type: 'object',
  fields: [
    {
      name: 'rekkevidde',
      title: 'Rekkevidde',
      type: 'string',
      description: 'Maks rekkevidde per lading. Eks: Opptil 150 km',
      placeholder: 'Opptil 150 km',
    },
    {
      name: 'motor',
      title: 'Motor',
      type: 'string',
      description: 'Motortype og effekt. Eks: 250 W (Shimano Steps)',
      placeholder: '250 W (Shimano)',
    },
    {
      name: 'driv',
      title: 'Driv',
      type: 'string',
      description: 'Girstystem og antal gir. Eks: Shimano Altus 8-gir',
      placeholder: 'Shimano Altus 8-gir',
    },
    {
      name: 'batteri',
      title: 'Batteri',
      type: 'string',
      description: 'Kapasitet i Wh og type. Eks: 418 Wh Li-Ion',
      placeholder: '418 Wh Li-Ion',
    },
    {
      name: 'vekt',
      title: 'Vekt',
      type: 'string',
      description: 'Sykkelens vekt med batteri. Eks: 22 kg',
      placeholder: '22 kg',
    },
    {
      name: 'ramme',
      title: 'Ramme',
      type: 'string',
      description: 'Rammemateriale. Eks: Aluminium / Karbonfiber',
      placeholder: 'Aluminium',
    },
    {
      name: 'hjulstorleik',
      title: 'Hjulstorleik',
      type: 'string',
      description: 'Eks: 28" / 29" / 27.5"',
      placeholder: '28"',
    },
    {
      name: 'brems',
      title: 'Brems',
      type: 'string',
      description: 'Bremstype. Eks: Hydraulisk skivebrems / Mekanisk',
      placeholder: 'Hydraulisk skivebrems',
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
