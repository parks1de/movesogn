import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import type { StructureResolver } from 'sanity/structure';
import { schemaTypes } from './schemas';

const structure: StructureResolver = (S) =>
  S.list()
    .title('MOVE Sogn CMS')
    .items([
      S.listItem()
        .title('Nettstadinformasjon')
        .icon(() => '⚙️')
        .child(S.editor().schemaType('siteSettings').documentId('siteSettings')),

      S.divider(),

      S.listItem()
        .title('Sykkel & Moped')
        .icon(() => '🚴')
        .child(S.documentTypeList('sykkelProduct').title('Alle produkt').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.listItem()
        .title('Marine / Båtar')
        .icon(() => '⛵')
        .child(S.documentTypeList('marineBoat').title('Alle båtar').defaultOrdering([{ field: 'order', direction: 'asc' }])),

      S.listItem()
        .title('Historikk (Om oss)')
        .icon(() => '📅')
        .child(S.documentTypeList('timelineEntry').title('Tidslinje').defaultOrdering([{ field: 'order', direction: 'asc' }])),
    ]);

export default defineConfig({
  name: 'movesogn',
  title: 'MOVE Sogn Studio',

  projectId: 'o76s1gxs',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2026-03-31' }),
  ],

  schema: { types: schemaTypes },
});
