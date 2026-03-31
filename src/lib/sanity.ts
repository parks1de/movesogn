// Minimal Sanity HTTP client — no external dependency required.
// Project: o76s1gxs | Dataset: production | API version: 2026-03-31

const PROJECT_ID = 'o76s1gxs';
const DATASET    = 'production';
const API_VERSION = '2026-03-31';

export async function sanityFetch<T>(query: string): Promise<T> {
  const encoded = encodeURIComponent(query);
  const url = `https://${PROJECT_ID}.apicdn.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${encoded}`;

  const res = await fetch(url, {
    next: { revalidate: 3600 }, // ISR: revalidate every hour
  });

  if (!res.ok) throw new Error(`Sanity fetch failed: ${res.status}`);

  const data = await res.json();
  return data.result as T;
}
