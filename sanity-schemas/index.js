import { batSpecs }           from './objects/batSpecs.js';
import { scooterSpecs }       from './objects/scooterSpecs.js';
import { sykkelSpecs }        from './objects/sykkelSpecs.js';
import { sparkesykkelSpecs }  from './objects/sparkesykkelSpecs.js';
import { sykkelProduct }      from './documents/sykkelProduct.js';
import { marineBoat }         from './documents/marineBoat.js';
import { suzukiEngine }       from './documents/suzukiEngine.js';

// Object types must come BEFORE document types that reference them
export const schemaTypes = [
  batSpecs,
  scooterSpecs,
  sykkelSpecs,
  sparkesykkelSpecs,
  sykkelProduct,
  marineBoat,
  suzukiEngine,
];
