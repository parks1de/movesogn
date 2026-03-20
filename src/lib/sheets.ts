/**
 * lib/sheets.ts
 * Fetches data from a Google Apps Script Web App endpoint.
 *
 * The Apps Script must be published as a Web App (Execute as: Me, Access: Anyone)
 * and must return JSON in the shape:
 *   { sheet: "SheetName", data: [ { col1: val, col2: val, ... }, ... ] }
 *
 * Set NEXT_PUBLIC_SHEETS_API_URL in .env.local to your deployment URL.
 */

export type SheetName =
  | 'mobilitet'
  | 'marine'
  | 'sykkel'
  | 'eigedom'
  | 'timeline'
  | 'gallery';

const BASE_URL = process.env.NEXT_PUBLIC_SHEETS_API_URL as string;

export async function fetchSheet<T = Record<string, string>>(
  sheet: SheetName
): Promise<T[]> {
  if (!BASE_URL) {
    console.warn('[sheets] NEXT_PUBLIC_SHEETS_API_URL not set — returning empty array');
    return [];
  }

  const url = `${BASE_URL}?sheet=${sheet}`;

  const res = await fetch(url, {
    next: { revalidate: 300 }, // ISR: revalidate every 5 minutes
  });

  if (!res.ok) {
    throw new Error(`[sheets] Failed to fetch sheet "${sheet}": ${res.status}`);
  }

  const json = await res.json();
  return (json.data ?? []) as T[];
}

/* ── Typed helpers ──────────────────────────────────────── */

export interface MobilitetEntry {
  slug: string;
  title: string;
  descriptor: string;
  image: string;
  external_url: string;
  label: string;
  cta_text: string;
}

export interface MarineBoat {
  slug: string;
  model_name: string;
  length: string;
  persons: string;
  motor_options: string;
  price_from: string;
  image: string;
  images: string;       // comma-separated URLs
  body: string;
  specs_table: string;  // JSON string
}

export interface SykkelProduct {
  slug: string;
  name: string;
  category: 'sykkel' | 'scooter' | 'sparkesykkel';
  range_km: string;
  motor_w: string;
  weight: string;
  price_from: string;
  image: string;
  images: string;
  body: string;
}

export interface TimelineEntry {
  year: string;
  headline: string;
  description: string;
  order: string;
}

export async function fetchMobilitet() {
  return fetchSheet<MobilitetEntry>('mobilitet');
}

export async function fetchMarineBoats() {
  return fetchSheet<MarineBoat>('marine');
}

export async function fetchSykkelProducts() {
  return fetchSheet<SykkelProduct>('sykkel');
}

export async function fetchTimeline() {
  const rows = await fetchSheet<TimelineEntry>('timeline');
  return rows.sort((a, b) => Number(a.order) - Number(b.order));
}
