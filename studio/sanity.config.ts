import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import type { StructureResolver } from 'sanity/structure';
import { schemaTypes } from './schemas';

const structure: StructureResolver = (S) =>
  S.list()
    .title('MOVE Sogn')
    .items([

      // ── Marine ───────────────────────────────────────────────
      S.listItem()
        .title('Marine — Båtar')
        .icon(() => '⛵')
        .child(
          S.documentTypeList('marineBoat')
            .title('Alle båtar')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Suzuki Båtmotorar')
        .icon(() => '🔧')
        .child(
          S.documentTypeList('suzukiEngine')
            .title('Suzuki motorar')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ── El-mobilitet ─────────────────────────────────────────
      S.listItem()
        .title('El-syklar')
        .icon(() => '🚴')
        .child(
          S.documentTypeList('sykkelProduct')
            .title('El-syklar')
            .filter('_type == "sykkelProduct" && category == "sykkel"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('El-moped / Scooter')
        .icon(() => '🛵')
        .child(
          S.documentTypeList('sykkelProduct')
            .title('El-moped & Scooter')
            .filter('_type == "sykkelProduct" && category == "scooter"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Sparkesykkel')
        .icon(() => '🛴')
        .child(
          S.documentTypeList('sykkelProduct')
            .title('Sparkesyklar')
            .filter('_type == "sykkelProduct" && category == "sparkesykkel"')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.divider(),

      // ── MOVE ─────────────────────────────────────────────────
      S.listItem()
        .title('Historikk / Tidslinje')
        .icon(() => '📅')
        .child(
          S.documentTypeList('timelineEntry')
            .title('Tidslinje — Om oss')
            .defaultOrdering([{ field: 'order', direction: 'asc' }])
        ),

      S.listItem()
        .title('Visjon')
        .icon(() => '🎯')
        .child(
          S.editor()
            .schemaType('visjon')
            .documentId('visjon')
        ),

      S.listItem()
        .title('Åpenhetsloven')
        .icon(() => '📋')
        .child(
          S.editor()
            .schemaType('apenhetsloven')
            .documentId('apenhetsloven')
        ),

      S.divider(),

      // ── Innstillingar ─────────────────────────────────────────
      S.listItem()
        .title('Innstillingar')
        .icon(() => '⚙️')
        .child(
          S.editor()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
    ]);

export default defineConfig({
  name: 'movesogn',
  title: 'MOVE Sogn',

  projectId: 'o76s1gxs',
  dataset: 'production',

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: '2026-03-31' }),
  ],

  schema: { types: schemaTypes },
});
