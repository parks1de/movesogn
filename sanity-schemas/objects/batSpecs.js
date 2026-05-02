// Spesifikasjonar — Båt
// Add to your Sanity Studio schema: schemaTypes.push(batSpecs)
export const batSpecs = {
  name: 'batSpecs',
  title: 'Spesifikasjonar — Båt',
  type: 'object',
  fields: [
    {
      name: 'lengde',
      title: 'Lengde',
      type: 'string',
      description: 'Lengd over alt. Eks: 4,80 m',
      placeholder: '4,80 m',
    },
    {
      name: 'breidde',
      title: 'Breidde',
      type: 'string',
      description: 'Maks breidde. Eks: 1,90 m',
      placeholder: '1,90 m',
    },
    {
      name: 'djupgang',
      title: 'Djupgang',
      type: 'string',
      description: 'Eks: 28 cm',
      placeholder: '28 cm',
    },
    {
      name: 'vektUtenMotor',
      title: 'Vekt (utan motor)',
      type: 'string',
      description: 'Eks: ca. 80 kg',
      placeholder: 'ca. 80 kg',
    },
    {
      name: 'maxPersonar',
      title: 'Maks personar',
      type: 'string',
      description: 'Personkapasitet iflg. CE-godkjenning. Eks: 6',
      placeholder: '6',
    },
    {
      name: 'tilraaddMotor',
      title: 'Tilrådd motor',
      type: 'string',
      description: 'Eks: Suzuki 50 hk',
      placeholder: 'Suzuki 50 hk',
    },
    {
      name: 'maxMotor',
      title: 'Maks motorstorleik',
      type: 'string',
      description: 'Eks: 90 hk',
      placeholder: '90 hk',
    },
    {
      name: 'skrog',
      title: 'Skrogmateriale',
      type: 'string',
      description: 'Eks: Aluminium / Polyetylen (rotasjonsstøpt)',
      placeholder: 'Aluminium',
    },
    {
      name: 'ceKlasse',
      title: 'CE-klasse',
      type: 'string',
      description: 'Klasse A–D. Eks: C — inntil 2 nautiske mil frå havn',
      placeholder: 'D',
    },
    {
      name: 'serie',
      title: 'Modellserie',
      type: 'string',
      description: 'Eks: Silver X — Aluminium / Hasle Summerfun',
      placeholder: 'Silver X — Aluminium',
    },
  ],
  preview: {
    select: { title: 'lengde', subtitle: 'skrog' },
    prepare: ({ title, subtitle }) => ({
      title: title ? `Lengde: ${title}` : 'Spesifikasjonar',
      subtitle: subtitle ?? '',
    }),
  },
};
